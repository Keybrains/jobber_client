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

function RequestDashboard() {
  const history = useHistory();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);
      setUserData(decodedToken);
    }
  }, []);

  const handleClick = () => {
    const clientId = userData?.id?.client_id; // Safely access nested properties
    if (clientId) {
      history.push(`/request/new/${clientId}`);
    } else {
      // Handle the case where clientId doesn't exist
      console.error("Client ID not found");
    }
  };
  return (
    <>
      <Form>
        <div
          className="d-flex justify-content-center"
          style={{
            alignItems: "flex-start", // Align items at the top
            paddingTop: "50px", // Adjust top padding as needed for space from top
          }}
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
      </Form>
    </>
  );
}
export default RequestDashboard;
