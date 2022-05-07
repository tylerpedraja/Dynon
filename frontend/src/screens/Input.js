import React, { useState, useEffect } from 'react'
import Banner from '../components/Banner/Banner'
import axios from 'axios'
import ProductTypeInput from '../components/ProductTypeInput'

const Input = () => {
  const [productTypeEditor, setProductTypeEditor] = useState(false)
  const [productTypes, setProductTypes] = useState([])
  const [selecteProductType, setSelectedProductType] = useState('')
  const [productSubtypes, setProductSubtypes] = useState([])
  const [selectedProductSubtype, setSelectedProductSubtype] = useState('')
  const [price, setPrice] = useState(0)
  const [loaded, setLoaded] = useState(false)

  const getProductTypes = async () => {
    try {
      const { data } = await axios.get('/api/product-types');
      setProductTypes(data)
      setLoaded(true)
    } catch (error) {
      console.error(error);
    }
  }
 
  const formatTitle = (value) => {
    let words = value.split(" ");
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
      words = words.join(" ");
      return words
  }
  }

  const formatCurrency = (value) => {
    const formatted = value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    })
    return formatted
  }

  const spinner = () => {
    return (
      <div className="spinner-border d-block mx-auto mt-5" role="status">
          <span className="sr-only">Loading...</span>
      </div>
    )
  }

  const handlePriceInput = (e) => {
    setPrice(e.target.value);
  }

  const getSubtypes = () => {
    let subtypes = productTypes.filter((type) => {
      return type.type === selecteProductType
    })
    subtypes = subtypes[0].subtypes;
    setProductSubtypes(subtypes)
    
  }

  const handleProductTypeSelect = (value) => {
    if (value == 'other') {
      setSelectedProductType('')
      setProductTypeEditor(true)
    } else {
      setSelectedProductType(value)
      setProductTypeEditor(false)
    }
  }

  const handleSubtypeSelect = (value) => {
    setSelectedProductSubtype(value)
  }

  const handleSubmitProduct = (e) => {
    // e.preventDefault();
  }

  useEffect(() => {
    getProductTypes();

  }, [])
  
  useEffect(() => {
    if (selecteProductType != []) {
      getSubtypes()
    }
    console.log('selectedProductSubtype: ', selectedProductSubtype);

  }, [selecteProductType])

  return (
    <>
    <Banner title={'Dynon Skyview Order Worksheet'} subtitle={'Add a Product'} />
    {loaded ? (
      <div>
        {productTypeEditor && <ProductTypeInput />}
        <div className="container">
          <h1 className="h5 mt-5 mb-2">Add a Product</h1>
          <form>
          <div className="row ">
              <div className="col-md-6 mt-3">
                <div className="form-group">
                  <label>Product Type</label>
                  <select className="form-select"
                          onChange={({ target: { value } }) => handleProductTypeSelect(value)}
                          required>
                            <option value="">Select One</option>
                    {productTypes.map((type) => {
                      return (
                      <option value={type.type}>{formatTitle(type.type)}</option>
                      )
                    })}
                    <option value="other">{formatTitle('other')}</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6 mt-3">
                <div className="form-group">
                  <label>Subype</label>
                  <select className="form-select"
                          onChange={({ target: { value } }) => handleSubtypeSelect(value)}
                          required>
                    {productSubtypes.map((subtype) => {
                      return (
                        <option>{subtype.name}</option>
                      )
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div className="row ">
              <div className="col-md-6 mt-3">
                <div className="form-group">
                  <label>Part Number</label>
                  <input type="text" className="form-control" placeholder="Enter part number" />
                </div>
              </div>
              <div className="col-md-6 mt-3">
                <div className="form-group">
                  <label>Product Name</label>
                  <input type="" className="form-control" placeholder="Enter product name" />
                </div>
              </div>
            </div>
            <div className="row ">
              <div className="col-md-6 mt-3">
                <div className="form-group">
                  <label>Price</label>
                  <input type="currency" className="form-control" placeholder="Enter price" onChange={handlePriceInput} value={formatCurrency(price)} />
                  <small id="emailHelp" className="form-text text-muted">This is the pre-tax price of the item</small>
                </div>
              </div>
              <div className="col-md-6 mt-3">
                <div className="form-group">
                  <label>Quantity in stock</label>
                  <input type="number" className="form-control" placeholder="Enter quantity in stock" />
                </div>
              </div>
            </div>
            <button disabled={productTypeEditor ? true : false} onClick={handleSubmitProduct} className="btn btn-primary mt-3">Add Product</button>
          </form>
        </div>
      </div>
    ) : spinner()}
    </>
  )
}

export default Input