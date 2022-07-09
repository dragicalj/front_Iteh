import React from 'react'
import './Post.css';



function Post(post) {

  React.useEffect(() => {
    console.log("OVDE SU INFO O POST")
    console.log(post)
  }, []);

  return (
    <div style={{width : "1000px", marginTop: "50px"}} className="container">
    <div className="col-md-12 col-lg-12">
        <article className="post vt-post">
            <div className="row">
                <div className="col-xs-12 col-sm-5 col-md-5 col-lg-4">
                    <div className="post-type post-img">
                        <a href="#"><img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="img-responsive" alt="image post"></img></a>
                    </div>
                    <div className="author-info author-info-2">
                        <ul className="list-inline">
                            <li>
                                <div className="info">
                                    <p>Posted on:</p>
                                    <strong>Mar 21, 2015</strong></div>
                            </li>
                            <li>
                                <div style={{marginLeft : "50px"}} className="info">
                                    <p>Comments:</p>
                                    <strong>127</strong></div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-7 col-md-7 col-lg-8">
                    <div className="caption">
                        <h3 className="md-heading"><a href="#">{post.post.title}</a></h3>
                        <p> {post.post.description} </p>
                        <a className="btn btn-default" href="#" role="button">Read More</a> </div>
                </div>
            </div>
        </article>
        </div>
        </div>
  )
}


export default Post