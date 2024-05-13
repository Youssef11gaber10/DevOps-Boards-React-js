import React, { useContext, useEffect, useState } from 'react'
import { authContext } from '../../../Context/AuthContext';
import axios from 'axios';
import { baseUrlNEW } from '../../Shared/baseUrl';
import { Link } from 'react-router-dom';

export default function Task({ element: { id, name, description, status, developerName, projectName, uploadedAttachment, comments },func}) {

    let [commets, setComments] = useState([]);
    let [text, setText] = useState('');

    let [fileUrl, setFileUrl] = useState([]);

    let{token,role,givenName}=useContext(authContext);
    let model ={
        text:text,
        role:role,
        name:givenName,
        taskId:id
    }


    let getText=(evt)=>{
        setText(evt.target.value)
    }

    let addCommentTeamleader=async ()=>{
        try {

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            let { data } = await axios.post(baseUrlNEW + '/api/Task/TeamLeaderComment',model);
             console.log(data)
             func();
           
        } catch (error) {
            console.log(error)
        }
    }


    let viewTheAttachment = async()=>{
        try {

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            let { data } = await axios.get(baseUrlNEW + '/api/Task/UploadedAttachments');
             console.log(data)
            //  setFileUrl(data[1].uploadedAttachment)
             setFileUrl(data)
             console.log(fileUrl)
             
        } catch (error) {
            console.log(error)
        }
        
    }
    const handleDownload = (id) => {
        // Use the fileUrl to trigger the file download
        // This can be as simple as setting window.location.href to the fileUrl
        window.location.href = fileUrl[id];
      };

    useEffect(() => {  viewTheAttachment()}, [])



    useEffect(() => { setComments(comments) }, [comments])


    return (
        <div className='bg-body-secondary my-3 p-5 shadow-lg rounded-5'>
            <div className="row  ">

            <Link to={"/updatetask/" + id} className='nav-link'>
            <button className='btn btn-outline-warning w-100 py-3 my-3'> Update Task <i className="fa-solid fs-3 fa-wrench mx-3"></i></button>
            </Link>
                <div className="col-md-7">
                    <div className='d-flex  gap-2 my-2'>
                        <label className='text-main  '>TaskId:  </label>
                        <p className=''>{id}</p>
                    </div>
                    <div className='d-flex  gap-2 my-2'>
                        <label className='text-main  '>TaskName:  </label>
                        <p className=''>{name}</p>
                    </div>
                    <div className='d-flex  gap-2 my-2'>
                        <label className='text-main  '>Status:  </label>
                        <p className=''>{status}</p>
                    </div>
                    <div className='d-flex  gap-2 my-2'>
                        <label className='text-main  '>ProjectName:  </label>
                        <p className=''>{projectName}</p>
                    </div>
                    <div className='d-flex  gap-2 my-2'>
                        <label className='text-main  '>DeveloperName:  </label>
                        <p className=''>{developerName} </p>
                    </div>
                    {fileUrl[`${id}`]?


                    <div className='d-flex  gap-2 my-2'>
                        <label className='text-main   '>Uploaded Attachments:  </label>
                        <button className='btn btn-outline-danger' onClick={()=>{handleDownload(id)}}>Download File</button>
                    </div>
                    :null}


                </div>
                <div className="col-md-5 d-flex flex-column shadow rounded-5 py-2">
                    <label className='text-main text-center fs-4 py-1'>Description</label>
                    <textarea className='btn btn-outline-success rounded-5' name="" value={description} id="" cols="30" rows="8"></textarea>
                </div>
            </div>


            <div className="row mt-3  pt-4">
                <div className="col-md-8">
                    <input type="text" onKeyDown={getText}  placeholder='Enter Your Comment' className='form-control' />
                </div>
                <div className="col-md-4 ">
                    <button onClick={addCommentTeamleader} className='btn btn-outline-success'>ADD Comment</button>
                </div>
            </div>

            {commets.map((elem) => {
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
}
