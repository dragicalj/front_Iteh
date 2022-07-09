import React from "react";
import { useState } from "react";
import { IconBase } from "react-icons";
import { useNavigate } from 'react-router';



function GroupList() {

    const [userData, setPosts] = useState([]);
    var groups;
    const[isLoaded, setIsLoaded]=useState(false);
    
    let navigate = useNavigate();

    function navigateToGroup(groupName) {
     // localStorage.setItem("groupName", JSON.stringify(groupName));
     // navigate("../group", { replace: true });
    }


    return (
        <div style={{width : "300px", backgroundColor : "white", marginLeft:"10px" }}>
            { JSON.parse(localStorage.getItem("userData")).groups.map((group) => (
            <div class="row" onClick={navigateToGroup(group.name)}>
              <div class="col-4">
              <div class="list-group" id="list-tab" role="tablist" style={{width:"300px", textAlign:"center", fontSize : "16px"}}>
                <a class="list-group-item" id="list-home-list" data-toggle="list" href="#" role="tab" aria-controls="home"> {group.name} </a>
              </div>
            </div>   
            </div>     
            ))}
        </div>
    ) 
      
}
export default GroupList;