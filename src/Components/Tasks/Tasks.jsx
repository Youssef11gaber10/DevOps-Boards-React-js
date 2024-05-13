import React, { useContext, useEffect, useState } from 'react'
import { authContext } from '../../Context/AuthContext';
import axios from 'axios';
import { baseUrlNEW } from '../Shared/baseUrl';
import Task from './Task/Task';
import { array } from 'yup';
import { NavLink, Navigate } from 'react-router-dom';

export default function Tasks() {


    let { role, token } = useContext(authContext);

    let [tasks, setTasks] = useState([]);
    let [search, setSearch] = useState('');
    let getDeveloperById = async (search) => {
        try {

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            let { data } = await axios.get(baseUrlNEW + `/api/Task/${search}`);
            // console.log([...data])
            let  datt= new Array(data);
            
            // let dat=
            //  [...data]
            console.log(datt)
            setTasks(datt)
        } catch (error) {
            console.log(error)
        }

    }
    let getDeveloperByName = async (search) => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            let { data } = await axios.get(baseUrlNEW + `/api/Task?SpecDEV=${search}`);
            console.log(data)
            setTasks(data)
        } catch (error) {
            console.log(error)
        }

    }

    let getSearch = (evt) => {
        setSearch(evt.target.value)
        if (isDigitString(search)) {
            console.log("inside digit")
            console.log(search)
            getDeveloperById(search)
        } 
        else if(search!=null){
                getDeveloperByName(search)
        }
        else{
            getTasksApi()

        }

    }
    function isDigitString(str) {
        const digitRegex = /^\d+$/;
        return digitRegex.test(str);
    }

    let getTasksApi = async () => {

        try {

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            let { data } = await axios.get(baseUrlNEW + '/api/Task');
            // console.log(data)
            setTasks(data);




        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => { getTasksApi() }, []);

    console.log(search)

    return (
        <>

            {role === 'Developer' ?
                <div className='min-vh-100 bg-danger'>Projects
                  
                 <Navigate to={'/taskDeveloper'} />
            
                </div> :
                null}



            {role == 'TeamLeader' ?

                <div className='min-vh-100 bg-body-tertiary'>
                    <div className="container my-5 py-5">
                        
                        <NavLink to={'/createtask'}> <button  className='btn btn-outline-success w-100 py-3'> create Task <i className="fa-solid fs-3 fa-building mx-3"></i></button></NavLink>
                        <input onBlur={getSearch} type="search" placeholder='SEARCH By Id Or DeveloperName ..............' className='form-control w-75 m-auto my-5' />

                        {
                            tasks.map((elem) => {
                                return <Task func={getTasksApi} key={elem?.id} element={elem} />
                            })
                        }




                    </div>



                </div>



                : null}



        </>
    )
}
