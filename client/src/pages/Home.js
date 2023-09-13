import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Home() {
    const [listOfPost, setListOfPost] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);
    let navigate = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:3000/posts", {headers: {accessToken: localStorage.getItem("accessToken")}
    }).then((response) => {
            setListOfPost(response.data.listOfPost);
            setLikedPosts(response.data.likedPosts.map((like) => {
                return like.postId;
            }));
        });
    }, []);

    const likeAPost = (postId) => {
        axios.post("http://localhost:3000/likes", {PostId: postId}, {headers: {accessToken: localStorage.getItem("accessToken")}
    }).then((response) =>{
        setListOfPost(listOfPost.map((post) => {
            if(post.id === postId) {
                if (response.data.liked){
                    return {...post, Likes: [...post.Likes, 0]}
                } else {
                    const likeArray = post.Likes
                    likeArray.pop()
                    return {...post, Likes: likeArray}
                }
            } else { 
                return post;
            }
        }))
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
                        <button onClick={() => {likeAPost(value.id);}} className={likedPosts.includes(value.id) ? "unlikedPost" : "likedPost"}>👍</button>
                        <label>{value.Likes.length}</label>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Home