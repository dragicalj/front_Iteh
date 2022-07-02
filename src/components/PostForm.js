import React from 'react'
import { useState } from 'react';

function PostForm() {

    React.useEffect(() => {
        
      }, []);

     

      return (
        <div style={{width : "1000px", textAlign : "center"}} className = "container">
          <form>
          <div style={{textAlign : "left"}} className="form-group">
            <label style={{fontSize : "25px"}} for="exampleFormControlInput1">Title</label>
            <input type="text" className="form-control" id="titleInput" placeholder="Title" />
          </div>
          <div style={{textAlign : "left"}} className="form-group">
            <label style={{fontSize : "20px"}} for="exampleFormControlTextarea1">What's on your mind?</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="5" placeholder="Say something..."></textarea>
          </div>
          </form>
          <form>
          <div style={{textAlign : "left", marginTop: "10px"}} className="form-group">
            <label style={{marginRight : "10px"}} for="exampleFormControlFile1">Upload picture: </label>
            <input type="file" className="form-control-file" id="FormControlFile"/>
            <button style={{width : "250px", marginLeft : "17em"}} type="submit" className="btn btn-primary mb-2">POST</button>
          </div>
        </form>
        </div>
      )
}


export default PostForm