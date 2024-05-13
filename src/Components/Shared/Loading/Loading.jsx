import React from 'react'
import { Triangle } from 'react-loader-spinner'

export default function Loading() {
  return (
    <div className='d-flex justify-content-center align-items-center min-vh-100'>
      <Triangle
  height="300"
  width="300"
  color="#4fa94d"
  ariaLabel="triangle-loading"
  wrapperStyle={{}}
  wrapperClassName=""
  visible={true}
/>
    </div>
  )
}
