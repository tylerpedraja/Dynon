import React, { useState, useEffect } from 'react'
import ProductsListItem from './ProductsListItem'
import axios from 'axios'

const ProductsList = () => {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])

  const getProducts = async () => {
    try {
      const { data } = await axios.get('/api/products')
      console.log(data);
      setProducts(data)
    } catch (err) {
      console.error(err);
    }
    setLoading(true)
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
  }, [])

  if (!loading) return spinner()

  return (<>
    {products.length == 0 ? <div className="lead text-center mt-5">No Products...</div> : (
      <ul className="list-group mt-2">
        {products.map((product) => (
          <ProductsListItem key={product._id} product={product} />
        ))}
      </ul>
    )}
  </>
  )
}

export default ProductsList