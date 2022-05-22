import React from 'react'
import axios from 'axios'

const getproductTypes = () => {
    axios.get('/api/product-types')
}
const EditProductsList = () => {
  return (
    <div>

    </div>
  )
}

export default EditProductsList