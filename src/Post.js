import React from 'react'
import './Post.css';



function Post(post) {

  React.useEffect(() => {
    console.log(post)
  }, []);

  return (
    <div style={{width : "1000px"}} class="container">
    <div class="col-md-12 col-lg-12">
        <article class="post vt-post">
            <div class="row">
                <div class="col-xs-12 col-sm-5 col-md-5 col-lg-4">
                    <div class="post-type post-img">
                        <a href="#"><img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="img-responsive" alt="image post"></img></a>
                    </div>
                    <div class="author-info author-info-2">
                        <ul class="list-inline">
                            <li>
                                <div class="info">
                                    <p>Posted on:</p>
                                    <strong>Mar 21, 2015</strong></div>
                            </li>
                            <li>
                                <div style={{marginLeft : "50px"}} class="info">
                                    <p>Comments:</p>
                                    <strong>127</strong></div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-7 col-md-7 col-lg-8">
                    <div class="caption">
                        <h3 class="md-heading"><a href="#">{post.post.title}</a></h3>
                        <p> {post.post.description} </p>
                        <a class="btn btn-default" href="#" role="button">Read More</a> </div>
                </div>
            </div>
        </article>
        </div>
        </div>
  )
}


export default Post