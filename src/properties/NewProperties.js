import React, { useState, useEffect } from "react";
import NewPropertiesForm from "./NewPropertiesForm";
import { useHistory, useParams } from "react-router-dom";
import { Routes } from "../routes";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Cookies from "universal-cookie";

function NewProperties() {
  const cookies = new Cookies();
  const {clientId} = useParams()
  console.log(clientId)
  const history = useHistory();
  const [data, setData] = useState({});
  const [userDetails, setUserDetails] = useState({});
  useEffect(() => {
    const userData = cookies.get("userDetails");
    console.log(userData,"userData")
    if (!userData) {
      history.push("/sign-in");
    } else {
      setUserDetails(userData);
      setData((prevData) => ({
        ...prevData,
        user_id: userData.user_id,
        client_id: localStorage.getItem("selectedClientId")
      }));
    }
  }, []);
  

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
  
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://jobmanager.cloudpress.host/api/properties/properties",
        data
      );
      const status = response.data.statusCode;

      if (status === 200) {
        toast.success("Property created successfully");
        history.push(`/properties/${clientId}`);
        localStorage.removeItem("selectedClientId");
      } else if (status === 409) {
        toast.error("Property already assigned");
      }
    } catch (error) {
      console.error(error);
      toast.error("Please try again later");
    }
  };

  return (
    <div className="p-4 d-flex justify-content-center align-items-center">
      <div className="container-form mt-4 mb-4">
        <p className="heading-form text-dark mx-2">New Properties</p>
        <div className="container-form-inputs">
          <NewPropertiesForm
            handleSubmit={handleSubmit}
            handleInput={handleInput}
            data={data}
          />
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default NewProperties;
