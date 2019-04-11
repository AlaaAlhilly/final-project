import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ProfileGithub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: '26c196bacea7db10cf48',
      clientSecret: '0885cb690e07d2a93a6afb0891fb552fd9f7aa53',
      count: 5,
      sort: 'created: asc',
      repos: []
    };
  }

  componentDidMount() {
    const { username } = this.props;
    const { count, sort, clientId, clientSecret } = this.state;
    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then(res => res.json())
      .then(data => {
        if (this.refs.myRef) {
          this.setState({ repos: data });
        }
      })
      .catch(err => console.log(err));
  }
  openInNewTab(url) {
    let win = window.open(url, '_blank');
    win.focus();
  }
  render() {
    const { repos } = this.state;

    const repoItems = repos.map(repo => (
      
      <div key={repo.id} className="card card-body mb-2">
        <div className="row">
          <div className="col-md-6">
            <h4>
              <Link onClick={()=>this.openInNewTab(repo.html_url)} to={repo.html_url} className="text-info">
                {repo.name}
              </Link>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div className="col-md-6">
            <span className="badge badge-info mr-1">
              Stars: {repo.stargazers_count}
            </span>
            <span className="badge badge-secondary mr-1">
              Watchers: {repo.watchers_count}
            </span>
            <span className="badge badge-success">
              Forks: {repo.forks_count}
            </span>
          </div>
        </div>
      </div>
    ));
    return (
      <div className="w3-container w3-card w3-white mt-3">
        <h2 className="w3-text-grey w3-padding-16"><i className="fab fa-github-alt fa-fw w3-margin-right w3-xxlarge w3-text-grey"></i>Github Repos</h2>
        <div ref="myRef" className="w3-container">
        
        {repoItems}
          <hr></hr>
        </div>
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
};

export default ProfileGithub;
