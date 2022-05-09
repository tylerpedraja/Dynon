import React, {useState, useEffect} from "react";
import Banner from "../components/Banner/Banner";
import axios from "axios";
import ProductTypeInput from "../components/ProductTypeInput";

const Input = () => {
    const [productTypeEditor, setProductTypeEditor] = useState(false);
    const [productTypes, setProductTypes] = useState([]);
    const [selectedProductType, setSelectedProductType] = useState("");
    const [productSubtypes, setProductSubtypes] = useState([]);
    const [selectedProductSubtype, setSelectedProductSubtype] = useState("");
    const [price, setPrice] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [showOtherSubtype, setShowOtherSubtype] = useState(false)

    const [qtyInStock, setQtyInStock] = useState('')
    const [otherSubtype, setOtherSubtype] = useState('')
    const [partNumber, setPartNumber] = useState('')
    const [name, setName] = useState('')

    const getProductTypes = async () => {
        try {
            const {data} = await axios.get("/api/product-types");
            setProductTypes(data);
            setLoaded(true);
        } catch (error) {
            console.error(error);
        }
    };

    const formatTitle = (value) => {
        let words = value.split(" ");
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substr(1);
            words = words.join(" ");
            return words;
        }
    };

    const spinner = () => {
        return (
            <div className="spinner-border d-block mx-auto mt-5" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        );
    };

    const handlePriceInput = (e) => {
        setPrice(e.target.value);
    };

    const getSubtypes = () => {
        let subtypes = productTypes.filter((type) => {
            return type.type === selectedProductType;
        });
        subtypes = subtypes[0].subtypes;
        setProductSubtypes(subtypes);
    };

    const handleProductTypeSelect = (value) => {
        if (value == "other") {
            setSelectedProductType("");
            setProductTypeEditor(true);
        } else {
            setSelectedProductType(value);
            setSelectedProductSubtype("");
            setProductTypeEditor(false);
        }
        setShowOtherSubtype(false)
    };

    const handleSubtypeSelect = (value) => {
        setSelectedProductSubtype(value);

        if (value == 'other') {
            setShowOtherSubtype(true)
        } else {
            setShowOtherSubtype(false)
        }
    };

    const handlePartNumberInput = (e) => {
        setPartNumber(e.target.value)
    }
    const handleNameInput = (e) => {
        setName(e.target.value)
    }
    const handleQtyInStockInput = (e) => {
        setQtyInStock(e.target.value)
    }
    const handleOtherSubtypeInput = (e) => {
        setOtherSubtype(e.target.value)
        if (e.target.value.length > 0) {
            setSelectedProductSubtype(otherSubtype)
        }
    }

    const putProductSubtype = (e) => {
        axios.put(`/api/producttype/update/${selectedProductType}`, {subgroup: selectedProductSubtype})
    }

    const handleSubmitProduct = (e) => {
        putProductSubtype()
        postProduct()
    };

    const postProduct = () => {
        axios.post('/api/product', {
            part_number: partNumber,
            name: name,
            price: price,
            qty_in_stock: qtyInStock,
            type: selectedProductType,
            subgroup: selectedProductSubtype
        })
    }

    useEffect(() => {
        getProductTypes();
    }, []);

    useEffect(() => {
        if (selectedProductType != []) {
            getSubtypes();
        }
    }, [selectedProductType]);

    return (
        <>
            <Banner title={"Dynon Skyview Order Worksheet"}
                subtitle={"Add a Product"}/> {
            loaded ? (
                <div> {
                    productTypeEditor && <ProductTypeInput/>
                }
                    <div className="container">
                        <h1 className="h5 mt-5 mb-2">Add a Product</h1>
                        <form action="/" method="get">
                            <div className="row ">
                                <div className="col-md-6 mt-3">
                                    <div className="form-group">
                                        <label>Product Type</label>
                                        <select className="form-select"
                                            onChange={
                                                ({target: {
                                                        value
                                                    }}) => handleProductTypeSelect(value)
                                            }
                                            required>
                                            <option value="">Select One</option>
                                            {
                                            productTypes.map((type) => {
                                                return (
                                                    <option value={
                                                        type.type
                                                    }>
                                                        {
                                                        formatTitle(type.type)
                                                    } </option>
                                                );
                                            })
                                        }
                                            <option value="other">
                                                {
                                                formatTitle("other")
                                            }</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6 mt-3">
                                    <div className="form-group">
                                        <label>Subtype</label>
                                        <select value={selectedProductSubtype}
                                            className="form-select"
                                            onChange={
                                                ({target: {
                                                        value
                                                    }}) => handleSubtypeSelect(value)
                                            }
                                            required>
                                            <option value="test">Select One</option>
                                            {
                                            productSubtypes.map((subtype) => {
                                                return <option>{
                                                    subtype.name
                                                }</option>;
                                            })
                                        }
                                            <option className="text-success" value="other">New Subtype</option>
                                        </select>
                                    </div>
                                    {
                                    showOtherSubtype && (
                                        <div className="form-group mt-2 bg-warning p-2 rounded">
                                            <label>Other Subtype</label>
                                            <input type="text" placeholder="Enter new subtype" className="form-control"
                                                value={otherSubtype}
                                                onChange={handleOtherSubtypeInput}
                                                required/>
                                        </div>
                                    )
                                } </div>
                            </div>
                            <div className="row ">
                                <div className="col-md-6 mt-3">
                                    <div className="form-group">
                                        <label>Part Number</label>
                                        <input type="text" className="form-control" placeholder="XXXXXX-XXX"
                                            value={partNumber}
                                            onChange={handlePartNumberInput}/>
                                    </div>
                                </div>
                                <div className="col-md-6 mt-3">
                                    <div className="form-group">
                                        <label>Product Name</label>
                                        <input type="" className="form-control" placeholder="Enter product name"
                                            value={name}
                                            onChange={handleNameInput}/>
                                    </div>
                                </div>
                            </div>
                            <div className="row ">
                                <div className="col-md-6 mt-3">
                                    <div className="form-group">
                                        <label>Price</label>
                                        <input type="number" className="form-control" placeholder="$0.00"
                                            onChange={handlePriceInput}
                                            value={price}/>
                                        <small id="emailHelp" className="form-text text-muted">
                                            This is the pre-tax price of the item, USD
                                        </small>
                                    </div>
                                </div>
                                <div className="col-md-6 mt-3">
                                    <div className="form-group">
                                        <label>Quantity in stock</label>
                                        <input type="number" className="form-control" placeholder="Enter quantity in stock"
                                            value={qtyInStock}
                                            onChange={handleQtyInStockInput}/>
                                    </div>
                                </div>
                            </div>
                            <button disabled={
                                    productTypeEditor ? true : false
                                }
                                onClick={handleSubmitProduct}
                                className="btn btn-primary mt-3">
                                Add Product
                            </button>
                        </form>
                    </div>
                </div>
            ) : (spinner())
        } </>
    );
};

export default Input;
