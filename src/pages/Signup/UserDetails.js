import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faEnvelope,
  faPhone,
  faPhoneAlt,
  faUnlockAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faGithub,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  Col,
  Row,
  Form,
  Card,
  Button,
  FormCheck,
  Container,
  InputGroup,
} from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";

import { Routes } from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";

export default ({
  handlechange,
  handleInput,
  data,
  handleDropdownChange,
  handlechangeBack,
}) => {
  const cookies = new Cookies();
  const history = useHistory();

  React.useEffect(() => {
    const userData = cookies.get("userDetails");

    if (userData) {
      history.push("/");
    }
  }, [cookies]);

  const [industry, setIndustry] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jobmanager.cloudpress.host/api/industry/industry/get"
        );
        setIndustry(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.log("error in fetchdata in company details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filllines = [1, 2];
  const blanklines = [3, 4, 5];

  console.log(process.env.API, "sdfsdfkadfjdfj");

  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <div className="lines-container d-flex justify-content-center align-items-center gap-2 mb-5">
            <div
              className="p-2"
              style={{ cursor: "pointer", marginLeft: -40, marginRight: 20 }}
              onClick={handlechangeBack}
            >
              <FontAwesomeIcon size="lg" icon={faAngleLeft} />
            </div>
            {filllines.map((index) => (
              <div
                key={index}
                className="py-2 bg-dark border rounded"
                style={{ width: "4rem" }}
              ></div>
            ))}
            {blanklines.map((index) => (
              <div
                key={index}
                className="py-2 bg-light border rounded"
                style={{ width: "4rem" }}
              ></div>
            ))}
          </div>
          {/* <p className="text-center">
            <Card.Link as={Link} to={Routes.DashboardOverview.path} className="text-gray-700">
              <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to homepage
            </Card.Link>
          </p> */}
          <Row
            className="justify-content-center form-bg-image"
            style={{ backgroundImage: `url(${BgImage})` }}
          >
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Fill Your Details</h3>
                </div>
                <Form className="mt-4" onSubmit={handlechange}>
                  <Form.Group id="username" className="mb-4">
                    <Form.Label>Your username</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUser} />
                      </InputGroup.Text>
                      <Form.Control
                        autoFocus
                        required
                        type="username"
                        name="username"
                        value={data.username}
                        onChange={handleInput}
                        placeholder="Username"
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="phone" className="mb-4">
                    <Form.Label>Your Phone Number</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faPhoneAlt} />
                      </InputGroup.Text>
                      <Form.Control
                        required
                        type="phone"
                        name="phone"
                        value={data.phone}
                        onChange={handleInput}
                        placeholder="Phone Number"
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="dropdown" className="mb-4">
                    <Form.Label>Select an Industry</Form.Label>
                    <Form.Select
                      name="selectedOption"
                      onChange={(e) => {
                        if (e && e.target) {
                          handleDropdownChange("industry", e);
                        }
                      }}
                      required
                    >
                      <option value="">Choose an Industry</option>
                      {Object.entries(industry).map(
                        ([category, industries], index, array) => (
                          <React.Fragment key={category}>
                            <optgroup className="py-2" label={category}>
                              {industries.map(
                                (industry, innerIndex, innerArray) => (
                                  <option
                                    key={industry._id}
                                    value={industry.industry}
                                  >
                                    {industry.industry}
                                  </option>
                                )
                              )}
                            </optgroup>
                          </React.Fragment>
                        )
                      )}
                    </Form.Select>
                  </Form.Group>

                  <Button
                    variant="primary"
                    onSubmit={handlechange}
                    type="submit"
                    className="w-100 mt-3"
                  >
                    Next
                  </Button>
                </Form>
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    Already have an account?
                    <Card.Link
                      as={Link}
                      to={Routes.Signin.path}
                      className="fw-bold"
                    >
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
