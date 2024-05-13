
import React, { useContext, useState } from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { authContext } from '../../../Context/AuthContext';
import { baseUrlNEW } from '../../Shared/baseUrl';

export default function CreateTask() {
    let [errMsg, seterrMsg] = useState('');
    let [sucMsg, setsucMsg] = useState('');
    let [spin, setSpin] = useState(false);
    let { token } = useContext(authContext);
    let navigate = useNavigate();
    
    let notify = () => {
        toast.success('Registered Successfully', { position: 'top-center', theme: 'colored' })
    }




    const myFormik = useFormik({
        initialValues: { name: '', description: '', projectId: ''},
        onSubmit: async (values) => {
            let { data } = await axios.post(baseUrlNEW + '/api/Task', values)
                .then(() => {
                    notify();
                    seterrMsg('');
                    setsucMsg('Created Successfully');

                    setTimeout(() => { navigate('/tasks'); }, 1500);

                })
                .catch(({ response }) => {  console.log(response); seterrMsg(response);  });
        },
        validate: (values) => {

            const errors = {}

            

            return errors
        }

    })

 

    return (
        <>
            <div className="w-50 m-auto my-5 py-5 min-vh-100">
                <form className="form py-5 my-5" onSubmit={myFormik.handleSubmit}>

                    <h2>Create Task</h2>

                    <input onBlur={myFormik.handleBlur} id='name' onChange={myFormik.handleChange} value={myFormik.values.name} name='name' type="text" className="form-control my-3" placeholder='Enter Task Name' />
                    {myFormik.errors.name && myFormik.touched.name ? <div className="alert alert-danger"> {myFormik.errors.name}</div> : null}

                    <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.description} name='description' type="text" className="form-control my-3" placeholder='Enter Task Description' />
                    {myFormik.errors.description && myFormik.touched.description ? <div className="alert alert-danger"> {myFormik.errors.description}</div> : null}

                    <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.projectId} name='projectId' type="text" className="form-control my-3" placeholder='Enter Project ID' />
                    {myFormik.errors.projectId && myFormik.touched.projectId ? <div className="alert alert-danger"> {myFormik.errors.projectId}</div> : null}

                    

                    <div className='d-flex  justify-content-end'>

                        <button type='submit' disabled={(myFormik.isValid === false || myFormik.dirty === false)} className=' btn bg-main text-white'>
                            {spin && <i className='fa fa-spin  fa-spinner '></i>}
                            {spin || 'Create Task'}
                        </button>

                    </div>

                    {errMsg ? <div className="alert alert-danger my-3">{errMsg}</div> : null}
                    {sucMsg ? <div className='alert alert-success'>{sucMsg}</div> : null}




                </form>

            </div>
        </>
    )

   
}


