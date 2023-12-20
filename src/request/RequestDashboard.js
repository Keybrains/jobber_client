import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  InputGroup,
  DropdownButton,
  Dropdown,
} from "@themesberg/react-bootstrap";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Routes } from "../routes";
import { useHistory } from "react-router-dom";
import { faCaretDown, faInbox } from "@fortawesome/free-solid-svg-icons";
import "../css/client.css";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function RequestDashboard() {
  const history = useHistory();
  const [userData, setUserData] = useState(null);
  const [requestData, serRequestData] = useState();

  // console.log(requestData, "requestData");
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);
      setUserData(decodedToken);
    }
  }, []);

  const clientId = userData?.id?.client_id;

  const handleClick = () => {
    if (clientId) {
      history.push(`/request/new/${clientId}`);
    } else {
      console.error("Client ID not found");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://jobmanager.cloudpress.host/api/request/request_data/${clientId}`
        );
        console.log(response.data, "response.data");
        serRequestData(response.data);
      } catch (error) {
        console.error("Error fetching client data:", error);
      }
    };

    if (clientId) {
      fetchData();
    }
  }, [clientId]);

  const handleRowClick = (clientId, requestId) => {
    history.push(`/request/${clientId}/${requestId}`);
  };

  return (
    <>
      <Form className="mt-5">
        {requestData && requestData.data && requestData.data.length > 0 ? (
          <div>
            <div className="row justify-content-center mb-4">
              <div className="col-6 d-flex justify-content-center">
                <h2
                  style={{
                    color: "black",
                    marginTop: "10px",
                    fontWeight: "bold",
                    fontSize: "25px",
                  }}
                >
                  Your Requests
                </h2>
              </div>
              <div className="col-3">
                <Button
                  onClick={handleClick}
                  variant="success"
                  style={{ marginTop: "10px" }}
                >
                  New
                </Button>
              </div>
            </div>

            {requestData.data.map((request) => (
              <div className="row" key={request.request_id}>
                <div className="container p-2">
                  <div className="col-12 d-flex justify-content-center p-2">
                    <div
                      onClick={() =>
                        handleRowClick(request?.client_id, request?.request_id)
                      }
                      style={{
                        cursor: "pointer",
                        alignItems: "flex-start",
                        paddingTop: "40px",
                        boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.2)",
                        backgroundColor: "white",
                        padding: "20px 0px 35px 10px",
                        width: "50%",
                        height: "100%",
                      }}
                    >
                      <div className="d-flex">
                        <div
                          className="p-3 bg-dark bg-gradient rounded-circle"
                          style={{
                            width: "55px",
                            height: "55px",
                            marginRight: "15px",
                            marginLeft: "15px",
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faInbox}
                            style={{ color: "white", fontSize: "20px" }}
                          />
                        </div>
                        <div>
                          <p style={{ fontWeight: "bold", fontSize: "20px" }}>
                            Requested On {request.request_date.split(" ")[0]}
                          </p>
                          <p style={{ fontSize: "15px" }}>
                            {request.property && (
                              <p style={{ fontSize: "15px", color: "gray" }}>
                                {`${request.property.city}, ${request.property.state}, ${request.property.country}, ${request.property.street_1}, ${request.property.street_2}, ${request.property.zipcode}`}
                              </p>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="d-flex justify-content-center"
            style={{ paddingTop: "50px" }}
          >
            <div
              style={{
                backgroundColor: "white",
                padding: "15px",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <div
                className="p-3 bg-dark bg-gradient rounded-circle"
                style={{
                  width: "60px",
                  height: "60px",
                  margin: "0 auto",
                }}
              >
                <FontAwesomeIcon
                  icon={faInbox}
                  style={{ color: "white", fontSize: "25px" }}
                />
              </div>
              <Form.Label
                style={{
                  color: "black",
                  marginTop: "10px",
                  fontWeight: "bold",
                  fontSize: "25px",
                }}
              >
                Need some work done?
              </Form.Label>
              <br />
              <Form.Label style={{ marginTop: "10px", fontSize: "20px" }}>
                Send us a request to fill us in on the details
              </Form.Label>
              <br />
              <Button
                onClick={handleClick}
                variant="success"
                style={{ marginTop: "10px" }}
              >
                Create a Request
              </Button>
            </div>
          </div>
        )}
      </Form>
    </>
  );
}
export default RequestDashboard;
