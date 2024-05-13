import React, { useContext, useEffect, useState } from 'react'
import { authContext } from '../../../Context/AuthContext'
import axios from 'axios';
import { baseUrlNEW } from '../../Shared/baseUrl';
import { Navigate, useNavigate } from 'react-router-dom';

export default function ProjectDeveloper() {

    let { token, givenName, setTasks } = useContext(authContext)

    let [ID, setID] = useState(0);
    let [project, setProject] = useState({})
    const navigate = useNavigate();
    let [ProjectStatus, setProjectStatus] = useState('');



    let getDeveloperByName = async (given) => {
        try {


            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            let { data } = await axios.get(baseUrlNEW + `/api/Developer/?name=${given}`);
            console.log(data);
            if (data[0]?.projectStatus == "Pending") {
                navigate(`/acceptance/${data[0]?.projectId}`);
                // <Navigate to={'/projects'} />
            }
            else {

                setID(data[0]?.projectId)
            }

        } catch (error) {
            console.log(error)
        }

    }

    let getProject = async (id) => {
        try {

            console.log(id)
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            let { data } = await axios.get(baseUrlNEW + `/api/Project?projectId=${id}`);
            console.log(data)
            setProject(data[0]);

        } catch (error) {
            console.log(error)
        }

    }

    let SETTasks = () => {
        setTasks(project?.tasks);
    }

    useEffect(() => { getDeveloperByName(givenName) }, [givenName])
    useEffect(() => { getProject(ID) }, [ID])
    useEffect(() => { SETTasks() }, [project])

    // useEffect(() => {

    //     let id = localStorage.getItem('projectId')//db
    //     console.log('here in comparison  this is id',id)
    //     console.log('here in comparison  this is prevId',prevId)
    //     //prevId => from local storage
    //     if (prevId == 0 && id == 0)
    //         console.log('both are null')//don't have projects
    //     else if (id == prevId) {//have project put not changed
    //         console.log('projectid in local == projectid in db and both not null so he have proj and not changed ');
    //     }
    //     else if (id != prevId)//iam sure none of them is null and they not equal each other
    //         <Navigate to={`/acceptance/${ID}`} />


    // }, [ID])





    return (
        <>

            <div className='min-vh-100 d-flex flex-column justify-content-evenly  my-5'>
                <div className="container">

                    <h2 className='text-center fw-bolder  '>welcome <span className='text-main'>{givenName}</span></h2>

                    <h2 className='fw-bold my-5 text-center '>
                        {ID != null && ID != 0 ?
                            <>Your Current Project</> :
                            <>you don't work on project yet</>
                        }
                    </h2>

                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <label className='text-main' >Project Name</label>
                            <input value={project?.name} className='form-control my-2' />
                            <label className='text-main' >ProjectId</label>
                            <input value={project?.id} className='form-control my-2' />

                        </div>
                    </div>






                </div>




            </div>
        </>
    )
}
