import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import VideoCard from './VideoCard'
import { getAlluploadedVideosAPI, getCategoryAPI, updateCategoryAPI } from '../../service/allAPI'



function View({uploadVideoResponse,setDropVideoResponse}) {

const[allVideos,setAllVideos]=useState([])
const[deleteVideoResponse,setDeleteVideoResponse]=useState(false)

useEffect(()=>{
  getAllUploadedVideos()
  setDeleteVideoResponse(false)
},[uploadVideoResponse,deleteVideoResponse])



const getAllUploadedVideos= async()=>{
   const result= await getAlluploadedVideosAPI()
  console.log(result);
  if(result.status==200){
    setAllVideos(result.data)
  }else{
    setAllVideos([])
    console.log("API Failed");
    
  }
  

}

const VideodragOver =(e)=>{
  e.preventDefault()
}

const videoDrop=async (e)=>{
 const {videoId,categoryId}= JSON.parse(e.dataTransfer.getData("data"))
 console.log(videoId,categoryId);
 const {data}= await getCategoryAPI()
 console.log(data);
 const selectedCategory= data.find(item=>item.id==categoryId)
 let result=selectedCategory.allVideos.filter(video=>video.id!==videoId)
 console.log(result);
 let {id,categoryName}= selectedCategory
 let newCategory= {id,categoryName,allVideos:result}
 console.log(newCategory);
 const res = await updateCategoryAPI(categoryId,newCategory)
 setDropVideoResponse(res)


 
 


}
//  console.log(allVideos);


  return (
    <div>
      <Row  droppable="true" onDragOver={(e)=>VideodragOver(e)} onDrop={e=>videoDrop(e)}>
      {
        allVideos?.length>0?allVideos.map(video=>(
     <Col sm={12} md={4} lg={3}>
          <VideoCard video={video} setDeleteVideoResponse={setDeleteVideoResponse}  />
          </Col>
        )):<p>Nothing To Display</p>
        }
      </Row>
    </div>
  )
}

export default View
