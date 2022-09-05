import React from 'react'
import Combobox from "react-widgets/Combobox";
import { useState } from 'react';

function PostForm() {

    const [group, setGroup] = React.useState(null);
    const [title, setTitle] = React.useState();
    const [desc, setDesc] = React.useState();
    const[newTitle, setNewTitle] = useState("");
    const[newDescription, setNewDescription] = useState("");

    var isPosted = false;
    var firstLoad = true;
    var isUpdated1=false;

    var groups1 = JSON.parse(localStorage.getItem("groups"))
    var post = JSON.parse(localStorage.getItem("postToEdit"));

    React.useEffect(() => {
      if(JSON.parse(localStorage.getItem("isEdit"))=="true"){
        if(firstLoad){
          console.log("POSTT NOVI");
          
          
          console.log(post);
          setTitle(post.post.title);
          setDesc(post.post.description);
          setGroup(post.post.groupName);
          firstLoad = false;  
        }
     }
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
    const callEditPost = async e => {
      e.preventDefault();
      console.log(title);
      console.log(desc+"aaa");
      await updatePost(post.post.id, title, desc);
      if(isUpdated1) {
        alert("Post changed!");
      } else {
        alert("Unsuccessful! Try again!");
      }
      window.location.reload(false);
    }
    async function updatePost(postID, title1, desc1) {
      return fetch('http://localhost:8090/api/post/update', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify( {postID : postID , title : title1, description: desc1})
        })
        .then(function(response) {
          if(response.ok) {
            console.log("Uspesno promenjen post!")
            isUpdated1 = true;
          }
          else {
            isUpdated1 = false;
          }
        })
    }
    
    const callSavePost = async e => {
      e.preventDefault();
      console.log(group);
      console.log(title);
      console.log(desc);
      if(group ==  null) {
        alert("Choose group where you want to post!!!");
        return;
      }
      await savePost(JSON.parse(localStorage.getItem("username")), group, title, desc);
      if(isPosted) {
        alert("Successfully saved post with '" + title + "' title.")
      } else {
        alert("Post with '" + title + "' title doesn't saved.")
      }
      window.location.reload(false);
      }
      
    
     
      if(JSON.parse(localStorage.getItem("isEdit"))=="false"){
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
                  data={groups1}
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
    } else{
      
      
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
                data={groups1}
                textField='name'
                value= {group}
                onChange = {handleChangeGroup}
              />   
          </div>
          <div style={{textAlign : "right", marginTop: "10px"}} className="form-group">
            <button style={{width : "250px"}} type="submit" className="btn btn-primary mb-2" onClick={callEditPost}>Save changes</button>
          </div>
        </form>
        </div>
      )
    }


      async function savePost(username, groupname, title, description) {
        return fetch('http://localhost:8090/api/post/save', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify( {post : {title : title, description : description, picturePath : ""} , username: username, groupname : groupname})
          })
          .then(function(response) {
            if(response.ok) {
              console.log("Uspesno sacuvan post!")
              isPosted = true;
            } else {
              isPosted = false;
            }
          })
      }


}


export default PostForm