import React, { Component } from 'react';
import Moment from 'react-moment';
import uniqid from 'uniqid'
class ProfileCreds extends Component {
  render() {
    const { experience, education, bio } = this.props;
    let expItems = experience.map(exp => (

      <div key={exp._id} className="w3-container">
        <h5 className="w3-opacity"><b>{exp.title}</b></h5>
        <h6 className="w3-text-grey"><i className="fa fa-calendar fa-fw w3-margin-right"></i><Moment format="YYYY/MM/DD">{exp.from}</Moment>- {exp.to === null ? (
            <span className="w3-tag w3-black w3-round">Current</span>
          ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          )}</h6>
          <div>
          <strong>Description: </strong>
          {exp.description === '' ? null :(exp.description.split('\n')).map (line=>(
          <p key={uniqid()}>{line}</p>
          ))}
          </div>
        
        <hr></hr>
      </div>
    ));
          
    const eduItems = education.map(edu => (
      <div key={edu._id} className="w3-container">
        <h5 className="w3-opacity"><b>{edu.school}</b></h5>
        <h6 className="w3-text-grey"><i className="fa fa-calendar fa-fw w3-margin-right"></i><Moment format="YYYY/MM/DD">{edu.from}</Moment> -
          {edu.to === null ? (
            <span className="w3-tag w3-black w3-round">Current</span>
          ) : (
            <Moment format="YYYY/MM/DD">{edu.to}</Moment>
          )}</h6>
        <p>
          <strong>Degree:</strong> {edu.degree}
        </p>
        <p>
          <strong>Field Of Study:</strong> {edu.fieldofstudy}
        </p>
        <p>
          {edu.description === '' ? null : (
            <span>
              <strong>Description: </strong> {edu.description}
            </span>
          )}
        </p>
        <hr></hr>
      </div>
     
    ));
    return (
      <div>
        <div className="w3-container w3-card w3-white w3-margin-bottom">
          <h2 className="w3-text-grey w3-padding-16"><i className="fas fa-info fa-fw w3-margin-right w3-xxlarge w3-text-grey"></i>My Bio</h2>
            <p className="lead">
              {!bio ? (
                <span>No bio right now</span>
              ) : (
                <span>{bio}</span>
              )}
            </p>
            <hr />
            </div>
        <div className="w3-container w3-card w3-white w3-margin-bottom">
          <h2 className="w3-text-grey w3-padding-16"><i className="fa fa-suitcase fa-fw w3-margin-right w3-xxlarge w3-text-grey"></i>Work Experience</h2>
            {expItems.length > 0 ? (
                expItems
              ) : (
                <p style={{"color":"white"}} className="text-center">No Experience Listed</p>
            )}
        </div>
        <div className="w3-container w3-card w3-white">
          <h2 className="w3-text-grey w3-padding-16"><i className="fa fa-certificate fa-fw w3-margin-right w3-xxlarge w3-text-grey"></i>Education</h2>
            {eduItems.length > 0 ? (
                eduItems
            ) : (
              <p style={{"color":"white"}} className="text-center">No Education Listed</p>
            )}  
        </div>
      </div>
    );
  }
}

export default ProfileCreds;
