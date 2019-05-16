import React from 'react'
import { Card, CardHeader, CardBody, Container, Row, Col, Spinner, ListGroup, ListGroupItem } from 'reactstrap';

const Details = (props) => {
    console.log(props.match.params);

    return (
        <Container>
            <Card id="detailsCard">
                <CardHeader>
                    Details for
                </CardHeader>
                <CardBody>
                    Test123123
                </CardBody>
            </Card>
        </Container>
    )
}

export default Details
