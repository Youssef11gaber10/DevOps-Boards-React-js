import React, { useState } from 'react'


import Products from '../Products/Products'
import Loading from '../Shared/Loading/Loading'


export default function Home() {



  return (
    <div className='min-vh-100  ' >

      <Products home={true}  />


    </div>

  )
}
