import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DeleteProductModal from './DeleteProductModal'
import axios from 'axios'

const ProductsListItem = (props, handleDelete) => {
    const [removed, setRemoved] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const hideDeleteModal = () => {
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
                            <Link to={'/edit-product'} state={{
                                product: props.product,
                                productTypes: props.productTypes
                            }}>
                                <i className="fa-solid fa-pencil me-3 text-dark" style={pointerCursor} />
                            </Link>
                            <i className="fa-solid fa-trash" style={pointerCursor} onClick={() => setShowDeleteModal(true)} />
                        </div>
                    </div>
                </li>
            )}
            <DeleteProductModal product={props.product} hide={hideDeleteModal} show={showDeleteModal} />
        </>
    )
}

export default ProductsListItem