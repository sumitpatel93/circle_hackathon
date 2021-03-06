const express = require('express');
const router = express.Router();
const axios = require('axios');
const { uuid } = require('uuidv4');

const CIRLCE_API_KEY=process.env.CIRLCE_API_KEY
const BASE_URL = process.env.BASE_URL

/*
*** get all the wallets for the user
*/

router.get('/', (req, res) => {

  var getConfig = {
    method: 'get',
    url: BASE_URL+'wallets',
    headers: { 
      'Authorization': 'Bearer ' + CIRLCE_API_KEY, 
      'Accept': 'application/json'
    }
  };

    axios(getConfig)
        .then(function (response) {
        console.log(JSON.stringify(response.data));
        res.send(response.data) 
     })
        .catch(function (error) {
        console.log(error);
        res.send({ error })
    });
});
  
  /* 
  *** the post wallets api creates wallets 
  ***
  */

  router.post('/', (req, res) => {

    var postConfig = {
      method: 'post',
      url: BASE_URL + 'wallets',
      headers: { 
        'Accept': 'application/json', 
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer ' + CIRLCE_API_KEY
      },
      data : JSON.stringify({
          "idempotencyKey": uuid()
        })
    };
  

    axios(postConfig)
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
