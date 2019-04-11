import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostForm from './PostForm';
import PostFeed from './PostFeed';
import Spinner from '../common/Spinner';
import { getPosts } from '../../actions/postActions';

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
    const s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.innerHTML = `
          var x = document.getElementById("tgtarget");
          var y = document.getElementById("tgbase");
          var i = document.createElement("i")
          i.setAttribute("style", "float:right");
          y.appendChild(i)

          i.onclick= function(){
            if (x.style.display === "none") {
              x.style.display="block"
            } else {
              x.style.display="none"
            }
          }

          if(x.style.display==="none"){
            i.setAttribute("class", "fas fa-caret-up");
          }else{
            i.setAttribute("class", "fas fa-caret-left");
          }

            `;
      document.body.appendChild(s);
  }

  render() {
    const { posts, loading } = this.props.post;
    let postContent;

    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PostFeed posts={posts} />;
    }

    return (
      <div className="feed mt-3" style={{"marginBottom":"50px"}}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);
