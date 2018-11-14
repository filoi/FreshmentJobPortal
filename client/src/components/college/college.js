import React, { Component } from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createCollege } from '../../actions/collegeActions';


class College extends Component {
  constructor(props){
    super(props);
    this.state = {
      college:'',
      email:'',
      mobileno:''
    };


    this.onChange = this.onChange.bind(this); 
    this.onSubmit = this.onSubmit.bind(this);
  }


  onSubmit(e){
    e.preventDefault();
    const collegeData ={
      college : this.state.college,
      email:this.state.email,
      mobileno:this.state.mobileno
    }

    this.props.createCollege(collegeData,this.props.history);
  }

  onChange(e){
    this.setState({[e.target.name]:e.target.value});
  }


  render() {

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
                    <input type="submit" value="submit" className="btn btn-info btn-block mt-4"/>
                    </form>
                  </div>
             </div>
            </div>
      </div>
    );
  }
}



export default   connect(null,{createCollege})(withRouter(College));
