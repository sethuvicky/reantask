let express = require("express")
let {CreateTask,GetTasks,UpdateTask,CompleteTask,DeleteTask} = require("../controllers/TaskControllers")
const router = express.Router();

router.route("/tasks").get(GetTasks);
router.route("/tasks").put(CreateTask);
router.route("/tasks/update").post(UpdateTask);
router.route("/tasks/complete").post(CompleteTask);
router.route("/delete/:id").delete(DeleteTask);

module.exports = router;
