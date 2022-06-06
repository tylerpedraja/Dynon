import Product from '../Models/productModel.js'
import ProductType from '../Models/productTypeModel.js'


// @DESC Get all products that haven't been removed 
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({ remove: false });
        res.send(products)
    } catch (error) {
        console.error(error)
        res.send(error);
        res.status(500)
    }
}

const getProductTypes = async (req, res) => {
    const productType = await ProductType.find({ removed: false })
    res.send(productType);
}

const getProductTypeById = async (req, res) => {
    const type = req.params.type;

    try {
        const products = await Product.find({ type });
        res.send(products)
    } catch (error) {
        console.error(error)
        res.send(error);
        res.status(500)
    }
}

const postProduct = async (req, res) => {
    const data = {
        part_number: req.body.part_number,
        name: req.body.name,
        price: req.body.price,
        qty_in_stock: req.body.qty_in_stock,
        type: req.body.type,
        subgroup: req.body.subgroup
    }

    Product.create(data, (err) => {
        if (err) {
            return console.error(err)
        }
        res.status(200)
        res.send(data)
    })
}

const postProductType = async (req, res) => {
    const data = {
        header: req.body.header,
        subheader: {
            title: req.body.title,
            description: req.body.description
        },
        type: req.body.type
    }

    ProductType.create(data, (err) => {
        if (err) {
            return console.error(err)
        }

        res.status(200)
        res.send(data)
    })
}

const updateProduct = async (req, res) => {
    const data = {
        _id: req.body._id,
        part_number: req.body.part_number,
        name: req.body.name,
        price: req.body.price,
        qty_in_stock: req.body.qty_in_stock,
        type: req.body.type,
        subgroup: req.body.subgroup
    }

    Product.findByIdAndUpdate(data._id, data, (err) => {
        if (err) {
            return console.error(err)
        }
        res.status(200)
        res.send(data)
    })
}

const removeProductById = async (req, res) => {
    const update = { remove: true }
    const id = req.params.id

    try {
        Product.findByIdAndUpdate(id, update, (err, docs) => {
            if (err) {
                console.log(err)
            }
            else {
                console.log("Updated User : ", docs);
            }
        })
    } catch (error) {
        console.error(error)
    }
    res.send(product)
}

const updateProductType = async (req, res) => {
    const filter = {
        type: req.params.type
    }
    const update = {
        $push: {
            subtypes: {
                name: req.body.subgroup
            }
        }
    }

    const type = await ProductType.find(filter)

    // if subtype already exists, don't push into ProductType.subtypes array.
    const matchCount = type[0].subtypes.filter((subtype) => {
        return subtype.name === req.body.subgroup
    })

    const matched = (matchCount.length > 0) ? true : false

    if (!matched) {
        const data = await ProductType.findOneAndUpdate(filter, update)
        res.send(data);
        return
    }

    throw new Error('error: subtype already exists')
}

export {
    getProducts,
    getProductTypes,
    getProductTypeById,
    postProduct,
    postProductType,
    updateProduct,
    removeProductById,
    updateProductType
}