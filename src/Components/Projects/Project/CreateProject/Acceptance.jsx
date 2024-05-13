import React, { useContext } from 'react'
import { authContext } from '../../../../Context/AuthContext'
import { useNavigate, useParams } from 'react-router-dom';
import { baseUrlNEW } from '../../../Shared/baseUrl';
import axios from 'axios';

export default function Acceptance() {
  let { username, givenName,token } = useContext(authContext);
  let { id } = useParams()
  const navigate = useNavigate();

  let acceptProject = async () => {

    try {
       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      let { data } = await axios.put(baseUrlNEW + `/api/Project/accept?userName=${username}&projectId=${id}`);
      console.log(data);
      
      navigate(`/projectDeveloper`);
      
      
      
    } catch (error) {
      console.log(error)
    }
  }
  let rejectProject = async () => {
    try {
      
      // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      let { data } = await axios.put(baseUrlNEW + `/api/Project/reject?userName=${username}&projectId=${id}`);
      console.log(data);
      navigate(`/projectDeveloper`);
      
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className='min-vh-100 py-5 my-5 '>

      <div className="row justify-content-center ">
        <div className="col-md-6">
          <h2>{givenName} You Have Offerd To Work On This Project</h2>
          <button className='btn btn-outline-success' onClick={acceptProject}>Accept</button>
          <button className='btn btn-outline-danger' onClick={rejectProject}>Reject</button>

        </div>
      </div>


    </div>
  )
}
