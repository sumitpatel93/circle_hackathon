const express = require('express');
const router = express.Router();
const axios = require('axios');
const { uuid } = require('uuidv4');
const UserInfo = require("../models/userinfos");
const keys = require("../config/keys");
const web3Module = require("../utils/web3");

const CIRLCE_API_KEY=process.env.CIRLCE_API_KEY
const BASE_URL = process.env.BASE_URL
  

router.get('/', (req, res, next) => {
    res.send('In Payouts GET')
  });

/*
*** send payout to bank bank account
  oody : {
    'payer' : 'Alex',
    'payee' : 'Bob',
    'amount' : {
      'amount' : '100',
      'currency' : 'USD'
    }
  }
***
*/
router.post('/', async (req, res) => {

    try {
        const payerName = req.body.payer;
        const payer = await web3Module.fetchUserByName(payerName);
        const payerWalletid = payer[0];
        
        const payeeName = req.body.payee;
        const payee = await web3Module.fetchUserByName(payeeName);
        const payeeWireId = payee[0];
        const payeeEmailAddress = payee[1]
        const amount = req.body.amount.amount;
        const currency = req.body.amount.currency;

        var data = {
          "source": {
              "type": "wallet",
              "id": payerWalletid
          },
          "destination": {
              "type": "wire",
              "id": payeeWireId
          },
          "amount": {
              "amount": amount,
              "currency": currency
          },
          "metadata": {
              "beneficiaryEmail": payeeEmailAddress
          },
          "idempotencyKey": uuid()
      };

      var config = {
        method: 'post',
        url: BASE_URL+'payouts',
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

      } catch (e) {
        console.log(e)
        return res.status(500).json({
          Body: "Something went wrong",
        });
      }
    });

      
module.exports=router