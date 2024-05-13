import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../Shared/baseUrl';
import Product from './Product/Product';
import Loading from '../Shared/Loading/Loading';


export default function Products({  home }) {


  let [loading, setLoading] = useState(true);
  let [products, setProducts] = useState([]);
  let [searchBase, setSearchBase] = useState('');
  let [searched, setSearched] = useState(false);

  useEffect(() => { getProductsApi() }, []);

  let getProductsApi = async () => {
    try {

      let { data: { data: data1 = [] } = {}, } = await axios.get(baseUrl + 'products', { params: { page: 1 } });
      let { data: { data: data2 = [] } = {}, } = await axios.get(baseUrl + 'products', { params: { page: 2 } });
      setProducts([...data1, ...data2]);
      setLoading(false);


    } catch ({ response: { data: { message = {} } = {} } = {} }) {
      console.log(message);
    }
  }


  useEffect(() => {
    if (home) {
      setLoading(false)
    }
  }, [])

  function search(e) {
    setSearchBase(e.target.value);

  }


  return (
    <>

      {loading && <Loading />}

      <div className="container-fluid pt-5 mt-5 ">

        <input onKeyDown={search} onClick={() => { setSearched(true); }} type="search" placeholder='SEARCH.......' className='form-control w-75 m-auto my-5' />


        <div className="row">
          {products.map((elem) => {

            if (elem.title.toLowerCase().includes(searchBase.toLocaleLowerCase()) && searched) {

              return <Product key={elem._id} element={elem} />

            }
            else {

              if (!searched) {
                return <Product key={elem._id} element={elem} />
              }

            }

          })}


        </div>




      </div>


    </>
  )
}


