import axios from "axios";
import React, { useEffect, useState } from 'react';

function Home() {
    const [listOfPost, setListOfPost] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/posts").then((response) => {
            setListOfPost(response.data);
        });
    }, []);

    return (
        <div>
            {listOfPost.map((value, key) => {
                return (
                    <div className="post">
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