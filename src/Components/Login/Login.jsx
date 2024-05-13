import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { baseUrl, baseUrlNEW } from '../Shared/baseUrl'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { authContext } from '../../Context/AuthContext'


export default function Login() {

    let { setToken, token } = useContext(authContext);
    let [errMsg, seterrMsg] = useState('');
    let [sucMsg, setsucMsg] = useState('');
    let [spin, setSpin] = useState(false);
    let [forgot, setForgot] = useState(false);

    if (!localStorage.getItem('projectId'))
        localStorage.setItem('projectId', 0);


    const navigate = useNavigate();


    const validationSchema = Yup.object(
        {
            email: Yup.string().email('invalid email').required('Invalid Email'),
            password: Yup.string().required('Password is Worng'),

        })




    const myformik = useFormik(
        {

            initialValues: { email: '', password: '' },

            onSubmit: async (values) => {
                try {

                    setSpin(true)
                    // let { data } = await axios.post(baseUrl + 'auth/signin', values);
                    let { data } = await axios.post(baseUrlNEW + '/api/Accounts/Login', values);
                    console.log("ggggggg")
                    console.log(data)

                    if (data.message == 'success') {
                        setsucMsg('welcome back');
                        sessionStorage.setItem('token', data.token);
                        localStorage.setItem('token', data.token);
                        setToken(data.token);

                        setTimeout(() => {
                            navigate('/projects');

                        }, 1500);
                    }

                } catch ({ response }) {
                    seterrMsg(response.data.message);
                    setSpin(false);
                    setForgot(true);

                }




            },

            validationSchema,

        })


    if (token) {

        return <Navigate to={'/projects'} />
    }

    return (

        <div className='d-flex align-items-center min-vh-100'>
            <form onSubmit={myformik.handleSubmit} className="w-50 m-auto  ">
                <h2>Login Now :</h2>

                <input onBlur={myformik.handleBlur} onChange={myformik.handleChange} value={myformik.values.email} className='form-control my-3' type="email" name='email' placeholder='Enter your email' />
                {myformik.errors.email && myformik.touched.email ? <div className="alert alert-danger">{myformik.errors.email}</div> : null}

                <input onBlur={myformik.handleBlur} onChange={myformik.handleChange} value={myformik.values.password} className='form-control my-3' type="password" name='password' placeholder='Enter your password' />
                {myformik.errors.password && myformik.touched.password ? <div className="alert alert-danger">{myformik.errors.password}</div> : null}

                {forgot ? <Link to={'/account-recovery'} className='nav-link'><span className='d-block text-center fw-bold text-danger '> FORGOT YOUR PASSWORD ? </span></Link> : null}

                <div className='d-flex justify-content-end'>
                    <button type='submit' disabled={myformik.isValid == false || myformik.dirty == false ? true : false} className='btn bg-main my-3 text-white'>
                        {spin ? <i className='fa fa-spin fa-spinner'></i> : 'Login'}
                    </button>
                </div>
                {errMsg ? <div className="alert alert-danger">{errMsg}</div> : null}
                {sucMsg ? <div className='alert alert-success'>{sucMsg}</div> : null}

            </form>
        </div>

    )
}
