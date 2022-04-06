const axios = require('axios');
const CIRLCE_API_KEY=process.env.CIRLCE_API_KEY

var data = JSON.stringify({
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
});

var config = {
  method: 'post',
  url: 'https://api-sandbox.circle.com/v1/banks/wires',
  headers: { 
    'Accept': 'application/json', 
    'Content-Type': 'application/json', 
    'Authorization': CIRLCE_API_KEY
  },
  data : data
};

module.exports = function () {
    axios(config)
        .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
        .catch(function (error) {
        console.log(error);
    });
}




