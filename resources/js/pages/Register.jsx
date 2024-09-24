import React from 'react'
import { useState } from 'react';
import axios from "axios";

axios.defaults.withCredentials = true;  // クッキーを送信できるように設定

const getCsrfToken = async () => {
  await axios.get('http://localhost:8000/sanctum/csrf-cookie');
};


const Register = () => {
  
  const hostory = use

  
  return (
    <>

    </>
  )
}

export default Register
