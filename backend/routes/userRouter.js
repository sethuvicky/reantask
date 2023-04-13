let express = require("express")
let {createUser,loginUser,getUser,logout} = require("../controllers/UserControllers")
const router = express.Router();

router.route("/register").post(createUser);
router.route("/login").post(loginUser);
router.route("/user").get(getUser);
router.route("/logout").post(logout);





module.exports = router;
