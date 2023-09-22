import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { AuthContext } from '../helpers/AuthContext';


function Createpost() {

    const {authState} = useContext(AuthContext)
    let nav =  useNavigate()

    const initialValues ={
        title: "",
        postText: "",
    };

    useEffect(() => {
        if(!localStorage.getItem("accessToken")) {
            nav("/login")
        }
    }, [])
    //check in localstorage, if there are no accessToken (no user logged in), redirect to /login

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("You Must Input A Title"),
        postText: Yup.string().required("You Must Input A Post Text"),
    });
    //validate, user must input title and body text

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/posts", data, {headers: {accessToken: localStorage.getItem("accessToken")}},).then((response) => {
            nav("/")
    });
    };
    //after posting a post, redirect user to main page

   

  return (
    <div className="createPostPage">
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
            <Form className="formContainer"> 
                <br></br><label>Title: </label>
                <ErrorMessage name="title" component="span" />
                <Field id="formContainer" name="title" placeholder="Write Title" />
                <br></br><label>Post: </label>
                <ErrorMessage name="postText" component="span" />
                <Field id="formContainer" name="postText" placeholder="Write Post" />
                <button type="submit">Create Post</button>
            </Form>
        </Formik>
    </div>
  )
}

export default Createpost