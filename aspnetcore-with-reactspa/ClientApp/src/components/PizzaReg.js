import React from 'react'
import {
    Button, Modal, ModalFooter,
    ModalHeader, ModalBody
} from "reactstrap"
  
function PizzaReg(props) {
  
    // Modal open state
    const [modal, setModal] = React.useState(props.modal);
    const [ide, setIde] = React.useState(props.ide);
  
    // Toggle for Modal
    const toggle = () => setModal(!modal);
  
    return (
        <div style={{
            display: 'block', width: 700, padding: 30
        }}>
            
            <Modal isOpen={modal}
                toggle={toggle}
                modalTransition={{ timeout: 2000 }}>
                <ModalBody>
                    Simple Modal with just ModalBody...
                </ModalBody>
            </Modal>
        </div >
    );
}
  
export default PizzaReg;