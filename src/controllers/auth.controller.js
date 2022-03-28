const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const generateToken = (user) => jwt.sign({ user }, process.env.SECRET);
const register = async (req, res) => {
  try {
    // console.log(req.body);
    let user = await User.findOne({ email: req.body.email }).lean().exec();
    // console.log(user);
    if (user) {
      return res.status(400).send("email exists");
    }
    user = await User.create(req.body);
    return res.status(201).send(user);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const login = async (req, res) => {
  try {
      const user = await User.findOne({email:req.body.email});

      if(!user){
      return res.status(400).send("user does not exist");

      }
      const match = user.checkPassword(req.body.password);
      if(match){
        const token = generateToken(user);  
        return res.status(201).send({token});
      }
      return res.status(400).send("email or password incorrect");



  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  register,
  login,
};
