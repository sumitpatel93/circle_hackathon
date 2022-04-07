var express = require('express');
var router = express.Router();
var request = require('request');

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

router.post('/', function(req, res, next) {
  request({
    headers: {'content-type' : 'application/json'},
    uri: 'https://api-sandbox.circle.com/v1/banks/wires',
    body : data
  }).pipe(res);
});

module.exports = router;