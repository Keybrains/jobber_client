import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faBriefcase,
  faTrash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory, useParams } from "react-router-dom";

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
import { Routes } from "../routes";

function NewRequestForm({
  handleInput,
  handleSubmit,
  data,
  handleCheckboxChange,
  handlePropertySelection,
  clientData,
  selectedProperty,
}) {
  const history = useHistory();
  console.log(clientData, "clienttttttttttttData");
  return (
    <div>
      <Form onSubmit={handleSubmit} className="mt-4 p-2">
        <Row>
          <Col className="mb-4">
            <Form.Label style={{ fontSize: "30px" }}>Address</Form.Label>

            {clientData && clientData.data && clientData.data.length > 0 ? (
              clientData.data.map((property) => (
                <div key={property._id}>
                  <InputGroup>
                    <Form.Check
                      type="checkbox"
                      label={`${property.street_1}, ${property.street_2}, ${property.city}, ${property.state}, ${property.country}, ${property.zipcode}`}
                      checked={selectedProperty === property}
                      onChange={() => handlePropertySelection(property)}
                    />
                  </InputGroup>
                </div>
              ))
            ) : (
              <div>No address found</div>
            )}
          </Col>
        </Row>
        <Row className="mb-1">
          <Form.Label style={{ fontSize: "20px" }}>Service Details</Form.Label>
        </Row>
        <Row>
          <Form.Label>Please provide as much information as you can</Form.Label>
        </Row>
        <Row className="mb-2">
          <InputGroup>
            <Form.Control
              autoFocus
              required
              type="text"
              name="service_detail"
              value={data?.service_detail}
              onChange={handleInput}
              placeholder="Service Detail"
            />
          </InputGroup>
        </Row>
        <Row className="mb-1">
          <Form.Label style={{ fontSize: "20px" }}>
            Your Availability
          </Form.Label>
        </Row>
        <Row>
          {" "}
          <Form.Label>
            Which day would be best for an assessment of the work?
          </Form.Label>
        </Row>
        <Row className="mb-2">
          <InputGroup>
            <Form.Control
              autoFocus
              required
              placeholder=""
              type="date"
              name="availability_assessment_work_1"
              onChange={handleInput}
            />
          </InputGroup>
        </Row>
        <Row>
          {" "}
          <Form.Label>
            What is another day that works for you? (optional)
          </Form.Label>
        </Row>
        <Row className="mb-2">
          <InputGroup>
            <Form.Control
              autoFocus
              required
              type="date"
              name="availability_assessment_work_2"
              onChange={handleInput}
            />
          </InputGroup>
        </Row>
        <Row>
          <Form.Label>
            What are your preffered arrival times? (optional)
          </Form.Label>
        </Row>
        <Row className="mb-2">
          <InputGroup>
            <Form.Check
              type="checkbox" // Use type="checkbox" for a checkbox input
              label="Any time"
              name="preferred_arrival_times"
              value="any time"
              onChange={handleCheckboxChange}
            />
          </InputGroup>
          <InputGroup>
            <Form.Check
              type="checkbox" // Use type="checkbox" for a checkbox input
              label="Morning"
              name="preferred_arrival_times"
              value="morning"
              onChange={handleCheckboxChange}
            />
          </InputGroup>
          <InputGroup>
            <Form.Check
              type="checkbox"
              label="Afternoon"
              name="preferred_arrival_times"
              value="afternoon"
              onChange={handleCheckboxChange}
            />
          </InputGroup>
          <InputGroup>
            <Form.Check
              type="checkbox"
              label="Evening"
              name="preferred_arrival_times"
              value="evening"
              onChange={handleCheckboxChange}
            />
          </InputGroup>
        </Row>
        <div>
          <Row>
            <Col xs={12} className="mb-2">
              <hr />
            </Col>
          </Row>
        </div>

        <div
          className="buttond d-flex"
          style={{ justifyContent: "space-between" }}
        >
          <Button
            variant="primary"
            // type="submit"
            className="w-100 mt-4 bg-dark bg-gradient"
            style={{ maxWidth: 200 }}
            size="sm"
            onClick={() => {
              history.push(Routes.RequestDashboard.path);
            }}
          >
            Cancel
          </Button>
          <Button
            onSubmit={handleSubmit}
            variant="primary"
            type="submit"
            className="w-100 mt-4 bg-dark bg-gradient"
            style={{ maxWidth: 200 }}
            size="sm"
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default NewRequestForm;
