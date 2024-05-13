import React, { useEffect, useState } from 'react'
import Product from '../Products/Product/Product'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../Shared/baseUrl';
import NotFoundProduct from '../../finalProject assets/no-products.png'
import Loading from '../Shared/Loading/Loading';

export default function ProductSubCategorey() {

    let { subcategoryId } = useParams();
    let [products, setProducts] = useState([])
    let [loading, setLoading] = useState(true);
    let [bg, setBg] = useState(false);


    async function getProductSubCategory(subcategoryId) {
        let { data: { data } } = await axios.get(baseUrl + 'products', { params: { subcategory: subcategoryId } });

        setProducts(data);
        setLoading(false);
        if (data[0] == undefined) {
            setBg(true)
        }
    }


    useEffect(() => { getProductSubCategory(subcategoryId) }, []);

    return (
        <div className='min-vh-100 py-5 my-5'>

            {loading && <Loading />}

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
