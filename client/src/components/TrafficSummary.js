import React, { useState, useEffect } from 'react'
import { ListGroup, ListGroupItem, Badge, Spinner, Alert } from 'reactstrap'

const TrafficSummary = (props) => {
    const getFilteredHostnamesProtocol = (traffic) => {
        // just get host and type
        let hostnamesProtocol = traffic.map((data) => {
            const host = data.host.replace("www.", "");
            const type = data.type;
            return { host, type };
        });

        // filter out duplicates
        hostnamesProtocol = hostnamesProtocol.filter((data, index, self) => {
            return index === self.findIndex((t) => (
                JSON.stringify(t) === JSON.stringify(data)
            ));
        })

        return hostnamesProtocol;
    }

    const mac = props.mac;
    const [trafficData, setTrafficData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hostType, setHostType] = useState([]);

    useEffect(() => {
        fetchDetails(mac);
    }, [mac])

    const fetchDetails = (mac) => {
        setIsLoading(true);

        const params = new URLSearchParams({ mac }).toString();
        fetch('/api/devices/deviceDetails?' + params)
            .then(res => { if (res.status === 200) { return res.json() } })
            .then(data => {
                data.sort((a, b) => b.timestamp - a.timestamp);

                setTrafficData(data);
                setHostType(getFilteredHostnamesProtocol(data));

                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setTrafficData([]);
                setIsLoading(false);
            });
    }

    return (
        <div>
            {isLoading ?
                <Spinner color="danger"></Spinner>
                :

                <div>
                    <h5>Hostnames & Protocol Types</h5>
                    <ListGroup flush id="hostTypeList">
                        {hostType.map((obj, idx) =>
                            <ListGroupItem key={idx} className="hostTypeItem" color={obj.type === "http" ? "danger" : ""}>
                                {obj.host} - {obj.type}

                                {obj.type === "http" ?
                                    <Badge color="danger" className="badgeOverview">unencrypted</Badge>
                                    : ""
                                }
                            </ListGroupItem>)}
                    </ListGroup>
                    {hostType.length === 0 ?
                        <Alert color="warning">
                            No traffic data available for this device yet.
                        </Alert>
                        :
                        ""
                    }


                </div>
            }
        </div>
    )
}

export default TrafficSummary
