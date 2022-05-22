import React from 'react'
import { Link } from 'react-router-dom'
import Banner from '../components/Banner/Banner'
import ProductsList from '../components/ProductManagerComponents/ProductsList'

const ProductManager = () => {
  return (
    <>
      <Banner title={'Dynon Skyview Order Worksheet'} subtitle={'Manage Products'} />
      {/* add product button here that foes to <Input /> */}
      <div className="container">
        <div className='d-flex justify-content-end mt-4'>
          <Link className="btn btn-primary" to="/input-product"><i className="fa-solid fa-plus" /> Add Product</Link>
        </div>
        <ProductsList />
      </div>
    </>
  )
}

export default ProductManager