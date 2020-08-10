import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { connect } from "react-redux";
import {
  getPostByID,
  addComment,
  removeComment,
} from "../../redux/action/posts";
import "./CommentPageStyles.scss";

function CommentPage(props) {
  const { getPostByID, addComment, removeComment, posts, auth } = props;
  const { loading, post } = posts;
  const authLoading = auth.loading;
  // const isLoading = member.loading;
  const [commentText, setCommentText] = useState("");
  const [loadingInfo, setLoadingInfo] = useState(true);

  useEffect(() => {
    if (props.match.params.postId) {
      getPostByID(props.match.params.postId);
      setTimeout(() => {
        if (typeof post != "undefined") {
          setLoadingInfo(false);
        }
      }, 1000);
    }
  }, []);
  const handleChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleOnClick = () => {
    if (commentText.length < 1) {
      alert("Please type something before posting...");
    } else {
      addComment(props.match.params.postId, commentText);
      setCommentText("");
    }
  };

  const renderComment = (comment) => {
    return (
      <div key={comment._id} className="eachComment">
        <div className="userInfo">
          <div className="img">
            <img src={comment.user.img} alt={comment.user.name} />
          </div>
          <span className="userName">{comment.user.name}</span>
          {comment.user._id === auth.user._id && (
            <span
              className="delete bg-red"
              onClick={() => {
                let result = window.confirm(
                  "Do you want to delete this comment?"
                );
                if (result) {
                  removeComment(props.match.params.postId, comment._id);
                }
              }}
            >
              <i className="fa fa-trash"></i>
            </span>
          )}
        </div>
        <div className="commentMsg">
          <p>{comment.text}</p>
        </div>
      </div>
    );
  };
  if (loading || authLoading || loadingInfo) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="commentPage">
      <Navbar />

      <div className="all-center flex-column text-center mt-5 w-100">
        <div className="pb-5">
          {typeof post !== "undefined" &&
            post.comments.map((comment) => {
              return renderComment(comment);
            })}
        </div>
        <div className="commentInput input-group input-group-lg">
          <input
            type="text"
            className="form-control py-2"
            placeholder="Type a comment..."
            value={commentText}
            name="comment"
            required
            onChange={(e) => handleChange(e)}
          />
          <button
            type="button"
            className="text-center btn btn-secondary px-4 py-2 btn-lg"
            onClick={() => {
              handleOnClick();
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  posts: state.posts,
  member: state.member,
});

export default connect(mapStateToProps, {
  getPostByID,
  addComment,
  removeComment,
})(CommentPage);
