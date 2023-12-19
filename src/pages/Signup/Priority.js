
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faCheck, faCheckSquare, faCircle, faCircleNotch, faEnvelope, faSquare, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { faCriticalRole, faFacebookF, faGithub, faJsSquare, faSquarespace, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup, ToastBody, Spinner } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { Routes } from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import axios from "axios";

export default ({ handlechange, handleRadioChange, data, handlechangeBack }) => {

  const cookies = new Cookies();
  const history = useHistory();

  const [priorities, setPriorities] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(priorities)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jobmanager.cloudpress.host/api/prioriyty/prioriyty/get');
        setPriorities(response.data.data);
      } catch (error) {
        console.log("error in fetchdata in priority:", error)
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

  function handleSubmit() {
    if (data.priority == undefined) {
      toast.error("Please select one priority...")
      return;
    }
    handlechange();
  }

  const filllines = [1, 2, 3, 4]
  const blanklines = [5]

  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <div className="lines-container d-flex justify-content-center align-items-center gap-2 mb-5">
            <div className="p-2" style={{ cursor: 'pointer', marginLeft: -40, marginRight: 20 }} onClick={handlechangeBack}>
              <FontAwesomeIcon size="lg" icon={faAngleLeft} />
            </div>
            {filllines.map(() =>
              <div className=" py-2 bg-dark border rounded" style={{width:'4rem'}}></div>
            )}
            {blanklines.map(() =>
              <div className=" py-2 bg-light border rounded" style={{width:'4rem'}}></div>
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
                  <h3 className="mb-0">User Priority</h3>
                </div>
                <Form onSubmit={handleSubmit} className="mt-5">

                <Form.Group id="radioGroup" className="mb-4">
  <div className="flex-column d-flex gap-2">
    {loading ? (
      <div className="d-flex align-items-center justify-content-center mb-4 w-100">
        <Spinner animation="border" role="status" />
      </div>
    ) : (
      priorities.map((item) => (
        <Button
          variant={data.priority === item.priority ? 'primary' : 'outline-primary'}
          onClick={() => handleRadioChange({ target: { value: item.priority } })}
          className="w-100 mb-2 text-left"
        >
          <FontAwesomeIcon icon={data.priority === item.priority ? faCheck : faSquare} /> &nbsp; {item.priority}
        </Button>
      ))
    )}
  </div>
</Form.Group>


                  <Button onSubmit={handleSubmit} variant="primary" type="submit" className="w-100">
                    Next
                  </Button>
                </Form>
                <div className="d-flex justify-content-center align-items-center mt-5">
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
