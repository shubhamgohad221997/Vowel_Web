import React, { useEffect, useState } from 'react'
import {
  Grid,Box,Text,Image, Button,
 } from '@chakra-ui/react'
 import  axios from "axios"
 


const LandingPage = () => {

  
  const [data, setdata] = useState([])

  useEffect(()=>{
    fetch(`http://localhost:8080/products`)
    .then((res)=>res.json())
    .then((data)=>{
        setdata(data)
    })
})
// console.log(data)

const handlecart =(e)=>{
  console.log("Cart",e)
  axios.post("http://localhost:8080/cart",e)
  .then((res)=> console.log(res))
  .catch ((err)=> console.log(err))
}




  return (
    <>

    <Grid width={"90%"} margin={"auto"} 
    marginTop={"30px"}
    templateColumns='repeat(4, 1fr)' gap={2} backgroundColor={"red"}>
      
{ data?.map((e)=>(
  
  <Box w={"22vw"} margin="auto" h={"40vh"} alignItems={"center"}
   key={e._id}>
    <Image width={"100%"} height={"70%"} src={e.image}/>
    <Text>Name: {e.title}</Text>
    <Text>RS: {e.price}</Text>
    <Button onClick={()=> handlecart(e)}>Add to Cart</Button>
  </Box>
))}
</Grid>
</>
  )
}

export default LandingPage