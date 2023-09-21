import axios from "axios";
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../helpers/AuthContext";


function Home() {
    const [listOfPost, setListOfPost] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);
    const { authState } = useContext(AuthContext);
    let navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            navigate("/login")
        } else {
            axios.get("http://localhost:3001/posts", {
                headers: { accessToken: localStorage.getItem("accessToken") }
            }).then((response) => {
                setListOfPost(response.data.listOfPost);
                setLikedPosts(response.data.likedPosts.map((like) => {
                    return like.PostId;
                }));
            });
        }
    }, []);


    const likeAPost = (postId) => {
        axios.post("http://localhost:3001/likes", { PostId: postId }, {
            headers: { accessToken: localStorage.getItem("accessToken") }
        }).then((response) => {
            setListOfPost(listOfPost.map((post) => {
                if (post.id === postId) {
                    if (response.data.liked) {
                        return { ...post, Likes: [...post.Likes, 0] }
                    } else {
                        const likeArray = post.Likes
                        likeArray.pop()
                        return { ...post, Likes: likeArray }
                    }
                } else {
                    return post;
                }
            }))
            if (likedPosts.includes(postId)) {
                setLikedPosts(
                    likedPosts.filter((id) => {
                        return id !== postId;
                    })
                )
            } else {
                setLikedPosts([...likedPosts, postId])
            }
        })
    }



    return (
        <div>
            {listOfPost.map((value, key) => {
                return (
                    <div className="post"  >
                        <div className="title">{value.title}</div>
                        <div className="body" onClick={() => { navigate(`/post/${value.id}`) }}>{value.postText}</div>
                        <div className="footer">
                            <div className="username">
                                <Link to={`/profile/${value.UserId}`}>{value.displayname}</Link>
                            </div>
                            <button onClick={() => { likeAPost(value.id); }} className={likedPosts.includes(value.id) ? "unlikedPost" : "likedPost"}>👍</button>
                            <label>{value.Likes.length}</label>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Home