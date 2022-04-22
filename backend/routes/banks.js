const express = require('express');
const router = express.Router();
const axios = require('axios');
const { uuid } = require('uuidv4');

const CIRLCE_API_KEY=process.env.CIRLCE_API_KEY
const BASE_URL = process.env.BASE_URL


/*
*** create bank id 
*/

  router.post('/', (req, res) => {

    var userName = req.body.userName;
    var billingDetails = req.body.billingDetails;

    var data = JSON.stringify({
      "idempotencyKey": uuid(),
      "beneficiaryName": userName,
      "accountNumber": req.body.accountNumber,
      "routingNumber": req.body.routingNumber,
      "billingDetails": billingDetails,
      "bankAddress": {
        "country": req.body.country
      }
    }); 

    var config = {
      method: 'post',
      url: BASE_URL + 'banks/wires',
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
        // id generated needs to be saved with the user 
        res.send(response.data) 
     })
        .catch(function (error) {
        console.log(error);
        res.send({ error })
    });
});

module.exports=router