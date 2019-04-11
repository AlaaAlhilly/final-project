import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';
import './profs.css'
class GenList extends Component {
getProfile=(id)=>{
  
}
  render() {
    
    const { profile } = this.props;
    const {auth} = this.props
    return (
        <div className="mycard card card-body bg-light mb-3">
        <div className="row">
          <div className="col-md-2 col-sm-4">
            <img  src={profile.user.avatar} alt="" className="profs" />
          </div>
          <div className="col-lg-6 col-md-4 col-sm-8">
            <h3>{profile.user.name}</h3>
            <p>
              {profile.status}{' '}
              {isEmpty(profile.company) ? null : (
                <span>at {profile.company}</span>
              )}
            </p>
            <p>
              {isEmpty(profile.location) ? null : (
                <span>{profile.location}</span>
              )}
            </p>
            <Link to={`/profile/${profile.user._id}`} className="btn btn-info">
              View Profile
            </Link>
          </div>
          <div className="col-md-4 d-none d-md-block">
            <h4>Skill Set</h4>
            <ul className="list-group">
              {profile.skills.slice(0, 4).map((skill, index) => (
                <li key={index} className="list-group-item">
                  <i className="fa fa-check pr-1" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

GenList.propTypes = {
  profile: PropTypes.object.isRequired
};

export default GenList;
