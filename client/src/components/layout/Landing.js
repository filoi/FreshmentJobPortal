import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="landing"></div>
        <div className="dark-overlay landing-inner text-light">
            <div className="row">
              <div className="col-sm-12 text-center py-5">
                <h1 className="display-3">Job Portal</h1>
                <p className="lead">
                  {' '}
                  Create a Student profile/portfolio
                </p>
                <hr />
                <Link to="/register" className="btn btn-lg btn-success col-md-2 p-3 my-3 mx-1">
                  Enroll
                </Link>
                <Link to="/login" className="btn btn-lg btn-info   col-md-2 p-3 my-3 mx-1">
                  Login
                </Link>
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

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
