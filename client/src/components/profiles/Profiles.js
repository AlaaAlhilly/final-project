import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profileActions';

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }

  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;
    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profileItems =  <ProfileItem profiles={profiles} auth={this.props.auth}/>
      } else {
        profileItems = <h4>No profiles found...</h4>;
      }
    }

    return (
      <div className="profiles" style={{"marginBottom":"50px"}}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Developers Profiles</h1>
              <p style={{"color":"white"}} className="lead text-center">
                Browse and connect with developers
              </p>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth:PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth:state.auth
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
