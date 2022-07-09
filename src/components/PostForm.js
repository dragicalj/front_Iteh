import React from 'react'
import Combobox from "react-widgets/Combobox";
import { useState } from 'react';

function PostForm(groups) {

    const [group, setGroup] = React.useState();
    const [title, setTitle] = React.useState();
    const [desc, setDesc] = React.useState();

    React.useEffect(() => {
      console.log('GRUPE')
      console.log(groups)
      }, []);
    

    const handleChangeGroup = (event) => {
      setGroup(event.name);
    };

    const handleChangeTitle = (event) => {
      setTitle(event.target.value);
    };

    const handleChangeDesc = (event) => {
      setDesc(event.target.value);
    };

    const callSavePost = async e => {
      e.preventDefault();
      console.log(group);
      console.log(title);
      console.log(desc);
      //await savePost();

      }
      
    
     

      return (
        <div style={{width : "1000px", textAlign : "center"}} className = "container">
          <form>
          <div style={{textAlign : "left"}} className="form-group">
            <label style={{fontSize : "25px"}} for="exampleFormControlInput1">Title</label>
            <input type="text" className="form-control" id="titleInput" placeholder="Title" value ={title} onChange = {handleChangeTitle}/>
          </div>
          <div style={{textAlign : "left"}} className="form-group">
            <label style={{fontSize : "20px"}} for="exampleFormControlTextarea1">What's on your mind?</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="5" placeholder="Say something..." value={desc} onChange = {handleChangeDesc}></textarea>
          </div>
          </form>
          <form>
          <div style={{textAlign : "left", marginTop: "10px"}} className="form-group">
            <label style={{marginRight : "10px"}} for="exampleFormControlFile1">Your groups: {group}</label> 
              <Combobox style={{width: "300px"}}
                defaultValue="Select group"
                data={groups.groups}
                textField='name'
                value= {group}
                onChange = {handleChangeGroup}
              />   
          </div>
          <div style={{textAlign : "right", marginTop: "10px"}} className="form-group">
            <button style={{width : "250px"}} type="submit" className="btn btn-primary mb-2" onClick={callSavePost}>POST</button>
          </div>
        </form>
        </div>
      )
}


export default PostForm