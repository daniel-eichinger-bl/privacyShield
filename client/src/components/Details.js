import React, { useState } from 'react'
import { Card, CardHeader, CardBody, Container, Button, Spinner, InputGroup, InputGroupAddon, Input, Row, Col, Form } from 'reactstrap';

const Details = (props) => {
    var { mac, ip, timestamp, blocked, name } = props.match.params;
    timestamp = parseInt(timestamp);
    name = name === "null" ? null : name;

    const [trafficBlocked, setTrafficBlocked] = useState(blocked === 0 ? false : true);
    const [isLoading, setIsLoading] = useState(false);
    const [deviceName, setDeviceName] = useState(name !== null ? name : "");

    const handleTrafficBlock = () => {
        setIsLoading(true);
        setTrafficBlocked(!trafficBlocked);
        blocked = trafficBlocked;

        fetch('/api/devices/block', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ mac, blocked, ip })
        })
            .then(res => { if (res.status === 200) { return res.json() } })
            .then(data => {
                if (data) {
                    console.log(data);
                    setIsLoading(false);
                }
            });
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        fetch('/api/devices/updateName', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ mac, name: deviceName })
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
                            <Form onSubmit={handleFormSubmit}>
                                <InputGroup>
                                    <Input type="text" required placeholder="Device Name" value={deviceName} onChange={(e) => setDeviceName(e.target.value)} />
                                    <InputGroupAddon addonType="append">
                                        <Button color="success">Rename</Button>
                                    </InputGroupAddon>
                                </InputGroup>
                            </Form>
                        </Col>
                    </Row>
                    <div id="controlsContainer">

                        <Row>
                            <Col>
                                {!isLoading ?
                                    <Button id="blockTrafficBtn" color={trafficBlocked ? "danger" : "success"} onClick={handleTrafficBlock}>
                                        {trafficBlocked ? "Block Traffic" : "Enable Traffic"}
                                    </Button>
                                    :
                                    <Spinner color="danger"></Spinner>
                                }
                            </Col>
                            <Col>

                            </Col>
                        </Row>
                    </div>

                </CardBody>
            </Card>
        </Container>
    )
}

export default Details
