import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import fire from './config/fire';

class Menu extends React.Component {

    handleLogout(event) {
        console.log('logout triggered');
        fire.auth().signOut();
    }

    render() {
        return (
            <div style={{marginBottom: 30}}>
                <Navbar collapseOnSelect bg="light" expand="sm">
                    <Navbar.Brand>ScoreBot</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                    <span className="logged-in">
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} className="nav-link" to="/team" href="/team">Teams</Nav.Link>
                            <Nav.Link as={Link} className="nav-link" to="/match" href="/match">Matches</Nav.Link>
                            <Nav.Link as={Link} className="nav-link" to="/report" href="/report">Analysis</Nav.Link>
                            <Nav.Link className="nav-link" onClick={this.handleLogout}>Logout</Nav.Link>
                        </Nav>
                    </span>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

export default Menu;
