import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Post() {
    let { id } = useParams();
    let [postObject, setPostObject] = useState({})
    let [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState("")

    useEffect(() => {
        // Define an async function to fetch data
        async function fetchData() {
            try {
                const postResponse = await axios.get(`http://localhost:3000/posts/byId/${id}`);
                const commentResponse = await axios.get(`http://localhost:3000/comments/${id}`);
                setPostObject(postResponse.data);
                setComments(commentResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        // Call the fetchData function
        fetchData();
    }, [id]); // Specify 'id' as a dependency, if not it gonna run forever

const addComment = () => {
    axios.post("http://localhost:3000/comments", {commentBody: newComment , PostId: id}).then((response) => {
        const commentToAdd = {commentBody: newComment}
        setComments([...comments, commentToAdd])
        setNewComment("")
    })
}

return (
    <div>
        <div className='postPage'>
            <div className='leftSide'>
                <div className='title'>{postObject.title}</div>
                <div className='postText'>{postObject.postText}</div>
                <div className='footer'>{postObject.displayname}</div>
            </div>
            <div className='rightSide'>
                <div className='addCommentContainer'>
                    <input type='text' placeholder='Write your Comment' autoComplete='off' value={newComment} onChange={(event) => {setNewComment(event.target.value)}} />
                    <button onClick={addComment}>Post</button>
                </div>
                <div className='listOfComment'>
                    {comments.map((comment, key) => {
                        return <div className='comment'> {comment.commentBody} </div>
                    })}
                </div>
            </div>
        </div>
    </div>
)
}

export default Post