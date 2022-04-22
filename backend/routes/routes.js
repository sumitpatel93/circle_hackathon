const express = require("express");
const router = new express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isEmpty = require("is-empty");
const UserInfo = require("../models/userinfos");
const keys = require("../config/keys");
const web3Module = require("../utils/web3");
var Web3 = require("web3");

const axios = require('axios');

const CIRLCE_API_KEY=process.env.CIRLCE_API_KEY
const BASE_URL = process.env.BASE_URL
const uuid = require('uuid');
const { request } = require("http");
const { response } = require("express");

var web3;
if (typeof web3 !== "undefined") {
  web3 = new Web3(web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/0f333401437149e28c3696b36eb02f93"));

}


router.post("/register", async (req, res) => {
  try {

    const email = req.body.email;
    const password = req.body.password;
    const companyName = req.body.companyName;
    const confirmPassword = req.body.confirmPassword;

    const user = await UserInfo.findOne({ email });
    if (user) return res.status(400).json({ Body: "EMAIL_ALREADY_REGISTERED" });

    let i = Math.floor(100000 + Math.random() * 900000);
    const newUser = new UserInfo({
      email: email,
      password: password,
      username: `MEM${i}`,
      companyName: companyName,
      confirmPassword: confirmPassword,
      customerId : uuid.v4()
    });

    var createWallet = {
      method: 'post',
      url: BASE_URL+'wallets',
      headers: { 
        'Authorization': 'Bearer ' + CIRLCE_API_KEY, 
        'Accept': 'application/json'
      },
      data:{
        idempotencyKey : newUser.customerId
      }
    };

    walletId =  ""

    await axios(createWallet)
          .then(function (response) {
            walletId = response.data.data.walletId
        })
          .catch(function (error) {
          console.log(error);
          
      });
    
    var generateBlockChainAddress = {
      method: 'post',
      url: BASE_URL+'wallets/'+walletId+'/addresses',
      headers: { 
        'Authorization': 'Bearer ' + CIRLCE_API_KEY, 
        'Accept': 'application/json'
      },
      data: {
        idempotencyKey : newUser.customerId,
        currency : "ETH",
        chain : "ETH"
      }
    };
  
    blockchainAddress = ""

    postCreateBCAddress = await axios(generateBlockChainAddress)
            .then(function (response) {
            blockchainAddress = response.data.data.address
          })
            .catch(function (error) {
            console.log(error);
        });
    
    newUser.blockChainAddress = blockchainAddress
    newUser.walletId = walletId

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newUser.password, salt);
    newUser.password = hash;
    const savedUser = await newUser.save();
  
    //save blockchain address of user in blockchain while registration (parameter 2nd)
    const saveUserToBlockchain = await web3Module.registerUser('0xb3021fb06b6396f628dda47d81701150e7d241476ebfa40fa6e919e61e294f45','0x655e5cB1F1EABE2767EFEd4E90714D2A92608d15',email,JSON.stringify(Date.now()),i,1000);
    console.log(user);
    
    const payload = { id: savedUser._id, isVerified: savedUser.isVerified };
    // Sign token
    jwt.sign(
      payload,
      keys.secretOrKey,
      {
        expiresIn: 31556926, // 1 year in seconds
      },
      (err, token) => {
        savedUser.token = token;
        savedUser.save();
        return res.status(200).json({ Body: "Bearer " + token });
      }
    );

    

  } catch (e) {
    console.log(e);
    return res.status(500).json({
      Body: "NETWORK_ERROR",
    });
  }
});
  

router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    const user = await UserInfo.findOne({ email });
    if (user) {
      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = user.token;
        return res.status(200).json({
          body: "Bearer " + token,
          email : user.email
        });
      } else {
        return res.status(400).json({
          Body: "INCORRECT_PASSWORD",
        });
      }
    } else {
      return res.status(400).json({
        Body: "EMAIL_NOT_FOUND",
      });
    }
  } catch (e) {
    return res.status(500).json({
      Body: "NETWORK_ERROR",

    });
  }
});


router.get("/userData", async (req, res) => {
  try {
    const userName = req.body.userName;
    const user = await web3Module.fetchUserByName(userName);
    const userDetails = {
      userAddress : user[0],
      userName : user[1],
      userRegistrationTimestamp : web3.utils.hexToNumberString(user[2]._hex),
      userId : web3.utils.hexToNumberString(user[3]._hex),
      userCreditScore : web3.utils.hexToNumberString(user[4])
    }
    return res
      .status(200)
      .json({
        Body: userDetails
      });

  } catch (e) {
    console.log(e)
    return res.status(500).json({
      Body: "Something went wrong",
    });
  }
});

router.post("/requestFund", async (req, res) => {
  try {
    const userPrivateKey = req.body.userPrivateKey;
    const userAddress = req.body.userAddress;
    const userName = req.body.userName;
    const amount = req.body.amount;

    const user = await web3Module.requestFund(userPrivateKey,userAddress,userName,amount);
    console.log('user', user)
    
    return res
      .status(200)
      .json({
        Body: "success"
      });

  } catch (e) {
    console.log(e)
    return res.status(500).json({
      Body: "Something went wrong",
    });
  }
});

  module.exports = router;
