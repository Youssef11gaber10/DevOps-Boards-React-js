import React, { useContext, useEffect, useState } from 'react'
import { authContext } from '../../Context/AuthContext'
import { baseUrlNEW } from '../Shared/baseUrl';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function TaskDeveloper() {

    let { token, role, givenName, username } = useContext(authContext);
    let [alltasks, setAllTasks] = useState([])
    let [taskofdev, setTasksofdev] = useState([])
    let [text, setText] = useState('')
    let [status, setStatus] = useState('')
    let [my, setMy] = useState(true);


    let getAllTasks = async () => {
        try {

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            let { data } = await axios.get(baseUrlNEW + '/api/Task');
            console.log(data)
            setAllTasks(data);
        } catch (error) {
            console.log(error)
        }
    }

    let getTaskById = async (username) => {

        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            let { data } = await axios.get(baseUrlNEW + `/api/Task?SpecDEV=${username}`);
            console.log(data)
            setTasksofdev(data);
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => { getAllTasks(); }, [])
    useEffect(() => { getTaskById(username); }, [username])


    let getText = (evt) => {
        setText(evt.target.value)
    }

    let model = {
        text: text,
        role: role,
        name: '',
        taskId: ''
    }
    let addCommentDeveloper = async () => {
        try {

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            let { data } = await axios.post(baseUrlNEW + '/api/Task/DeveloperComment', model);
            console.log(data)
            //  func();
            getTaskById(username);





        } catch (error) {
            console.log(error)
        }
    }

    let model2 = {
        taskId: '',
        status: status,
    }

    let updateStatus = async (model2) => {

        try {

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            let { data } = await axios.put(baseUrlNEW + '/api/Task/updateStatus', model2);
            console.log(data)
            //  func();
            // getTaskById(username);





        } catch (error) {
            console.log(error)
        }

    }

    let [selectedvalue, setSelectValue] = useState('');
    let getStatus = (evt) => {
        // console.log(evt.target.value)
        setStatus(evt.target.value);
        setSelectValue(evt.target.value)
    }
    useEffect(() => { updateStatus(model2); console.log(model2) }, [status])


    const uploadFile = async (file, taskId) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await axios.post(baseUrlNEW + `/api/Task/UploadFile?taskId=${taskId}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data', },
            });
            console.log('File uploaded:', response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };


    let [selectedFile, setSelectedFile] = useState(null);
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        console.log("Selected file:", event.target.files[0]);
    };

    const handleUpload = (idd) => {
        if (selectedFile) {
            uploadFile(selectedFile, idd);
        } else {
            console.log("No file selected.");
        }
    };


    return (
        <div className='min-vh-100 py-5 my-5'>

            <div className="row justify-content-center">
                <div className="col-md-6 ">
                    <button className='btn btn-outline-success w-100' onClick={() => { setMy(true) }}>MY TASKS</button>
                </div>
                <div className="col-md-6 ">
                    <button className='btn btn-outline-warning w-100' onClick={() => { setMy(false) }}>alltasks</button>
                </div>

            </div>

            {my ?
                taskofdev.map((elem) => {
                    model.name = elem.name;
                    model.taskId = elem.id
                    model2.taskId = elem.id
                    return (
                        <div key={elem.id} className='bg-body-secondary my-3 p-5 shadow-lg rounded-5'>
                            <div className="row  ">
                                <div className="col-md-7">
                                    <div className='d-flex  gap-2 my-2'>
                                        <label className='text-main  '>TaskId:  </label>
                                        <p className=''>{elem.id}</p>
                                    </div>
                                    <div className='d-flex  gap-2 my-2'>
                                        <label className='text-main  '>TaskName:  </label>
                                        <p className=''>{elem.name}</p>
                                    </div>

                                    <div className='d-flex  gap-2 my-2'>
                                        <label className='text-main  '>Status:  </label>
                                        <p className=''>{elem.status == undefined || elem.status == "" ?
                                            <select className='  btn btn-outline-success' id="dropdown" selected={selectedvalue} onChange={getStatus} >
                                                <option value="" >--- select status ---</option>
                                                <option selected={selectedvalue == "To"} value="To">To</option>
                                                <option selected={selectedvalue == "In Progress"} value="In Progress">In Progress</option>
                                                <option selected={selectedvalue == "Done"} value="Done">Done</option>
                                            </select>
                                            :

                                            <select className=' btn btn-outline-success' id="dropdown" selected={elem.status} onChange={getStatus} >


                                                <option value="" >--- select status ---</option>
                                                <option selected={elem.status == "To"} value="To">To</option>
                                                <option selected={elem.status == "In Progress"} value="In Progress">In Progress</option>
                                                <option selected={elem.status == "Done"} value="Done">Done</option>

                                            </select>

                                        }</p>
                                    </div>


                                    <div className='d-flex  gap-2 my-2'>
                                        <label className='text-main  '>ProjectName:  </label>
                                        <p className=''>{elem.projectName}</p>
                                    </div>
                                    <div className='d-flex  gap-2 my-2'>
                                        <label className='text-main  '>DeveloperName:  </label>
                                        <p className=''>{elem.developerName} </p>
                                    </div>

                                    <div className='d-flex  gap-2 my-2'>
                                        {elem.status == "Done" ?
                                            <>
                                                <label className='text-main   '>Upload Your Attachment  :  </label>
                                                <input type="file" className='form-control w-50' onChange={handleFileChange} />
                                                <button className='btn btn-outline-success' onClick={() => { handleUpload(elem.id) }}>Upload File <i className="fa-solid fa-upload"></i></button>

                                            </> : null}

                                    </div>


                                    <div className='d-flex  gap-2 my-2'>
                                        <label className='text-main '>Uploaded Attachments:  </label>
                                        <p className=''>{elem.uploadedAttachment ? <p p className='fw-bolder text-danger'>Uploaded</p> : null}</p>
                                    </div>



                                </div>
                                <div className="col-md-5 d-flex flex-column shadow rounded-5 py-2">
                                    <label className='text-main text-center fs-4 py-1'>Description</label>
                                    <textarea className='btn btn-outline-success rounded-5' name="" value={elem.description} id="" cols="30" rows="8"></textarea>
                                </div>
                            </div>


                            <div className="row mt-3  pt-4">
                                <div className="col-md-8">
                                    <input type="text" onKeyDown={getText} placeholder='Enter Your Comment' className='form-control' />
                                </div>
                                <div className="col-md-4 ">
                                    <button onClick={addCommentDeveloper} className='btn btn-outline-success'>ADD Comment</button>
                                </div>
                            </div>

                            {elem?.comments?.map((elem) => {
                                return <div className="row mt-3  justify-content-center shadow rounded-5">

                                    <div className="col-md-7 w-50">
                                        <div className='d-flex  gap-2 my-2'>
                                            <p className='text-main'>{elem.role} </p>
                                        </div>
                                        <div className='d-flex  gap-2 my-2'>
                                            <p className='text-main'>{elem.name} </p>
                                        </div>



                                    </div>
                                    <div className="col-md-5    d-flex flex-column border border-black rounded-5 ">

                                        <p className='text-center'>{elem.text} </p>

                                    </div>


                                </div>

                            })}

                        </div>
                    )


                })

                :
                <div className='min-vh-100 bg-body-tertiary'>
                    <div className="container my-5 py-5">


                        {
                            alltasks.map((elem) => {
                                return <div className='bg-body-secondary my-3 p-5 shadow-lg rounded-5'>
                                    <div className="row  ">
                                        <div className="col-md-7">
                                            <div className='d-flex  gap-2 my-2'>
                                                <label className='text-main  '>TaskId:  </label>
                                                <p className=''>{elem.id}</p>
                                            </div>
                                            <div className='d-flex  gap-2 my-2'>
                                                <label className='text-main  '>TaskName:  </label>
                                                <p className=''>{elem.name}</p>
                                            </div>
                                            <div className='d-flex  gap-2 my-2'>
                                                <label className='text-main  '>Status:  </label>
                                                <p className=''>{elem.status}</p>
                                            </div>
                                            <div className='d-flex  gap-2 my-2'>
                                                <label className='text-main  '>ProjectName:  </label>
                                                <p className=''>{elem.projectName}</p>
                                            </div>
                                            <div className='d-flex  gap-2 my-2'>
                                                <label className='text-main  '>DeveloperName:  </label>
                                                <p className=''>{elem.developerName} </p>
                                            </div>

                                        </div>
                                        <div className="col-md-5 d-flex flex-column shadow rounded-5 py-2">
                                            <label className='text-main text-center fs-4 py-1'>Description</label>
                                            <textarea className='btn btn-outline-success rounded-5' name="" value={elem.description} id="" cols="30" rows="8"></textarea>
                                        </div>
                                    </div>

                                </div>
                            })
                        }

                    </div>
                </div>



            }

        </div>
    )
}
