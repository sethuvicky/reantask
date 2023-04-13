import {useState, useContext} from 'react';
import axios from 'axios';
import UserContext from "./UserContext";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function Register() {
  let navigate = useNavigate()
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [password1,setPassword2] = useState('');

  const user = useContext(UserContext);

  function registerUser(e) {
    e.preventDefault();
    if(password !== password1){
      return toast.error("Passwords must be same")
    }
    if(!name )return toast.error("Enter user name")
    if(!email )return toast.error("Enter email")
    if(!password )return toast.error("Enter password ")
    if(!password1 )return toast.error("Re enter password ")

    const data = {email,password,username:name};
    axios.post('http://localhost:4000/api/register', data, {withCredentials:true})
      .then(response => {
        user.setEmail(response.data.email);
        setEmail('');
        setPassword('');
        toast.success("User registered successfuly")
        window.location.href = "/"
      }).catch((err)=>{
        console.log(err.response.data)
      toast.error(err.response.data.message)
       })
  }
if(user.email){
  window.location.href = "/"
}


  return (
  
    <div style={{display:"flex" ,justifyContent:"center",marginTop:"10%"}}>
<div className="shadow-lg p-3 mb-5 bg-white rounded" style={{width:"40%",height:"50%"}}>
<form   action="" onSubmit={e => registerUser(e)}>

        <h3  style={{marginBottom:"4%",textAlign:"center"}} className="text-muted">Register</h3>
        <div className="form-group">
  
  <label htmlFor="exampleInputEmail1">User name</label>
  <input type="text" onChange={e => setName(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter name" />
</div>
<div className="form-group">
  
  <label htmlFor="exampleInputEmail1">Email address</label>
  <input type="email" onChange={e => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
  <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
</div>
<div className="form-group">
  <label htmlFor="exampleInputPassword1">Password</label>
  <input onChange={e => setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
</div>
<div className="form-group">
  <label htmlFor="exampleInputPassword1">confrim password</label>
  <input onChange={e => setPassword2(e.target.value)} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
</div>
<button style={{marginTop:"5%"}} type="submit" className="btn btn-primary">Submit</button>
</form>
</div>

</div>
  );
}

export default Register;