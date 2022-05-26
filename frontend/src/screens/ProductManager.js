import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Banner from '../components/Banner/Banner'
import ProductsList from '../components/ProductManagerComponents/ProductsList'
import axios from 'axios'



const ProductManager = () => {
  const [productTypes, setProductTypes] = useState([])
  const [filter, setFilter] = useState('default')

  const getProductTypes = async () => {
    try {
      const { data } = await axios.get('/api/product-types')
      setProductTypes(data);
    } catch (err) {
      console.error(err);
    }
  }

  const handleclickFilter = (e) => {
    setFilter(e.target.text);
  }

  useEffect(() => {
    getProductTypes()
  }, [])

  return (
    <>
      <Banner title={'Dynon Skyview Order Worksheet'} subtitle={'Manage Products'} />
      {/* add product button here that foes to <Input /> */}
      <div className="container">
        <div className='d-flex justify-content-end mt-4'>
          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle me-2" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              Filter
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li value={'default'} onClick={handleclickFilter}><a className="dropdown-item" href="#">Default</a></li>
              <div className="dropdown-divider"></div>
              {productTypes.map((type, index) => {
                return <li key={index} value={type.type} onClick={handleclickFilter}><a className="dropdown-item" href="#">{type.type}</a></li>
              })}

            </ul>
          </div>
          <Link className="btn btn-primary" to="/input-product"><i className="fa-solid fa-plus" /> Add Product</Link>
        </div>
        <ProductsList filter={filter.toLowerCase()} productTypes={productTypes} />
      </div>
    </>
  )
}

export default ProductManager