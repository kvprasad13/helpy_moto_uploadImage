const express = require('express');

const bodyParser = require('body-parser');
const BrandUpdateRouter = require('./Routers/BrandUpdateRouter');
const connectDb = require('./config/dbConnection');
const process = require('dotenv').config();
const app = express();
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

connectDb();


app.use('/api', BrandUpdateRouter);

const port = 8000;
app.listen(port, () => {
    console.log(`server listening on http://localhost:${port}`);
});