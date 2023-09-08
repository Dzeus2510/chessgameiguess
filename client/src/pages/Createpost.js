import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

function Createpost() {

    const initialValues ={
        title: "",
        postText: "",
        displayname: "",
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("You Must Input A Title"),
        postText: Yup.string().required("You Must Input A Post Text"),
        displayname: Yup.string().min(3).max(64).required("Please Input Your Name"),
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3000/posts", data).then((response) => {
        console.log("it fucking work ???")
    });
    };

  return (
    <div className="createPostPage">
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
            <Form>
                <br></br><label>Title: </label>
                <ErrorMessage name="title" component="span" /><br></br>
                <Field id="formContainer" name="title" placeholder="Write Title" />
                <br></br><label>Post: </label>
                <ErrorMessage name="postText" component="span" /><br></br>
                <Field id="formContainer" name="postText" placeholder="Write Post" />
                <br></br><label>Name: </label>
                <ErrorMessage name="displayname" component="span" /><br></br>
                <Field id="formContainer" name="displayname" placeholder="Your Name" />

                <button type="submit">Create Post</button>
            </Form>
        </Formik>
    </div>
  )
}

export default Createpost