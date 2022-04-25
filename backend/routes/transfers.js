const express = require('express');
const router = express.Router();
const axios = require('axios');
const { uuid } = require('uuidv4');

const CIRLCE_API_KEY=process.env.CIRLCE_API_KEY
const BASE_URL = process.env.BASE_URL

/* transfers currency from source wallet to destination object
*** destination object can be of 2 types : wallets and blockchain address 
*** /wallet endpoint is to transfer to wallet
*/

router.post('/wallet', async (req, res) => {


  var sourceUserName = req.body.source.userName;
  var source = await web3Module.fetchUserByName(sourceUserName);
  var sourceWalletId = source.data.walletId;

  var destinationUserName = req.body.destination.userName;
  var destination = await web3Module.fetchUserByName(destinationUserName);
  var destonationWalletId = destination.data.walletId;

  var amount = req.body.amount;
 
  var data = JSON.stringify({
    "source": {
      "type": "wallet",
      "id": sourceWalletId
    },
    "destination": {
      "type": "wallet",
      "id": destonationWalletId
    },
    "amount": amount,
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

  await axios(config)
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
*** /blockchain is to transfer to blockchain address
*/

router.post('/blockchain', async (req, res) => {

  var sourceUserName = req.body.source.userName;
  var source = await web3Module.fetchUserByName(sourceUserName);
  var sourceWalletId = source.data.walletId;

  var destinationUserName = req.body.destination.userName;
  var destination = await web3Module.fetchUserByName(destinationUserName);
  var destonationBlockChainAddress = destination.data.blockChainAddress;

  var amount = req.body.amount;
 
  var data = JSON.stringify({
    "source": {
      "type": "wallet",
      "id": sourceWalletId
    },
    "destination": {
      "type": "blockchain",
      "address": destonationBlockChainAddress,
      "chain": "ETH"
    },
    "amount": amount,
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

  await axios(config)
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