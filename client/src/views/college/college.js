import React, { Component } from 'react';
import TextFieldGroup from '../../components/common/TextFieldGroup';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createCollege } from '../../actions/collegeActions';
import MultiselectTwoSides  from '../../components/multiselect';
import { getCourses } from '../../actions/courseActions';
import  Select  from 'react-select';
import {getUniversites } from '../../actions/universityActions';

require('./college.css');



class College extends Component {
  constructor(props){
    super(props);
    this.state = {
      college:'',
      email:'',
      mobileno:'',
      year:'',
      code:'',
      value: [],
      highlight: [],
      settings:[{
        label: 'Show controls',
        name: 'showControls',
        value: true
      },
      {
        label: 'Searchable',
        name: 'searchable',
        value: true
      },
      {
        label: 'Clearable',
        name: 'clearable',
        value: true
      },
      {
        label: 'Disabled',
        name: 'disabled',
        value: false
      },
      {
        label: 'Limit',
        name: 'limit',
        value: 50
      }],
      courses:{},
      universityaff: null,
    };


    this.onChange = this.onChange.bind(this); 
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  componentDidMount() {
    this.props.getCourses();
    this.props.getUniversites();
  }



  onSubmit(e){
    e.preventDefault();
    const collegeData ={
      college : this.state.college,
      email:this.state.email,
      mobileno:this.state.mobileno,
      value:this.state.value,
      code:this.state.code,
      year:this.state.year,
      value:this.state.value,
      universityaff:this.state.universityaff.value
    }
    console.log(collegeData)
    this.props.createCollege(collegeData,this.props.history);
  }

  onChange(e){
    this.setState({[e.target.name]:e.target.value});
  }


//Code for two side multiselect

  handleChange(value) {
    this.setState({value});
    console.log(this.state.value);
	}

  handleChangeList = (universityaff) => {
    this.setState({ universityaff });
    console.log(`Option selected:`, universityaff);
  }


  render() {
    const {courses} = this.props.courses;
    const { universityaff } = this.state;
    const {universities} = this.props.universities;

  
    var options=[];
    var UniversityList =[];
    
    if(courses != null){
      courses.map((course)=> options.push({label:course.name,value:course._id}));
    }
   
    if(universities!=null){
        universities.map((university)=>UniversityList.push({value:university._id,label:university.name}))
    }
  

    const {
			highlight,
			settings,
			value
		} = this.state;
		const selectedCount = value.length;
		const availableCount = options.length - selectedCount;
		const s = settings.reduce((a, b) => {
			a[b.name] = b.value;
			return a;
		}, {});

    return (
      <div className="univesrity">
            <div className="conatiner-fluid">
              <div className="row">
                   <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Create New College</h1>
                    <form onSubmit={this.onSubmit}>
                    <TextFieldGroup
                      placeholder ="College Name"
                      name ="college"
                      value={this.state.college}
                      onChange ={this.onChange}
                    />
                  <TextFieldGroup
                      placeholder ="Email"
                      name ="email"
                      value={this.state.email}
                      onChange ={this.onChange}
                    />
                    <TextFieldGroup
                      placeholder ="Mobile No"
                      name ="mobileno"
                      value={this.state.mobileno}
                      onChange ={this.onChange}
                    /> 
                    <TextFieldGroup
                      placeholder ="Year of Establishment"
                      name ="year"
                      value={this.state.year}
                      onChange ={this.onChange}
                    /> 
                    <TextFieldGroup
                      placeholder ="College Code"
                      name ="code"
                      value={this.state.code}
                      onChange ={this.onChange}
                    /> 
                   <Select
                        value={universityaff}
                        onChange={this.handleChangeList}
                        options={UniversityList}
                        placeholder="Please select University..."
                    />
              <div>
			        	<MultiselectTwoSides
			          		className="msts_theme_example"
			          		availableHeader="Available"
			          		availableFooter={`Available: ${availableCount}`}
			          		selectedHeader="Selected"
		          			selectedFooter={`Selected: ${selectedCount}`}
			          		placeholder="Filter…"
			          		options={options}
				          	highlight={highlight}
					          value={value}
					          onChange={this.handleChange}
				          	{...s}
				          />
			        </div>
                
                    <input type="submit" value="submit" className="btn btn-info btn-block mt-4"/>
                    </form>
                  </div>
             </div>
            </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors:state.errors,
  courses:state.courses,
  universities:state.universities
})


export default   connect(mapStateToProps,{createCollege,getCourses,getUniversites})(withRouter(College));
