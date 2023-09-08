import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Post() {
    let { id } = useParams();
    let [postObject, setPostObject] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:3000/posts/byId/${id}`).then((response) => {
            setPostObject(response.data)
        });
    });
    return (
        <div>
            <div className='postPage'>
                <div className='leftSide'>
                    <div className='title'>{postObject.title}</div>
                    <div className='postText'>{postObject.postText}</div>
                    <div className='footer'>{postObject.displayname}</div>
                </div>
                <div className='rightSide'>Comment Section<br></br>
                    <div className='addCommentContainer'>
                        <input type='text' placeholder='Write your Comment' autoComplete='off' />
                        <button></button>
                    </div>
                    <div className='listOfComment'>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post