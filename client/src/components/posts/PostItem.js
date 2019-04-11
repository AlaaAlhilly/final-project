import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { Pre, LineNo } from './styles'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/nightOwl'
import { deletePost, addLike, removeLike } from '../../actions/postActions';
import './postitem.css'
import TimeNaming from './TimeNaming'
class PostItem extends Component {

  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  onLikeClick(id) {
    this.props.addLike(id);
  }

  onUnlikeClick(id) {
    this.props.removeLike(id);
  }

  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }
  Capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  render() {
    const { post, auth, showActions } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2 col-sm-2">
            <a href={`/profile/${post.user}`}>
              <img
                className="postav"
                src={post.avatar}
                alt=""
              />
            </a>
            <br />
            
          </div>
          <div className="col-md-10 col-sm-10">
          <h1 className="text-left"><a href={`/profile/${post.user}`} style={{"textDecoration":"none"}}>{this.Capitalize(post.name)}</a></h1>
          <small className="text-muted">
                
                {new TimeNaming().getDateNames(post.date)}

                </small>
          <h2 style={{"background":"rgba(0, 0, 0, 0.2)","color":"white"}}>{post.title}</h2>
            <article>{post.text}</article>
            <Highlight {...defaultProps} theme={theme} code={post.code} language="jsx">
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                    <Pre className={className} style={style}>
                        {tokens.map((line, i) => (
                            <div {...getLineProps({ line, key: i })}>
                                <LineNo>{i + 1}</LineNo>
                                {line.map((token, key) => <span {...getTokenProps({ token, key })} />)}
                            </div>
                        ))}
                    </Pre>
                )}
            </Highlight>
                <small className="text-muted md-3">written with : {post.lang}</small>
                <small className="text-muted md-3" style={{"float":"right"}}>This snippet helped {post.likes.length} developers</small>
              
            {showActions ? (
              <span>
                <button
                  onClick={this.onLikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i
                    className={classnames('fas fa-thumbs-up', {
                      'text-info': this.findUserLike(post.likes)
                    })}
                  />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button
                  onClick={this.onUnlikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-light mr-1">
                <i className="fas fa-comment-alt"></i><span className="badge badge-light">{post.comments.length}</span>
                </Link>
                {post.user === auth.user.id ? (
                  <button
                    onClick={this.onDeleteClick.bind(this, post._id)}
                    type="button"
                    className="btn btn-danger mr-1"
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile:state.profile
});

export default connect(mapStateToProps, { deletePost, addLike, removeLike})(
  PostItem
);
