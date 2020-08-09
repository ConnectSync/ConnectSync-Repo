import React, { useState } from "react"
import "./PostStyles.css"
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {getPostByID,addLike,removeLike} from "../../redux/action/posts"



const Post = (props) => {
    const {
        postImg,
        text,
        comments,
        getPostByID,
        likes,
        _id,
        user: { name, img },
      } = props;
    //initial heart class
    const [heart, setHeart] = useState("fa-heart-o");
    const [numLikes,setNumLikes] = useState(likes.length)
    const postId = _id;
    const ifPostImg = () => {
        if (postImg) {
          return (
            <img class="card-img-top card-img" src={postImg} alt="Card image cap" />
          );
        }
      };
      const like = (e) => {
        console.log(_id);
        e.preventDefault();
        if (heart === "fa-heart-o") {
          setHeart("fa-heart");
          console.log("Liked");
        } else {
          setHeart("fa-heart-o");
          console.log("disLiked");
        }
      };
      const readMore = (e) => {
        var dots = document.getElementById("dots");
        var moreText = document.getElementById("more");
        var btnText = document.getElementById("myBtn");
    
        if (dots.style.display === "none") {
          dots.style.display = "inline";
          btnText.innerHTML = "Read more";
          moreText.style.display = "none";
        } else {
          dots.style.display = "none";
          btnText.innerHTML = "Read less";
          moreText.style.display = "inline";
        }
      };
      const conditionText = () => {
        if (text.length < 20) {
          return <p className="card-text ">{text}</p>;
        } else {
          const textLength = text.length;
          const first = text.substring(0, 150);
          const last = text.substring(150, textLength);
          return (
            <div>
              <p class="card-text ">
                {first}
                <span id="dots">...</span>
                <span id="more">{last}</span>
              </p>
    
              <button id="myBtn" onClick={readMore} className="btn btn-sm">
                Read more
              </button>
            </div>
          );
        }
      };

    return(
        <div className="card mb-3">
            <div class="card-header d-flex align-items-center">
                <img className="rounded-circle profile-img" src={img} />
                <p className="p-2">{name}</p>
            </div> 
            {ifPostImg()}
            <div className="card-body">
                {conditionText()}
                <div className="d-flex align-items-center card-border ">
                    <p>
                        <i onMouseDown={like} className={`fa fa-2x ${heart} heart`}></i>
                    </p>
                    <p className="p-2">{likes.length} likes</p>
                    <p className="p-2">
                        <Link className="comment-link" to={`/posts/${postId}/comment`}>
                        <i
                            className="fa fa-comment-o fa-2x"
                            onClick={() => {
                                getPostByID(postId);
                              }}
                        ></i>
                        </Link>
                    </p>
            </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    posts: state.posts,
  });
  
  export default connect(mapStateToProps, {
    getPostByID,
    addLike,
    removeLike
  })(Post);