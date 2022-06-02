import React, { useState, useEffect } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import DeleteProductModal from './DeleteProductModal';

const ProductEdit = () => {
    const location = useLocation()
    const navigate = useNavigate();
    const { product } = location.state
    const { productTypes } = location.state
    const [name, setName] = useState(product.name)
    const [price, setPrice] = useState(product.price)
    const [part_number, setPartNumber] = useState(product.part_number)
    const [qty_in_stock, setQtyInStock] = useState(product.qty_in_stock)
    const [showDeleteModal, setShowDeleteModal] = useState(false)


    const handleNameInput = (e) => { setName(e.target.value) }
    const handlePriceInput = (e) => { setPrice(e.target.value) }
    const handlePartNumberInput = (e) => { setPartNumber(e.target.value) }
    const handleQtyInStockInput = (e) => { setQtyInStock(e.target.value) }

    const handleSave = async () => {
        const data = {
            _id: product._id,
            name: name,
            price: price,
            qty_in_stock: qty_in_stock,
            part_number: part_number
        }

        await axios.put('/api/product', data)
        navigate('../product-manager')
    }

    const hideDeleteModal = () => {
        setShowDeleteModal(false)
    }

    return (
        <>
            <div className="container">
                <div className="d-flex align-items-center justify-content-end my-4">
                    <Link className="btn-inline btn btn-outline-secondary me-2 me-auto" to={'/product-manager'}>Return</Link>
                    <button className="btn-inline btn btn-outline-danger me-2" onClick={() => { setShowDeleteModal(true) }}>Delete</button>
                    <button className="btn-inline btn btn-primary" onClick={handleSave}>Save</button>
                </div>
                <div className="row align-items-center">
                    <div className="col-md-4">
                        <img src="https://www.beautycounter.com/images/placeholder.jpg" alt="placeholder image" className="img-fluid" />
                    </div>
                    <div className="col">
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
                            <div className="col-2 fw-bold">Qty. in stock:</div>
                            <div className="col"><input className="form-control" value={qty_in_stock} onChange={handleQtyInStockInput} /></div>
                        </div>
                    </div>
                </div>
            </div>
            <DeleteProductModal show={showDeleteModal} product={product} hide={hideDeleteModal} />
        </>
    )
}

export default ProductEdit