import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faBriefcase,
  faTrash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Form,
  Card,
  Button,
  InputGroup,
  Collapse,
  Modal,
} from "@themesberg/react-bootstrap";

function NewClientForm({
  handlechange,
  handleInput,
  handleSubmit,
  data,
  handleDropdownChange,
  handleInputClientdetails,
  handleDelete,
}) {
  const [open, setOpen] = useState(false);

  const { client_details } = data;

  const [key, setKey] = useState("");
  const [value, setValue] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmitClient = () => {
    handleClose();
    handleInputClientdetails({ key, value });
  };

  return (
    <div>
      <h3 className="text-dark">
        <FontAwesomeIcon icon={faUser} /> &nbsp;Client Details
      </h3>

      <Form onSubmit={handleSubmit} className="mt-4 p-2">
        <Row>
          <Col md={6} lg={6} sm={12} className="mb-4">
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faUser} />
              </InputGroup.Text>
              <Form.Control
                autoFocus
                required
                type="text"
                name="first_name"
                value={data.first_name}
                onChange={handleInput}
                placeholder="First Name"
              />
            </InputGroup>
          </Col>
          <Col md={6} lg={6} sm={12} className="mb-4">
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faUser} />
              </InputGroup.Text>
              <Form.Control
                autoFocus
                required
                type="text"
                name="last_name"
                value={data.last_name}
                onChange={handleInput}
                placeholder="Last Name"
              />
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12} lg={12} sm={12} className="mb-4">
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faBriefcase} />
              </InputGroup.Text>
              <Form.Control
                autoFocus
                required
                type="text"
                name="company_name"
                value={data.company_name}
                onChange={handleInput}
                placeholder="Company Name"
              />
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Form.Label>Enter Phone Number</Form.Label>

          <Col className="mb-4" md={5} lg={3}>
            {/* Dropdown for Team Size */}
            <Form.Group>
              <Form.Select
                name="contact_info"
                value={data.contact_info}
                onChange={(e) => {
                  handleDropdownChange("contact_info", e);
                }}
                required
              >
                <option value="main">Main</option>
                <option value="work">Work</option>
                <option value="mobile">Mobile</option>
                <option value="home">Home</option>
                <option value="fex">Fex</option>
                <option value="other">Other</option>
                {/* Add more options as needed */}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={7} lg={9} className="mb-4">
            {/* Input for something else, adjust as needed */}
            <Form.Group>
              <Form.Control
                type="text"
                name="phone"
                value={data.phone}
                onChange={handleInput}
                placeholder="Phone Number"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Form.Label>Enter Email Address</Form.Label>

          <Col className="mb-4" md={5} lg={3}>
            {/* Dropdown for Team Size */}
            <Form.Group>
              <Form.Select
                name="email_info"
                value={data.email_info}
                onChange={(e) => {
                  handleDropdownChange("email_info", e);
                }}
                required
              >
                <option value="main">Main</option>
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="other">Other</option>
                {/* Add more options as needed */}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={7} lg={9} className="mb-4">
            {/* Input for something else, adjust as needed */}
            <Form.Group>
              <Form.Control
                type="email"
                name="email"
                value={data.email}
                onChange={handleInput}
                placeholder="Email Address"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-2">
          <Col md={12} lg={12} sm={12}>
            <div
              className="d-flex justify-content-between mb-3"
              aria-controls="example-collapse-text"
              aria-expanded={open}
              style={{ cursor: "pointer" }}
              onClick={() => setOpen(!open)}
            >
              <h5 className="text-dark">Additional Client Details</h5>
              <h4 className="text-dark">
                <FontAwesomeIcon icon={!open ? faAngleDown : faAngleUp} />
              </h4>
            </div>

            <Collapse in={open} className="px-1 mb-0">
              <div id="example-collapse-text">
                {client_details?.length == 0 || client_details == undefined ? (
                  <Row>
                    <Col className="mb-4" md={12} lg={12}>
                      {/* Input for something else, adjust as needed */}
                      <Form.Group>
                        <Form.Control
                          readOnly={true}
                          type="text"
                          value={"No data Found"}
                          placeholder="Phone Number"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                ) : (
                  <div></div>
                )}
                {client_details?.map((item, index) => (
                  <Row key={index}>
                    <Col className="mb-4" md={5} lg={3}>
                      {/* Input for something else, adjust as needed */}
                      <Form.Group>
                        <Form.Control
                          readOnly={true}
                          type="text"
                          value={item.key}
                          placeholder="Phone Number"
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6} lg={8} className="mb-4">
                      {/* Input for something else, adjust as needed */}
                      <Form.Group>
                        <Form.Control
                          readOnly={true}
                          type="text"
                          name="phone"
                          value={item.value}
                          onChange={handleInput}
                          placeholder="Phone Number"
                        />
                      </Form.Group>
                    </Col>

                    <Col md={1} lg={1}>
                      <Button
                        variant="outline-primary"
                        onClick={() => handleDelete(index)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </Col>
                  </Row>
                ))}
              </div>
            </Collapse>
          </Col>
        </Row>
        <Button
          onClick={() => {
            setShow(true);
          }}
          variant="outline-primary"
          className="w-100  mb-4"
          style={{ maxWidth: 150 }}
        >
          <p style={{ fontSize: "0.9rem" }}>Add Custom Field</p>
        </Button>
        <Row style={{ borderTop: "1px solid lightgray" }}>
          <Button
            onSubmit={handleSubmit}
            variant="primary"
            type="submit"
            className="w-100  mt-4"
            style={{ maxWidth: 200 }}
          >
            Create Client
          </Button>
        </Row>
      </Form>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Client Fields</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitClient}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Field Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Field Name"
                autoFocus
                onChange={(e) => {
                  setKey(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Field Value</Form.Label>
              <Form.Control
                type="text"
                placeholder="Value"
                autoFocus
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitClient}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default NewClientForm;
