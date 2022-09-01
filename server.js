
// const express = require('express');          //  traditional way 
import express from "express";
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import { v4 as uuid } from 'uuid';

// import components
import Connection from "./database/db.js";
import DefaultData from "./default.js";
import Routes from './routes/routes.js'


dotenv.config(); 
//  we have to intialize the app
const app = express(); 

app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

app.use('/', Routes);

app.use('/signup', ()=>{
    // data save to database
})

const PORT = process.env.PORT || 8000;
const URL = process.env.MONGODB_URI || `mongodb+srv://${USERNAME}:${PASSWORD}@ecommerceweb.1ou4y.mongodb.net/PROJECT0?retryWrites=true&w=majority`;

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

Connection(URL);  //  passing the user name and passord 

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
}
app.listen(PORT, () => console.log(`your server is succesfully start on the port ${PORT}`));


// default data to database
DefaultData();


// exported on the payment-controller.js
export let paytmMerchantkey = process.env.PAYTM_MERCHANT_KEY;
export let paytmParams = {};
paytmParams['MID'] = process.env.PAYTM_MID,
paytmParams['WEBSITE'] = process.env.PAYTM_WEBSITE,
paytmParams['CHANNEL_ID'] = process.env.PAYTM_CHANNEL_ID,
paytmParams['INDUSTRY_TYPE_ID'] = process.env.PAYTM_INDUSTRY_TYPE_ID,
paytmParams['ORDER_ID'] = uuid(),
paytmParams['CUST_ID'] = process.env.PAYTM_CUST_ID,
paytmParams['TXN_AMOUNT'] = '100',
paytmParams['CALLBACK_URL'] = 'callback'
paytmParams['EMAIL'] = 'rajputomi98@gmail.com'
paytmParams['MOBILE_NO'] = '1234567898'