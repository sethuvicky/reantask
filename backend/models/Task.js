let mongoose = require("mongoose")
const TaskSchema = new mongoose.Schema({
  text:{type:String,required:true},
  description:{type:String,required:true},
  category:{type:String,required:true},
  done:{type:mongoose.SchemaTypes.Boolean,required:true},
  user:{type:mongoose.SchemaTypes.ObjectId},
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
