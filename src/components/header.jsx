import { Link } from "react-router-dom";
import { useProtectedContext } from "../context/Protected";
import Button from 'react-bootstrap/Button';
import { logout } from "../util/firebase";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import { Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../util/firebase";

function Header(){

    const [user, setUser] = useProtectedContext();

    const sesionOut = () => {
        setUser(null);
        logout();
        console.log("sesion cerrada")
    }

    return (
        <Row>          
            <Navbar /*bg="light"/**/ expand="lg" sticky="top">
            <Container fluid>
                <Navbar.Brand href="#">Dev's United </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll" className="justify-content-end">
                    
                <Nav className="justify-content-end" style={{ maxHeight: '100px' }} navbarScroll>
                    <NavDropdown title="Inicio" id="navbarScrollingDropdown">
                    <NavDropdown.Item href="#">Configuración</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={sesionOut}>
                       Cerrar sesíon
                    </NavDropdown.Item>
                    </NavDropdown> 
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
            </Row>
    );
}

export default Header;