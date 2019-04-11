import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';
import './profs.css'
import Follower from './Follower'
import Follow from './Follow'
import AuthGenList from './AuthGenList';
class Followers extends Component {

  genList = (profiles,user)=>{
    let profileItems=[];
    let follow = user.follow
    let iFollow=[]
    if(follow.length !=0){
      for(let i=0;i<user.follow.length;i++){
        iFollow.push(follow[i].id)
      }
    }

    if(iFollow.length===0){
      let profs = profiles.filter(profile=>profile.user._id!==user.id)
      profileItems = profs.map(profile => {
        return <AuthGenList key={profile._id} profile={profile} user={user} blockedMe={false}  iCanFollow={true} />
      });
    }else{
      let profs = profiles.filter(profile=>!iFollow.includes(profile.user._id))
      profs = profs.filter(profile=>profile.user._id!==user.id)
      profileItems=profs.map(profile=>{
        return <AuthGenList key={profile._id} profile={profile} user={user}  iCanFollow={true} />
      })
    }
    return profileItems
  }
  follwoerList = (profiles,user)=>{
    let profileItems=[];
    let followers = user.followers
    let follow = user.follow
    let myFollow=[]
    let notBanned=[]
    if(followers.length !=0){
      for(let i=0;i<followers.length;i++){
        if(!followers.isBlocked){
          notBanned.push(followers[i].id)
        }
      }
    }
    if(follow.length !=0){
      for(let i=0;i<follow.length;i++){
        if(follow[i].isNotBlockedMe){
          myFollow.push(follow[i].id)
        }
      }
    }
    if(notBanned.length>0){
      let profs = profiles.filter(profile=>notBanned.includes(profile.user._id))

      profileItems = profs.map(profile => {
        if(myFollow && myFollow.includes(profile.user._id)){
          return <Follower key={profile._id} profile={profile} user={user} iCanFollow={false}  iCanBan={true} />
        }else{
          return <Follower key={profile._id} profile={profile} user={user} iCanFollow={true}  iCanBan={true} />
        }
      });
    }else{
      profileItems=<p className="text-center">Your bucket is empty</p>
    }
    return profileItems
  }
  followList = (profiles,user) =>{
    let profileItems=[];
    let follow = user.follow
    let notBannedMe=[]
    if(follow.length !=0){
      for(let i=0;i<follow.length;i++){
        notBannedMe.push(follow[i].id)
      }
    }

    if(notBannedMe.length>0){
      let profs = profiles.filter(profile=>notBannedMe.includes(profile.user._id))

      profileItems = profs.map(profile => {
        return <Follow key={profile._id} profile={profile} user={user}  iCanBlock={true} />
      });
    }else{
      profileItems=<p className="text-center">You bucket is empty</p>
    }
    return profileItems
  }
  render() {
    const profiles = this.props.profiles
    const user = this.props.user
    let all = this.genList(profiles,user)
    let followers = this.follwoerList(profiles,user)
    let follow = this.followList(profiles,user)
    return (
        <div>

<ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item">
          <a className="nav-link active" id="home-tab" data-toggle="tab" href="#all" role="tab" aria-controls="all" aria-selected="true">All Devs</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" id="profile-tab" data-toggle="tab" href="#followers" role="tab" aria-controls="followers" aria-selected="false">Followers</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" id="contact-tab" data-toggle="tab" href="#follow" role="tab" aria-controls="follow" aria-selected="false">Follow</a>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div className="tab-pane fade show active" id="all" role="tabpanel" aria-labelledby="all-tab">{all}</div>
        <div className="tab-pane fade" id="followers" role="tabpanel" aria-labelledby="followers-tab">{followers}</div>
        <div className="tab-pane fade" id="follow" role="tabpanel" aria-labelledby="follow-tab">{follow}</div>
      </div>
        </div>
    );
  }
}

// ProfileItem.propTypes = {
//   profile: PropTypes.object.isRequired,
//   auth:PropTypes.object.isRequired
// };

export default Followers;
