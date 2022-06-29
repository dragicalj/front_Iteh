import React from 'react'

async function getPost(credentials) {
    console.log(JSON.stringify(credentials))
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

function Post({token}) {
  return (
    <div className='post'>
        <h3>username</h3>
        <p>description</p>
        {console.log(`Bearer ${token}`)}
    {console.log(getPost())}
    </div>
  )
}

export default Post