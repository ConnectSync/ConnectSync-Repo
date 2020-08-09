import React, { useState } from "react"
import { Link } from "react-router-dom";



const Post = (props) => {
    //initial heart class
    const [heart, setHeart] = useState("fa-heart-o");

    return(
        <div className="card mb-3">
            <div class="card-header d-flex align-items-center">
                <img className="rounded-circle profile-img" src="..." />
                <p className="p-2">DMN</p>
            </div> 
            {/* ifpostimg() */}
            <div className="card-body">
                {/* conditional render */}
                <div className="d-flex align-items-center card-border ">
                    <p>
                        <i onMouseDown="" className={`fa fa-2x ${heart} heart`}></i>
                    </p>
                    <p className="p-2">10 likes</p>
                    <p className="p-2">
                        <Link className="comment-link" to="">
                        <i
                            className="fa fa-comment-o fa-2x"
                            onClick=""
                        ></i>
                        </Link>
                    </p>
            </div>
            </div>
        </div>
    )
}


export default Post