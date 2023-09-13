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

    const likeAPost = (postId) => {
        axios.post("http://localhost:3000/likes", {PostId: postId}, {headers: {accessToken: localStorage.getItem("accessToken")}
    }).then((response) =>{
        alert(response.data)
    })
    }

    return (
        <div>
            {listOfPost.map((value, key) => {
                return (
                    <div className="post"  >
                        <div className="title">{value.title}</div>
                        <div className="body" onClick={() => {navigate(`/post/${value.id}`)}}>{value.postText}</div>
                        <div className="footer">{value.displayname} 
                        <button onClick={() => {likeAPost(value.id);}}>👍</button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Home