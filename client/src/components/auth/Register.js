import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { enrollStudent } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      mobileno:'',
      college: '',
      course: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    // if (this.props.auth.isAuthenticated) {
    //   this.props.history.push('/enrollmentEmail');
    // }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      mobileno: this.state.mobileno,
      college: this.state.college,
      course: this.state.course
    };

    this.props.enrollStudent(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state
    
     // Select options for status
     const college = [
      { label: ' - Select College - ', value: 0 },
      { label: 'Deen Dandu', value: 'Deen Dandu' },
      { label: 'Amity University', value: 'Amity University' },
      { label: 'Sharda University', value: 'Sharda University' },
      { label: 'Galotia University', value: 'Galotia University' }
    ];

     // Select options for status
     const courses = [
      { label: ' - Select Course -', value: 0 },
      { label: 'MCA', value: 'MCA' },
      { label: 'BCA', value: 'BCA' },
      { label: 'B.Tech', value: 'B.Tech' },
      { label: 'M.Tech', value: 'M.Tech' },
      { label: 'B.Com', value: 'B.com' }
    ];
    
    return (
      <div className="register  py-5">
        <div className="landing"></div>
        <div className="dark-overlay">
          <div className="row py-5">
            <div className="col-md-4 m-auto my-5 glassy">
              <h1 style={{ textAlign: 'center' }}>Student Enrollment</h1>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />
                 <TextFieldGroup
                  placeholder="Mobile No."
                  name="mobileno"
                  type="text"
                  value={this.state.mobileno}
                  onChange={this.onChange}
                  error={errors.mobileno}
                />
                <SelectListGroup
                  placeholder="college"
                  name="college"
                  value={this.state.college}
                  onChange={this.onChange}
                  options={college}
                  error={errors.status}
                  info=""
                />
                <SelectListGroup
                  placeholder="Course"
                  name="course"
                  value={this.state.course}
                  onChange={this.onChange}
                  options={courses}
                  error={errors.status}
                  info=""
                />
                
                <input type="submit" className="btn btn-info btn-block mt-4 p-3" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  enrollStudent: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, { enrollStudent })(withRouter(Register));
