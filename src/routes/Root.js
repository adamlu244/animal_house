import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { fetchAllAnimals, fetchAllCategories } from "../api/API";
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function Root() {
    const [token, setToken] =useState(localStorage.getItem('token'));
    const [role, setRole] = useState(localStorage.getItem('role'))
    const [categories, setCategories] = useState(localStorage.getItem('categories'))
    const [animals, setAnimals] =useState(localStorage.getItem('animals'));
    const navigate = useNavigate();

    useEffect(() => {
        setToken(localStorage.getItem('token'))
        setRole(localStorage.getItem('role'))
    }, [token, role])
   
    useEffect(() => {
        Promise.all([fetchAllAnimals(), fetchAllCategories()])
        .then(([animals, categories]) => {
            setAnimals(localStorage.setItem('animals', JSON.stringify(animals)))
            setCategories(localStorage.setItem('categories', JSON.stringify(categories)))
        })
    }, []);

    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setToken('');
        setRole('');
        navigate('/login');
    }

    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                        <Nav.Link href="home">Home</Nav.Link>
                        <Nav.Link href="animals">Animals</Nav.Link>
                        {role === "admin" ? <Nav.Link href="categories">Categories</Nav.Link> : null}
                        {role === "admin" ? <Nav.Link href="customers_profile">Customers Profile</Nav.Link> : null}
                        {role === "customer" ? <Nav.Link href="profile">Order History</Nav.Link> : null}
                        {role === "customer" ? <Nav.Link href="shoppingCart">Shopping Cart</Nav.Link>: null}
                        {token ? null : <Nav.Link href="register">Register</Nav.Link>}
                        {token ? null : <Nav.Link href="login">Login</Nav.Link>}
                        {token ? <Button onClick={logout} variant="light">Log Out</Button> : null}
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                            Another action
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">
                            Separated link
                        </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <main>
                <Outlet 
                    context={[
                        token, setToken
                    ]}
                />
            </main>
        </div>
    );
}