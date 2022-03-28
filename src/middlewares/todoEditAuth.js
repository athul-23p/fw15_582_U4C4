const Todo = require('../models/todo.model');
const todoEditAuth = async (req,res,next) =>{
    try {
        let todo = await Todo.findById(req.params.id);
        if(todo){
            if(todo.user === req.user._id){
                next();
            }
        }
        return res.status(500).send('Unauthorized');      

    } catch (error) {
        return res.status(500).send({ error });      
    }
}

module.exports = todoEditAuth;