import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from "../helpers/AuthContext";

function Post() {
    let { id } = useParams();
    let [postObject, setPostObject] = useState({})
    let [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState("")
    const { authState } = useContext(AuthContext)

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
    axios.post("http://localhost:3000/comments", {commentBody: newComment , PostId: id},
    {
        headers: {
            accessToken: localStorage.getItem("accessToken"),
        },
    }).then((response) => {
        if(response.data.error){
            alert(response.data.error);
        } else {
        const commentToAdd = {commentBody: newComment, displayname: response.data.displayname}
        setComments([...comments, commentToAdd])
        setNewComment("")
        }
    })
}

const deleteComment = (id) => {

    axios.delete(`http://localhost:3000/comments/${id}`, {headers: { accessToken: localStorage.getItem('accessToken')}
}).then(() => {
    setComments(comments.filter((val) => {
        return val.id !== id
    }))
})
}

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title"> {postObject.title} </div>
          <div className="body">{postObject.postText}</div>
          <div className="footer">{postObject.username}</div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="Comment..."
            autoComplete="off"
            value={newComment}
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          />
          <button onClick={addComment}> Add Comment</button>
        </div>
        <div className="listOfComments">
          {comments.map((comment, key) => {
            return (
              <div key={key} className="comment">
                {comment.commentBody}
                <label> Name: {comment.displayname}</label>
                {authState.displayname === comment.displayname && (
                  <button
                    onClick={() => {
                      deleteComment(comment.id);
                    }}
                  >
                    X
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Post