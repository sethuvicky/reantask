
let express = require("express")
let bodyParser = require("body-parser")
let cookieParser = require("cookie-parser")
let config =  require("./db/config")
let cors =  require("cors")
let UserRouter = require("./routes/userRouter")
let TasksRouter = require("./routes/TasksRouter")
config()

const app = express();
app.use(cookieParser());
app.use(bodyParser.json({extended:true}));
app.use(cors({
  credentials:true,
  origin: 'http://localhost:3000',
}));

 app.use("/api" ,UserRouter)
 app.use("/api" ,TasksRouter)

app.listen(4000);