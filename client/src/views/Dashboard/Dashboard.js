import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {getUniversites } from '../../actions/universityActions';
import { getColleges } from '../../actions/collegeActions';
import { getCourses } from '../../actions/courseActions';

import UniversitiesItem from './universities';
import CollegesItem from './colleges';
import CoursesItem from './courses';


class Dashboard extends Component {
  componentDidMount() {
    this.props.getUniversites();
    this.props.getColleges();
    this.props.getCourses();
  }

  render() {
    const { user } = this.props.auth;
    const {universities} = this.props.universities;
    const {colleges} = this.props.colleges;
    const {courses} = this.props.courses;



    let dashboardContent,university,college,course;

    if(universities != null){
      university  = universities.map(university => (
       <UniversitiesItem key ={university._id} university = {university}/>
      ));
    }
    else{
      university = <tr><td>No University found</td></tr>;
    }

    if(colleges != null){
      college = colleges.map(college => (
       <CollegesItem key ={college._id} college = {college}/>
      ));
    }
    else{
      college = <tr><td>No College found</td></tr>;
    }

    if(courses != null){
      course = courses.map(course => (
       <CoursesItem key ={course._id} course = {course}/>
      ));
    }
    else{
      course = <tr><td>No course found</td></tr>;
    }





      // Check role of the user 
      if (user.role === 'admin') {
        dashboardContent = (
          <div>
          <p className="lead text-muted">Welcome {user.name}</p>
          <p>You are loged in as {user.role}</p>
      
          <div className="card">
            <div className="card-header">Universities</div>
            <div className="card-body">
                <table className="table table-striped">
                    <thead className="thead-dark"><th>University Name</th> <th>Email</th> <th>Contact No.</th><th>Affiliated From</th><th>Description</th></thead>
                     {university}
                  </table>
            </div>
          </div>
       
          <div className="card">
            <div className="card-header">Colleges</div>
            <div className="card-body">
                 <table className="table table-striped">
                    <thead className="thead-dark"><th>Collge Name</th> <th>Email</th> <th>Contact No.</th></thead>
                    {college}
                 </table>
            </div>
          </div>


        <div className="card">
            <div className="card-header">Courses</div>
            <div className="card-body">
                  <table className="table table-striped">
                      <thead className="thead-dark"><th>Courses</th> <th>Course Code</th> </thead>
                     {course}
                   </table>
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
  auth: state.auth,
  universities: state.universities,
  colleges:state.colleges,
  courses:state.courses
});

export default connect(mapStateToProps, { getUniversites, getColleges,getCourses })(
  Dashboard
);
