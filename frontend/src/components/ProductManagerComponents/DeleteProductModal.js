import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const DeleteProductModal = (props) => {
    const navigate = useNavigate()

    const deleteRecord = () => {
        axios.put(`/api/product/${props.product._id}/remove`)
        props.hide();
        navigate('/product-manager')
    }

    return (
        <>
            {props.show && (
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
                                <button type="button" className="btn btn-danger" onClick={() => deleteRecord()}>Delete</button>
                                <button type="button" className="btn btn-secondary" onClick={() => props.hide()}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default DeleteProductModal