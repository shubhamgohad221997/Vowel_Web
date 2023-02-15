import React, { useState } from "react";

export const AuthContext  = React.createContext()
function AuthContextProvider({children}) {
    const [isAuth,setIsAuth]  = useState(false)
    const [email,setEmail] = useState("")
    const [token,setToken]  = useState(null)
    const toggle = () =>{
        setIsAuth(!isAuth)
    }

    const loginUser = () =>{
        setEmail(email)
        setToken(token)
        setIsAuth(true)
    }

    const logoutUser =() =>{
        setEmail(null)
        setToken(null)
        setIsAuth(false)
    }

return (
<AuthContext.Provider
value={{isAuth,email,token,toggle,loginUser,logoutUser}}
>
{children}
</AuthContext.Provider>
)
}

export default AuthContextProvider;
