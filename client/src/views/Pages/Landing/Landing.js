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
              <div className="col-md-3"></div>
              <div className="col-md-6 text-center py-5">
                <h1 className="display-3">Job Portal</h1>
                <p className="lead">
                  {' '}
                  Need to find job listings fast?<br/> Wondering whether any local jobs exist in your field of expertise? <br/>Our job portal makes an excellent online resource for finding targeted job listings.
                </p>
                <hr />
                <Link to="/register" className="btn btn-lg btn-success col-md-4 p-3 my-3 mx-1">
                  Enroll
                </Link>
                <Link to="/login" className="btn btn-lg btn-info   col-md-4 p-3 my-3 mx-1">
                  Login
                </Link>
              </div>
          
          </div>
        </div>
        <footer className="bg-dark text-white text-center">
          <span className="ml-auto">Developed by <a target="_blank" href="http://filoi.in">Filoi</a></span>
        </footer>
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
