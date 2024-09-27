import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import React, { useState } from 'react'
import { uploadVideoAPI } from '../../service/allAPI';

function Add({setUploadVideoResponse}) {

  const[uploadVideo,setUploadVideo]=useState({
    id:"",caption:"",url:"",link:""
  })


  // console.log(uploadVideo);
  
// https://www.youtube.com/watch?v=HHTYK_Bm94c
// https://www.youtube.com/embed/HHTYK_Bm94c
// https://www.youtube.com/watch?v=AiD6SOOBKZI

const getYoutubeLink=(e)=>{
   const {value}=e.target
  if(value.includes("v=")){
    let vID = value.split("v=")[1].slice(0,11)
    console.log(` https://www.youtube.com/embed/${vID}`);
    setUploadVideo({...uploadVideo,link:` https://www.youtube.com/embed/${vID}`})
    
  }else{
    setUploadVideo({...uploadVideo,link:""})
  }

}

const handleAdd=async()=>{
const{id,caption,url,link}=uploadVideo

if(!id || !caption || !url || !link){
  alert("Please Fill Missing Fields")
}else{
  // store video details to the json server
const result = await uploadVideoAPI(uploadVideo)
console.log(result);

if(result.status>=200&&result.status<=300){
  // success
  handleClose()
  // Alert
  alert("Uploaded Successfully")
// after getting success response field should be empty
  setUploadVideo({
    id:"",caption:"",url:"",link:""
  })

  setUploadVideoResponse(result.data)
 
}else{
  console.log(result.message);
}

}


}



  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
       <div className="d-flex mb-5 mt-5 align-items-center">
        <h2>Upload Videos</h2>
        <button onClick={handleShow} className='btn'><i className="fa-solid fa-arrow-up-from-bracket fa-beat fa-2x mb-2"></i></button>

     
<Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload Videos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
        <FloatingLabel
        controlId="floatingInput"
        label="Video Id"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="Enter Video Id" onChange={(e)=>setUploadVideo({...uploadVideo,id:e.target.value})} />
      </FloatingLabel>
      <FloatingLabel controlId="floatingName" label="Video Name"  className="mb-3">
        <Form.Control type="text" placeholder="Enter Video Name" onChange={(e)=>setUploadVideo({...uploadVideo,caption:e.target.value})}  />
      </FloatingLabel>
      <FloatingLabel controlId="floatingName" label="Image Url"  className="mb-3">
        <Form.Control type="text" placeholder=" Image Url" onChange={(e)=>setUploadVideo({...uploadVideo,url:e.target.value})}
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingName" label="Video Url"  className="mb-3">
        <Form.Control type="text" placeholder=" Video Url" onChange={getYoutubeLink} />
      </FloatingLabel>
    
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAdd}>Add</Button>
        </Modal.Footer>
      </Modal>
      </div>





    </div>
  )
}

export default Add
