import React, { useState } from 'react'
import {
  Button,
  FormControl,
  FormLabel, Input
 } from '@chakra-ui/react'
 import { Link } from "react-router-dom";

const CheckoutPage = () => {
  const [form, setform] = useState({})
  const [data, setdata] = useState([])

// for adding products
const handlechange=(e)=>{
  let id=Math.random() * 100;
  let {name,value}=e.target
  setform({...form,[name]:value,id})
}

//for posting form data

const handleform=async()=>{

  await fetch(`http://localhost:8080/address`,{
   method:"POST",
   body:JSON.stringify(form),
   headers:{
    'Content-Type': 'application/json',
 },
 }).then((r)=>r.json()).then((r)=>console.log(r))
 setdata(data)
 }
  return (
    <>
    <FormControl >

<FormLabel>Address</FormLabel>
<Input type='text' name='address' onChange={handlechange} required/>

<FormLabel>District</FormLabel>
<Input type='text' name='district' onChange={handlechange} required/>

<FormLabel>Pincode</FormLabel>
<Input type='text' name='pincode' onChange={handlechange} required/>

<Button onClick={handleform}><Link to="/paymentpage">Add Address</Link></Button>

</FormControl>
    </>
  )
}

export default CheckoutPage