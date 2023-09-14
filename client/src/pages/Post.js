import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { authState } = useContext(AuthContext);

  let nav = useNavigate()
  useEffect(() => {
    axios.get(`http://localhost:3000/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });

    axios.get(`http://localhost:3000/comments/${id}`).then((response) => {
      setComments(response.data);
    });
  }, [id]);

  const addComment = () => {
    axios
      .post(
        "http://localhost:3000/comments",
        {
          commentBody: newComment,
          PostId: postObject.id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          const commentToAdd = {
            id: response.data.id,
            commentBody: newComment,
            displayname: response.data.displayname,
            PostId: postObject.id,
          };
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
      });
  };

  const deleteComment = (id) => {
    axios
      .delete(`http://localhost:3000/comments/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        setComments(
          comments.filter((val) => {
            return val.id !== id;
          })
        );
      });
  };

  const deletePost = (id) => {
    axios.delete(`http://localhost:3000/posts/${id}`, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    })
      .then(() => {
        nav("/")
      })
  }

  const editPost = (option) => {
    if (option === "title") {
      let newTitle = prompt("Enter new Title: ")
      axios.put(`http://localhost:3000/posts/title`, { newTitle: newTitle, id: id }, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })

      setPostObject({...postObject, title: newTitle})
    } else {
      let newPostText = prompt("Enter new Post Text: ")
      axios.put(`http://localhost:3000/posts/postText`, { newPostText: newPostText, id: id }, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })

      setPostObject({...postObject, postText: newPostText})
    }
  }

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title" onClick={() => {
            if (authState.displayname === postObject.displayname) {
              editPost("title")
            }
          }}> {postObject.title} </div>
          <div className="body" onClick={() => {
            if (authState.displayname === postObject.displayname) {
              editPost("body")
            }
          }}>{postObject.postText}</div>
          <div className="footer">{postObject.displayname} {authState.displayname === postObject.displayname && (<button onClick={() => { deletePost(postObject.id) }}>Delete</button>)}</div>
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

export default Post;