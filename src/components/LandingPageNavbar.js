
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCog, faEnvelopeOpen, faPhone, faPhoneAlt, faSearch, faSignOutAlt, faUserShield } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { Row, Col, Nav, Form, Image, Navbar, Dropdown, Container, ListGroup, InputGroup } from '@themesberg/react-bootstrap';

import NOTIFICATIONS_DATA from "../data/notifications";
import Profile3 from "../assets/img/team/profile-picture-3.jpg";
import toast, { Toaster } from 'react-hot-toast';
import Cookies from "universal-cookie";
import { Route, useHistory } from "react-router-dom";

import { Routes } from "../routes";

// image
import logo from '../assets/img/logo.png'

export default (props) => {

    const cookies = new Cookies();
    const history = useHistory();

    const [notifications, setNotifications] = useState(NOTIFICATIONS_DATA);
    const areNotificationsRead = notifications.reduce((acc, notif) => acc && notif.read, true);

    const markNotificationsAsRead = () => {
        setTimeout(() => {
            setNotifications(notifications.map(n => ({ ...n, read: true })));
        }, 300);
    };

    const handleLogout = () => {

        const confirmation = window.confirm("Are you sure you want to Logout?")

        if (confirmation) {
            cookies.remove('userDetails');
            toast.success('Logout Successfully..');
            history.push('/sign-in');
        }
    }


    const Notification = (props) => {
        const { link, sender, image, time, message, read = false } = props;
        const readClassName = read ? "" : "text-danger";

        return (
            <ListGroup.Item action href={link} className="border-bottom border-light">
                <Row className="align-items-center">
                    <Col className="col-auto">
                        <Image src={image} className="user-avatar lg-avatar rounded-circle" />
                    </Col>
                    <Col className="ps-0 ms--2">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h4 className="h6 mb-0 text-small">{sender}</h4>
                            </div>
                            <div className="text-end">
                                <small className={readClassName}>{time}</small>
                            </div>
                        </div>
                        <p className="font-small mt-1 mb-0">{message}</p>
                    </Col>
                </Row>
            </ListGroup.Item>
        );
    };

    return (
        <Navbar variant="dark" expanded className="ps-0 pe-2 pb-3" style={{backgroundColor:'#0A253B',  borderBottom: '1px solid lightgray'}}>
            <Container fluid className="px-0">
                <div className="d-flex justify-content-around w-100">
                    <div className="d-flex align-items-center">
                        {/* <Form className="navbar-search">
                            <Form.Group id="topbarSearch">
                                <InputGroup className="input-group-merge search-bar">
                                    <InputGroup.Text><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
                                    <Form.Control type="text" placeholder="Search" />
                                </InputGroup>
                            </Form.Group>
                        </Form> */}
                        <Nav.Item>
                            <Nav.Link href="#" className="text-center text-primary fw-bold py-2 mx-2 text-white">
                                <img variant="top" src={logo} style={{ height: 50, width: 55, }} /> Job Cloud
                            </Nav.Link>
                        </Nav.Item>
                    </div>

                    <Nav className="align-items-center gap-2 justify-content-center">

                        {/* noti */}
                        <Dropdown as={Nav.Item} onToggle={markNotificationsAsRead} >
                            <Dropdown.Toggle as={Nav.Link} className="text-dark icon-notifications">
                                <span className="icon icon-sm">
                                    <FontAwesomeIcon icon={faBell} className="bell-shake text-white" />
                                    {areNotificationsRead ? null : <span className="icon-badge rounded-circle unread-notifications" />}
                                </span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dashboard-dropdown notifications-dropdown dropdown-menu-lg dropdown-menu-right mt-2 py-0 user-dropdown dropdown-menu-right mt-2">
                                <ListGroup className="list-group-flush">
                                    {/* <Nav.Link href="#" className="text-center text-primary fw-bold border-bottom border-light py-3">
                                        Activity Feed
                                    </Nav.Link> */}

                                    {notifications.map(n => <Notification key={`notification-${n.id}`} {...n} />)}

                                    <Dropdown.Item className="text-center text-primary fw-bold py-3">
                                        View all
                                    </Dropdown.Item>
                                </ListGroup>
                            </Dropdown.Menu>
                        </Dropdown>

                        {/* setting */}
                        <Dropdown as={Nav.Item}>
                            <Dropdown.Toggle as={Nav.Link} className="px-0">

                                <span className="icon icon-sm">
                                    <FontAwesomeIcon color="black" icon={faCog} className="text-white bell-shake" />
                                </span>

                            </Dropdown.Toggle>
                            <Dropdown.Menu className="user-dropdown dropdown-menu-right mt-2">
                                <Dropdown.Item className="fw-bold">
                                    <FontAwesomeIcon icon={faUserCircle} className="me-2" /> About
                                </Dropdown.Item>
                                <Dropdown.Item className="fw-bold">
                                    <FontAwesomeIcon icon={faCog} className="me-2" /> Settings
                                </Dropdown.Item>

                                <Dropdown.Divider />

                                <Dropdown.Item onClick={handleLogout} className="fw-bold">
                                    <FontAwesomeIcon icon={faPhoneAlt} className="text-success me-2" /> Contact
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        {/* login */}
                        <Nav.Item className="px-3" style={{paddingRight:0}}>
                            <Nav.Link href={"#"+Routes.Signin.path} className="text-center text-primary fw-bold border rounded bg-light py-2 mx-2">
                                <FontAwesomeIcon icon={faSignOutAlt} className="text-black me-2" /> Login
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>
            </Container>
        </Navbar>
    );
};
