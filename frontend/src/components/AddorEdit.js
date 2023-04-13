import Select from "react-select";
import React, { useEffect, useState } from "react";
import { Eye, MoreVertical } from "react-feather";
import { ToastContainer, toast } from "react-toastify"
import Form from 'react-bootstrap/Form';
import "react-toastify/dist/ReactToastify.css"
import {
  Button,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import axios from "axios";

function AddorEdit({ modal, toggle, edit, userValues,getData,setData }) {
    
    let [name,setName] = useState(null)
    let [category,setcategory] = useState(null)
    let [des,setdes] = useState(null)


  useEffect(()=>{
    setName(userValues&& userValues.name)
    setcategory(userValues && userValues.category)
  },[userValues])
  let AddUpdateHandler = ((e)=>{
     e.preventDefault();
   
     if(edit){
      console.log(des)
        axios.post('http://localhost:4000/api/tasks/update', {_id:userValues._id,text:name ,description:des ?des :userValues.description,category:category}, {withCredentials:true})
          .then(() => {
            toast.success(` updated successfuly `)
            getData()
            setName(null)
            setcategory(null)
            setdes(null)
            toggle()
          });
     }else{
        if(!name )return toast.error("Enter task name")
        if(!category )return toast.error("Select category ")
        if(!des )return toast.error("Enter description ")
        axios.put('http://localhost:4000/api/tasks', {text:name ,description:des,category:category}, {withCredentials:true})
        .then(response => {
          console.log(response)
          getData()
          toggle()
          setName(null)
          setcategory(null)
          setdes(null)
          toast.success("task added successfuly")
         })
     }
 
  })
  console.log(userValues && userValues.category);


  return (
    <Modal isOpen={modal} toggle={toggle}>
      <Form>
        <ModalHeader toggle={toggle}>
          {edit ? <span> Update task</span> : <span>Add task</span>}
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="name">task name</Label>
            <Input
              defaultValue={userValues && userValues.text}
              type="text"
              name="name"
              id="name"
              placeholder="Enter task name"
              onChange={(e)=>{
                setName(e.target.value)
              }}
            />
       
          </FormGroup>
          <FormGroup>
            <Label for="description">task description</Label>

            <Form.Control      defaultValue={userValues && userValues.description}
              type="text"
              name="description"
              id="description"
              placeholder="description"
              onChange={(e)=>{
                setdes(e.target.value);
              }} as="textarea" rows={3} />

      
            
          </FormGroup>
        
               <FormGroup>
          <Label for="exampleSelect">Select</Label>
          <Input defaultValue={userValues && userValues.category}
                onChange={(e)=>{
            setcategory(e.target.value)
              }} type="select" name="select" id="exampleSelect">
          <option value="" disabled selected hidden>Select category </option>
          <option value={'Home work'}>Home work</option>
          <option value={'Office work'}>Office work</option>
          <option value={'others'}>others</option>
          </Input>
        </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={(e)=>AddUpdateHandler(e)}>
            {edit ? <span>Update</span> : <span>Add</span>}
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Form>{" "}
    </Modal>
  );
}

export default AddorEdit;
