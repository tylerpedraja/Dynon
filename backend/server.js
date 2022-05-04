if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
  const express = require('express')
  const mongoose = require('mongoose');
  const bodyParser = require("body-parser");
  const path = require('path');
  const PORT = process.env.PORT || 3002;
  
  connectToDb().catch(err => console.log(err));
  
  const app = express()
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  
  
  async function connectToDb() {
    await mongoose.connect(process.env.DATABSE_URL);
    console.log('connected to MongoDB...')
  }
  
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))
  } else {
    app.get('/', (req, res) => {
      res.send('API is running....')
    })
  }

  app.listen(PORT, () => {
      console.log('listening on port', PORT);
      console.log(`running in ${process.env.NODE_ENV} mode`);
  })
  