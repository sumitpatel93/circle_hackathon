const express = require('express');
const router = express.Router();
const axios = require('axios');
const { uuid } = require('uuidv4');
const web3Module = require("../utils/web3");


const CIRLCE_API_KEY=process.env.CIRLCE_API_KEY
const BASE_URL = process.env.BASE_URL

/* transfers currency from source wallet to destination object
*** destination object can be of 2 types : wallets and blockchain address 
*** /wallet endpoint is to transfer to wallet
*/

router.post('/wallet', async (req, res) => {

  try {
    var sourceUserName = req.body.source.userName;
    var sourceUserFromDB = await UserInfo.findOne({ email : sourceUserName });
    var sourceWalletId = sourceUserFromDB.walletId;

    var destinationUserName = req.body.destination.userName;
    var sourceUserFromDB = await UserInfo.findOne({ email : destinationUserName });
    var destonationWalletId = sourceUserFromDB.walletId;

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
  } catch (e) {
    console.log(e)
    return res.status(500).json({
      Body: "Something went wrong",
      });
    }
  });

/* 
*** /blockchain is to transfer to blockchain address
*/

router.post('/blockchain', async (req, res) => {

  try {
    var sourceUserName = req.body.source.userName;
    var sourceUserFromDB = await UserInfo.findOne({ email : sourceUserName });
    var sourceWalletId = sourceUserFromDB.walletId;

    var destinationUserName = req.body.destination.userName;
    var sourceUserFromDB = await UserInfo.findOne({ email : destinationUserName });
    var destonationBlockChainAddress = sourceUserFromDB.blockChainAddress;

    var chain = req.body.destination.chain;

    var amount = req.body.amount;
  
    var data = JSON.stringify({
      "source": {
        "type": "wallet",
        "id": sourceWalletId
      },
      "destination": {
        "type": "blockchain",
        "address": destonationBlockChainAddress,
        "chain": chain
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
  } catch (e) {
    console.log(e)
    return res.status(500).json({
      Body: "Something went wrong",
    });
  }
});


module.exports=router