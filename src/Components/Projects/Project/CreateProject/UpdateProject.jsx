import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { authContext } from '../../../../Context/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { baseUrlNEW } from '../../../Shared/baseUrl';
import { useFormik } from 'formik';

export default function UpdateProject() {

    let { name,id } = useParams()
    let [project, setProject] = useState([])
    let [errMsg, seterrMsg] = useState('');
    let [sucMsg, setsucMsg] = useState('');
    let [spin, setSpin] = useState(false);
    let { token } = useContext(authContext);
    let navigate = useNavigate();



    let notify = () => {
        toast.success('Registered Successfully', { position: 'top-center', theme: 'colored' })
    }

    let getProjectInfo = async (name) => {

        try {


            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            let { data } = await axios.get(baseUrlNEW + `/api/project/?name=${name}`);

            setProject(data)
            console.log(data)


        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => { getProjectInfo(name) }, [])
    useEffect(() => {
        console.log("updateInitial")
        console.log(project)
        
        myFormik.initialValues.id = project[0]?.id
    
      


    }, [project])



    const myFormik = useFormik({
        initialValues: { id:id, name: name },
        onSubmit: async (values) => {
            let { data } = await axios.put(baseUrlNEW + '/api/project', values)
                .then(() => {
                    notify();
                    seterrMsg('');
                    setsucMsg('Updated Successfully');

                    setTimeout(() => { navigate('/projects'); }, 1500);

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

                        <h2>Update Project</h2>
                        <label className='text-main'>ProjectId</label>
                        <input value={myFormik.values.id} name='id' type="text" className="form-control my-3" />
                       

                        <label className='text-main'>Task Name</label>
                        <input onBlur={myFormik.handleBlur} id='name' onChange={myFormik.handleChange} value={myFormik.values.name} name='name' type="text" className="form-control my-3" />
                        {myFormik.errors.name && myFormik.touched.name ? <div className="alert alert-danger"> {myFormik.errors.name}</div> : null}

                       

                        <div className='d-flex  justify-content-end'>

                            <button type='submit' disabled={(myFormik.isValid === false || myFormik.dirty === false)} className=' btn bg-main text-white'>
                                {spin && <i className='fa fa-spin  fa-spinner '></i>}
                                {spin || 'Update Project'}
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
