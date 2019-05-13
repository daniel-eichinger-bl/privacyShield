import React from 'react'
import { Button, Container, Spinner } from 'reactstrap'

const Overview = (props) => {
    return (
        <Container>
            {props.isLoading ?
                <Spinner className="spinner" color="danger"></Spinner>
                :
                <div>
                    <h1>Hello!</h1>
                    <Button color="primary">Test123</Button>
                </div>
            }


        </Container>
    )
}

export default Overview
