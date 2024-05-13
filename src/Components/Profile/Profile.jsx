import React, { useContext } from 'react'
import { authContext } from '../../Context/AuthContext'

import { baseUrl } from '../Shared/baseUrl';
import axios from 'axios';
import { notify } from '../Shared/notify';

export default function Profile() {

  let { token, setToken, givenName,role,email } = useContext(authContext);


  return (
    <>

      <div className='min-vh-100 d-flex flex-column justify-content-evenly  my-5'>
        <div className="container">

          <h2 className='text-center fw-bolder  '>welcome <span className='text-main'>{givenName}</span></h2>
          <h2 className='fw-bold my-5 text-center '>Your Personal Data</h2>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <label className='text-main' >Name</label>
              <input value={givenName} className='form-control my-2' />
              <label className='text-main' >Role</label>
              <input value={role} className='form-control my-2' />
              <label className='text-main' >Email</label>
              <input value={email} className='form-control my-2' />
            

            </div>
          </div>






        </div>




      </div>
    </>
  )
}
