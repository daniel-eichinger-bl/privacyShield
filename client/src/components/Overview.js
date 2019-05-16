import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Spinner, ListGroup, ListGroupItem, Badge } from 'reactstrap'

const Overview = (props) => {
    const showFetchBtn = props.showFetchBtn;
    
    useEffect(() => {
        showFetchBtn(true);
        return () => {
            showFetchBtn(false);
        }
    })

    const checkIsActive = (timestamp) => {
        var beforeTenMinutes = new Date();
        const durationMin = 1;
        beforeTenMinutes.setMinutes(beforeTenMinutes.getMinutes() - durationMin);

        const onlineTime = new Date(timestamp);
        return beforeTenMinutes < onlineTime;
    }

    const constructParams = (device) => {
        const { ip, timestamp, blocked, mac, name } = device;
        return {
            pathname: `/device_details/${mac}/${ip}/${timestamp}/${blocked}/${name}`,
        };
    }

    // className={checkIsActive(device.timestamp) ? "activeItem" : "inactiveItem"}
    return (
        <Container>
            {props.isLoading ?
                <Spinner className="spinner" color="danger"></Spinner>
                :
                <ListGroup>
                    {props.data.map(device =>
                        <ListGroupItem key={device.mac} className="overviewItem">
                            <h5 className={checkIsActive(device.timestamp) ? "activeHeading" : ""}>
                                {device.name ?
                                    device.name
                                    :
                                    `Unnamed Device (${device.mac})`
                                }

                                {checkIsActive(device.timestamp) ?
                                    <Badge color="success" className="badgeOverview">online</Badge>
                                    :
                                    ""
                                }

                                {device.blocked === 1 ?
                                    <Badge color="danger" className="badgeOverview">Traffic blocked</Badge>
                                    :
                                    ""
                                }

                            </h5>
                            <div className="listContent">
                                Current IP-Adress: {device.ip}<br />
                                MAC-Adress: {device.mac}<br />
                                Last online: {new Date(device.timestamp).toLocaleTimeString()}-{new Date(device.timestamp).toLocaleDateString()}

                                <Link to={constructParams(device)}>
                                    <Button color="primary" className="detailBtn">Details</Button>
                                </Link>

                            </div>
                        </ListGroupItem>
                    )}

                </ListGroup>
            }


        </Container>
    )
}

export default Overview
