const express = require('express');
const router = express.Router();
const axios = require('axios');
const CIRLCE_API_KEY=process.env.CIRLCE_API_KEY

var data = {
    "idempotencyKey": "6ae62bf2-bd71-49ce-a599-165ffcc33680",
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
  };

  var config = {
    method: 'post',
    url: 'https://api-sandbox.circle.com/v1/banks/wires',
    headers: { 
      'Accept': 'application/json', 
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer' + CIRLCE_API_KEY
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