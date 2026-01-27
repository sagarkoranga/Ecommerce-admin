import { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import {api} from "./services/api.js";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      
      const res = await api.post("/admin/login", { username, password });
    
      
      localStorage.setItem("adminToken", res.data.token);
      
      navigate("/home");

    } catch {
      toast.error("Invalid Credentials")
    }
  };

  
  return (   
     <div>  <h1 className='text-center text-2xl font-bold mt-20'>Login Page</h1>
<ToastContainer/>
         <div  className='max-w-md mx-auto mt-8 p-4 border-4 border-gray-300 rounded'>
        <div className='mb-4'>
          <label className='block text-gray-700 mb-2'>Username</label>
          <input className='w-full p-2 border border-gray-300 rounded' type='text' id='username' onChange={e=>setUsername(e.target.value)} />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 mb-2 hover:text-blue-400' >Password</label>
          <input className='w-full p-2 border border-gray-300 rounded' type='password' id='password'   onChange={e=>setPassword(e.target.value)}/>
        </div>
        <button className='w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600' onClick={login} >Login</button>
      </div>
      <button  className="ml-214 mt-1 text-blue-800 hover:text-blue-500" onClick={()=>{navigate('/forgotpassword')}}>Forgot password?</button>
    </div>
  )
}
