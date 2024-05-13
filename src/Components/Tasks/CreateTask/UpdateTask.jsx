import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { authContext } from '../../../Context/AuthContext';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import axios from 'axios';
import { baseUrlNEW } from '../../Shared/baseUrl';

export default function UpdateTask() {
    let { id } = useParams()
    let [task, setTask] = useState({})
    let [errMsg, seterrMsg] = useState('');
    let [sucMsg, setsucMsg] = useState('');
    let [spin, setSpin] = useState(false);
    let { token } = useContext(authContext);
    let navigate = useNavigate();


    let notify = () => {
        toast.success('Registered Successfully', { position: 'top-center', theme: 'colored' })
    }

    let getTaskInfo = async (id) => {

        try {


            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            let { data } = await axios.get(baseUrlNEW + `/api/Task/${id}`);

            setTask(data)
            console.log(data)


        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => { getTaskInfo(id) }, [])
    useEffect(() => {
        console.log("updateInitial")
        myFormik.initialValues.name = task.name
        myFormik.initialValues.description = task.description
        myFormik.initialValues.projectId = task.projectId


    }, [task])



    const myFormik = useFormik({
        initialValues: { id: id, name: '', description: '', projectId: '', developerName: '' },
        onSubmit: async (values) => {
            let { data } = await axios.put(baseUrlNEW + '/api/Task', values)
                .then(() => {
                    notify();
                    seterrMsg('');
                    setsucMsg('Updated Successfully');

                    setTimeout(() => { navigate('/tasks'); }, 1500);

                })
                .catch(({ response }) => { console.log(response); seterrMsg(response); });
        },
        validate: (values) => {

            const errors = {}


            return errors
        }

    })


    return (
        <div className='min-vh-100'>
            <>
                <div className="w-50 m-auto my-5 py-5 min-vh-100">
                    <form className="form py-5 my-5" onSubmit={myFormik.handleSubmit}>

                        <h2>Update Task</h2>
                        <label className='text-main'>TaskId</label>
                        <input onBlur={myFormik.handleBlur} id='name' onChange={myFormik.handleChange} value={myFormik.values.id} name='id' type="text" className="form-control my-3" />
                        {myFormik.errors.id && myFormik.touched.id ? <div className="alert alert-danger"> {myFormik.errors.id}</div> : null}

                        <label className='text-main'>Task Name</label>
                        <input onBlur={myFormik.handleBlur} id='name' onChange={myFormik.handleChange} value={myFormik.values.name} name='name' type="text" className="form-control my-3" />
                        {myFormik.errors.name && myFormik.touched.name ? <div className="alert alert-danger"> {myFormik.errors.name}</div> : null}

                        
                        <label className='text-main'>Task Description</label>
                        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.description} name='description' type="text" className="form-control my-3" />
                        {myFormik.errors.description && myFormik.touched.description ? <div className="alert alert-danger"> {myFormik.errors.description}</div> : null}

                        <label className='text-main'>ProjectId</label>
                        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.projectId} name='projectId' type="text" className="form-control my-3" />
                        {myFormik.errors.projectId && myFormik.touched.projectId ? <div className="alert alert-danger"> {myFormik.errors.projectId}</div> : null}

                        <label className='text-main'>DeveloperName</label>
                        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.developerName} name='developerName' type="text" className="form-control my-3" />
                        {myFormik.errors.developerName && myFormik.touched.developerName ? <div className="alert alert-danger"> {myFormik.errors.developerName}</div> : null}


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


        </div>

    )
}
