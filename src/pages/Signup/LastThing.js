
import React, { useState } from "react";
import axios from "axios";
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

export default ({ handlechange, data, handleInput, handlechangeBack, handleSubmitSignup }) => {

  const cookies = new Cookies();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    const userData = cookies.get('userDetails');

    if (userData) {
      history.push('/');
    }
  }, [cookies]);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post('https://jobmanager.cloudpress.host/api/user/signup', data);
      if (response.data.success == true) {
        toast.success('SignUp Successful');
        cookies.set('userDetails', data, { path: '/' });
        history.push(Routes.DashboardOverview.path);
      }
    } catch (error) {
      console.log("error in submit data in handle submit:", error);
      toast.error("please try again!")
    } finally {
      setLoading(false);
    }
  }

  const filllines = [1, 2, 3, 4, 5]
  const blanklines = []

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
          <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>

            <Col xs={12} className="d-flex align-items-center justify-content-center">

              <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">

                <div className="text-center text-md-center mb-5 mt-md-0">
                  <h3 className="mb-0">As a Final note...</h3>
                </div>
                <Form onSubmit={handleSubmit} className="mt-5 mb-5">


                  <Form.Group id="text" className="mb-5 ">
                    <Form.Label>How you get our Contact?</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="text" name="lastThing" onChange={handleInput} value={data.lastThing} placeholder="Enter Text" />
                    </InputGroup>
                  </Form.Group>

                  <Button onSubmit={handleSubmit} variant="primary" type="submit" className="w-100 mt-4">
                    {loading ? "Signing in..." : "Get Started"}
                  </Button>
                </Form>
                <div className="d-flex justify-content-center align-items-center mt-4 mb-4">
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
