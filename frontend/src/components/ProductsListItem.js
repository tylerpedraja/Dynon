import axios from 'axios'
import React, { useState, useEffect } from 'react'

const ProductsListItem = ({ product }) => {
    const [removed, setRemoved] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const deleteProductHandler = () => {
        axios.put(`/api/product/${product._id}/remove`)
        setRemoved(true)
        setShowDeleteModal(false)
    }

    return (
        <>
            {!removed && (
                <li className="list-group-item" style={{ minHeight: '40px' }}>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div>
                            <img src="https://www.beautycounter.com/images/placeholder.jpg" className="img-fluid me-3" style={{ maxHeight: '40px' }} />
                            {product.name}
                        </div>
                        <div className="actions">
                            <i className="fa-solid fa-trash" onClick={() => setShowDeleteModal(true)} />
                        </div>
                    </div>
                </li>
            )}
            {
                showDeleteModal && (
                    <div className="modal d-block" tabindex="-1" role="dialog">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Delete</h5>
                                </div>
                                <div className="modal-body">
                                    <p>Do you really want to delete this item?</p>
                                    {product.name}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" onClick={deleteProductHandler}>Delete</button>
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default ProductsListItem