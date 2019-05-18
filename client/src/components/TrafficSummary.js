import React, { useState, useEffect } from 'react'
import { ListGroup, ListGroupItem, Badge, Alert } from 'reactstrap'

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

    const trafficData = props.trafficData;
    const [hostType, setHostType] = useState(getFilteredHostnamesProtocol(trafficData));
    
    useEffect(() => {
        setHostType(getFilteredHostnamesProtocol(trafficData));
    },[trafficData])

    return (
        <div>
            <h5>Hostnames &amp; Protocol Types</h5>
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
    )
}

export default TrafficSummary
