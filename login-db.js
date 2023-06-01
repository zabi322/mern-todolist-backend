const express = require("express");

const collection = require("./mongodb");
const jwt = require('jsonwebtoken');
const fs = require('fs');
const { verifyToken } = require("./publickeyservice");

// const secretKey = 'nasaisascam'; // Replace with your own secret key or use an environment variable

const Privatekeypath = "keys/PrivateKey.pem"
const PrivateKey = fs.readFileSync(Privatekeypath, 'utf8')


const Login = async (req, res) => {
  console.log("login func psot",req.body)

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await collection.findOne({ email });
    console.log( "User Check", user )
    // alert("User Signed in Successfully" , user)
    if (user) {
      
      // Assuming the login is successful, verify the password
      if (user.password === password) {
        // Password matches, generate a JWT token
        const token = jwt.sign({ email }, PrivateKey, { expiresIn: '1h', algorithm: 'RS256' });
        res.json({ token, userId: user._id });
        const verified = verifyToken(token);
        console.log("token is verified",verified);
        console.log("User logged in successfully"); 
       
      }
      
      else if (!user) {
        // Password doesn't match6
        console.log("User Doesn't Exist, Please Sign Up")
        return res.status(402).json({ message: "User Doesn't Exist, Please Sign Up" });
             
      }
      else {
        // Password doesn't match
        console.log("Invalid Password")
        return res.status(401).json({ message: "Invalid password" });
        
             
      }
    } else {
      // User doesn't exist
      return res.status(401).json({ message: "User doesn't exist, Please Sign Up" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
  

module.exports = Login
