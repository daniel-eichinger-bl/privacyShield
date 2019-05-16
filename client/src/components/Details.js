import React, { useState } from 'react'
import { Card, CardHeader, CardBody, Container, Button, Spinner } from 'reactstrap';

const Details = (props) => {
    var { mac, ip, timestamp, blocked } = props.match.params;
    timestamp = parseInt(timestamp);

    const [trafficBlocked, setTrafficBlocked] = useState(blocked === 0 ? false : true);
    const [isLoading, setIsLoading] = useState(false)

    const handleTrafficBlock = () => {
        setIsLoading(true);
        setTrafficBlocked(!trafficBlocked)
        blocked = trafficBlocked;

        fetch('/api/devices/block', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(mac, blocked)
        })
            .then(res => { if (res.status === 200) { return res.json() } })
            .then(data => {
                if(data) {
                    console.log(data);
                    setIsLoading(false);
                }
            });
    }


    return (
        <Container>
            <Card id="detailsCard">
                <CardHeader>
                    Details for {mac}
                </CardHeader>
                <CardBody>

                    <div className="listContent">
                        Current IP-Adress: {ip}<br />
                        MAC-Adress: {mac}<br />
                        Last online: {new Date(timestamp).toLocaleTimeString()}-{new Date(timestamp).toLocaleDateString()}

                        <div id="controlsContainer">
                            {!isLoading ?
                                <Button color={!trafficBlocked ? "danger" : "success"} onClick={handleTrafficBlock}>
                                    {!trafficBlocked ? "Block Traffic" : "Enable Traffic"}
                                </Button>
                                :
                                <Spinner color="danger"></Spinner>
                            }
                        </div>
                    </div>

                </CardBody>
            </Card>
        </Container>
    )
}

export default Details
