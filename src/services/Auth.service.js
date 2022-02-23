import axios from "axios"

export const loginService = (email, password) => {
    return axios.post("http://anpr.pushpak.cloud:5001/auth/login", {
        email: email,
        password: password
        }, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            },
        })
}

export const getUserInfo= ()=>{
    return JSON.parse(localStorage.getItem("userInfo"));
  }