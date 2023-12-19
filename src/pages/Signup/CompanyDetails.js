
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faBriefcase, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { Routes } from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom';

export default ({ handlechange, handleInput, data, handleDropdownChange, handlechangeBack }) => {

  const cookies = new Cookies();
  const history = useHistory();

  const [team, setTeam] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(revenueData)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jobmanager.cloudpress.host/api/teamsize/teamsize');
        setTeam(response.data.data);
        const response1 = await axios.get('https://jobmanager.cloudpress.host/api/revenue/revenue/get');
        setRevenueData(response1.data.data)
      } catch (error) {
        console.log("error in fetchdata in company details:", error)
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  React.useEffect(() => {
    const userData = cookies.get('userDetails');

    if (userData) {
      history.push('/')
    }
  }, [cookies]);

  const filllines = [1, 2, 3]
  const blanklines = [4, 5]

  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <div className="lines-container d-flex justify-content-center align-items-center gap-2 mb-5">
            <div className="p-2" style={{ cursor: 'pointer', marginLeft: -40, marginRight: 20 }} onClick={handlechangeBack}>
              <FontAwesomeIcon size="lg" icon={faAngleLeft} />
            </div>
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
                  <h3 className="mb-0">Fill Company Details</h3>
                </div>
                <Form onSubmit={handlechange} className="mt-4">
                  <Form.Group id="company-name" className="mb-4">
                    <Form.Label>Your Company Name</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faBriefcase} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="company-name" name="companyName" value={data.companyName} onChange={handleInput} placeholder="Company Name" />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="dropdown" className="mb-4">
                    <Form.Label>Your Company's Team Size</Form.Label>
                    <Form.Select
                      name="selectedOption"
                      value={data.teamSize}
                      onChange={(e) => { handleDropdownChange("teamSize", e) }}
                      required
                    >
                      <option value="">Choose Team Size</option>
                      {
                        team.map((item) => (
                          <option value={item.teamSize}>{item.teamSize}</option>
                        ))
                      }
                      {/* Add more options as needed */}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group id="dropdown-revenue" className="mb-4">
                    <Form.Label>Your Company's Estimated Revenue</Form.Label>
                    <Form.Select
                      name="selectedOption"
                      value={data.companyRevenue}
                      onChange={(e) => { handleDropdownChange("companyRevenue", e) }}
                      required
                    >
                      <option value="">Choose Here</option>
                      {
                        revenueData.map((item) => (
                          <option value={item.revenue}>{item.revenue}</option>
                        ))
                      }
                      {/* Add more options as needed */}
                    </Form.Select>
                  </Form.Group>
                  <Button onSubmit={handlechange} variant="primary" type="submit" className="w-100  mt-3">
                    Next
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
    </main>
  );
};
