import './App.css';
import {BrowserRouter, Routes, Route, Link,} from "react-router-dom";
import {useState,useEffect} from 'react';
import Register from "./components/Register";
import UserContext from "./components/UserContext";
import axios from "axios";
import Login from "./components/Login";
import Home from "./components/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // import first

function App() {
  const [email,setEmail] = useState('');
  const [name,setname] = useState('');

  useEffect(() => {
    axios.get('http://localhost:4000/api/user', {withCredentials:true})
      .then(response => {
        setEmail(response.data.email);
        setname(response.data.username)
        console.log(response.data)
      });
  }, [email]);

  function logout() {
    axios.post('http://localhost:4000/api/logout', {}, {withCredentials:true})
      .then(() => {
        setEmail('')
        window.location.href = "/"
      });
  }

  return (
    <UserContext.Provider value={{email,setEmail}}>
      <BrowserRouter>
      <Navbar  bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">Rean</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
        <Nav className="justify-content-end" style={{ width: "100%" }}>
          {!email && <><Nav.Link href="/">Login</Nav.Link><Nav.Link href="/register">Register</Nav.Link></>}
          {email && <><Nav.Link >{name}</Nav.Link>  <Nav.Link onClick={e => {e.preventDefault();logout();}}>Logout</Nav.Link></>}
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        <main>
          <ToastContainer/>
          <Routes>
       
             {!email &&<Route exact path={'/'} element={<Login/>} />}
             {email &&  <Route exact path={'/'} element={<Home/>} />  }
            <Route exact path={'/register'} element={<Register/>} />
                 
          </Routes>
        </main>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
