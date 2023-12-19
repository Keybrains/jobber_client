import React, { useEffect, useState } from 'react'

// pages
import UserCredentials from '../Signup/UserCredentials'
import UserDetails from '../Signup/UserDetails'
import CompanyDetails from '../Signup/CompanyDetails'
import Priority from '../Signup/Priority'
import LastThing from '../Signup/LastThing'

import Cookies from "universal-cookie";

function Signup() {

  const [step, setStep] = useState(1)

  // useEffect(() => {
  //   const pageNumber = cookies.get('signupPage')
  //   if (pageNumber) {
  //     setStep(pageNumber)
  //   }
  // }, [])

  const cookies = new Cookies();

  const handlechange = () => {
    cookies.set('signupPage', step + 1, { path: '/' });
    console.log("change to step", step + 1);
    setStep(step + 1);
  }

  const handlechangeBack = () => {
    cookies.set('signupPage', step - 1, { path: '/' });
    console.log("change to step", step - 1)
    setStep(step - 1)
  }

  const [data, setData] = useState([]);

  const handleInput = (e) => {
    const value = e.target.value
    const name = e.target.name

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleDropdownChange = (name, e) => {
    const selectedOption = e.target.value;

    setData((prevData) => ({
      ...prevData,
      [name]: selectedOption,
    }));
  };

  const handleRadioChange = (e) => {
    const priority = e.target.value;

    setData((prevData) => ({
      ...prevData,
      priority,
    }));
  };

  const handleSubmitSignup = () => {
    cookies.remove('signupPage')
  };

  switch (step) {
    case 1:
      return (
        <UserCredentials handlechange={handlechange} handleInput={handleInput} data={data} handleDropdownChange={handleDropdownChange} handlechangeBack={handlechangeBack} handleSubmitSignup={handleSubmitSignup} />
      )
    case 2:
      return (
        <UserDetails handlechange={handlechange} handleInput={handleInput} data={data} handleDropdownChange={handleDropdownChange} handlechangeBack={handlechangeBack} handleSubmitSignup={handleSubmitSignup} />
      )
    case 3:
      return (
        <CompanyDetails handlechange={handlechange} handleInput={handleInput} data={data} handleDropdownChange={handleDropdownChange} handlechangeBack={handlechangeBack} handleSubmitSignup={handleSubmitSignup} />
      )
    case 4:
      return (
        <Priority handlechange={handlechange} handleInput={handleInput} data={data} handleDropdownChange={handleDropdownChange} handlechangeBack={handlechangeBack} handleSubmitSignup={handleSubmitSignup} handleRadioChange={handleRadioChange} />
      )
    case 5:
      return (
        <LastThing handlechange={handlechange} handleInput={handleInput} data={data} handleDropdownChange={handleDropdownChange} handlechangeBack={handlechangeBack} handleSubmitSignup={handleSubmitSignup} />
      )
    // never forget the default case, otherwise VS code would be mad!
    default:
      return (
        null
      )
  }
}

export default Signup