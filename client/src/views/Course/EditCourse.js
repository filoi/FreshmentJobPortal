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
      name:'',
      coursecode:'',
      specialization:'',
      marking_criteria:'',
      duration:'', 
      options:[] ,
      college_id:'',
      academic_term:''      
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
    fetch("/api/course/"+this.props.match.params.id,{
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
            name : result.name,
            coursecode:result.coursecode,
            duration:result.duration,
            specialization:result.specialization,
            marking_criteria:result.marking_criteria,
            academic_term:result.academic_term,
            college_id:result.college_id,
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

      try{
        fetch("/api/college/all",{method:'GET',body:null})
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

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      isLoaded: true,
      formdata: event.target,
    });

    const universityData ={
      name : this.state.name,
      coursecode:this.state.coursecode,
      duration:this.state.duration,
      specialization:this.state.specialization,
      marking_criteria:this.state.marking_criteria,
      academic_term:this.state.academic_term,
      college_id:this.state.college_id,
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
    fetch("/api/course/update", {
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
    const {isLoaded,alerttext,options} = this.state;
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
                      <Input type="text" id="university" name="name" value={this.state.name} onChange ={this.onChange} placeholder="First Name" />
                    </Col>
                  </FormGroup>
                 
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="email-input">Coursecode:</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text"  id="coursecode" name="coursecode" value={this.state.coursecode} onChange ={this.onChange} placeholder="Coursecode"/>
                      
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="email-input">Duration:</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="number" id="duration" name="duration" value={this.state.duration} onChange ={this.onChange} placeholder="Duration"/>
                     
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="email-input">Marking Criteria:</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="marking_criteria" name="marking_criteria" value={this.state.marking_criteria} onChange ={this.onChange} placeholder="Marking Criteria"/>
                     
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="email-input">Specialization:</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="specialization" name="specialization" value={this.state.specialization} onChange ={this.onChange} placeholder="Specialization" />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="email-input">Academic_term:</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="academic_term" name="academic_term" value={this.state.academic_term} onChange ={this.onChange} placeholder="Academic_term" />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="email-input">College:</Label>
                    </Col>
                    <Col xs="12" md="9">
                      

                      <select name="college_id" value={this.state.college_id} onChange ={this.onChange}>
                        
                        {options.map(tile => (

                          <option value={tile._id}>{tile.name}</option>

                          ))}
                      </select>
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
