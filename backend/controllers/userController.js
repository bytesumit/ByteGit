const jwt = require('jsonwebtoken');
const bcrypt =  require('bcryptjs');
const {MongoClient} = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const User = require('../models/userModel');
dotenv.config();
const uri = process.env.MONGO_URL;

let client;

async function connectClient() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
}

const signup = async (req,res)=>{
    const { username, password, email } = req.body;
    
    console.log("Received Data -", { username, password, email });

    // ❌ If username is null or empty, return error
    if (!username || username.trim() === "") {
      return res.status(400).json({ message: "Username is required!" });
    }
  
    try {
        const user = await User.findOne({username})
        if (user) {
          return res.status(400).json({ message: "User already exists!" });
        }
    
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        const newUser = new User( {
          username,
          password: hashedPassword,
          email,
          repositories: [],
          followedUsers: [],
          starRepos: [],
        });
    
        

        // const result = await usersCollection.insertOne(newUser);
        const result = await newUser.save();
        const token = jwt.sign(
          { id: result._id },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "1h" }
        );
        // res.json({ token, userId: result.insertedId });
        res.json({token, userId : result._id});
      } catch (err) {
        console.error("Error during signup : ", err.message);
        res.status(500).send("Server error");
      }

};

const login = async(req,res)=>{
    const {email , password} = req.body;

    try{

        const user = await User.findOne({ email });
        if (!user) {
          return res.status(400).json({ message: "invalid creditional" });
        }

        const isPassword = await bcrypt.compare(password,user.password);
        if(!isPassword){
            return res.status(400).json({ message: "Invalid Creditional" });
        }
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1h" }
          );
          res.json({ token, userId: user._id });

    }catch(err){
        console.error("Error during login : ", err.message);
        res.status(500).send("Server error!");
    }
};


const getAlluUsers = async(req,res)=>{
  try{
    const user = await User.find({});
    if (!user) {
      return res.status(400).json({ message: "invalid creditional" });
    }
    res.json(user);
  }catch(err){
    console.error("Error during fetching users : ", err.message);
        res.status(500).send("Server error!");
  }
};

const  getUserProfile = async (req,res)=>{
    const currentID = req.params.id;

  try {
 const user = await User.findById(currentID);

console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.send(user);
  } catch (err) {
    console.error("Error during fetching : ", err.message);
    res.status(500).send("Server error!");
  }
}; 

const getUserProfileByuserName = async (req, res) => {
  const { userName } = req.params;
  console.log("req.params:", req.params);
  try {

    const user = await User.findOne({username : userName});
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Error during fetching: ", err.message);
    res.status(500).send("Server error!");
  }
};


const updateUserProfile = async (req, res) => {
  const currentID = req.params.id;
  console.log(currentID);

  const { email, password } = req.body;

  try {
    if (!ObjectId.isValid(currentID)) {
      return res.status(400).json({ message: "Invalid user ID!" });
    }

    let updateFields = {};

    // ✅ Email ko tabhi update karo jab email valid ho
    if (email) {
      updateFields.email = email;
    }

    // ✅ Password ko tabhi update karo jab password diya ho
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateFields.password = hashedPassword;
    }

    // ✅ findByIdAndUpdate ka sahi structure
    const result = await User.findByIdAndUpdate(
      currentID,
      { $set: updateFields }, // ✅ Use $set to update specific fields
      { new: true, runValidators: true }
    );

    if (!result) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json({
      message: "User updated successfully!",
      user: result, // ✅ Update ke baad updated user data bhejo
    });
  } catch (err) {
    console.error("Error during updating:", err.message);
    res.status(500).send("Server error!");
  }
};


const deleteUserProfile = async (req, res) => {
  const currentID = req.params.id;

  try {
    if (!ObjectId.isValid(currentID)) {
      return res.status(400).json({ message: "Invalid user ID!" });
    }

    // ✅ findByIdAndDelete ka sahi structure
    const result = await User.findByIdAndDelete(currentID);

    if (!result) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json({ message: "User Profile Deleted Successfully!" });
  } catch (err) {
    console.error("Error during deleting:", err.message);
    res.status(500).send("Server error!");
  }
};


module.exports ={
    getAlluUsers,
    signup,
    login,
    getUserProfile,
    getUserProfileByuserName,
    updateUserProfile,
    deleteUserProfile
}