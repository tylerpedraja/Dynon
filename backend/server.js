import dotenv from 'dotenv'
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser'
import morgan from 'morgan';
import path from 'path'
import {
    getProducts,
    getProductTypes,
    getProductTypeById,
    postProduct,
    postProductType,
    updateProduct,
    removeProductById,
    updateProductType
} from './controllers/productsController.js'

const PORT = process.env.PORT || 3002;

dotenv.config()

const __dirname = path.resolve();

connectToDb().catch(err => console.log(err)).finally(() => {
    console.log('connected to MongoDB')
});

const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

async function connectToDb() {
    await mongoose.connect(process.env.DATABASE_URL);
}

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('/api', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
} else {
    app.get('/api', (req, res) => {
        res.send('API is running....')
    })
}

// @desc GET all products where remove = false
app.get('/api/products', getProducts)

// @desc GET all products where removed = false
app.get('/api/product-types', getProductTypes)

// @desc GET all products by type
app.get('/api/products/:type', getProductTypeById)

// @desc POST a product
app.post('/api/product', postProduct)

// @desc POST a product type
app.post('/api/product-types', postProductType)

// @desc PUT update a product
app.put('/api/product', updateProduct)

// @desc PUT remove a product by id
app.put('/api/product/:id/remove', removeProductById)

// @desc PUT update a product type
app.put('/api/producttype/update/:type', updateProductType)

app.listen(PORT, () => {
    console.log(`listening on port ${PORT} in ${process.env.NODE_ENV
        } mode.`);
})
