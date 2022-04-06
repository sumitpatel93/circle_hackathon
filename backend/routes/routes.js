const express = require("express");
const router = new express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isEmpty = require("is-empty");
const UserInfo = require("../models/userinfos");
const keys = require("../config/keys");


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
      });

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newUser.password, salt);
      newUser.password = hash;
      const savedUser = await newUser.save();
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
      console.log(errors);
  
      if (!isEmpty(errors)) {
        return res.status(400).json({
          Body: errors,
        });
      }
  
      // Find user by email
      const user = await UserInfo.findOne({ email });
      if (user) {
        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          const token = user.token;
          return res.status(200).json({
            Body: "Bearer " + token,
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
  
  module.exports = router;