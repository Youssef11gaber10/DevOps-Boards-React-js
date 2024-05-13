import React, { useContext, useState } from 'react'
import { authContext } from '../../../../Context/AuthContext';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { useFormik } from 'formik';
import axios from 'axios';
import { baseUrlNEW } from '../../../Shared/baseUrl';

export default function CreateProject() {

    let { setToken, token } = useContext(authContext);
    let [errMsg, seterrMsg] = useState('');
    let [sucMsg, setsucMsg] = useState('');
    let [spin, setSpin] = useState(false);
    let [forgot, setForgot] = useState(false);
    


    const navigate = useNavigate();


    const myFormik = useFormik({

        initialValues: { name: ''},

        onSubmit: async (values) => {

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            let { data } = await axios.post(baseUrlNEW + '/api/Project', values)
                .then(() => {
                    seterrMsg('');
                    setsucMsg('Created Successfully');
                    setTimeout(() => { navigate('/projects'); }, 1500);

                })
                .catch(({ response }) => { console.log(response); seterrMsg(response); });

        },


        validate: (values) => {

            const errors = {}

            if (values?.name?.length < 4) {
                errors.name = 'name must be more than 4 caraters'
            }
            return errors
        }

    })

    return (

        <>
            <div className="w-50 m-auto my-5 py-5 min-vh-100">
                <form className="form py-5 my-5" onSubmit={myFormik.handleSubmit}>

                    <h2>Create Project:</h2>

                    <input onBlur={myFormik.handleBlur} id='name' onChange={myFormik.handleChange} value={myFormik.values.name} name='name' type="text" className="form-control my-3" placeholder='Enter Your Project Name' />
                    {myFormik.errors.name && myFormik.touched.name ? <div className="alert alert-danger"> {myFormik.errors.name}</div> : null}

                   
                    <div className='d-flex  justify-content-end'>

                        <button type='submit' disabled={(myFormik.isValid === false || myFormik.dirty === false)} className=' btn bg-main text-white'>
                            {spin && <i className='fa fa-spin  fa-spinner '></i>}
                            {spin || 'Create Project'}
                        </button>

                    </div>

                    {errMsg ? <div className="alert alert-danger my-3">{errMsg}</div> : null}
                    {sucMsg ? <div className='alert alert-success'>{sucMsg}</div> : null}




                </form>

            </div>
        </>

    )
}
