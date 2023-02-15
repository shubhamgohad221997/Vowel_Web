import { useContext, useState } from "react";
import React from 'react'
import { AuthContext } from "../Context/AuthContext";
import { Navigate, Link } from 'react-router-dom'
import { Box, Text } from "@chakra-ui/react";

const userLogin = ({ data }) => {
  return fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
}

const initialState = {
  email: "",
  password: ""
}

const Login = () => {

  const [data, setData] = useState(initialState)
  const { loginUser, isAuth } = useContext(AuthContext)

  const handlChange = (e) => {
    const { name: key, value } = e.target
    setData({
      ...data,
      [key]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    userLogin({ data }).then(res => res.json()).then(res => {
      loginUser(data.email, res.token)
      console.log(res.token)
    }).catch(err => {
      console.log(err)
    })

  }


  if (isAuth) {
    if(data.email =="admin123@gmail.com" && data.password== "admin123"){
      // alert("Logged in as admin")
      return <Navigate to="/admin" />
    }
    // alert("Logged in as User")
    return <Navigate to="/" />
  }

  return (
    <>
 
    <div style={{border:"2px solid", width:"35%", margin:"auto", padding:"30px"}}>
      <Box>for Admin Login email=admin123@gmail.com & Password is=admin123</Box>
          <form data-testid="login-form" onSubmit={handleSubmit}>
        <div>
          <label>
            Email
            <input style={{border:"1px solid", marginBottom:"20px", padding:"10px" }} data-testid="email-input" onChange={handlChange} name="email" value={data.email} type="email" placeholder="email" />
          </label>
        </div>
        <div>
          <label>
            Password
            <input style={{border:"1px solid", marginBottom:"20px", padding:"10px"}}
              data-testid="password-input"
              type="password"
              name="password"
              value={data.password}
              placeholder="password"
              onChange={handlChange}
            />
          </label>
        </div>
        <div>
          <input style={{border:"1px solid", marginBottom:"20px", padding:"10px"}} data-testid="form-submit" type="submit" value="SUBMIT" />
        </div>
      </form>
      
    </div>
    </>
  )
}

export default Login