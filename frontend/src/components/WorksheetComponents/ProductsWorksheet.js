import React, { useEffect, useState } from 'react'
import ProductsWorksheetSection from '../WorksheetComponents/ProductsWorksheetSection';
import axios from 'axios';

const ProductsWorksheet = () => {
    const [productTypes, setProductTypes] = useState([])
    const [products, setProducts] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [subTotal, setSubtotal] = useState(0)
    const [alertShown, setAlertShown] = useState('none')

    const getProductTypes = async () => {

        const { data } = await axios.get('/api/product-types').catch((err) => {
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

    const addItem = (value) => {
        setSubtotal(subTotal + value)
    }
    const subtractItem = (value) => {
        setSubtotal(subTotal - value)
    }

    const formatCurrency = (value) => {
        const formatted = value.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        })
        return formatted
    }

    const getProducts = async () => {
        const { data } = await axios.get('/api/products');
        setProducts(data);
    }

    useEffect(() => {
        if (subTotal > 0) {
            setAlertShown('block')
        }
    }, [subTotal])

    const showWorksheet = () => {
        return (
            <div className="container">
                <div class="alert alert-success text-center" style={{ display: alertShown }} role="alert">
                    Your <strong>estimated total</strong> is: {formatCurrency(subTotal)}
                </div>
                {
                    productTypes.map((type, index) =>
                    (
                        <ProductsWorksheetSection
                            key={index}
                            id={
                                type._id
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
                            }
                            addItem={addItem}
                            subtractItem={subtractItem} />
                    )
                    )
                }
            </div>
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
