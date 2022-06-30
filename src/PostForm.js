import React from 'react'

function PostForm() {

    React.useEffect(() => {
        
      }, []);

      const [title, setTitle] = useState();
      const [description, setDescription] = useState();


      const handleSubmit = async e => {
        //e.preventDefault();
        await savePost({
          username,
          password
        });
        localStorage.setItem("token", JSON.stringify(token.access_token));
        setToken(token.access_token);
        console.log(token.access_token);
      }

      return (
        <div style={{width : "1000px", textAlign : "center"}} class = "container">
          <form onSubmit={handlePost}>
          <div style={{textAlign : "left"}} class="form-group">
            <label style={{fontSize : "25px"}} for="exampleFormControlInput1">Title</label>
            <input type="text" class="form-control" id="titleInput" placeholder="Title" value={this.title}/>
          </div>
          <div style={{textAlign : "left"}} class="form-group">
            <label style={{fontSize : "20px"}} for="exampleFormControlTextarea1">What's on your mind?</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="5" placeholder="Say something..." value={this.description}></textarea>
          </div>
          </form>
          <form>
          <div style={{textAlign : "left", marginTop: "10px"}} class="form-group">
            <label style={{marginRight : "10px"}} for="exampleFormControlFile1">Upload picture: </label>
            <input type="file" class="form-control-file" id="FormControlFile"/>
            <button style={{width : "250px", marginLeft : "19em"}} type="submit" class="btn btn-primary mb-2">POST</button>
          </div>
        </form>
        </div>
      )
}

async function savePost(credentials) {
  console.log(JSON.stringify(credentials))
  return fetch('http://localhost:8090/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: "username="+credentials.username+"&"+"password="+credentials.password  //"username=john&password=1234"
  })
    .then(data => data.json())

 }

export default PostForm