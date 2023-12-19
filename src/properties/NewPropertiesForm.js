import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory, useParams } from "react-router-dom";
import { Routes } from "../routes";
import {
  faAngleDown,
  faAngleUp,
  faBriefcase,
  faTrash,
  faUser,
  faBuilding,
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

function NewPropertiesForm({ handleInput, handleSubmit, data }) {
  const history = useHistory();

  return (
    <div>
      <h3 className="text-dark">
        <FontAwesomeIcon icon={faBuilding} /> &nbsp;Properties Details
      </h3>

      <Form onSubmit={handleSubmit} className="mt-4 p-2">
        <Row style={{ display: "block" }}>
          <Col
            //   md={6}
            //   lg={6}
            //   sm={12}
            className="mb-4"
            style={{ display: "block" }}
          >
            <InputGroup>
              <Form.Control
                autoFocus
                required
                type="text"
                name="street_1"
                value={data?.street_1}
                onChange={handleInput}
                placeholder="Street 1"
              />
            </InputGroup>
          </Col>
        </Row>
        <Row style={{ display: "block" }}>
          <Col
            //   md={6}
            //   lg={6}
            //   sm={12}
            className="mb-4"
            style={{ display: "block" }}
          >
            <InputGroup>
              <Form.Control
                autoFocus
                required
                type="text"
                name="street_2"
                value={data?.street_2}
                onChange={handleInput}
                placeholder="Street 2"
              />
            </InputGroup>
          </Col>
        </Row>

        {/* Phone Number input */}
        <Row>
          <Col md={6} lg={6} sm={12} className="mb-4">
            <InputGroup>
              <Form.Control
                autoFocus
                required
                type="text"
                name="city"
                value={data?.city}
                onChange={handleInput}
                placeholder="City"
              />
            </InputGroup>
          </Col>
          <Col md={6} lg={6} sm={12} className="mb-4">
            <InputGroup>
              <Form.Control
                autoFocus
                required
                type="text"
                name="state"
                value={data?.state}
                onChange={handleInput}
                placeholder="State"
              />
            </InputGroup>
          </Col>
        </Row>
        {/* Email Address input */}
        <Row>
          <Col md={6} lg={6} sm={12} className="mb-4">
            <InputGroup>
              <Form.Control
                autoFocus
                required
                type="text"
                name="zipcode"
                value={data?.zipcode}
                onChange={handleInput}
                placeholder="Zipcode"
              />
            </InputGroup>
          </Col>
          <Col md={6} lg={6} sm={12} className="mb-4">
            <InputGroup>
              <Form.Control
                autoFocus
                required
                type="text"
                name="country"
                value={data?.country}
                onChange={handleInput}
                placeholder="Country"
              />
            </InputGroup>
          </Col>
        </Row>
        <Row className="justify-content-between">
          <Col md={4} lg={6} sm={12} className="mb-4">
            <Button
              variant="primary"
              // type="submit"
              className="w-100 mt-3"
              style={{ maxWidth: 200, marginRight: "10px" }}
              size="sm"
              onClick={() => {
                history.push(Routes.ClientDashBoard.path);
              }}
            >
              Cancel
            </Button>
          </Col>
          <Col
            md={4}
            lg={6}
            sm={12}
            className="mb-4 d-flex justify-content-end"
          >
            <Button
              variant="primary"
              type="submit"
              className="w-100 mt-3"
              style={{ maxWidth: 200, marginRight: "10px" }}
              size="sm"
            >
              Create Properties
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default NewPropertiesForm;
