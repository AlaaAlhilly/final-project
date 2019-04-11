import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProfileHeader from './ProfileHeader';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import Spinner from '../common/Spinner';
import { getProfileByHandle } from '../../actions/profileActions';

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push('/not-found');
    }
  }

  render() {
    const { profile, loading } = this.props.profile;
    let pheader = profile === null || loading?null:(<ProfileHeader profile={profile} />)
    let profileContent;
    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          
          <ProfileCreds
            bio={profile.bio}
            education={profile.education}
            experience={profile.experience}
          />
          {profile.githubusername ? (
            <ProfileGithub username={profile.githubusername} />
          ) : null}
        </div>
      );
    }
    
    return (
      <div className="w3-light-grey " style={{"marginBottom":"60px","paddingBottom":"10px","paddingTop":"2px"}}>
        <div className="w3-content w3-margin-top w3-padding-bottom">
          <div className="w3-row-padding">
            {pheader}
            <div className="w3-twothird">
              {profileContent}
            </div>

          </div>

        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfileByHandle })(Profile);
