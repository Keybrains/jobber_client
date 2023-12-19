import React, { useState } from 'react'
import NewClientForm from './NewClientForm'
import '../css/client.css'
import { useHistory } from 'react-router-dom';
import { Routes } from '../routes';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import Cookies from 'universal-cookie';

function Client() {

    const cookies = new Cookies()

    const history = useHistory();
    const [data, setData] = useState([{email_info: 'main', contact_info: 'main'}]);

    const [userData, setUserData] = useState([])

    React.useEffect(() => {
        const userData = cookies.get('userDetails');

        setUserData(userData)
        setData((prevData)=>({
            ...prevData, user_id: userData.user_id
        }))

        if (!userData) {
            history.push('/sign-in');
        }
    }, []);

    const handleInput = (e) => {
        const value = e.target.value
        const name = e.target.name

        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleInputClientdetails = (data) => {
        setData((prevData) => ({
            ...prevData,
            client_details: prevData.client_details
                ? [...prevData.client_details, data]
                : [data],
        }));
    };



    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(data)
 
        console.log("function called")
        try {
            const response = await axios.post("https://jobmanager.cloudpress.host/api/client/client", data)
            const status = response.data.statusCode;

            console.log(response.data)

            if (status == 200) {
                toast.success("Client created.. successfully")
                history.push(Routes.ClientDashBoard.path)
            } else if (status == 201) {
                toast.error("Email already Used..")
            } else if (status == 202) {
                toast.error("Phone Number already Used..")
            }
        } catch (error) {
            console.log(error)
            toast.error("please try again later")
        }
    }

    const handleDropdownChange = (name, e) => {
        const selectedOption = e.target.value;

        setData((prevData) => ({
            ...prevData,
            [name]: selectedOption,
        }));
    };

    const handleDelete = (index) => {
        setData((prevData) => ({
            ...prevData,
            client_details: prevData.client_details.filter((_, i) => i !== index),
        }));
    };


    return (
        <div className='p-4 d-flex justify-content-center align-items-center'>

            <div className='container-form mt-4 mb-4'>
                <p className='heading-form text-dark mx-2'>New Client</p>
                <div className='container-form-inputs'>
                    <NewClientForm handleSubmit={handleSubmit} handleInput={handleInput} data={data} handleDropdownChange={handleDropdownChange} handleInputClientdetails={handleInputClientdetails} handleDelete={handleDelete} />
                </div>
            </div>
            <Toaster />

        </div>
    )
}

export default Client