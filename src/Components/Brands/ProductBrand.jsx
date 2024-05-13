import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { baseUrl } from '../Shared/baseUrl';
import Product from '../Products/Product/Product';
import NotFoundProduct from '../../finalProject assets/no-products.png'
import Loading from '../Shared/Loading/Loading';

export default function ProductBrand() {
    let { brandId } = useParams();
    let [products, setProducts] = useState([]);
    let[loading,setLoading]=useState(true);
    let[bg,setBg]=useState(false);


    async function getProductbrand(brandId) {
        let { data: { data } } = await axios.get(baseUrl + 'products', { params: { brand: brandId } });

        setProducts(data);

        setLoading(false);

        if(data[0]==undefined)
        {
            setBg(true);
        }

    }
    useEffect(() => { getProductbrand(brandId) }, []);


    return (
        <div className='min-vh-100 py-5 my-5'>
            
            {loading&&<Loading/>}

            {bg ?

                <div className='d-flex justify-content-center align-items-center'>
                    <img src={NotFoundProduct} className='w-100' alt="" />

                </div> : null}


            <div className="container-fluid ">
                <div className="row">

                    {products.map((elem) => {
                        
                        return <Product key={elem._id} element={elem} />

                    })}


                </div>
            </div>


        </div>
    )
}
