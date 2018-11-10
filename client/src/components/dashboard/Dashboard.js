import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import University from '../universty/university';


class Dashboard extends Component {
  componentDidMount() {
  }

  onDeleteClick(e) {
  }

  render() {
    const { user } = this.props.auth;
  
    let dashboardContent;

      // Check role of the user 
      if (user.role === 'admin') {
        dashboardContent = (
          <div>
          <p className="lead text-muted">Welcome {user.name}</p>
          <p>You are loged in as {user.role}</p>
        <University />
        </div>
        );
      } else {
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You are loged in as {user.role}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
    
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {  })(
  Dashboard
);
