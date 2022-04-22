const express = require('express');
const router = express.Router();
const axios = require('axios');
const { uuid } = require('uuidv4');

const CIRLCE_API_KEY=process.env.CIRLCE_API_KEY
const BASE_URL = process.env.BASE_URL

 
router.post('/', (req, res) => {
 
  var data = JSON.stringify({
    "source": req.body.source,
    "destination": req.bosy.destination,
    "amount": req.bosy.amount,
    "idempotencyKey": uuid()
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
      res.send(response.data) 
   })
      .catch(function (error) {
      console.log(error);
      res.send({ error })
  });
});

module.exports=router