import { Button } from '@themesberg/react-bootstrap'
import React, { useState, useEffect } from 'react'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Routes } from '../routes';
import { useHistory } from 'react-router-dom';
import ClientTable from './ClientTable';
import Cookies from 'universal-cookie';
import axios from 'axios';

function ClientDashboard() {
    const history = useHistory();
    const cookies = new Cookies();
    const [userClients, setUserClients] = useState();
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {
            const userData = cookies.get('userDetails');
            const response = await axios.get(`https://jobmanager.cloudpress.host/api/client/client/${userData.user_id}`);
            setUserClients(response.data.data);
        } catch (error) {
            console.log("error in fetchdata in company details:", error)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const deleteRow = async (id) => {
        try {
            setLoading(true)
            const response = await axios.delete(`https://jobmanager.cloudpress.host/api/client/client/delete/${id}`);
            console.log(response.data)
            fetchData()
            setLoading(false)
        } catch (error) {
            console.log("error in fetchdata in company details:", error)
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className='p-4'>
            <div className='d-flex w-100 mb-4 justify-content-between'>
                <p className='heading-form text-dark'>Clients</p>
                <Button onClick={() => {
                    history.push(Routes.Client.path)
                }} variant="success" size="sm" style={{ maxHeight: 40 }} className="me-2">
                    <FontAwesomeIcon icon={faPlus} className="me-2" />New Client
                </Button>
            </div>

            <div className='m-2 pt-4  border rounded'>
                <ClientTable userClients={userClients} deleteRow={deleteRow} />
            </div>
        </div>
    )
}

export default ClientDashboard