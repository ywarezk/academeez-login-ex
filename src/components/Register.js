import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import userService from '../services/user';

const RegisterSchema = Yup.object().shape(
    {
        email: Yup.string().required('This field is required').email('Invalid mail'),
        password: Yup.string().required('This field is required'),
        firstName: Yup.string().required('This field is required'),
        lastName: Yup.string().required('This field is required'),
    }
);

export default ({tokenCb}) => {
    const register = async (values) => {
        const response = await userService.register(values);
        const json = await response.json();
        if (response.status !== 201) {
            return alert(JSON.stringify(json));
        }
        tokenCb(json.token);
    }

    return (
        <Formik
            validationSchema={RegisterSchema}
            onSubmit={register}
            initialValues={ {
                firstName: 'Yariv',
                lastName: 'Katz',
                email: '',
                password: ''
            } }
        >
            <Form>
                <h1>Register</h1>

                <div className="form-group">
                    <label>First Name</label>
                    <Field 
                        type="text" 
                        name="firstName"
                        className="form-control"
                    />
                    <ErrorMessage name="firstName" component="div" className="alert alert-danger" />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <Field 
                        type="text" 
                        name="lastName"
                        className="form-control"
                    />
                    <ErrorMessage name="lastName" component="div" className="alert alert-danger" />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <Field 
                        type="email" 
                        name="email"
                        className="form-control"
                    />
                    <ErrorMessage name="email" component="div" className="alert alert-danger" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <Field 
                        type="password" 
                        name="password"
                        className="form-control"
                    />
                    <ErrorMessage name="password" component="div" className="alert alert-danger" />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>
            </Form>
        </Formik>
    )
}