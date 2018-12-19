import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LoadingScreen from 'react-loading-screen'
import swal from 'sweetalert'
import createHistory from 'history/createBrowserHistory'
import { Select } from 'antd';
import Button from '@material-ui/core/Button';

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col, 
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Alert,
} from 'reactstrap';

const history = createHistory();

const Option = Select.Option;

class AddSuppliers extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      isLoaded: false,
      timeout: 300,
      formdata:'',
      visible: false,
      alerttext:'',
      university:'',
      email:'',
      year:'',
      code:'',
      mobileno:'', 
      options:[] ,
      University_id:''    
    };
    this.onChange = this.onChange.bind(this); 
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  componentDidMount() {
    try{
      fetch("/api/university/all",{method:'GET',body:null})
        .then(res => res.json())
        .then((result) => {
          this.setState({options: result});
           console.log(this.state.options[0]._id);
            },
              (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          );
      }
      catch(error)
      {
        console.log(error);
      }
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  handleChange = event => {
    console.log(event.target.value)
     this.setState({ SelectOption: event.target.value });
   };

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      isLoaded: true,
      formdata: event.target,
    });

    const universityData ={
      name : this.state.name,
      email:this.state.email,
      mobileno:this.state.mobileno,
      year:this.state.year,
      code:this.state.code,
      university_id:this.state.university_id,
    }

    var formBody = [];
    for (var property in universityData) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(universityData[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    console.log('====================================');
    console.log(formBody);
    console.log('====================================');
    fetch("/api/college/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody,
        
    }).then(response =>response.json())
      .then((result) => {
        console.log('====================================');
    console.log(JSON.stringify(result));
    console.log('====================================');
        this.setState({
          isLoaded: false,
        });

        swal({
          title: "Success",
          text: "You clicked the button!",
          icon: "success",
          buttons: {
            catch: {
              text: "Back",
              value: "catch",
            },
            cancel: "Continue",
          },
        }).then((value) => {
          switch (value) {
            case "catch":
            history.goBack();
              break;

              default:
              event.preventDefault();
              this.state.formdata.reset();
          }
        }); 
    },
    (error) =>  {  console.log(error)}
  )
  .catch(err => console.log(err));
  }

  onChange(e){
    this.setState({[e.target.name]:e.target.value});
    console.log(e.target.value);
    
  }
 
  render() {
    const {isLoaded,alerttext,options} = this.state;
    return (
      <div className="animated fadeIn">
       <div className="title-bar" id="title-cont">
                Add College Information
            </div>
        <LoadingScreen
            loading={isLoaded}
            bgColor='block'  
            textColor='#676767'
            logoSrc=''
            text='please wait....'
          > 
          </LoadingScreen>
        <Row>
        <Col>
        <Card>
        <Form  ref={(el) => this.myFormRef = el} onSubmit={this.handleSubmit} encType="multipart/form-data" className="form-horizontal">
              
              <CardBody>
                 <Alert color="info" isOpen={this.state.visible} toggle={this.onDismiss}>
                 {alerttext}
                </Alert>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Name:</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="university" name="name" value={this.state.name} onChange ={this.onChange} placeholder="First Name" />
                    </Col>
                  </FormGroup>
                 
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="email-input">E-Mail:</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="email"  id="email" name="email" value={this.state.email} onChange ={this.onChange} placeholder="E-Mail" autoComplete="email"/>
                      
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="email-input">Phone Number:</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="number" id="mobileno" name="mobileno" value={this.state.mobileno} onChange ={this.onChange} placeholder="Phone Number" autoComplete="email"/>
                     
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="email-input">Code:</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="code" name="code" value={this.state.code} onChange ={this.onChange} placeholder="Code"/>
                     
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="email-input">Year:</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="year" name="year" value={this.state.year} onChange ={this.onChange} placeholder="Year" />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                    <Label for="exampleSelectMulti">University:</Label>                      
                    </Col>
                    <Col xs="12" md="9">
          <Input type="select" name="university_id" id="exampleSelectMulti" onChange ={this.onChange}>
                {options.map(tile => (

                <option value={tile._id}>{tile.name}</option>

                ))}
                          </Input>
                      
                    </Col>
                  </FormGroup>

              </CardBody>
              <CardFooter>
                    <Button type="reset" variant="contained" color="secondary" className="left-margin"   >Reset</Button>
                    <Button type="submit" variant="contained" color="primary" className="left-margin"  >Save</Button>
              </CardFooter>
              </Form>
            </Card>
            </Col>
        </Row>
        <div>
      </div>
      </div>
    );
  }
}

export default AddSuppliers;
