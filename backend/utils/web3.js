require('dotenv').config()
const cors = require('cors');
const express = require('express');
const Tx = require('ethereumjs-tx')
const Key = require('../config/keys')
var Web3 = require("web3");
const app = express();


app.use(cors());
// middleware
app.use(express.json());
app.use(express.urlencoded());

var web3;
if (typeof web3 !== "undefined") {
  web3 = new Web3(web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider("https://rpc-mumbai.maticvigil.com/"));

}

// check the current block number and network type
web3.eth.getBlockNumber().then(console.log);
web3.eth.net.getNetworkType()
  .then(console.log);

const sendSignedTransaction = (senderPrivateKey, res, next) =>{

    const userPvtKey = req.body.senderPrivateKey
    const pvtKey = userPvtKey.substring(2)
    var privateKey = new Buffer(pvtKey, 'hex');
    var contractInstance = new web3.eth.Contract(
        Key.interface,
        Key.contractAddress
      );
    var encodedABI = contractInstance.methods.saveWatchDetails(
        ownerName,
        watchInsured,
        dateOfLoss,
        cityOfLoss,
        
    ).encodeABI()
    const nonce = await web3.eth.getTransactionCount("0x655e5cB1F1EABE2767EFEd4E90714D2A92608d15");
    var rawTx = {
        nonce: web3.utils.toHex(nonce),
        from: "0x655e5cB1F1EABE2767EFEd4E90714D2A92608d15",
        to:   Key.contractAddress,
        gasLimit: '0x3d0900',
        gasPrice: web3.utils.toHex(web3.utils.toWei('30', 'gwei')),
        chainId: web3.utils.toHex(80001),
        data: encodedABI,
      };
  
      var tx = new Tx(rawTx, { 'chain': 'Mumbai Testnet' });
      tx.sign(privateKey);
      var serializedTx = tx.serialize();
  
      web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
        console.log(err)
        if (err) {
          res.status(500).json({
            Body: err
          })
        }
        else {
          res.status(200).json({
            status: true,
            message: "Action Completed Successfully",
            data: hash
          })
        }
      });
}


const fetchContractData = (req, res, next) => {

}


module.exports = { sendSignedTransaction, fetchContractData };