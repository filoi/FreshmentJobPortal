import React, { Component } from 'react';
import TextFieldGroup from '../../components/common/TextFieldGroup';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createSubCat } from '../../actions/subCatAction';

class SubCategory extends Component {
  constructor(props){
    super(props);
    this.state = {
      SubCategory:'',
      email:'',
      description:'',
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

    const subCatData = {
      subcat: this.state.subcat,
      code: this.state.code,
      description: this.state.description,
      status: this.state.status
    };

    this.props.createSubCat(subCatData,this.props.history);

    this.setState({
      subcat:'',
      code:'',
      description:'',
      status:''
      })
}

  onChange(e){
    this.setState({[e.target.name]:e.target.value});
  }

  render() {

      const {errors} = this.state; 

    return (
      <div className="subcategory">
            <div className="conatiner-fluid">
              <div className="row p-2">
                   <div className="col-md-12 m-auto">
                    <h5 className="display-5 text-center">Create New Subject Category</h5>
                    <form onSubmit={this.onSubmit}>
					
                    <TextFieldGroup
                      placeholder ="Name"
                      name ="subcategory"
                      value={this.state.subcategory}
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
                      placeholder ="Description"
                      name ="description"
                      value={this.state.description}
                      onChange ={this.onChange}
                     
                    />					

					
                    <TextFieldGroup
                      placeholder ="Status"
                      name ="status"
                      value={this.state.status}
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

SubCategory.propTypes ={
  errors:PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  errors:state.errors
})

export default   connect(mapStateToProps,{createSubCat})(withRouter(SubCategory));