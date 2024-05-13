import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';



export default function Product({ element: { imageCover, title, category: { name }, price, ratingsAverage, _id } }) {

  let [ wished, setWished ] = useState(false);

  return (
    <>

      <div className="col-sm-12 col-md-4 col-lg-3 my-3  cursor-pointer" >
        <div className="layout product rounded-5  bg-body-tertiary shadow px-3">

          <Link to={"/details/" + _id} className='nav-link'>

            <img src={imageCover} className='w-100 rounded-5 my-3  shadow' height={400} alt="" />
            <div className='d-flex justify-content-between ' >
              <div>
                <span className='text-main ' >{name}</span>
                <h5 className='fw-bolder'>{title.split(' ').slice(0, 2).join(' ')}</h5>
              </div>
              <span>{ratingsAverage} <i className='fa fa-star rating-color'></i></span>
            </div>
            <span>{price} EGP</span>

          </Link>

          <div className='d-flex justify-content-end position-relative'>

            {wished ? 
            <i  onClick={() => {  setWished(false) }} className="fa-solid fa-heart fs-3 position-absolute" style={{ top: '-36px', color: '#fc0303' }}></i> :

            <i onClick={() => {  setWished(true); }} className="fa-solid fa-heart fs-3 position-absolute" style={{ top: '-36px' }}></i>
            }

          </div>

          <button onClick={() => {  }} className='btn bg-main text-white w-100 my-3'>Add To Cart</button>

        </div>
      </div>

    </>
  )
}
