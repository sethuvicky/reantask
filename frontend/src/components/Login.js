import {useState, useContext} from 'react';
import axios from 'axios';
import UserContext from "./UserContext";
import {useNavigate} from "react-router-dom"
import { toast } from 'react-toastify';
function Login() {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const user = useContext(UserContext);
  let navigate = useNavigate()
  function loginUser(e) {
    e.preventDefault();
    if(!email )return toast.error("Enter email")
    if(!password )return toast.error("Enter password ")
    const data = {email,password};
    axios.post('http://localhost:4000/api/login', data, {withCredentials:true})
      .then(response => {
        user.setEmail(response.data.email);
        setEmail('');
        setPassword('');
       })
      .catch(() => {
        toast.error("Invalid username or password")
      });
  }

  if (user.email ) {
    window.location.href = "/"
   }

  return (
    <div style={{display:"flex" ,justifyContent:"center",marginTop:"10%"}}>

<div className="shadow-lg p-3 mb-5 bg-white rounded" style={{width:"40%",height:"50%"}}>


   <form   action="" onSubmit={e => loginUser(e)}>

        <h3  style={{marginBottom:"4%",textAlign:"center"}} className="text-muted">Login</h3>

<div className="form-group">
  
  <label htmlFor="exampleInputEmail1">Email address</label>
  <input type="email" onChange={e => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
  <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
</div>
<div className="form-group">
  <label htmlFor="exampleInputPassword1">Password</label>
  <input onChange={e => setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
</div>

<button style={{marginTop:"5%"}} type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
    </div>
   
   

  );
}

export default Login;