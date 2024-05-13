import jwtDecode from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import React from 'react'


export let authContext = createContext()


export default function AuthProvider({ children }) {

  const ClaimTypes = {
    Role:'http://schemas.microsoft.com/ws/2008/06/identity/claims/role',
    Email: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress',
    GivenName: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname',
  };

  let [token, setToken] = useState(localStorage.getItem('token'));
  let [userData, setUserData] = useState('');
  let [email, setEmail] = useState('');
  let [givenName, setGivenName] = useState(''); 
  let [username, setUserName] = useState(''); 
  let [role, setRole] = useState('');

  let[tasks,setTasks]=useState([]);

  useEffect(()=>{console.log(tasks)},[tasks])

  useEffect(() => {
    if (token) {
      let decoded = jwtDecode(token);

       setEmail( decoded[ClaimTypes.Email])
      setGivenName(decoded[ClaimTypes.GivenName][0])
      setUserName(decoded[ClaimTypes.GivenName][1])
       setRole(role = decoded[ClaimTypes.Role])
      // console.log(email,givenName,role)
      setUserData(decoded)

      
    }
    else {
      console.log('Error: Not have token so no jwt');
      return;
    }
  }, [token])

  return (
    <authContext.Provider value={{ setToken, token, userData,role,givenName,username,email,setTasks ,tasks}}>
      {children}
    </authContext.Provider>
  )
}
