import React from "react";
import { useState } from "react";



function GroupList() {

    const [userData, setPosts] = useState([]);
    var groups;
    const[isLoaded, setIsLoaded]=useState(false);

    // React.useEffect(() => {
    //     const userData = JSON.parse(localStorage.getItem("userData"));
    //     console.log("OVDE JE USER GROUPS");
    //     groups = userData.groups;
    //     console.log(groups);
    //     console.log(groups[0].name)
    //     setIsLoaded(true);
    // }, []);

  
    return (
        <div style={{width : "300px", backgroundColor : "white"}}>
            { JSON.parse(localStorage.getItem("userData")).groups.map((group) => (
            <div class="row">
              <div class="col-4">
              <div class="list-group" id="list-tab" role="tablist" style={{width:"200px"}}>
                <a class="list-group-item" id="list-home-list" data-toggle="list" href="#" role="tab" aria-controls="home">{group.name}</a>
              </div>
            </div>   
            </div>     
            ))}
        </div>
    ) 
      
}
export default GroupList;