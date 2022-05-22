import React, { useState, useEffect } from 'react'
import ProductsListItem from './ProductsListItem'
import axios from 'axios'

const ProductsList = () => {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [productTypes, setProductTypes] = useState([])

  const getProducts = async () => {
    try {
      const { data } = await axios.get('/api/products')
      setProducts(data)
    } catch (err) {
      console.error(err);
    }
  }

  const getProductTypes = async () => {
    try {
      const { data } = await axios.get('/api/product-types')
      setProductTypes(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(true)
  }

  const handleDelete = (id) => {
    axios.put(`/api/product/${id}/remove`)
  }

  const spinner = () => {
    return (
      <div className="spinner-border d-block mx-auto mt-5" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  };


  useEffect(() => {
    getProducts()
    getProductTypes();
  }, [])

  if (!loading) return spinner()

  return (<>
    {products.length == 0 ? <div className="lead text-center mt-5">No Products...</div> : (
      <ul className="list-group mt-2">
        {products.map((product) => (
          <ProductsListItem key={product._id} product={product} deleteRecord={handleDelete} />
        ))}
      </ul>
    )}
  </>
  )
}

export default ProductsList