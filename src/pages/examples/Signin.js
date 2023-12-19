import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faEnvelope,
  faUnlockAlt,
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
import { Link, useHistory } from "react-router-dom";
// import jwt from "jsonwebtoken";
import { Routes } from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

export default () => {
  const [buttonLoader, setButtonLoader] = useState(false);
  const cookies = new Cookies();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  // React.useEffect(() => {
  //   const userData = cookies.get("userDetails");

  //   if (userData) {
  //     history.push(Routes.DashboardOverview.path);
  //   }
  // }, []);

  // form values
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  function decodeToken(token) {
    try {
      const decoded = jwtDecode(token);
      return decoded;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }

  // Function to handle login submission
  async function handleLoginSubmission(token) {
    const decoded = decodeToken(token);

    localStorage.setItem("authToken", token);

    if (decoded) {
      console.log("Decoded Token:", decoded);
      console.log("User ID:", decoded.id.client_id);
      toast.success("Login Successful");

      setTimeout(() => {
        history.push(Routes.RequestDashboard.path);
      }, 2000);
    } else {
      toast.error("Failed to decode token.");
    }
  }

  // Main handleSubmit function
  async function handleSubmit() {
    try {
      setLoading(true);

      const response = await axios.post(
        "https://jobmanager.cloudpress.host/api/client/login",
        formData
      );

      if (response.data.success === true) {
        const { token } = response.data;
        handleLoginSubmission(token);
      } else {
        toast.error("Enter Valid Email...");
      }
    } catch (error) {
      console.log("Error in submit data in handle submit:", error);
      toast.error("Enter Valid Email..!");
    } finally {
      setLoading(false);
    }
  }

  const handleLogin = (event) => {
    setButtonLoader(true);

    event.preventDefault();

    handleSubmit();
  };

  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          {/* <p className="text-center">
            <Card.Link as={Link} to={Routes.DashboardOverview.path} className="text-gray-700">
              <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to homepage
            </Card.Link>
          </p> */}
          <Row
            className="justify-content-center form-bg-image"
            style={{ backgroundImage: `url(${BgImage})`, marginTop: "5%" }}
          >
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Sign in</h3>
                </div>

                <Form className="mt-4">
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Your Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control
                        onChange={handleChange}
                        autoFocus
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        placeholder="example@company.com"
                      />
                    </InputGroup>
                  </Form.Group>

                  <Button
                    onClick={handleLogin}
                    variant="primary"
                    type="submit"
                    className="w-100"
                  >
                    {loading ? "Signing in..." : "Sign In"}
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Toaster />
    </main>
  );
};
