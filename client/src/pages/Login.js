import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {setAuthState} = useContext(AuthContext)

  let nav = useNavigate()

    const login = () => {
        const data = {username: username, password: password};
        axios.post("http://localhost:3001/auth/login", data).then((response) => {
            if (response.data.error) {alert(response.data.error);}
            else{localStorage.setItem("accessToken", response.data.token);
            setAuthState({username: response.data.username ,displayname: response.data.displayname, id: response.data.id, status: true})
                  nav("/")
          }
        })
    };

  return (
    <div className="loginContainer">
        Username:<input type='text' onChange={(event) => {setUsername(event.target.value)}}></input>
        Password:<input type='password' onChange={(event) => {setPassword(event.target.value)}}></input>
        <button onClick={login}>Login</button>
    </div>
  )
}

export default Login