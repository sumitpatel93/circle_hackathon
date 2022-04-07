const express = require('express');
const router = express.Router();
const request = require('request');
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

router.post('/', (req, res, next) => {
  request({
    headers: {'content-type' : 'application/json', 'Authorization' : CIRLCE_API_KEY},
    uri: 'https://api-sandbox.circle.com/v1/banks/wires',
    body : data,
    json: true
  }).pipe(res);
});

router.get('/', (req, res, next) => {
    res.send('In Payouts')
  });

module.exports=router