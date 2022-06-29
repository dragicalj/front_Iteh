import React from 'react'


function Post({token}) {

  React.useEffect(() => {
    handleSubmit();
  }, []);

  const handleSubmit = async e => {
 //   e.preventDefault();
    const posts = await getPost({});
    localStorage.setItem("posts", JSON.stringify(posts));
    console.log(posts);
  };


  return (
    <div className='post'>
        <h3>username</h3>
        <p>description</p>
        {console.log(`Bearer ${token}`)}
    </div>
  )
}

async function getPost() {

  //console.log(JSON.stringify(credentials))
  return fetch('http://localhost:8090/api/posts', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods':'POST,GET,PATCH,OPTIONS'
    },
  })
    .then(data => data.json())
       
 }

export default Post