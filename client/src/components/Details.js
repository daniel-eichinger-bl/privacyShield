import React, { useState } from 'react'
import { Card, CardHeader, CardBody, Container, Row, Col } from 'reactstrap';
import TrafficBlockBtn from './TrafficBlockBtn'
import RenameDeviceInput from './RenameDeviceInput'
import TrafficSummary from './TrafficSummary';

const Details = (props) => {
    var { mac, ip, timestamp, blocked, name } = props.match.params;
    timestamp = parseInt(timestamp);
    name = name === "null" ? null : name;

    const [deviceName, setDeviceName] = useState(name !== null ? name : "");
    const handleNameChange = (name) => {
        setDeviceName(name);
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
                                <TrafficSummary mac={mac} />
                            </Col>
                        </Row>
                    </div>

                </CardBody>
            </Card>
        </Container>
    )
}

export default Details
