import React, { useEffect, useState } from 'react'
import {
  Grid,Box,Text,Image, Button
 } from '@chakra-ui/react'
 import { Link } from "react-router-dom";
 import  axios from "axios"

const CartPage = () => {
  const [data, setdata] = useState([])
  const [quantity,setQuantity]=useState(1)

  if(quantity<1){
    setQuantity(1)
  }

  const getdata =()=>{
    fetch(`https://vowel.onrender.com/cart`)
    .then((res)=>res.json())
    .then((data)=>{
        setdata(data)
    })
  }

  function handleRemove(e){
   console.log("Remove",e)
   axios.delete(`https://vowel.onrender.com/cart/${e}`)
   .then((res)=>getdata())
   .catch((error)=> console.log(error))

  }

  useEffect(()=>{
    getdata()
})



//console.log(data)
var total = data.reduce((acc, c) => acc + c.quantity * c.price, 0);


  return (
    <>
<Box>
  <Text>Toal cart Amount:  {total}</Text>
  <Link to="/checkoutpage">Checkout</Link>
</Box>

    <Grid width={"90%"} margin={"auto"} 
    marginTop={"30px"}
    templateColumns='repeat(4, 1fr)' gap={2} backgroundColor={"#A8CAC6"}>
      
{ data?.map((e)=>(
  
  <Box w={"22vw"} margin="auto" h={"40vh"} alignItems={"center"}
   key={e._id}>
    <Image width={"100%"} height={"70%"} src={e.image}/>
    <Text>Name: {e.title}</Text>
    <Text>RS: {e.price*quantity}</Text>
    <Box display={"flex"}>
      <Button onClick={()=>setQuantity(quantity+1)}>+</Button>
      <Button >{quantity}</Button>
      <Button onClick={()=>setQuantity(quantity-1)}>-</Button>
      <Button onClick={()=> handleRemove(e._id)}>Remove</Button>
    </Box>
  </Box>
))}
</Grid>
</>
  )
}

export default CartPage