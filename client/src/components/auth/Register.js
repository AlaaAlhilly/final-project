import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
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
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="container m-auto">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card card-signin my-5">
            <div className="card-body">
              <h5 className="card-title text-center"> Signup</h5>
              <form className="form-signin" noValidate onSubmit={this.onSubmit}>

                  <div className="form-label-group">
                      <TextFieldGroup
                        id="inputEmail"
                        className="form-control"
                        required
                        autoFocus
                        placeholder="Email"
                        name="email"
                        type="email"
                        value={this.state.email}
                        onChange={this.onChange}
                        error={errors.email}
                      />
                      <label htmlFor="inputEmail">Email</label>
                    </div>


                <div className="form-label-group">
                  <TextFieldGroup
                    id="inputName"
                    className="form-control"
                    placeholder="Your Name"
                    required
                    autoFocus
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <label htmlFor="inputName">Your Name</label>
                </div>

                <div className="form-label-group">
                  <TextFieldGroup
                    id="inputPassword"
                    className="form-control"
                    placeholder="Password"
                    required
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    error={errors.password}
                  />
                  <label htmlFor="inputPassword">Password</label>
                </div>

                
                <div className="form-label-group">
                  <TextFieldGroup
                    id="inputPassword"
                    className="form-control"
                    required
                    placeholder="Confirm Password"
                    name="password2"
                    type="password"
                    value={this.state.password2}
                    onChange={this.onChange}
                    error={errors.password2}
                    
                  />
                  <label htmlFor="inputPassword">Confirm password</label>
                </div>

                
                <button
                  className="btn btn-lg btn-secondary btn-block text-uppercase"
                  type="submit"
                >
                  Register
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
