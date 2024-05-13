import React from 'react'
import notfoundImg from '../../../finalProject assets/imgs/error.svg'
import Navbar from '../../Navbar/Navbar'
import Footer from '../../Footer/Footer'

export default function Notfound() {
    return (
        <>
            <Navbar />
            <div className=' d-flex justify-content-center min-vh-100'>
                <img src={notfoundImg} alt="" />
            </div>

            <Footer />
        </>
    )
}
