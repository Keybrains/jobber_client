import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
import { useHistory } from "react-router-dom";
import { Routes } from "../routes";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const RequestDetail = () => {
  const history = useHistory();

  const [requestData, setRequestData] = useState(null);
  const { requestId } = useParams();
  console.log("requestId", requestId);
  useEffect(() => {
    const fetchRequestData = async () => {
      try {
        const response = await fetch(
          `https://jobmanager.cloudpress.host/api/request/request_get/${requestId}`
        );

        if (response.ok) {
          const data = await response.json();
          if (data && data.data && data.data.length > 0) {
            setRequestData(data.data[0]);
            console.log(data.data[0].propertyData.city, "data.data[0]");
          } else {
            throw new Error("No data found");
          }
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchRequestData();
  }, []);
  return (
    <div className="p-4 d-flex justify-content-center align-items-center">
      {requestData && (
        <>
          <div
            className="container-form mt-4"
            style={{
              boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.3)",
              borderRadius: "8px",
              padding: "20px",
              maxWidth: "600px", // Limiting width for better readability
              margin: "auto", // Centering the form
            }}
          >
            <h2 className="text-center mb-4">Request</h2>
            <hr />

            <div className="mb-4">
              <h5 className="mb-4">
                Requested On: {requestData.request_date.split(" ")[0]}
              </h5>
              <h4 className="mb-2">Address</h4>
              {requestData && requestData.propertyData && (
                <p style={{color:"gray"}}>
                  {`${requestData.propertyData.city}, ${requestData.propertyData.state}, ${requestData.propertyData.country}, ${requestData.propertyData.street_1}, ${requestData.propertyData.street_2}, ${requestData.propertyData.zipcode}`}
                </p>
              )}
            </div>
            <hr />

            <div className="mb-4">
              <h4 className="mb-2">Service Details</h4>
              <h6 className="mb-2">
                Please provide as much information as you can
              </h6>
              <p style={{color:"gray"}}>{requestData.service_detail}</p>
            </div>
            <hr />

            <div className="mb-4">
              <h4 className="mb-2">Your Availability</h4>
              <h6 className="mb-2">
                Which day would be best for an assessment of the work?
              </h6>
              <p className="mb-2" style={{color:"gray"}}>
                {requestData.availability_assessment_work_1}
              </p>
              <h6 className="mb-2">What is another day that works for you?</h6>
              <p className="mb-2" style={{color:"gray"}}>
                {requestData.availability_assessment_work_2}
              </p>
              <h6 className="mb-2">What are your preferred arrival times?</h6>
              {requestData.preferred_arrival_times.map((time, index) => (
                <p key={index} style={{color:"gray"}}>
                  <FontAwesomeIcon
                    icon={faCheck}
                    style={{ marginRight: "8px" }}
                  />
                  {time}
                </p>
              ))}
            </div>
            <div className="buttond d-flex" style={{ justifyContent: "end" }}>
              <Button
                // variant="primary"
                // type="submit"
                className="w-70 mt-4"
                style={{ maxWidth: 200 }}
                size="sm"
                variant="success"
                onClick={() => {
                  history.push(Routes.RequestDashboard.path);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RequestDetail;
