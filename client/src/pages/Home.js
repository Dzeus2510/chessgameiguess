import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Home() {
    const [listOfPost, setListOfPost] = useState([]);
    let navigate = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:3000/posts").then((response) => {
            setListOfPost(response.data);
        });
    }, []);

    return (
        <div>
            {listOfPost.map((value, key) => {
                return (
                    <div className="post" onClick={() => {navigate(`/display/${value.id}`)}} >
                        <div className="title">{value.title}</div>
                        <div className="body">{value.postText}</div>
                        <div className="footer">{value.displayname}</div>
                        <br></br>
                    </div>
                );
            })}
        </div>
    );
}

export default Home