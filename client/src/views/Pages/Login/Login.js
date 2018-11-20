import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { loginUser } from '../../../actions/authActions'



class Login extends Component {

  constructor(){
    super();
    this.state ={
      email:'',
      password:'',
      errors:{}
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount(){
    if(this.props.auth.isAuthenticated){
      this.props.history.push('/main');
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.auth.isAuthenticated){
      this.props.history.push('/main');
    }

    if(nextProps.errors){
      this.setState({errors:nextProps.errors});
    }
  }


  onSubmit(e){
    e.preventDefault();
    const userData ={
      email:this.state.email,
      password:this.state.password
    }
    
    this.props.loginUser(userData);
  
  }

  onChange(e){
    this.setState({[e.target.name]:e.target.value});
  }



  render() {

      const {erros} = this.state

    return (
      <div className="app flex-row align-items-center">
        <div className="landing"></div>
          <div className="dark-overlay landing-inner">
            <Container>
              <Row className="justify-content-center my-5">
                <Col md="8">
                  <CardGroup>
                    <Card className="p-4">
                      <CardBody>
                        <Form onSubmit={this.onSubmit}>
                          <h1>Login</h1>
                          <p className="text-muted">Sign In to your account</p>
                          <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText >
                                <i className="icon-user"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" placeholder="Email"  name="email" type="email" value={this.state.email} onChange={this.onChange} autoComplete="Email" />
                          </InputGroup>
                          <InputGroup className="mb-4">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText >
                                <i className="icon-lock"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input type="password" placeholder="Password" autoComplete="current-password" name="password" type="password" value={this.state.password} onChange={this.onChange} />
                          </InputGroup>
                          <Row>
                            <Col xs="6">
                              <Button type="submit" className="btn btn-info btn-block" >Login</Button>
                            </Col>
                            <Col xs="6" className="text-right">
                              <Button color="link" className="px-0">Forgot password?</Button>
                            </Col>
                          </Row>
                        </Form>
                      </CardBody>
                    </Card>
                    <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                      <CardBody className="text-center">
                        <div>
                          <h2>Enroll Now</h2>
                          <p>Enroll Yourself for better job opportunities.</p>
                          <p>By Enrolling , you agree to Job Portal Terms of Service and consent to our Cookie Policy and Privacy Policy.
                          </p>
                          <Link to="/register" className="btn btn-lg btn-info mr-2">
                            Enroll Now!
                          </Link>
                        </div>
                      </CardBody>
                    </Card>
                  </CardGroup>
                </Col>
              </Row>
            </Container>
            <footer className="bg-dark text-white text-center home-footer">
              <span className="ml-auto">Developed by <a target="_blank" href="http://filoi.in">Filoi</a></span>
            </footer>
          </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  errors:PropTypes.object.isRequired
}


const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps,{loginUser})(Login);
