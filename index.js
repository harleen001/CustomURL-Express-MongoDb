import express from 'express';
const app = express();
const { connectMongoDB } = require('./connect.js');
import urlRoute from './routes/url.js';
const PORT=8001;



connectMongoDB("mongodb://127.0.0.1:27017/short-url")
.then(console.log("MongoDB Connected"));


app.use("/url",urlRoute);


app.listen(PORT,()=> console.log(`Server started at PORT : ${PORT}`))