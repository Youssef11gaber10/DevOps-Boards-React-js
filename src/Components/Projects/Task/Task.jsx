import axios from 'axios';
import React, { useContext } from 'react'
import { authContext } from '../../../Context/AuthContext';
import { baseUrlNEW } from '../../Shared/baseUrl';
import { Link, useHref } from 'react-router-dom';

export default function Task({ element: { id, name, developerName, status }, funcc }) {

    let { token } = useContext(authContext);

    let deleteTask = async (id) => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            let { data } = await axios.delete(baseUrlNEW + `/api/Task/${id}`);
            funcc()//call get projects again

        } catch (error) {
            console.log(error)
        }

    }


    return (

        <div className="col-md-4 bg-body-tertiary  p-5 shadow rounded-5 py-3 border border-black">
            <div className="row ">

                <div className='col-md-6'>
                    <label className='text-main' >TaskId</label>
                    <p>{id}</p>
                </div>

                <div className='col-md-6'>
                    <label className='text-main' >TaskName</label>
                    <p>{name}</p>
                </div>

                <div className='col-md-6'>
                    <label className='text-main' >DeveloperName</label>
                    <p>{developerName}</p>
                </div>
                <div className='col-md-6'>
                    <label className='text-main' >Status</label>
                    <p>{status}</p>
                </div>

                <div className='d-flex gap-3'>

                    {developerName?null:<Link to={"/updatetask/" + id} className='nav-link'>
                        <button  className='btn btn-outline-warning my-2 ' disabled={developerName == null ? false : true}>AssignToDeveloper</button>
                    </Link>}
                        <button className='btn  btn-outline-danger my-2' onClick={() => (deleteTask(id), funcc())}>Delete</button>

                </div>

            </div>
        </div>
    )
}
