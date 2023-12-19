
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { Routes } from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast'; 

export default ({ handlechange, handleInput, data }) => {

    const cookies = new Cookies();
    const history = useHistory();


    React.useEffect(() => {
        const userData = cookies.get('userDetails');

        if (userData) {
            history.push('/')
        }
    }, [cookies]);

    const filllines = [1]
    const blanklines = [2, 3, 4, 5];

    function handleSubmit(event) {
        event.preventDefault();

        if (data.password == data.cPassword) {
            handlechange();
        }else {
            toast.error('Password not matches');
        }
    }

    return (
        <main>
            <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
                <Container>
                    <div className="lines-container d-flex justify-content-center align-items-center gap-2 mb-5">
                        {filllines.map((index) =>
                            <div key={index} className="py-2 bg-dark border rounded" style={{width:'4rem'}}></div>
                        )}
                        {blanklines.map((index) =>
                            <div key={index} className="py-2 bg-light border rounded" style={{width:'4rem'}}></div>
                        )}
                    </div>
                    {/* <p className="text-center">
            <Card.Link as={Link} to={Routes.DashboardOverview.path} className="text-gray-700">
              <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to homepage
            </Card.Link>
          </p> */}
                    <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
                        <Col xs={12} className="d-flex align-items-center justify-content-center">
                            <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                                <div className="text-center text-md-center mb-4 mt-md-0">
                                    <h3 className="mb-0">Create Your Account</h3>
                                </div>
                                <Form className="mt-4" onSubmit={handleSubmit}>
                                    <Form.Group id="email" className="mb-4">
                                        <Form.Label>Your Email</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faEnvelope} />
                                            </InputGroup.Text>
                                            <Form.Control autoFocus value={data.email} required type="email" placeholder="example@company.com" name="email" onChange={handleInput} />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group id="password" className="mb-4">
                                        <Form.Label>Your Password</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faUnlockAlt} />
                                            </InputGroup.Text>
                                            <Form.Control required type="password" name="password" value={data.password} onChange={handleInput} placeholder="Password" />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group id="confirmPassword" className="mb-4">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faUnlockAlt} />
                                            </InputGroup.Text>
                                            <Form.Control required type="password" name="cPassword" value={data.cPassword} onChange={handleInput} placeholder="Confirm Password" />
                                        </InputGroup>
                                    </Form.Group>
                                    <FormCheck type="checkbox" className="d-flex mb-4">
                                        <FormCheck.Input required id="terms" className="me-2" />
                                        <FormCheck.Label htmlFor="terms">
                                            I agree to the <Card.Link>terms and conditions</Card.Link>
                                        </FormCheck.Label>
                                    </FormCheck>

                                    <Button variant="primary" type="submit" onSubmit={handleSubmit} className="w-100">
                                        Sign up
                                    </Button>
                                </Form>
                                <div className="d-flex justify-content-center align-items-center mt-4">
                                    <span className="fw-normal">
                                        Already have an account?
                                        <Card.Link as={Link} to={Routes.Signin.path} className="fw-bold">
                                            {` Login here `}
                                        </Card.Link>
                                    </span>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <Toaster />
        </main>
    );
};
