import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card card-signin my-5">
            <div className="card-body">
              <h5 className="card-title text-center">Sign In</h5>
              <form className="form-signin" noValidate onSubmit={this.onSubmit}>
                <div className="form-label-group">
                  <TextFieldGroup
                    type="email"
                    id="inputEmail"
                    className="form-control"
                    placeholder="Email address"
                    required
                    autoFocus
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <label htmlFor="inputEmail">Email address</label>
                </div>

                <div className="form-label-group">
                  <TextFieldGroup
                    type="password"
                    id="inputPassword"
                    className="form-control"
                    placeholder="Password"
                    required
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    error={errors.password}
                  />
                  <label htmlFor="inputPassword">Password</label>
                </div>

                <button
                  className="btn btn-lg btn-secondary btn-block text-uppercase"
                  type="submit"
                 
                >
                  Sign in
                </button>
                <hr className="my-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
      
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
