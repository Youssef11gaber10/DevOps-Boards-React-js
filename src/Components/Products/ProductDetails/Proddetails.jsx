import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { baseUrl } from '../../Shared/baseUrl'
import Loading from '../../Shared/Loading/Loading'


export default function Proddetails() {

  
  let [loading, setLoading] = useState(true)
  let [details, setDetails] = useState({})
  let [image, setImage] = useState(false);
  let { id } = useParams()

  let { imageCover, title, description, price, ratingsAverage } = details;


  let getProductDetailsApi = async () => {
    try {

      let { data: { data } } = await axios.get(baseUrl + `products/${id}`);
      setDetails(data);
      setLoading(false)


    } catch ({ response: { data: { message } } }) {
      console.log(message);
    }
  }

  useEffect(() => { getProductDetailsApi() }, []);


  function openPhoto(e) {
    setImage(e.target.src);
  }
  function closePhoto(e) {
    setImage(false);
  }
  function stopPhoto(e) {
    e.stopPropagation();
  }



  return (
    <>
      {loading && <Loading />}

      {!loading && <div className="container pt-5 mt-5">

        <div className="row" >

          <div className="col-sm-12  col-md-4 pb-5 ">
            <img src={imageCover} className='w-100 shadow-lg rounded-5' alt="" />
          </div>

          <div className="col-sm-12 col-md-8  ">

            <h4 className='fw-bolder'>{title}</h4>
            <p className='text-muted'>{description}</p>
            <span className='fw-bolder'>{details.category?.name}</span>
            <div className='d-flex justify-content-between my-3'>
              <span>Price: {price}</span>
              <span>{ratingsAverage} <i className='fa fa-star rating-color'></i></span>
            </div>

            <button onClick={() => {}} className='btn bg-main text-white w-100 '> + add to Cart</button>


            <div className='d-flex justify-content-center  mt-5 cursor-pointer'>
              <img onClick={openPhoto} src={details.images[0]} className='w-100 ' height={160} alt="" />
              <img onClick={openPhoto} src={details.images[1]} className='w-100 ' height={160} alt="" />
              <img onClick={openPhoto} src={details.images[2]} className='w-100 ' height={160} alt="" />
              <img onClick={openPhoto} src={details.images[3]} className='w-100 ' height={160} alt="" />
            </div>



          </div>

        </div>

      </div>}


      {image ? <div onClick={closePhoto} className='fixed-top vh-100 d-flex justify-content-center align-items-center ' style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>

        <img onClick={stopPhoto} src={image} className='w-50' alt="" />

      </div>

        : null}


    </>
  )
}
