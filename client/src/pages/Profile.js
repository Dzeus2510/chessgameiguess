import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from "../helpers/AuthContext";

function Profile() {

    let { id } = useParams()
    let navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [displayname, setDisplayname] = useState("")
    const [listOfPosts, setListOfPosts] = useState([])
    const { authState } = useContext(AuthContext);

    useEffect(() => {
        axios.get(`http://localhost:3001/auth/basicinfo/${id}`).then((response) => {
            setUsername(response.data.username)
            setDisplayname(response.data.displayname)
        })

        axios.get(`http://localhost:3001/posts/byuserId/${id}`).then((response) => {
            setListOfPosts(response.data)
        })
    }, [])

    return (
        <div className='profilePageContainer'>
            <div className='basicInfo'>
                <h1>Username: {username}</h1>
                <h1>Displayname: {displayname}</h1>
                {authState.username === username && (
                    <button onClick={() => {
                        navigate("/changepassword")
                    }}>Change My Password</button>
                )}
            </div>
            <div className='listOfPosts'>
                {listOfPosts.map((value, key) => {
                    return (
                        <div className="post"  >
                            <div className="title">{value.title}</div>
                            <div className="body" onClick={() => { navigate(`/post/${value.id}`) }}>{value.postText}</div>
                            <div className="footer">{value.displayname}
                                <div className="like">{value.Likes.length}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div></div>
        </div>
    )
}

export default Profile