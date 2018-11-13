import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
      <div className="login">
     
<div className="landing">
  <div className="container py-2">
      <div className="row justify-content-center py-5">
        <div className="col-md-8 text-center my-5 ">
          <div className="card-group">
            <div className="card p-4">
              <div className="card-body">
                <h1>Login</h1>
                <p className="text-muted">Sign In to your account</p>
                <div className="input-group mb-4">
                <form onSubmit={this.onSubmit} style={{width: 100 + '%' }}>
                    <TextFieldGroup
                       placeholder="Email Address"
                        name="email"
                        type="email"
                        value={this.state.email}
                        onChange={this.onChange}
                        error={errors.email}
                       />

                     <TextFieldGroup
                       placeholder="Password"
                       name="password"
                       type="password"
                       value={this.state.password}
                       onChange={this.onChange}
                      error={errors.password}
                      />
                    <input type="submit" className="btn btn-info btn-block mt-4" />
                    <button className="btn btn-link px-0" type="button">Forgot password?</button>
              </form>
                </div>
               
              </div>
            </div>
            <div className="card text-white bg-primary py-5 d-md-down-none" style={{width:"44%"}}>
              <div className="card-body text-center">
                <div>
                  <h2>Enroll Now</h2>
                  <p>Enroll Yourself for better job opportunities.</p>
                  <p>By Enrolling , you agree to JobPortal Terms of Service and consent to our Cookie Policy and Privacy Policy.
                  </p>
                  <Link to="/register" className="btn btn-lg btn-info mr-2">
                 Enroll Now!
                </Link>
                </div>
              </div>
            </div>
          </div>
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
