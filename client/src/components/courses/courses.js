import React, { Component } from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createCourse } from '../../actions/courseActions';


class Course extends Component {
  constructor(props){
    super(props);
    this.state = {
      course:'',
      coursecode:''
    };

    this.onChange = this.onChange.bind(this); 
    this.onSubmit = this.onSubmit.bind(this);
  }


  onSubmit(e){
    e.preventDefault();

    const courseData ={
      course : this.state.course,
      coursecode:this.state.coursecode
    }

    this.props.createCourse(courseData,this.props.history);
  }

  onChange(e){
    this.setState({[e.target.name]:e.target.value});
  }


  render() {

    return (
      <div className="course">
            <div className="conatiner-fluid">
              <div className="row">
                   <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Create New Course</h1>
                    <form onSubmit={this.onSubmit}>
                    <TextFieldGroup
                      placeholder ="Course Name"
                      name ="course"
                      value={this.state.course}
                      onChange ={this.onChange}

                    />
                  <TextFieldGroup
                      placeholder ="Course code"
                      name ="coursecode"
                      value={this.state.coursecode}
                      onChange ={this.onChange}
                    />
                    <input type="submit" value="submit" className="btn btn-info btn-block mt-4"/>
                    </form>
                  </div>
             </div>
            </div>
      </div>
    );
  }
}


export default   connect(null,{createCourse})(withRouter(Course));
