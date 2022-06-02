import React, { useState, useEffect } from 'react'
import ProductsListItem from './ProductsListItem'
import axios from 'axios'

const ProductsList = (props) => {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])

  const init = async () => {
    await getProducts()
    filterProducts()
  }

  const getProducts = async () => {
    try {
      const { data } = await axios.get('/api/products')
      setProducts(data)
    } catch (err) {
      console.error(err);
    }
    setLoading(true)
  }

  const filterProducts = () => {
    const filter = props.filter

    let filteredProducts = products

    if (filter !== 'default') {
      filteredProducts = products.filter((product) => {
        return product.type.toLowerCase() == filter
      })
    }

    setFilteredProducts(filteredProducts);
  }



  const spinner = () => {
    return (
      <div className="spinner-border d-block mx-auto mt-5" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  };

  const capitalize = (str) => {
    const lower = str.toLowerCase()
    return str.charAt(0).toUpperCase() + lower.slice(1);
  }


  useEffect(() => {
    init()
  }, [props.filter])

  useEffect(() => {
    filterProducts()
  }, [products])

  if (!loading) return spinner()

  return (<>
    <h4 className="my-3">{props.filter !== 'default' && capitalize(`${props.filter}`)} Products: ( {filteredProducts.length} )</h4>
    {products.length == 0 ? <div className="lead text-center mt-5">No Products...</div> : (
      <ul className="list-group mt-2">
        {filteredProducts.map((product) => (
          <ProductsListItem key={product._id} product={product} productTypes={props.productTypes} />
        ))}
      </ul>
    )}
  </>
  )
}

export default ProductsList