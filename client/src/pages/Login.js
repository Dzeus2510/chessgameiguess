import axios from 'axios';
import React, { useState } from 'react';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        const data = {username: username, password: password};
        axios.post("http://localhost:3000/auth/login", data).then((response) => {
            console.log(response.data)
        })
    };

  return (
    <div>
        Username:<input type='text' onChange={(event) => {setUsername(event.target.value)}}></input>
        Password:<input type='password' onChange={(event) => {setPassword(event.target.value)}}></input>
        <button onClick={login}>Login</button>
    </div>
  )
}

export default Login