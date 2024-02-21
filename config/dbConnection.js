const mongoose = require('mongoose');

const connectDb = () => {

    try {
        const DB_URL = process.env.CONNECTION_STRING;  
        const connection = mongoose.connect(DB_URL);
        console.log("Database connection established"+connection);
    }
    catch (err) {
        console.error("DB connection error. check your DB connection");
        process.exit(1);
    }
};
module.exports = connectDb;