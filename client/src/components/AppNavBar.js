import React, { useState } from 'react'
import { NavLink as RRNavLink } from 'react-router-dom'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container, Button } from 'reactstrap';


const AppNavBar = props => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = event => {
        setIsOpen(!isOpen);
    }

    return (
        <div>
            <Navbar color="dark" dark expand="sm" className="mb5">
                <Container>
                    <NavbarBrand href="/">Privacy Shield <img src="/images/shield.png" width="50px" alt=""></img></NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="ml-auto" navbar pills>
                            <NavItem><NavLink tag={RRNavLink} activeClassName="active" to="/" exact className="navLabel" >Overview</NavLink></NavItem>
                            {props.showBtn ?
                                <NavItem>
                                    <NavLink>
                                        <Button color="danger" className="mx-2" onClick={props.getDevices}>Fetch Devices</Button>
                                    </NavLink>
                                </NavItem>
                                : ""}
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div >
    )
}

export default AppNavBar
