import React, { useEffect, useState } from "react";
import NewRequestForm from "./NewRequestForm";
import "../css/client.css";
import { useHistory } from "react-router-dom";
import { Routes } from "../routes";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Form,
  InputGroup,
  DropdownButton,
  Dropdown,
} from "@themesberg/react-bootstrap";
import toast from "react-hot-toast";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import RequestDashboard from "./RequestDashboard";

function Request() {
  const history = useHistory();
  const [clientData, setClientData] = useState({});
  const [selectedProperty, setSelectedProperty] = useState(null);

  const [userData, setUserData] = useState({
    id: {
      user_id: "",
      client_id: "",
    },
  });
  console.log(userData, "userData");
  console.log(userData.id.user_id, "userData.id.user_id");
  console.log(userData.id.client_id, "userData.id.client_id");
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);
      setUserData(decodedToken);
    }
  }, []);
  const [data, setData] = useState({});
  useEffect(() => {
    setData({
      user_id: userData.id.user_id || "",
      client_id: userData.id.client_id || "",
      address: "",
      service_detail: "",
      property_id: "",
      availability_assessment_work_1: "",
      availability_assessment_work_2: "",
      preferred_arrival_times: [],
    });
  }, [userData]);

  const handleInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleSubmit = () => {
  //   console.log("handle submit clicked");
  //   history.push(Routes.ClientDashBoard.path);
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(data);

    console.log("function called");
    try {
      const response = await axios.post(
        "https://jobmanager.cloudpress.host/api/request/request",
        data
      );
      const status = response.data.statusCode;

      console.log(response.data);

      if (status == 200) {
        toast.success("Request created.. successfully");
        history.push(Routes.RequestDashboard.path);
      } else if (status == 201) {
        toast.error("Data Already Exist..");
      }
    } catch (error) {
      console.log(error);
      toast.error("please try again later");
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked, value } = e.target;
    let updatedArrivalTimes = [...data.preferred_arrival_times];

    if (checked) {
      updatedArrivalTimes.push(value);
    } else {
      updatedArrivalTimes = updatedArrivalTimes.filter(
        (time) => time !== value
      );
    }

    handleInput({
      target: { name: "preferred_arrival_times", value: updatedArrivalTimes },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://jobmanager.cloudpress.host/api/request/request_property/${userData.id?.client_id}`
        );
        setClientData(response.data);
      } catch (error) {
        console.error("Error fetching client data:", error);
      }
    };

    if (userData.id?.client_id) {
      fetchData();
    }
  }, [userData.id?.client_id]);

  const handlePropertySelection = (property) => {
    setSelectedProperty(property);

    const selectedIndex = clientData.data.findIndex(
      (item) => item._id === property._id
    );

    if (selectedIndex !== -1) {
      const selectedPropertyId = clientData.data[selectedIndex].property_id;

      setData((prevData) => ({
        ...prevData,
        property_id: selectedPropertyId,
      }));
    }
  };

  return (
    <div className="p-4 d-flex justify-content-center align-items-center">
      <div className="container-form mt-4">
        <p className="heading-form text-dark mx-2">New request</p>
        <div className="container-form-inputs">
          <NewRequestForm
            handleSubmit={handleSubmit}
            handleInput={handleInput}
            data={data}
            handleCheckboxChange={handleCheckboxChange}
            handlePropertySelection={handlePropertySelection}
            clientData={clientData}
            selectedProperty={selectedProperty}
          />
        </div>
      </div>
    </div>
  );
}

export default Request;
