import React, { useEffect, useState } from 'react'
import { baseUrl } from '../Shared/baseUrl';
import axios from 'axios';
import Loading from '../Shared/Loading/Loading';
import Brand from './Brand';

export default function Brands() {

  let [brands, setBrands] = useState([]);
  let [loading, setLoading] = useState(true);


  async function getBrands() {
    try {

      let { data: { data: data1 } } = await axios.get(baseUrl + 'brands', { params: { page: 1 } });
      let { data: { data: data2 } } = await axios.get(baseUrl + 'brands', { params: { page: 2 } });
      setBrands([...data1, ...data2]);
      setLoading(false);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => { getBrands() }, [])


  return (

    <>
      <div div className='min-vh-100  py-5 my-5 ' >
        <div className="container  gx-3">

          <h2 className='fw-bolder text-center text-main fs-3 my-5'>OUR BRANDS</h2>

          {loading && <Loading />}

          <div className="row gy-4 ">

            {brands.map((elem) => {

              return <Brand element={elem} key={elem._id} load={loading} />

            })}


          </div>

        </div>
        
      </div >
    </>





  )
}

