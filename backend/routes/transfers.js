const express = require('express');
const router = express.Router();
const axios = require('axios');
const { uuid } = require('uuidv4');

const CIRLCE_API_KEY=process.env.CIRLCE_API_KEY
const BASE_URL = process.env.BASE_URL

/* transfers currency from source wallet to destination object
*** destination object can be of 2 types : wallets and blockchain address 
example of body  
{
     "source": {
          "type": "wallet",
          "id": "walletid"
     },
     "destination": {
          "type": "wallet",
          "id": "walletid"
     },
     "amount": {
          "amount": "3.14",
          "currency": "ETH"
     }
    }
***
*/

router.post('/', (req, res) => {
 
  var data = JSON.stringify({
    "source": req.body.source,
    "destination": req.body.destination,
    "amount": req.body.amount,
    "idempotencyKey": uuid()
  });

  var config = {
    method: 'post',
    url: BASE_URL + 'transfers',
    headers: { 
      'Accept': 'application/json', 
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer ' + CIRLCE_API_KEY
    },
    data : data
  };

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