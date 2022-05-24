import React, { useState } from 'react'

const ProductsListItem = (props, handleDelete) => {
    const [removed, setRemoved] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const deleteProductHandler = () => {
        setRemoved(true)
        setShowDeleteModal(false)
    }

    const pointerCursor = {
        cursor: 'pointer'
    }

    return (
        <>
            {!removed && (
                <li className="list-group-item" style={{ minHeight: '40px' }}>
                    <div className='d-flex align-items-center'>
                        <div>
                            <img src="https://www.beautycounter.com/images/placeholder.jpg" className="img-fluid me-3" style={{ maxHeight: '40px' }} />
                        </div>
                        <div className="small">
                            <div className="fw-light">{props.product.name}</div>
                            <div>Type: {props.product.type}</div>
                        </div>
                        <div className="actions ms-auto">
                            <i className="fa-solid fa-pencil me-3" style={pointerCursor} onClick={() => setShowDeleteModal(true)} />
                            <i className="fa-solid fa-trash" style={pointerCursor} onClick={() => setShowDeleteModal(true)} />
                        </div>
                    </div>
                </li>
            )}
            {
                showDeleteModal && (
                    <div className="modal d-block" tabIndex="-1" role="dialog">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Delete</h5>
                                </div>
                                <div className="modal-body">
                                    <p>Do you really want to delete this item?</p>
                                    {props.product.name}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" onClick={() => props.deleteRecord(props.product._id)}>Delete</button>
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