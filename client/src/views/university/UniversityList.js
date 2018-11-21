import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {getUniversites } from '../../actions/universityActions';

import UniversitiesItem from './UniversityItem';
import University from './University';


class UniversityList extends Component {


  constructor(props){
    super(props);
    this.state = {
      universitities:''
    };
  }

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
                <div className="row">
                  <div className="col-12 col-xl-9">     
                  {/* <input className="filter form-control" onInput={this.handleSearchInput} type="text" placeholder="Search for University..."/> */}
                    <div className="card">
                      <div className="cardbody">
                         <div className="list-group">
                            {university}
                         </div> 
                      </div>
                    </div> 
                </div>
                 <div className="d-none d-xl-block col-xl-3">
                    <div className="card">
                        <div className="cardbody">
                          <University />
                        </div>
                    </div>
                 </div>  
                </div>
            </div>
          </div>
        );
      } else {
    }

    return (
      <div className="dashboard">
        {dashboardContent}
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
