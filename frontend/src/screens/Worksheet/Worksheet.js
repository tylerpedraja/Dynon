import React from 'react'
import '../Worksheet/worksheet.css'
import ProductsWorksheet from '../../components/ProductsWorksheet/ProductsWorksheet';
import skyviewtop from '../../images/skyview-top.jpg';

const Worksheet = () => {
  return (
    <>
    {/* Banner */}
    <div className="banner py-5 text-white text-center">
        <h1>Dynon Skyview Order Worksheet</h1>
        <h4>Build Your Custom Dynon Skyview Panel</h4>
    </div>

    {/* Description */}
    <div className="container mt-3">
      <div className="row">
        <div className="col-lg-8">
          <div className="d-flex h-100 align-items-center">
            <p className="text-muted d-block">
            Use the worksheet below to compile a list of the components that you need to get the features and capabilities you're looking for in your Dynon Skyview system. Once you have selected all of the items, submit a request at the bottom of the page and we will provide you with a comprehensive quote including a discount based on the package as a whole.
            </p>
            </div>
        </div>
        <div className="col">
          <div className="d-flex align-items-center justify-content-center">
              <img src={skyviewtop} alt="Dynon tech" className="img-fluid" />
          </div>
        </div>
      </div>
    </div>

    {/* Products List */}
    <ProductsWorksheet />
    <div style={{position:'sticky', bottom: '0px', left: '0px', width: '100%'}}>
      <div class="alert alert-success text-center" role="alert">
        Your estimated total is: $5,040.00
      </div>
    </div>
    </>
  )
}

export default Worksheet