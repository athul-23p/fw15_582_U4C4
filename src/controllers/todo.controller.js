const Todo = require("../models/todo.model");
const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");

// list todos
router.get("", authenticate, async (req, res) => {
  try {
    let todos = await Todo.find({user:req.user._id});
    return res.status(200).send(todos);
  } catch (error) {
    return res.status(500).send({ error });
  }
});

// add todo
router.post("", authenticate, async (req, res) => {
  try {
  
      let todos = await Todo.create({title:req.body.title,user:req.user._id});
    //   console.log(req.body);
    return res.status(200).send(todos);
  } catch (error) {
    return res.status(500).send({ error });
  }
});


module.exports = router;
