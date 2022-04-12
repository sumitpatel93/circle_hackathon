const express = require('express');
const router = express.Router();
const axios = require('axios');
const { uuid } = require('uuidv4');

const CIRLCE_API_KEY=process.env.CIRLCE_API_KEY
const BASE_URL = process.env.BASE_URL

var createBankData = JSON.stringify({
    "idempotencyKey": uuid(),
    "beneficiaryName": "John Smith",
    "accountNumber": "123456789",
    "routingNumber": "021000021",
    "billingDetails": {
      "name": "John Smith",
      "city": "Boston",
      "country": "US",
      "line1": "1 Main Street",
      "district": "MA",
      "postalCode": "02201"
    },
    "bankAddress": {
      "country": "US"
    }
  });

  var createBankConfig = {
    method: 'post',
    url: BASE_URL + 'banks/wires',
    headers: { 
      'Accept': 'application/json', 
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer ' + CIRLCE_API_KEY
    },
    data : createBankData
  };

  router.post('/', (req, res) => {
    axios(createBankConfig)
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