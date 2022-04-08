const express = require('express');
const router = express.Router();
const axios = require('axios');
const { uuid } = require('uuidv4');

const CIRLCE_API_KEY=process.env.CIRLCE_API_KEY
const BASE_URL = process.env.BASE_URL

var data = {
    "source": {
        "type": "wallet",
        "id": "1000863569"
    },
    "destination": {
        "type": "wire",
        "id": "7733e064-0fdc-47e9-9d7d-354f5a9baeca"
    },
    "amount": {
        "amount": "3",
        "currency": "USD"
    },
    "metadata": {
        "beneficiaryEmail": "john.smith@email.com"
    },
    "idempotencyKey": uuid()
};

  var config = {
    method: 'post',
    url: BASE_URL+'payouts',
    headers: { 
      'Accept': 'application/json', 
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer ' + CIRLCE_API_KEY
    },
    data : data
  };
  

router.get('/', (req, res, next) => {
    res.send('In Payouts GET')
  });

router.post('/', (req, res) => {
        axios(config)
            .then(function (response) {
            console.log(JSON.stringify(response.data));
            res.send(response.data) 
         })
            .catch(function (error) {
            console.log(error);
            res.send({ error })
        });
    });

module.exports=router