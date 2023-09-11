import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

function Registration() {
    const initialValues ={
        username: "",
        password: "",
        displayname: "",
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(20).required("You Must Input A Username"),
        password: Yup.string().min(4).max(20).required("You Must Input A Password"),
        displayname: Yup.string().min(3).max(64).required("Please Input Your Name"),
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3000/auth", data).then((response) => {
            console.log(data);
    });
    };

  return (
    <div className="createPostPage">
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
            <Form className="formContainer">
                <br></br><label>Username: </label>
                <ErrorMessage name="username" component="span" />
                <Field id="formContainer" name="username" placeholder="Username" />
                <br></br><label>Password: </label>
                <ErrorMessage name="password" component="span" />
                <Field id="formContainer" type="password" name="password" placeholder="Password" />
                <br></br><label>Display Name: </label>
                <ErrorMessage name="displayname" component="span" />
                <Field id="formContainer" name="displayname" placeholder="Your Display Name" />
                <br></br>
                <button type="submit">Create Account</button>
            </Form>
        </Formik>
    </div>
  )
}

export default Registration