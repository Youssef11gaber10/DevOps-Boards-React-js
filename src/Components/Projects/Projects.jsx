import React, { useContext, useEffect, useState } from 'react'
import { authContext } from '../../Context/AuthContext'
import axios from 'axios';
import { baseUrlNEW } from '../Shared/baseUrl';
import Project from './Project/Project';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';

export default function Projects() {

    let { role, token } = useContext(authContext);

    let [projects, setProjects] = useState([]);
    let [developers, setDevelopers] = useState([]);
    let [developerName, setDeveloperName] = useState('');
    let [projectName, setProjectName] = useState('');
    const navigate = useNavigate();
    


    let getProjectApi = async () => {

        try {

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            let { data } = await axios.get(baseUrlNEW + '/api/Project');
            setProjects(data);


        } catch (error) {
            console.log(error)
        }

    }

    let getDevelopersApi = async () => {

        try {

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            let { data } = await axios.get(baseUrlNEW + '/api/Developer');
            // console.log(data)
            setDevelopers(data);


        } catch (error) {
            console.log(error)
        }

    }

    let addDeveloperToProject = async () => {
        try {


            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            let { data } = await axios.post(baseUrlNEW + `/api/Project/AddDeveloperToProject?DeveloperName=${developerName}&ProjectName=${projectName}`);
            console.log(data)
            setDevelopers(data);
            // setTimeout(() => { navigate('/tasks'); }, 1500);
            


        } catch (error) {
            console.log(error)
        }

    }


    let getProjectName = (evt) => {
        setProjectName(evt.target.value)
    }

    let getDeveloperName = (evt) => {
        setDeveloperName(evt.target.value)
    }




    useEffect(() => { getProjectApi(); getDevelopersApi() }, []);
    // useEffect(() => { getProjectApi(); }, []);
    // useEffect(() => {  getDevelopersApi() }, [projects]);






    return (
        <>

            {role === 'Developer' ?

                <div className='min-vh-100 bg-warning'>Projects
                 <Navigate to={'/projectDeveloper'} />
                 </div>
               
                : null}



            {role === 'TeamLeader' ?


                <div className='min-vh-100 '>
                    <div className="container my-5 py-5">
                       <NavLink to={'/createproject'}> <button  className='btn btn-outline-success w-100 py-3'> create Project <i className="fa-solid fs-3 fa-building mx-3"></i></button></NavLink>


                        <div className='row justify-content-center my-5'>
                            <select className='form-control my-2  btn btn-outline-dark' name="selectDeveloper" id="myDropdown">
                                <option key="zzzzz" selected>----Developers Not In Any Project-----</option>
                                {developers?.map((elem) => {
                                    return <option key={elem?.id} >{elem.userName}</option>
                                })}
                            </select>
                            <div className="col-md-5">
                                <label className='text-main' >DeveloperName</label>
                                <input onBlur={getDeveloperName} className='form-control my-2 ' />
                            </div>

                            <div className="col-md-5">
                                <label className='text-main' >ProjectName</label>
                                <input onBlur={getProjectName} className='form-control my-2 ' />
                            </div>


                            <input type="submit" onClick={addDeveloperToProject} className='btn btn-outline-success w-25 m-auto' value='Add Developer To Project' />

                        </div>


                        {projects.map((elem) => {
                            return <Project func={getProjectApi} key={elem?.id} element={elem} />

                        })}

                    </div>
                </div>



                : null}



        </>
    )
}





