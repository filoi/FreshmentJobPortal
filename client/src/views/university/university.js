import React, { Component } from 'react';
import TextFieldGroup from '../../components/common/TextFieldGroup';
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
      mobileno:''
    };


    this.onChange = this.onChange.bind(this); 
    this.onSubmit = this.onSubmit.bind(this);
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

    

    return (
      <div className="univesrity">
            <div className="conatiner-fluid">
              <div className="row">
                   <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Create New University</h1>
                    <form onSubmit={this.onSubmit}>
                    <TextFieldGroup
                      placeholder ="University Name"
                      name ="university"
                      value={this.state.university}
                      onChange ={this.onChange}
                     
                    />
                  <TextFieldGroup
                      placeholder ="Email"
                      name ="email"
                      value={this.state.email}
                      onChange ={this.onChange}
                     
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



export default   connect(null,{createUniversity})(withRouter(University));
