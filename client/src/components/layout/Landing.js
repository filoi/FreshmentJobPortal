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
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
            <div className="row m-0">
              <div className="col-md-12 text-center">
                <p className="lead">
                  {' '}
                </p>
                <Link to="/register" className="btn btn-lg btn-success col-md-2 p-3 my-3 mx-1">
                  Enroll
                </Link>
                <Link to="/login" className="btn btn-lg btn-light   col-md-2 p-3 my-3 mx-1">
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
