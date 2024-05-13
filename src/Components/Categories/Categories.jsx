import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../Shared/baseUrl'
import Loading from '../Shared/Loading/Loading';
import { Link } from 'react-router-dom';



export default function Categories() {

  let [categories, setCategoires] = useState([]);
  let [subcategories, setSubategoires] = useState([]);
  let [loading, setLoading] = useState(true);
  let [prevId, setPrevId] = useState('');

  async function getCategories() {

    try {

      let { data: { data = [] } = {} } = await axios.get(baseUrl + 'categories');
      setCategoires(data);
      setLoading(false);

    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => { getCategories() }, []);

  async function getSpSubCategory(categoryId) {

    try {

      let { data: { data = [] } = {} } = await axios.get(baseUrl + 'categories/' + categoryId + '/subcategories');
      setSubategoires(data);

    } catch (error) {

      console.log(error);

    }
  }


  return (


    <div className='min-vh-100 py-5 my-5'>

      {loading && <Loading />}

      <div className="container-fluid">

        <div className="row  gy-5 ">

          {categories.map(({ name, image, _id: categoryId }) => {

            return <div key={categoryId}
              onMouseMove={() => {

                if (prevId == '' || prevId != categoryId) {

                  getSpSubCategory(categoryId);
                  setPrevId(categoryId);

                }

                if (prevId == categoryId) {

                  return;
                }

              }}

              className="col-sm-12 col-md-6 col-lg-4 col-xl-3  position-relative cursor-pointer">

              <Link to={'/productcategory/' + categoryId} className='nav-link' >

                <div className="layer  text-main shadow rounded-5">
                  <img src={image} className='w-100 rounded-top-5' height={500} alt="" />
                  <h2 className='text-center py-3'>{name}</h2>
                </div>

              </Link>


              <div className="row gy-3 position-absolute z-3">
                {subcategories.map(({ name, _id, category }) => {
                  if (category == categoryId) {

                    return <div key={_id} className="col-md-12 d-flex justify-content-center text-center   ">
                      <div className="layer shadow-lg w-100 py-3 shadow-lg rounded-5 bg-body-tertiary cursor-pointer " >

                        <Link className='nav-link' to={'/productsubcategory/'+_id}>

                          <span className='text-main w-100 '>{name}</span>

                        </Link>

                      </div>

                    </div>
                  }
                  else {

                    return <div key={_id}></div>;

                  }
                })}
              </div>


            </div>

          })
          }



        </div>

      </div>
    </div>
  )
}
