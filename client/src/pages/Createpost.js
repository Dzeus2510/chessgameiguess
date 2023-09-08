import { Field, Form, Formik } from 'formik';
import React from 'react';

function Createpost() {

    const initialValues ={
        title: "",
        postText: "",
        displayname: "",
    };

    const onSubmit = (data) => {
        console.log(data);
    };

  return (
    <div className="createPostPage">
        <Formik initialValues={initialValues} onSubmit={onSubmit} >
            <Form>
                <label>Title: </label>
                <Field id="formContainer" name="title" placeholder="Write Title" />
                <label>Post: </label>
                <Field id="formContainer" name="postText" placeholder="Write Post" />
                <label>Name: </label>
                <Field id="formContainer" name="displayname" placeholder="Your Name" />

                <button type="submit">Create Post</button>
            </Form>
        </Formik>
    </div>
  )
}

export default Createpost