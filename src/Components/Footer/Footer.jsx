import React from 'react'
import googlePlay from '../../finalProject assets/footerlogos/google-play.282dcbeaa4af842e660f.png'
import appStore from '../../finalProject assets/footerlogos/تنزيل.png'
import paypal from '../../finalProject assets/footerlogos/paypal.094f70a042c1bba937c4.png'
import mastercard from '../../finalProject assets/footerlogos/masterCard.9a944b84eb1d7a7a8ca1.png'
import amazonpay from '../../finalProject assets/footerlogos/amazon1.88ec6c49877ff812455f.png'
import amExpress from '../../finalProject assets/footerlogos/americanExpress.8e8c8c471f03caa7d1a3.png'

export default function Footer() {
  return (
    <>
      <div className="foot container-fluid bg-body-tertiary mt-5 py-5 ">
        
        <div className="row ">

          <div className="col-md-12">

            <h2 className='fw-bolder'>GET THE FRESH CART APP</h2>
            <p className='text-muted'>we will send you a link, open it in your phone to download the app</p>
          </div>
    

        </div>


        <hr />

        <div className="row my-4">

          <div className="col-lg-10 d-flex justify-content-center px-sm-4">
            <input type="email" className='form-control' placeholder='Email...' />
          </div>

          <div className="col-lg-2 d-flex justify-content-center px-4">
            <button className='btn w-100 my-sm-3 my-lg-0  bg-main text-white'>Share App Link</button>
          </div>

        </div>

        <hr />

        <div className="row d-flex justify-content-between ">


          <div className="col-lg-7 pt-sm-5">
            <span>Payment Partners :</span>
            <img src={paypal} style={{ width: '15%' }} alt="" />
            <img src={mastercard} style={{ width: '15%' }} alt="" />
            <img src={amazonpay} style={{ width: '15%' }} alt="" />
            <img src={amExpress} style={{ width: '15%' }} alt="" />
          </div>


          <div className=" col-lg-5    pt-sm-5 ">
            <span className='d-inline-block  w-50'>Get Deliever with <span className='text-main'>Fresh Cart</span></span>
            <img src={appStore} className='w-25' alt="" />
            <img src={googlePlay} className='w-25' alt="" />
          </div>


        </div>


        <hr/>


        <div className='d-flex justify-content-center align-items-center pt-3'>

          <h6 className='fw-bolder text-muted'> Developed By Youssef Gaber © All Rights Reserved</h6>

        </div>

      </div>
    </>

  )
}
