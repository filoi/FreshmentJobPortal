import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CollegeItem from './collegeItem';
import { getColleges } from '../../actions/collegeActions';
import collegeFilter from './collegeFilter';
import { Link } from 'react-router-dom';

class collegeList extends Component {

  constructor(props){
    super(props);
    this.state = {
      colleges:'',
      collegeList:[]
    };

    this.handleSearchInput = this.handleSearchInput.bind(this); 
  }


    componentDidMount() {
        this.setState({
            collegeList: this.props.colleges.colleges
          });
          console.log( this.props.colleges);
      }



      handleSearchInput(e){
        var collegeList = [];
        if(this.state.collegeList.length != null){
            collegeList = this.props.colleges.colleges;
        } 
        const list = collegeFilter(collegeList,e.target.value);
    
        this.setState({
            collegeList: list
        });
      
      }


  render() {
    let college;

    if(this.state.collegeList != null){
        college  = this.state.collegeList.map(college => (
         <CollegeItem key ={college._id}  college = {college}/>
        ));
      }
      else{
        college = <div className="m-3">No College found</div>;
      }






    return (
      <div>
        <div className="dashboard">
        <div>
          <div className="title-bar" id="title-cont">
              Manage College
          </div>
          <div className="content-body">
              <div className="row">
                <div className="col-12 col-xl-12">
                    <table>
                          <tr>
                             <td> <input className="filter form-control" onInput={this.handleSearchInput} type="text" placeholder="Search for College..."/></td>
                              <td><Link to='/main/newcollege'>Create New</Link></td>
                        </tr>
                    </table>
                  <div className="card">
                    <div className="cardbody">
                       <div className="list-group">
                          {college}
                       </div> 
                    </div>
                  </div> 
              </div>
              </div>
          </div>
        </div>
            </div>
      </div>
    )
  }

}


const mapStateToProps = state => ({
    colleges:state.colleges
  });
  

  export default connect(mapStateToProps, { getColleges })(
    collegeList
  );