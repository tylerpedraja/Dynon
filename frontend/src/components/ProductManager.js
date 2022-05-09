import React from 'react'
import Banner from './Banner/Banner'
import EditProductsList from './EditProductsList'

const ProductManager = () => {
  return (<>
        <Banner title={"Dynon Skyview Order Worksheet"}
                subtitle={"Manage Products"}/>
        <EditProductsList />
    </>
  )
}

export default ProductManager