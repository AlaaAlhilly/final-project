import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteComment } from '../../actions/postActions';
import './commentitem.css'
import TimeNaming from '../posts/TimeNaming'
class CommentItem extends Component {
  onDeleteClick(postId, commentId) {
    this.props.deleteComment(postId, commentId);
  }
  Capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
 
  render() {
    
    const { comment, postId, auth } = this.props;
    return (
      <div className="panel-body" >
        <ul className="media-list" style={{"backgroundColor":"#eee","padding":"10px 10px 0 10px"}}>
          <li className="media">
            <a href={`/profile/${comment.user}`} className="pull-left">
              <img src={comment.avatar} alt="" className="img-circle" />
            </a>
            <div className="media-body" >
              <span className="text-muted pull-right">
                <small className="text-muted pull-right" style={{"float":"right","cursor":"pointer"}}>
                  {comment.user === auth.user.id ? (
                    <i onClick={this.onDeleteClick.bind(this, postId, comment._id)} className="fas fa-trash-alt"></i>

                  ) : null}

                </small>
              </span>
              <strong style={{"marginLeft":"10px"}} className="text-success"><a style={{"textDecoration":"none"}} href={`/profile/${comment.user}`}>@{this.Capitalize(comment.name)}</a></strong>
              <p style={{"marginLeft":"18px"}}>
                {comment.text}<br></br>
                <small className="text-muted">
                
                {new TimeNaming().getDateNames(comment.date)}

                </small>
              </p>
              
            </div>
          </li>

        </ul>
      </div>

    );
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
