import React, { useEffect, useState } from 'react'
import {
  Grid,Box,Text,Image, Button, Flex,
  useColorModeValue, FormControl,
  FormLabel, Input
 } from '@chakra-ui/react'
 import { Link } from "react-router-dom";
 import  axios from "axios"

const AdiminLanding = () => {

  const [form, setform] = useState({})
  const [data, setdata] = useState([])

  const getdata=()=>{
    fetch(`https://vowels.onrender.com/products`)
    .then((res)=>res.json())
    .then((data)=>{
        setdata(data)
    })
  }

  useEffect(()=>{
    getdata()
})
//console.log(data)


function handleRemove(e){
   console.log("Remove",e)
   axios.delete(`https://vowels.onrender.com/products/${e}`)
   .then((res)=>getdata())
   .catch((error)=> console.log(error))

  }

// for adding products
const handlechange=(e)=>{
  let id=Math.random() * 100;
  let {name,value}=e.target
  setform({...form,[name]:value,id})
}

//for posting form data

const handleform=async()=>{

  await fetch(`https://vowels.onrender.com/products`,{
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
    <Box bg={useColorModeValue('gray.500', 'gray.900')} px={4}>

    <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          
          <Link to="/orders">All Orders</Link>
        </Flex>
    </Box>

    <FormControl >

<FormLabel>Product Name</FormLabel>
<Input type='text' name='title' onChange={handlechange} required/>

<FormLabel>image</FormLabel>
<Input type='text' name='image' onChange={handlechange} required/>

<FormLabel>price</FormLabel>
<Input type='text' name='price' onChange={handlechange} required/>

<Button onClick={handleform}>Add Product</Button>

</FormControl>

    <Grid width={"90%"} margin={"auto"} 
    marginTop={"30px"}
    templateColumns='repeat(4, 1fr)' gap={2} backgroundColor={"red"}>
      
{ data?.map((e)=>(
  
  <Box w={"22vw"} margin="auto" marginBottom={"30px"} h={"40vh"} alignItems={"center"}
   key={e._id}>
    <Image width={"100%"} height={"70%"} src={e.image}/>
    <Text>Name: {e.title}</Text>
    <Text>RS: {e.price}</Text>
    <Box display={"flex"} margin={"auto"} gap={4} width={"50%"}>
    <Button>Edit</Button>
    <Button onClick={()=> handleRemove(e._id)}>Delete</Button>
    </Box>
   
  </Box>
))}
</Grid>
</>
  )
}

export default AdiminLanding