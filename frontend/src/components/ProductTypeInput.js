import React from 'react'

const productTypeInput = () => {
  return (
    <>
        <div class="container-fluid pb-3" style={{backgroundColor: '#E7E9EB'}}>
            <div className="container">
                  <h1 className="h5 text-success pt-3">Add a Product Type</h1>
                  <form className="mb-4">
                        <div className="row">
                            <div className="col-md-4 mt-3">
                                <div class="form-group">
                                    <label>Type</label>
                                    <input type="text" required class="form-control" placeholder='Ex. "Harnesses"' />
                                </div>
                            </div>
                            <div className="col-md-4 mt-3">
                                <div class="form-group">
                                    <label>Info Title</label>
                                    <input type="text" required class="form-control" placeholder="Ex. Choose Your Display Configuration" />
                                </div>
                            </div>
                            <div className="col-md-4 mt-3">
                                <div class="form-group">
                                    <label>FYI Header</label>
                                    <input type="text" required class="form-control" placeholder='Ex. "How many displays do I need?"' />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col mt-3">
                                <div class="form-group">
                                    <label>FYI Description</label>
                                    <textarea rows="5" required class="form-control" placeholder='Ex. "It depends on the aircraft..."' />
                                </div>
                            </div>
                        </div>
                    <button className="btn btn-success mt-3">Add Product Type</button>
                  </form>
                </div>
        </div>
    </>
  )
}

export default productTypeInput