import React from 'react'
import { Card, CardHeader, CardBody, Container, Row, Col, Spinner, ListGroup, ListGroupItem } from 'reactstrap';

const Details = (props) => {
    let {mac, ip, timestamp, blocked} = props.match.params;
    console.log(props.match.params);

    return (
        <Container>
            <Card id="detailsCard">
                <CardHeader>
                    Details for {mac}
                </CardHeader>
                <CardBody>
                    Test123123
                </CardBody>
            </Card>
        </Container>
    )
}

export default Details
