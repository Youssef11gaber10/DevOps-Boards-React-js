import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { baseUrl } from '../Shared/baseUrl';
import axios from 'axios';
import { authContext } from '../../Context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { notify } from '../Shared/notify';

export default function Recovery() {

    let [message, setMsg] = useState('');
    let [show, setShow] = useState(1);
    let { setToken } = useContext(authContext);
    let navigate = useNavigate();

    const myFormikSendEmail = useFormik(
        {
            initialValues: { email: '' },

            validate: (values) => {

                const errors = {};

                let regEmail = /^[a-zA-z0-9]{5,20}@(gmail|yahoo|outlook).(com|org)$/;
                if (!regEmail.test(values.email)) {
                    errors.email = 'email are invalid';
                }

                return errors
            },

            onSubmit: async (values) => {

                try {

                    let { data: { message, statusMsg } } = await axios.post(baseUrl + 'auth/forgotPasswords', values);
                    if (statusMsg == 'success') {
                        setMsg(message);

                        setTimeout(() => {
                            setShow(2);
                            setMsg('');
                        }, 2000);

                    }
                }
                catch ({ response: { data: { message } } }) {
                    console.log(message);
                }
            }
        })


    const myFormikResetCode = useFormik(
        {

            initialValues: { resetCode: "" },

            onSubmit: async (values) => {

                try {

                    let { data: { status } } = await axios.post(baseUrl + 'auth/verifyResetCode', values);
                    if (status == 'Success') {
                        setShow(3);
                    }

                }
                catch ({ response: { data: { message } } }) {
                    console.log(message);
                    setMsg(message);
                }
            },

            validate: (values) => {
                const errors = {};

                let regRest = /^[0-9]{5,6}$/;
                if (!regRest.test(values.resetCode)) {
                    errors.resetCode = 'the code consists of 6 numbers';
                }

                return errors
            },



        })



    const myFormikResetPassword = useFormik(
        {
            initialValues: { email: '', newPassword: '' },
            validate: (values) => {
                const errors = {};
                let regEmail = /^[a-zA-z0-9]{5,20}@(gmail|yahoo|outlook).(com|org)$/;
                if (!regEmail.test(values.email)) {
                    errors.email = 'email are invalid';
                }
                if (!values.newPassword.match(/^[a-zA-z0-9]{5,15}$/)) {
                    errors.newPassword = 'password is INvalid';
                }
                return errors;
            },
            onSubmit: async (values) => {

                try {

                    let { data: { token } } = await axios.put(baseUrl + 'auth/resetPassword', values);
                    setToken(token);
                    localStorage.setItem('token', token);
                    notify('password reset successfull', 'success', 'top-center')

                    setTimeout(() => {
                        navigate('/home');

                    }, 1500);

                }
                catch ({ response: { data: { message } } }) {
                    console.log(message);
                }
            }

        })


    return (
        <div className='min-vh-100 d-flex flex-column'>

            {show == 1 ? <form onSubmit={myFormikSendEmail.handleSubmit} className='w-50 m-auto ' action="">
                <h2 className='fw-bolder'>Email </h2>
                <input onBlur={myFormikSendEmail.handleBlur} onChange={myFormikSendEmail.handleChange} value={myFormikSendEmail.values.email} name='email' className='form-control my-2' type="email" placeholder='Enter Your Email To Send a Verification Code' />
                {message ? <span className='d-block text-main'>{message}</span> : null}
                {myFormikSendEmail.errors.email && myFormikSendEmail.touched.email ? <div className="alert alert-danger"> {myFormikSendEmail.errors.email}</div> : null}
                <button type='submit' className='btn bg-main text-white my-3'> SEND </button>
            </form> : null}

            {show == 2 ? <form onSubmit={myFormikResetCode.handleSubmit} className='w-50 m-auto ' action="">
                <h2 className='fw-bold'>RESET CODE</h2>
                <input name='resetCode' className='form-control mx-2' placeholder=' ENTER RESET CODE' type='text' onBlur={myFormikResetCode.handleBlur} onChange={myFormikResetCode.handleChange} value={myFormikResetCode.values.resetCode} />
                {message ? <span className='d-block text-danger'>{message}</span> : null}
                {myFormikResetCode.errors.resetCode && myFormikResetCode.touched.resetCode ? <div className="alert alert-danger"> {myFormikResetCode.errors.resetCode}</div> : null}
                <button type='submit' className='btn bg-main text-white my-3'> SEND </button>
            </form> : null}

            {show == 3 ? <form onSubmit={myFormikResetPassword.handleSubmit} className='w-50 m-auto' action="">

                <h2 className='fw-bolder'>Email </h2>
                <input onBlur={myFormikResetPassword.handleBlur} onChange={myFormikResetPassword.handleChange} value={myFormikResetPassword.values.email} name='email' className='form-control my-2' type="email" placeholder='Enter Your Email' />
                {myFormikResetPassword.errors.email && myFormikResetPassword.touched.email ? <div className="alert alert-danger"> {myFormikResetPassword.errors.email}</div> : null}

                <h2 className='fw-bold'>new Password</h2>
                <input name='newPassword' onBlur={myFormikResetPassword.handleBlur} onChange={myFormikResetPassword.handleChange} value={myFormikResetPassword.values.newPassword} className='form-control my-2' placeholder='Enter New Password' type="password" />
                {myFormikResetPassword.errors.newPassword && myFormikResetPassword.touched.newPassword ? <div className="alert alert-danger"> {myFormikResetPassword.errors.newPassword}</div> : null}

                <button type='submit' className='btn bg-main text-white my-3'> RE-SET PASSWORD </button>
            </form> : null}

        </div>
    )
}
