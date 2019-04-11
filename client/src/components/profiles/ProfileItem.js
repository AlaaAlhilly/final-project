import React, { Component } from 'react';
import PropTypes from 'prop-types';

import GenList from './GenList'
import './profs.css'
import Followers from './Followers';
class ProfileItem extends Component {

  unAuthProfs=(profiles)=>{
    let profileItems = profiles.map(profile => (
          <GenList key={profile._id} profile={profile} />
    ));
    return profileItems
  }
  authProfs=(profiles,user)=>{
    let profileItems = null
    profileItems = <Followers profiles={profiles} user={user}/>
    return profileItems
  }
  render() {
    const {auth} = this.props
    let profiles = this.props.profiles
    let profs =  auth.isAuthenticated?this.authProfs(profiles,auth.user):this.unAuthProfs(profiles)
    return (
     <div>{profs}</div>
    )
}
}
// ProfileItem.propTypes = {
//   profiles: PropTypes.array.isRequired
// };

export default ProfileItem;
