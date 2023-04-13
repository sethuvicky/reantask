const secret = 'secret123';
 let User  = require("../models/User")
 let bcrypt = require("bcrypt")
 let jwt = require("jsonwebtoken")
exports.createUser =    async(req, res, next) => {
    const {username,email,password} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = new User({password:hashedPassword,email,username});
    let userExist = await User.findOne({email})
    if(userExist){
      return res.status(401).send({
        message: 'User already exist'
     });
       }
    user.save().then(userInfo => {
      jwt.sign({id:userInfo._id,email:userInfo.email}, secret, (err,token) => {
        if (err) {
          console.log(err);
          res.sendStatus(500);
        } else {
          res.cookie('token', token).json({id:userInfo._id,email:userInfo.email});
        }
      });
    });
} 
exports.loginUser =    async(req, res, next) => {
      const {email,password} = req.body;

  User.findOne({email})
    .then(userInfo => {
      if (!userInfo) {
        return res.sendStatus(401);
      }
      const passOk = bcrypt.compareSync(password, userInfo.password);
      if (passOk) {
        jwt.sign({id:userInfo._id,email},secret, (err,token) => {
          if (err) {
            console.log(err);
            res.sendStatus(500);
          } else {
            res.cookie('token', token).json({id:userInfo._id,email:userInfo.email});
          }
        });
      } else {
        res.sendStatus(401);
      }
    })

} 
exports.getUser = async(req, res, next) => {
        if (!req.cookies.token) {
      return res.json({});
    }
    const cookieToken = jwt.verify(req.cookies.token, secret);
    User.findById(cookieToken.id)
      .then(userInfo => {
        if (!userInfo) {
          return res.json({});
        }
        res.json({id:userInfo._id,email:userInfo.email,username:userInfo.username});
      });
  } 

exports.logout = async(req, res, next) => {
    res.cookie('token', '').send();
} 