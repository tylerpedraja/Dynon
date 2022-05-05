import React, { useEffect } from 'react'
import './products-worksheet.css';
import ProductsWorksheetSection from '../ProductsWorksheetSection/ProductsWorksheetSection';
import axios from 'axios';

const ProductsWorksheet = () => {

    useEffect(() => {
        const getProductTypes = async () => {
          const data = await axios.get('/api/product-types');
          console.log(data);
        }

        getProductTypes()
        // TODO: Figure out why can't proxy http request...
    }, []) 

  return (
    <div className="container">
        {/* {productSections.map(section => <ProductsWorksheetSection 
                                        type={section.type} 
                                        subtypes={section.subtypes} 
                                        header={section.header} 
                                        subheader={section.subheader} />)} */}
    </div>
  )
}

export default ProductsWorksheet