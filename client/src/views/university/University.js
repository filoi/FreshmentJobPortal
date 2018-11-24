import React, { Component } from 'react';
import TextFieldGroup from '../../components/common/TextFieldGroup';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createUniversity } from '../../actions/universityActions';


class University extends Component {
  constructor(props){
    super(props);
    this.state = {
      university:'',
      email:'',
      description:'',
      affiliated:'',
      mobileno:'',
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

    const universityData ={
      university : this.state.university,
      email:this.state.email,
      mobileno:this.state.mobileno,
      description:this.state.description,
      affiliated:this.state.affiliated
    }

    this.props.createUniversity(universityData,this.props.history);
  }

  onChange(e){
    this.setState({[e.target.name]:e.target.value});
  }


  render() {

      const {errors} = this.state; 

    return (
      <div className="univesrity">
            <div className="conatiner-fluid">
              <div className="row p-2">
                   <div className="col-md-12 m-auto">
                    <h5 className="display-5 text-center">Create New University</h5>
                    <form onSubmit={this.onSubmit}>
                    <TextFieldGroup
                      placeholder ="University Name"
                      name ="university"
                      value={this.state.university}
                      onChange ={this.onChange}
                      error ={errors.university}
                    />
                  <TextFieldGroup
                      placeholder ="Email"
                      name ="email"
                      value={this.state.email}
                      onChange ={this.onChange}
                      error={errors.email}
                    />
                     <TextFieldGroup
                      placeholder ="Description"
                      name ="description"
                      value={this.state.description}
                      onChange ={this.onChange}
                     
                    />
                     <TextFieldGroup
                      placeholder ="Affiliated From"
                      name ="affiliated"
                      value={this.state.affiliated}
                      onChange ={this.onChange}
                     
                    />
                    <TextFieldGroup
                      placeholder ="Mobile No"
                      name ="mobileno"
                      value={this.state.mobileno}
                      onChange ={this.onChange}
                      error={errors.mobileno}
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


University.propTypes ={
  errors:PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  errors:state.errors
})

export default   connect(mapStateToProps,{createUniversity})(withRouter(University));
