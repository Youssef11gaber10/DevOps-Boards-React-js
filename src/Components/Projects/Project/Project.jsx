import React, { useContext, useEffect, useState } from 'react'
import Task from '../Task/Task'
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import { authContext } from '../../../Context/AuthContext';
import { baseUrlNEW } from '../../Shared/baseUrl';


export default function Project({ element: { id, name, tasks, developers }, func }) {

    let { token } = useContext(authContext);

    let [del, setDel] = useState(false)
    let [tasky, setTasky] = useState([]);
    let [developerss, setDevelopers] = useState([]);

    let deleteProject = async (id) => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            let { data } = await axios.delete(baseUrlNEW + `/api/Project/${id}`);

            func()//call get projects again



        } catch (error) {
            console.log(error)
        }

    }




    useEffect(() => {
        setTasky(tasks)
        setDevelopers(developers)
    }, [tasks])

    return (
        <div className='bg-body-tertiary p-5 shadow-lg my-5 rounded-5'>

            <Link to={"/updateproject/" + name+"/"+id} className='nav-link'>
            <button className='btn btn-outline-warning w-100 py-3 my-3'> Update Project <i className="fa-solid fs-3 fa-wrench mx-3"></i></button>
            </Link>

            <h2 className='py-4 text-center text-main '>{name}</h2>

            <div className='d-flex justify-content-between bg-body-tertiary shadow p-5 rounded-3'>
                <NavLink className="nav-link" to="/tasks"><button className='btn btn-outline-success  '> create Task <i class="fa-solid fa-plus"></i> </button></NavLink>
                <select className='w-25 ms-5 form-control btn btn-outline-dark' name="selectDeveloper" id="myDropdown">
                    <option key='zz' >----Developers In This Project-----</option>
                    {developerss.map((elem) => {
                        return <option key={elem.id}>{elem.displayName}</option>
                    })}
                </select>


                <button onClick={() => { deleteProject(id) }} className='btn btn-outline-danger w-25'><i class="fa-solid fa-trash"></i> delete Project</button>


            </div>


            <div className="row  my-3 rounded py-3">


                {tasky.map((elem) => {

                    return <Task funcc={func} key={elem.id} element={elem} />
                })}





            </div>
        </div>
    )
}
