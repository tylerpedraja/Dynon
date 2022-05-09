import React, {useEffect, useState} from 'react'
import './products-worksheet.css';
import ProductsWorksheetSection from '../ProductsWorksheetSection/ProductsWorksheetSection';
import axios from 'axios';

const ProductsWorksheet = () => {
    const [productTypes, setProductTypes] = useState([])
    const [products, setProducts] = useState([])
    const [loaded, setLoaded] = useState(false)

    const getProductTypes = async () => {
        const {data} = await axios.get('/api/product-types').catch((err) => {
            if (err.response) {
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
            }
            else if (err.request) {
                console.log(err.request);
              }
              else {
                console.log('Error', err.message);
              }
              console.log(err.config);
        });
        setProductTypes(data)
        setLoaded(true)
    }

    const getProducts = async () => {
        const {data} = await axios.get('/api/products');
        setProducts(data);
    }

    const showWorksheet = () => {
        return (
            <div className="container">
                {
                productTypes.map(type => <ProductsWorksheetSection key={
                        type.type
                    }
                    type={
                        type.type
                    }
                    subtypes={
                        type.subtypes
                    }
                    header={
                        type.header
                    }
                    subheader={
                        type.subheader
                    }
                    products={
                        products.filter(product => product.type.toLowerCase() == type.type.toLowerCase())
                    }/>)
            } </div>
        )
    }

    const spinner = () => {
        return (
            <div className="spinner-border d-block mx-auto mt-5" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        )
    }

    useEffect(() => {
        getProductTypes()
        getProducts()
    }, [])

    return (
        <> {
            loaded ? showWorksheet() : spinner()
        } </>
    )
}

export default ProductsWorksheet
