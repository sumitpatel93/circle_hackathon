require('dotenv').config()
const cors = require('cors');
const express = require('express');
const Tx = require('ethereumjs-tx').Transaction;
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
  web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/0f333401437149e28c3696b36eb02f93"));

}

// check the current block number and network type
web3.eth.getBlockNumber().then(console.log);
web3.eth.net.getNetworkType()
  .then(console.log);

exports.registerUser = async (usersPvtKey, userAddress, userName, userRegistrationTimestamp, userId) => {

  const userPvtKey = usersPvtKey;
  const pvtKey = userPvtKey.substring(2)
  var privateKey = new Buffer(pvtKey, 'hex');
  var contractInstance = new web3.eth.Contract(
    Key.interface,
    Key.contractAddress
  );
  var encodedABI = contractInstance.methods.registerUser(
    userAddress,
    userName,
    userRegistrationTimestamp,
    userId
  ).encodeABI()
  const nonce = await web3.eth.getTransactionCount("0x655e5cB1F1EABE2767EFEd4E90714D2A92608d15");
  console.log('nonce-->>', nonce);
  var rawTx = {
    nonce: web3.utils.toHex(nonce),
    from: "0x655e5cB1F1EABE2767EFEd4E90714D2A92608d15",
    to: Key.contractAddress,
    gasLimit: '0x3d0900',
    gasPrice: web3.utils.toHex(web3.utils.toWei('30', 'gwei')),
    chainId: '0x04',
    data: encodedABI,
  };

  var tx = new Tx(rawTx, { chain: 'rinkeby' });
  tx.sign(privateKey);
  var serializedTx = tx.serialize();

  web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
    .on('receipt', console.log);
}

exports.fetchNumberOfUsers = () => {
  var contractInstance = new web3.eth.Contract(
    Key.interface,
    Key.contractAddress
  );
  try {
    contractInstance.methods.fetchNumberOfUsers().call().then(async result => {
      console.log(web3.utils.hexToNumberString(result._hex))
      return web3.utils.hexToNumberString(result._hex);
    })
  }
  catch (e) {
    console.log(e)
  }
}

exports.fetchUserByName = (userName) => {
  var contractInstance = new web3.eth.Contract(Key.interface, Key.contractAddress);
  var data;
  try {
    data = contractInstance.methods.fetchUserByName(userName).call().then(async result => {
      return result
    })
    return data
  }
  catch (e) {
    console.log(e)
  }
}


exports.requestFund = async (usersPvtKey,userAddress, userName, amount) => {
  
  const userPvtKey = usersPvtKey;
  const pvtKey = userPvtKey.substring(2)
  var privateKey = new Buffer(pvtKey, 'hex');
  var contractInstance = new web3.eth.Contract(
    Key.interface,
    Key.contractAddress
  );
  var encodedABI = contractInstance.methods.requestFund(
    userName,
    userAddress,
    amount
  ).encodeABI()
  
  const nonce = await web3.eth.getTransactionCount(userAddress);
  var rawTx = {
    nonce: web3.utils.toHex(nonce),
    from: userAddress,
    to: Key.contractAddress,
    gasLimit: '0x3d0900',
    gasPrice: web3.utils.toHex(web3.utils.toWei('30', 'gwei')),
    chainId: '0x04',
    data: encodedABI,
  };

  var tx = new Tx(rawTx, { chain: 'rinkeby' });
  tx.sign(privateKey);
  var serializedTx = tx.serialize();


  web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
    .on('receipt', console.log);
}

exports.deposit = async (usersPvtKey,userAddress, userName, amount) => {

  const userPvtKey = usersPvtKey;
  const pvtKey = userPvtKey.substring(2)
  var privateKey = new Buffer(pvtKey, 'hex');
  var contractInstance = new web3.eth.Contract(
    Key.interface,
    Key.contractAddress
  );
  const amountInHex = web3.utils.utf8ToHex(amount)
  var encodedABI = contractInstance.methods.deposit(
    userName,
    amount
  ).encodeABI()
  const nonce = await web3.eth.getTransactionCount(userAddress);

  var rawTx = {
    nonce: web3.utils.toHex(nonce),
    from: userAddress,
    to: Key.contractAddress,
    gasLimit: '0x3d0900',
    gasPrice: web3.utils.toHex(web3.utils.toWei('30', 'gwei')),
    chainId: '0x04',
    value: amountInHex,
    data: encodedABI,
  };

  var tx = new Tx(rawTx, { chain: 'rinkeby' });
  tx.sign(privateKey);
  var serializedTx = tx.serialize();

  web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
    .on('receipt', console.log);
}



//requestFund('0xb3021fb06b6396f628dda47d81701150e7d241476ebfa40fa6e919e61e294f45','0x655e5cB1F1EABE2767EFEd4E90714D2A92608d15','res123@gmail.com',100)