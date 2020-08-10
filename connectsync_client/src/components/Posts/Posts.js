import React from "react"
import Post from "./Post"
import { connect } from 'react-redux';


const Posts = (props) => {
  const { posts, user, loading } = props;


  if (loading) {
    return (
      <div className="all-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  } else {
    const { workplaces } = user;

    return (
      <div className="py-5">
        {posts.map((data,index) => {
          return <Post key={index} {...data} />;
        })}
      </div>
    );
  }

}

const mapStateToProp = (state) => {
    return {
      posts: state.posts.posts,
      user: state.auth.user,
      loading: state.posts.loading,
    };
  };

export default connect(mapStateToProp)(Posts);
