import React, { Component } from 'react';
import TextFieldGroup from '../../components/common/TextFieldGroup';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Subject extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      max_marks: "",
      sub_category_id: "",
      code: "",
      course_id: "",
      status: "" ,
      errors:{}
    };

    this.onChange = this.onChange.bind(this); 
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({errors:nextProps.errors})
    }
  }

  onSubmit(e){
    e.preventDefault();

    const subjectData = {
      name: this.state.name,
      code: this.state.code,
      max_marks: this.state.max_marks,
      sub_category_id: this.state.sub_category_id,
      status: this.state.status,
      course_id: this.state.course_id
    };

    this.props.createSubCategory(subCatData,this.props.history);

    this.setState({
      name: '',
      max_marks: '',
      sub_category_id: '',
      code: '',
      course_id: '',
      status: '' 
      })
}

  onChange(e){
    this.setState({[e.target.name]:e.target.value});
  }

  render() {

      const {errors} = this.state; 

    return (
      <div className="subject">
            <div className="conatiner-fluid">
              <div className="row p-2">
                   <div className="col-md-12 m-auto">
                    <h5 className="display-5 text-center">Create New Subject</h5>
                    <form onSubmit={this.onSubmit}>
					
                    <TextFieldGroup
                      placeholder ="Name"
                      name ="subject"
                      value={this.state.subject}
                      onChange ={this.onChange}
                      error ={errors.subcategory}
                    />
					
                  <TextFieldGroup
                      placeholder ="Code"
                      name ="code"
                      value={this.state.code}
                      onChange ={this.onChange}
                      error={errors.code}
                    />
					
                     <TextFieldGroup
                      placeholder ="Max Marks"
                      name ="max_marks"
                      value={this.state.max_marks}
                      onChange ={this.onChange}
                    />

                    <TextFieldGroup
                      placeholder ="Subject Category"
                      name ="sub_category_id"
                      value={this.state.sub_category_id}
                      onChange ={this.onChange}
                      error={errors.status}
                    />					
					
                    <TextFieldGroup
                      placeholder ="Status"
                      name ="status"
                      value={this.state.status}
                      onChange ={this.onChange}
                      error={errors.status}
                    />

                    <TextFieldGroup
                      placeholder ="Course"
                      name ="course_id"
                      value={this.state.course_id}
                      onChange ={this.onChange}
                      error={errors.status}
                    />
					
                    <input type="submit" value="Create" className="btn btn-info btn-block mt-4"/>
                    </form>
                  </div>
             </div>
            </div>
      </div>
    );
  }
}

Subject.propTypes ={
  errors:PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  errors:state.errors
})

export default connect(mapStateToProps,{createSubject})(withRouter(Subject));