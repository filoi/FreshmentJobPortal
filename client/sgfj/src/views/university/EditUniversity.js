import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LoadingScreen from 'react-loading-screen'
import swal from 'sweetalert'
import createHistory from 'history/createBrowserHistory'

import {

  Button,
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
  Alert
} from 'reactstrap';

const history = createHistory();
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
      description:'',
      affiliated:'',
      mobileno:'',      
    };
    this.onChange = this.onChange.bind(this); 
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
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

  componentDidMount() {
   // console.log('====================================');
  //  console.log(this.props.match.params.id);
    //console.log('====================================');
    fetch("/api/university/"+this.props.match.params.id,{
      method:'GET',
      mode: 'cors',
      body:null
     
    })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);

          this.setState({
            isLoaded: false,
            items: result,
            university : result.name,
          email:result.email,
          mobileno:result.mobileno,
          description:result.description,
          affiliated:result.affiliated,
          });
          console.log('====================================');
          console.log('====================================');
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: false,
            error
          });
          console.log(error);
        }
      )
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      isLoaded: true,
      formdata: event.target,
    });

    const universityData ={
      university : this.state.university,
      email:this.state.email,
      mobileno:this.state.mobileno,
      description:this.state.description,
      affiliated:this.state.affiliated,
      _id:this.props.match.params.id,
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
    fetch("/api/university/universityupdate", {
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
  }
 
  render() {
    const {isLoaded,alerttext} = this.state;
    return (
      <div className="animated fadeIn">
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
              <CardHeader>
                <strong>Supplier Information</strong>
              </CardHeader>
              <CardBody>
                 <Alert color="info" isOpen={this.state.visible} toggle={this.onDismiss}>
                 {alerttext}
                </Alert>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Name:</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="university" name="university" value={this.state.university} onChange ={this.onChange} placeholder="First Name" />
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
                      <Label htmlFor="email-input">Affiliated:</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="affiliated" name="affiliated" value={this.state.affiliated} onChange ={this.onChange} placeholder="Affiliated"/>
                     
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="email-input">Description:</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="description" name="description" value={this.state.description} onChange ={this.onChange} placeholder="Description" />
                     
                    </Col>
                  </FormGroup>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
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
