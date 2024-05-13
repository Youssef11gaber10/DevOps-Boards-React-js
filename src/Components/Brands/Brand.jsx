import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Brand({ element: { image, name, _id } }) {
  return (

    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3  ">
      <Link className='nav-link' to={'/productbrand/' + _id}>

        <div className="border border-1 shadow rounded-5">
          <img src={image} alt="" className='w-100 rounded-5' />
          <h2 className='fw-bolder text-center'>{name}</h2>
        </div>

      </Link>

    </div>
  )
}
