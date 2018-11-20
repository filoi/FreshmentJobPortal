import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {getUniversites } from '../../actions/universityActions';

import UniversitiesItem from './UniversityItem';


class UniversityList extends Component {
  componentDidMount() {
    this.props.getUniversites();
  }

  render() {
    const { user } = this.props.auth;
    const {universities} = this.props.universities;



    let dashboardContent,university;

    if(universities != null){
      university  = universities.map(university => (
       <UniversitiesItem key ={university._id} university = {university}/>
      ));
    }
    else{
      university = <div className="m-3">No University found</div>;
    }

      // Check role of the user 
      if (user.role === 'admin') {
        dashboardContent = (
          <div>
            <div className="title-bar" id="title-cont">
                Manage Universities
            </div>
            <div className="content-body">
                <div className="row"  id="content-body">
                  {university}
                </div>
            </div>
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
        {dashboardContent}

        <div className="floating-icon-cont">
          <div className="floating-icon-main floating-icon">
            <span className="fa fa-plus"></span>
          </div>
        </div>
      </div>
    );
  }
}

UniversityList.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  universities: state.universities
});

export default connect(mapStateToProps, { getUniversites})(
  UniversityList
);
