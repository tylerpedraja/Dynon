import React, { useState, useEffect } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const ProductEdit = () => {
    const location = useLocation()
    const navigate = useNavigate();
    const { product } = location.state
    const { productTypes } = location.state
    
    const [name, setName] = useState(product.name)
    const [price, setPrice] = useState(product.price)
    const [type, setType] = useState(product.type)
    const [part_number, setPartNumber] = useState(product.part_number)
    const [subtypes, setSubtypes] = useState(getSubtypes())
    const [subtype, setSubtype] = useState(product.subgroup)
    const [qty_in_stock, setQtyInStock] = useState(product.qty_in_stock)
    const [currentSubtypes, setCurrentSubtypes] = useState(subtypes)


    const handleNameInput = (e) => {setName(e.target.value)}
    const handlePriceInput = (e) => {setPrice(e.target.value)}
    const handlePartNumberInput = (e) => {setPartNumber(e.target.value)}
    
    
    const handleTypeInput = (e) => {
        setType(e.target.value)
        setSubtypes(getSubtypes())
        setCurrentSubtypes(subtypes)
    }

    const handleSubtypeInput = (e) => {setSubtype(e.target.value)}
    const handleQtyInStockInput = (e) => {setQtyInStock(e.target.value)}

    function getSubtypes () {
        let currentProductType,
            subtypes = []

        currentProductType = productTypes.filter((productType) => {
            return productType.type == type
        })
        
        currentProductType.forEach((productType) => {
            productType.subtypes.forEach((subtype) => {
                subtypes.push(subtype.name)
            })
        })
        
        return subtypes
    }

    const handleSave = async () => {
        const data = {
            _id: product._id,
            name: name,
            price: price,
            type: type,
            subgroup: subtype,
            qty_in_stock: qty_in_stock,
            part_number: part_number
        }

        await axios.put('/api/product', data)
        navigate('../product-manager')
    }

    return (
        <>
            <div className="container">
                <div className="d-flex align-items-center justify-content-end my-4">
                    <Link className="btn-inline btn btn-outline-secondary me-2 me-auto" to={'/product-manager'}>Return</Link>
                    <button className="btn-inline btn btn-outline-danger me-2">Delete</button>
                    <button className="btn-inline btn btn-primary" onClick={handleSave}>Save</button>
                </div>
                <div className="row align-items-center">
                    <div className="col-md-4">
                        <img src="https://www.beautycounter.com/images/placeholder.jpg" alt="placeholder image" className="img-fluid" />
                    </div>
                    <div className="col">
                        {/* info */}
                        <div className="row align-items-center mb-3">
                            <div className="col-2 fw-bold">Name:</div>
                            <div className="col"><input className="form-control" value={name} onChange={handleNameInput} /></div>
                        </div>
                        <div className="row align-items-center mb-3">
                            <div className="col-2 fw-bold">Price:</div>
                            <div className="col"><input className="form-control" value={price} onChange={handlePriceInput} /></div>
                        </div>
                        <div className="row align-items-center mb-3">
                            <div className="col-2 fw-bold">Part Number:</div>
                            <div className="col"><input className="form-control" value={part_number} onChange={handlePartNumberInput} /></div>
                        </div>
                        <div className="row align-items-center mb-3">
                            <div className="col-2 fw-bold">Type:</div>
                            <div className="col">
                                <select className="form-control" value={type} onChange={handleTypeInput}>
                                    {productTypes.map((type, index) => {
                                    return <option key={index} value={type.type}>{type.type}</option>
                                    })}
                                </select>
                                </div>
                        </div>
                        <div className="row align-items-center mb-3">
                            <div className="col-2 fw-bold">Subtype:</div>
                            <div className="col">
                                <select className='form-control' >
                                    {currentSubtypes.map((subtype, index) => {
                                        return <option key={subtype} value={subtype}>{subtype}</option>
                                    })}
                                </select>
                                </div>
                        </div>
                        <div className="row align-items-center mb-3">
                            <div className="col-2 fw-bold">Qty. in stock:</div>
                            <div className="col"><input className="form-control" value={qty_in_stock} onChange={handleQtyInStockInput} /></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductEdit