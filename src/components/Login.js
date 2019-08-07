import React, {useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import userService from '../services/user';

const LoginSchema = Yup.object().shape(
    {
        email: Yup.string().required('This field is required').email('Invalid mail'),
        password: Yup.string().required('This field is required')
    }
);

export default ({tokenCb}) => {
    const [isLoginFailed, setLoginFailed] = useState(false);

    const login = async (values) => {
        console.log(values);
        const response = await userService.login(values);
        if (response.status === 401) {
            return setLoginFailed(true)
        }
        const {token} = await response.json();
        tokenCb(token);
    }

    return (
        <Formik
            validationSchema={LoginSchema}
            initialValues={ {email: '', password: ''} }
            onSubmit={login}
        >
            <Form>
                <h1>Login</h1>
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
                {
                    isLoginFailed && (
                        <div className="alert alert-danger">
                            Invalid Credentials
                        </div>
                    )
                }
            </Form>
        </Formik>
    )
}