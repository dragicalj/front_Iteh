import React from 'react'
import './Post.css';
import { useState } from 'react';



function Post(post) {

    var isDeleted = false;
    const[deletePostID, setDeletePostID] = useState("");

  React.useEffect(() => {
    console.log("OVDE SU INFO O POST")
    console.log(post)
  }, []);

  const callDeletePost = async e => {
    e.preventDefault(); 
    await deletePost(post.post.id);
    if(isDeleted) {
      alert("Post deleted!");
    } else {
      alert("Post doesn't exist");
    }
    window.location.reload(false);
  }

  async function deletePost(postId) {
    return fetch('http://localhost:8090/api/post/delete/'+ postId, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods':'POST,GET,DELETE,PATCH,OPTIONS'
      },
    })
      .then(function(response) {
        if(response.ok) {
          isDeleted = true;
        } else {
          isDeleted = false;
        }
      })
  }
  return (
    <div style={{width : "1000px", marginTop: "50px"}} className="container">
    <div className="col-md-12 col-lg-12">
        <article className="post vt-post">
            <div className="row">
                <div className="col-xs-12 col-sm-5 col-md-5 col-lg-4">
                    <div className="post-type post-img">
                        <a href="#"></a>
                    </div>
                    <div className="author-info author-info-2">
                        <ul className="list-inline">
                            <li>
                                <div className="info">
                                    <p>Posted on:</p>
                                    <strong>{post.post.groupName}</strong></div>
                            </li>
                            {/* <li>
                                <div style={{marginLeft : "50px"}} className="info">
                                    <p>Comments:</p>
                                    <strong>127</strong></div>
                            </li> */}
                        </ul>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-7 col-md-7 col-lg-8">
                    <div className="caption">
                        <h3 className="md-heading"><a href="#">{post.post.title}</a></h3>
                        <p> {post.post.description} </p>
                        { <a className="delete-btn" href="#" role="button" onClick={callDeletePost}>Delete post</a>  }
                    </div>
                </div>
            </div>
        </article>
        </div>
        </div>
  )
}


export default Post