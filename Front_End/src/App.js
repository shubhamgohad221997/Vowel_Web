import './App.css';
import Navbar from "./Components/Navbar"
import { Routes, Route, } from "react-router-dom";
import LandingPage from "./Pages/LandingPage"

import Login from "./Pages/Login"
import CartPage from "./Pages/CartPage"
import CheckoutPage from "./Pages/CheckoutPage"



import PrivateRoute from './Components/PrivateRoute';
import AdiminLanding from './Pages/AdminLanding';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        
        <Route path="/" element=
        {
        
          <LandingPage/>
          
        }/>
        
        <Route path="/admin" element=
        {
        <PrivateRoute>
          <AdiminLanding/>
          </PrivateRoute>
        }/>
        
       
        <Route path="/login" element={<Login/>} />
        <Route path="/cartpage" element={<CartPage/>}/>
        <Route path="/checkoutpage" element={<CheckoutPage/>}/>
       
    
      </Routes>
    </div>
  );
}

export default App;
