import dotenv from 'dotenv'
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser'
import morgan from 'morgan';
import path from 'path'
import ProductType from '../backend/Models/productTypeModel.js'
import Product from './Models/productModel.js';

// const PORT = process.env.PORT || 3002;
const PORT = 3002;

dotenv.config()

connectToDb().catch(err => console.log(err)). finally(() => {
    console.log('connected to MongoDB')
});

const app = express()
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

async function connectToDb() {
    await mongoose.connect(process.env.DATABASE_URL);
}

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))
} else {
    app.get('/', (req, res) => {
        res.send('API is running....')
    })
} app.get('/api/product-types', async (req, res) => {
    const productType = await ProductType.find({})
    res.send(productType);
})

app.post('/api/add-product', async (req, res) => {
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

})

app.put('/api/producttype/update/:type', async (req, res) => {
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

    const data = await ProductType.findOneAndUpdate(filter, update)

    res.send(data);
})


// Get all products
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.send(products)
    } catch (error) {
        console.error(error)
        res.send(error);
        res.status(500)
    }
})

// Get products by type
app.get('/api/products/:type', async (req, res) => {
    const type = req.params.type;

    try {
        const products = await Product.find({type});
        res.send(products)
    } catch (error) {
        console.error(error)
        res.send(error);
        res.status(500)
    }
})

// app.post('/api/insert', (req, res) => {
// const data = {
//     part_number: '102821-000',
//     name: `SV-HARNESS-D37 Display Harness`,
//     price: 124.00,
//     qty_in_stock: 89,
//     type: 'display',
//     subgroup: 'Harness (1 per display)'
// }

// Product.create(data, (err) => {
//     if (err) { console.log(err) }

//     res.status(200)
//     res.send('sent data');
// })
// })

app.listen(PORT, () => {
    console.log(`listening on port ${PORT} in ${
        process.env.NODE_ENV
    } mode.`);
})
