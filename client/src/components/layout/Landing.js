import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import landing from './landing.css';

class Landing extends Component {
	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
	}

	render() {
		return (
			<div id="wrapper" style={landing}>
				<div id="left">
					<div id="signin">
						<div className="logo">
							<h1>
								<i className="fab fa-connectdevelop" /> WD-Connector
							</h1>
						</div>
						<Link to="/login" className="secondary-btn">
							Sign In
						</Link>
						<div className="links">
							<a href="#">Forgot Password</a>
							<a href="#">Sign in with company or school</a>
						</div>
						<div className="or">
							<hr className="bar" />
							<span>OR</span>
							<hr className="bar" />
						</div>
						<Link to="/register" className="secondary-btn">
							Sign Up
						</Link>
					</div>
					<footer id="main-footer">
						<p>Copyright &copy; 2018, DevConnector All Rights Reserved</p>
						<div>
							<a href="#">terms of use</a> | <a href="#">Privacy Policy</a>
						</div>
					</footer>
				</div>
				<div id="right">
					<div id="showcase">
						<div className="showcase-content">
							<h1 className="showcase-text">
								We bring developers <strong>together</strong>
							</h1>
							<a href="/profiles" className="secondary-btn">
								See profiles of all developers
							</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Landing.propTypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps)(Landing);
