import {useState} from 'react'

import { Button , Modal} from 'react-bootstrap';

function CommModal(props){
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return(
    <div>

          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            style={{top: '30%'}}
          >
            <Modal.Header>
              <Modal.Title>Blog Guidelines</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            Please take a minute to read over these guidelines prior to writing a blog

            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleClose}>Understood</Button>
            </Modal.Footer>
          </Modal>
    </div>
  );
}

export default CommModal
