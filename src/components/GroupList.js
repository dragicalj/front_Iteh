import React from "react";
import { useState } from "react";



function GroupList() {

    const [userData, setPosts] = useState([]);
    var groups;
    const[isLoaded, setIsLoaded]=useState(false);


    return (
        <div style={{width : "300px", backgroundColor : "white"}}>
            { JSON.parse(localStorage.getItem("userData")).groups.map((group) => (
            <div class="row">
              <div class="col-4">
              <div class="list-group" id="list-tab" role="tablist" style={{width:"300px", textAlign:"center", fontSize : "16px"}}>
                <a class="list-group-item" id="list-home-list" data-toggle="list" href="#" role="tab" aria-controls="home">{group.name}</a>
              </div>
            </div>   
            </div>     
            ))}
        </div>
    ) 
      
}
export default GroupList;