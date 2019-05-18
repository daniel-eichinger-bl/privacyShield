import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardBody, Container, Row, Col, Spinner } from 'reactstrap';
import TrafficBlockBtn from './TrafficBlockBtn'
import RenameDeviceInput from './RenameDeviceInput'
import TrafficSummary from './TrafficSummary';
import BarChart from './BarChart';

const Details = (props) => {
    var { mac, ip, timestamp, blocked, name } = props.match.params;
    timestamp = parseInt(timestamp);
    name = name === "null" ? null : name;

    const [deviceName, setDeviceName] = useState(name !== null ? name : "");
    const [trafficData, setTrafficData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleNameChange = (name) => {
        setDeviceName(name);
    }

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
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setTrafficData([]);
                setIsLoading(false);
            });
    }



    return (
        <Container>
            <Card id="detailsCard">
                <CardHeader>
                    Details for {deviceName !== "" ? deviceName : mac}
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col>
                            <div className="listContent">
                                Current IP-Adress: {ip}<br />
                                MAC-Adress: {mac}<br />
                                Last online: {new Date(timestamp).toLocaleTimeString()}-{new Date(timestamp).toLocaleDateString()}
                            </div>
                        </Col>
                        <Col>
                            <RenameDeviceInput name={deviceName} mac={mac} setName={handleNameChange} />
                        </Col>
                    </Row>
                    <div id="controlsContainer">
                        <Row>
                            <Col>
                                <TrafficBlockBtn mac={mac} ip={ip} blocked={blocked} />
                            </Col>
                            <Col>
                                {isLoading ?
                                    <Spinner color="danger"></Spinner>
                                    :
                                    <TrafficSummary trafficData={trafficData} />
                                }
                            </Col>
                        </Row>
                    </div>
                    <BarChart trafficData={trafficData}/>
                </CardBody>
            </Card>
        </Container>
    )
}

export default Details
