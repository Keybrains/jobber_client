import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
// import "../properties/Properties.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCashRegister,
  faChartLine,
  faCloudUploadAlt,
  faPlus,
  faRocket,
  faTasks,
  faUserShield,
  faEnvelope,
  faArrowLeft,
  faAddressBook,
  faPen,
  faEllipsisH,
  faBuilding,
  faLocationArrow,
  faChevronDown,
  faFileInvoice,
  faDownload,
  faBriefcase,
  faEquals,
  faCalendar,
  faTag,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";

import {
  Col,
  Row,
  Button,
  Dropdown,
  ButtonGroup,
} from "@themesberg/react-bootstrap";
import { Table } from "rsuite";
import { Routes } from "../routes";

const Properties = ({ userClients }) => {
  const { clientId } = useParams();
  console.log(userClients, "userClientssss");
  const [selectedColumn, setSelectedColumn] = useState(null);

  const handleColumnClick = (columnId) => {
    setSelectedColumn(columnId);
  };

  const columns = ["Active Work", "Requests", "Quotes", "Jobs", "Invoices"];

  const content = selectedColumn
    ? `Content for Column ${selectedColumn}`
    : "Please select a column";

  const getBorderStyle = (column) => {
    return {
      borderBottom: selectedColumn === column ? "2px solid green" : "none",
    };
  };

  const history = useHistory();
  const [properties, setProperties] = useState([]);
  const [clientData, setClientData] = useState([]);
  console.log(properties)
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setLoading(true); // Set loading to true before fetching data
    try {
      const response = await axios.get(
        `https://jobmanager.cloudpress.host/api/properties/properties_data/${clientId}`
      );
      setProperties(response.data.data); // Set properties with the array from response.data.data

      const response2 = await axios.get(
        `https://jobmanager.cloudpress.host/api/client/client_record/${clientId}`
      );
      console.log(response2.data.data, "-------------")
      setClientData(response2.data.data[0]); // Set properties with the array from response.data.data
    } catch (error) {
      console.log("error in fetchdata in company details:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching data (whether success or error)
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRowClick = () => {
    // Redirect to the Properties page with the specific clientId
    history.push(`/properties/newproperties/form/${clientId}`);
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <Dropdown className="btn-toolbar">
          <Dropdown.Toggle
            as={Button}
            variant="primary"
            size="sm"
            className="me-2"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
            Back To
          </Dropdown.Toggle>
          <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-2">
            <Dropdown.Item
              onClick={() => {
                history.push(Routes.ClientDashBoard.path);
              }}
              className="fw-bold"
            >
              <FontAwesomeIcon icon={faAddressBook} className="me-2" /> Client
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <ButtonGroup>
          <Button variant="outline-primary" size="sm">
            {" "}
            <FontAwesomeIcon
              icon={faEnvelope}
              style={{ marginRight: "3px" }}
            />{" "}
            Email
          </Button>
          <Button variant="outline-primary" size="sm">
            {" "}
            <FontAwesomeIcon icon={faPen} style={{ marginRight: "3px" }} />
            Edit
          </Button>
          <Button variant="outline-primary" size="sm">
            {" "}
            <FontAwesomeIcon
              icon={faEllipsisH}
              style={{ marginRight: "3px" }}
            />
            More Action
          </Button>
        </ButtonGroup>
      </div>
      <div className="container-fluid">
        <div class="row">
          <div className="col-md-8 order-md-1 order-2">
            <div className="d-flex align-items-center">
              <div
                className="p-3 bg-dark rounded-circle d-flex justify-content-center align-items-center"
                style={{
                  width: "60px", // Adjust width and height for responsiveness
                  height: "60px",
                }}
              >
                <FontAwesomeIcon icon={faBuilding} style={{ color: "white" }} />
              </div>
              <div
                style={{
                  paddingLeft: "20px",
                  fontSize: "35px",
                  fontWeight: "bold",
                }}
                className="text-dark"
              >
                temp company
              </div>
            </div>
            <div>
              <table
                className="table table-hover"
                style={{ marginTop: "50px" }}
              >
                <thead>
                  <tr className="table-active">
                    <th
                      scope="col"
                      className="text-left"
                      style={{ fontSize: "20px", fontWeight: "bold" }}
                    >
                      Properties
                    </th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th scope="col" className="text-right">
                      <Button
                        className="float-right"
                        variant="primary"
                        size="sm"
                        onClick={(rowData) => handleRowClick(rowData)}
                      >
                        + Add Properties
                      </Button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {properties?.map((property, index) => (
                    <tr key={index}>
                      <td>{property.street_1}</td>
                      <td>{property.street_2}</td>
                      <td>{property.city}</td>
                      <td>{property.state}</td>
                      <td>{property.zipcode}</td>
                      {/* Render other properties as needed */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <table class="table table-hover" style={{ marginTop: "50px" }}>
                <thead>
                  <tr class="table-active">
                    <th
                      scope="col"
                      className="text-left"
                      style={{ fontSize: "20px", fontWeight: "bold" }}
                    >
                      Overview
                    </th>{" "}
                    {/* Align text to the left */}
                    <th></th>
                    <th></th>
                    <th></th>
                    <th scope="col" className="text-right">
                      <Dropdown>
                        <Dropdown.Toggle
                          as={Button}
                          variant="primary"
                          size="sm"
                          className="me-2"
                        >
                          <FontAwesomeIcon
                            icon={faChevronDown}
                            className="me-2"
                          />
                          New
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-2">
                          <Dropdown.Item className="fw-bold">
                            <FontAwesomeIcon
                              icon={faDownload}
                              className="me-2"
                              style={{ color: "#556acb" }}
                            />
                            Request
                          </Dropdown.Item>
                          <Dropdown.Item className="fw-bold">
                            <FontAwesomeIcon
                              icon={faEquals}
                              className="me-2"
                              style={{ color: "#b36096" }}
                            />{" "}
                            Quate
                          </Dropdown.Item>
                          <Dropdown.Item className="fw-bold">
                            <FontAwesomeIcon
                              icon={faBriefcase}
                              className="me-2"
                              style={{ color: "#bbc520" }}
                            />{" "}
                            Job
                          </Dropdown.Item>
                          <Dropdown.Item className="fw-bold">
                            <FontAwesomeIcon
                              icon={faFileInvoice}
                              className="me-2"
                              style={{ color: "#7db00e" }}
                            />{" "}
                            Invoice
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {columns.map((column, index) => (
                      <td
                        key={index}
                        onClick={() => handleColumnClick(column)}
                        style={getBorderStyle(column)}
                      >
                        {column}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td colSpan={columns.length}>{content}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <table class="table table-hover" style={{ marginTop: "50px" }}>
                <thead>
                  <tr class="table-active">
                    <th
                      scope="col"
                      className="text-left"
                      style={{ fontSize: "20px", fontWeight: "bold" }}
                    >
                      Schedule
                    </th>{" "}
                    {/* Align text to the left */}
                    <th></th>
                    <th></th>
                    <th></th>
                    <th scope="col" className="text-right">
                      <Dropdown>
                        <Dropdown.Toggle
                          as={Button}
                          variant="primary"
                          size="sm"
                          className="me-2"
                        >
                          <FontAwesomeIcon
                            icon={faChevronDown}
                            className="me-2"
                          />
                          New
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-2">
                          <Dropdown.Item className="fw-bold">
                            <FontAwesomeIcon
                              icon={faDownload}
                              className="me-2"
                              style={{ color: "#556acb" }}
                            />
                            Request
                          </Dropdown.Item>
                          <Dropdown.Item className="fw-bold">
                            <FontAwesomeIcon
                              icon={faTasks}
                              className="me-2"
                              style={{ color: "#b6a96" }}
                            />{" "}
                            Task
                          </Dropdown.Item>
                          <Dropdown.Item className="fw-bold">
                            <FontAwesomeIcon
                              icon={faCalendar}
                              className="me-2"
                              style={{ color: "#ddc30f" }}
                            />{" "}
                            Calender Event
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="d-flex align-items-center">
                        <div
                          className="p-3 rounded-circle d-flex justify-content-center align-items-center"
                          style={{
                            backgroundColor: "#eef0f2",
                            // border: "1px solid #3ead92",
                            width: "60px", // Adjust width and height for responsiveness
                            height: "60px",
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faCalendar}
                            style={{ color: "black" }}
                          />
                        </div>
                        <div
                          style={{
                            paddingLeft: "20px",
                          }}
                        >
                          <span
                            style={{ fontWeight: "bold", fontSize: "20px" }}
                          >
                            {" "}
                            No scheduled items{" "}
                          </span>{" "}
                          <br />
                          <span>Nothing is scheduled for this client yet</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-md-4 order-md-2 order-1">
            <div
              style={{
                // paddingLeft: "20px",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              Contact info
            </div>
            <div>
              <table className="table" style={{ marginTop: "20px" }}>
                <tbody>
                  <tr style={{ borderTop: "2px solid #d9dfe1" }}>
                    <th>Name</th>
                    <td>{clientData?.first_name + " "+ clientData?.last_name}</td>
                  </tr>
                  <tr style={{ borderTop: "2px solid #d9dfe1" }}>
                    <th>{clientData?.contact_info}</th>
                    <td>{clientData?.phone}</td>
                  </tr>
                  <tr style={{ borderTop: "2px solid #d9dfe1" }}>
                    <th>{clientData?.email_info}</th>
                    <td>temp@gmail.com</td>
                  </tr>
                  <tr style={{ borderTop: "2px solid #d9dfe1" }}>
                    <th>Referred By</th>
                    <td>any field</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <table class="table table-hover" style={{ marginTop: "20px" }}>
                <thead>
                  <tr class="table-active">
                    <th
                      scope="col"
                      className="text-left"
                      style={{ fontSize: "15px", fontWeight: "bold" }}
                    >
                      Tags
                    </th>{" "}
                    {/* Align text to the left */}
                    <th></th>
                    <th></th>
                    <th></th>
                    <th scope="col" className="text-right">
                      {" "}
                      {/* Align button to the right */}
                      <Button
                        className="float-right"
                        variant="primary"
                        size="sm"
                      >
                        + Add Tag
                      </Button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>This client has no tags</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <table class="table table-hover" style={{ marginTop: "20px" }}>
                <thead>
                  <tr class="table-active">
                    <th
                      scope="col"
                      className="text-left"
                      style={{ fontSize: "15px", fontWeight: "bold" }}
                    >
                      Last client communication
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>You haven't sent any client communications yet</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <table class="table table-hover" style={{ marginTop: "50px" }}>
                <thead>
                  <tr class="table-active">
                    <th
                      scope="col"
                      className="text-left"
                      style={{ fontSize: "15px", fontWeight: "bold" }}
                    >
                      Billing history
                    </th>{" "}
                    <th scope="col" className="text-right">
                      {" "}
                      {/* Align button to the right */}
                      <Button
                        className="float-right"
                        variant="primary"
                        size="sm"
                      >
                        New
                      </Button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="d-flex align-items-center">
                        <div
                          className="p-3 rounded-circle d-flex justify-content-center align-items-center"
                          style={{
                            backgroundColor: "#eef0f2",
                            // border: "1px solid #3ead92",
                            width: "60px", // Adjust width and height for responsiveness
                            height: "60px",
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faCreditCard}
                            style={{ color: "black" }}
                          />
                        </div>
                        <div
                          style={{
                            paddingLeft: "10px",
                          }}
                        >
                          <span
                            style={{ fontWeight: "bold", fontSize: "15px" }}
                          >
                            {" "}
                            No billing history{" "}
                          </span>{" "}
                          <br />
                          <span>This client hasn't been billed yet</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr class="table-active">
                    <th
                      scope="col"
                      className="text-left"
                      style={{ fontSize: "15px", fontWeight: "bold" }}
                    >
                      Current balance
                    </th>
                    <th
                      scope="col"
                      className="text-left"
                      style={{ fontSize: "15px", fontWeight: "bold" }}
                    >
                      €0.00
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Properties;
