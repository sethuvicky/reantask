const secret = 'secret123';
 let User  = require("../models/User")
 let jwt = require("jsonwebtoken")
 let Task  = require("../models/Task")
let mongoose = require("mongoose")
 exports.GetTasks = async(req, res, next) => {
    const cookieToken = jwt.verify(req.cookies.token, secret);
    Task.where({user:new mongoose.Types.ObjectId(cookieToken.id)})
      .find((err,tasks) => {
        res.json(tasks);
      })
    } 
  
exports.CreateTask =    async(req, res, next) => {
  const cookieToken = jwt.verify(req.cookies.token, secret);
  const task = new Task({
    text:req.body.text,
    description:req.body.description,
    category:req.body.category,
    done:false,
    user:new mongoose.Types.ObjectId(cookieToken.id),
  });
  task.save().then(task => {
    res.json(task);
  })
} 
exports.UpdateTask =    async(req, res, next) => {
  console.log(req.body)
  const cookieToken = jwt.verify(req.cookies.token, secret);
  Task.updateOne({
    _id:new mongoose.Types.ObjectId(req.body._id),
    user:new mongoose.Types.ObjectId(cookieToken.id)
  }, req.body).then(() => {
    res.sendStatus(200);
  });

} 

exports.CompleteTask = async(req, res, next) => {
    const cookieToken = jwt.verify(req.cookies.token, secret);
  Task.updateOne({
    _id:new mongoose.Types.ObjectId(req.body.id),
    user:new mongoose.Types.ObjectId(cookieToken.id)
  }, {
    done:req.body.done,
  }).then(() => {
    res.sendStatus(200);
  });
} 

exports.DeleteTask = async(req, res, next) => {
  let {id} =req.params
  console.log(id)
  Task.findOneAndDelete({
    _id:new mongoose.Types.ObjectId(id),
  }).then(() => {
    res.sendStatus(200);
  });
} 
