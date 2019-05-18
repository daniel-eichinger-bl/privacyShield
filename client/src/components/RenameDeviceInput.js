import React from 'react'
import { Button, InputGroup, InputGroupAddon, Input, Form } from 'reactstrap';

const RenameDeviceInput = (props) => {
    const {mac, name} = props;

    const handleFormSubmit = (e) => {
        e.preventDefault();

        fetch('/api/devices/updateName', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ mac, name: name })
        });
    }

    return (
        <Form onSubmit={handleFormSubmit}>
            <InputGroup>
                <Input type="text" required placeholder="Device Name" value={name} onChange={(e) => props.setName(e.target.value)} />
                <InputGroupAddon addonType="append">
                    <Button color="success">Rename</Button>
                </InputGroupAddon>
            </InputGroup>
        </Form>
    )
}

export default RenameDeviceInput
