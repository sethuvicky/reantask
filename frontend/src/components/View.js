import React from "react";
import "react-toastify/dist/ReactToastify.css"
import {

  Modal,

  ModalBody,

} from "reactstrap";

function AddorEdit({ modal, toggle, userValues, }) {
 console.log(userValues)

  console.log(userValues  );
  return (
    <Modal isOpen={modal} toggle={toggle}>
   <ModalBody>
      <div className="row">
          <div className="col-lg-12 py-2 border-bottom">
            <span>Tasl title</span>
            <p className="fs-18 mb-0 fw-bold">{userValues && userValues.text}</p>
          </div>
          <div className="col-lg-12 py-3">
            <span>Description</span>
            <p className="fs-18 mb-0 fw-bold">
              {userValues&& userValues.description }
            </p>
           
          </div>
          <div className="col-lg-12 py-3">
            <span>Category</span>
            <p className="fs-18 mb-0 fw-bold">
              {userValues&& userValues.category }
            </p>
           
          </div>
        </div>
    </ModalBody>  
    </Modal>
  );
}

export default AddorEdit;
