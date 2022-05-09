import React, {useState } from 'react'
import axios from 'axios';

const ProductTypeInput = () => {
    const [type, setType] = useState('');
    const [title, setTitle] = useState('');
    const [header, setHeader] = useState('');
    const [description, setDescription] = useState('')

    const handleTypeInput = (e) => {
        setType(e.target.value)
    }
    const handleTitleInput = (e) => {
        setTitle(e.target.value)
    }
    const handleHeaderInput = (e) => {
        setHeader(e.target.value)
    }
    const handleDescriptionInput = (e) => {
        setDescription(e.target.value)
    }

    const handleSubmit = () => {
        axios.post('api/product-types', {
            type: type,
            title: title,
            description: description,
            header: header
        })
    }

    return (
        <>
            <div class="container-fluid pb-3"
                style={
                    {backgroundColor: '#E7E9EB'}
            }>
                <div className="container">
                    <h1 className="h5 text-success pt-3">Add a Product Type</h1>
                    <form className="mb-4">
                        <div className="row">
                            <div className="col-md-4 mt-3">
                                <div class="form-group">
                                    <label>Type</label>
                                    <input type="text" required class="form-control" placeholder='Ex. "Harnesses"'
                                        value={type}
                                        onChange={handleTypeInput}/>
                                </div>
                            </div>
                            <div className="col-md-4 mt-3">
                                <div class="form-group">
                                    <label>Info Title</label>
                                    <input type="text" required class="form-control" placeholder="Ex. Choose Your Display Configuration"
                                        value={title}
                                        onChange={handleTitleInput}/>
                                </div>
                            </div>
                            <div className="col-md-4 mt-3">
                                <div class="form-group">
                                    <label>FYI Header</label>
                                    <input type="text" required class="form-control" placeholder='Ex. "How many displays do I need?"'
                                        value={header}
                                        onChange={handleHeaderInput}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col mt-3">
                                <div class="form-group">
                                    <label>FYI Description</label>
                                    <textarea rows="5" required class="form-control" placeholder='Ex. "It depends on the aircraft..."'
                                        value={description}
                                        onChange={handleDescriptionInput}/>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-success mt-3"
                            onClick={handleSubmit}>Add Product Type</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ProductTypeInput
