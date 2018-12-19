import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LoadingScreen from 'react-loading-screen'
import swal from 'sweetalert'
import createHistory from 'history/createBrowserHistory'
import DualListBox from 'react-dual-listbox';
import 'react-dual-listbox/lib/react-dual-listbox.css';
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
  Alert
} from 'reactstrap';


const history = createHistory();
var qs = require('qs');

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
      University_id:'',
      selected: [],
      course:[],
      options_select:[]       
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
    fetch("/api/college/"+this.props.match.params.id,{
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
          email:result.email,
          mobileno:result.mobileno,
          code:result.code,
          year:result.year,
          university_id:result.university_id
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

        try{
          fetch("/api/course/all",{method:'GET',body:null})
            .then(res => res.json())
            .then((result) => {
              if(result.length>0)
              {
                this.setState({course: result});
                this.get_course();
              }             
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

          try{
            fetch("/api/college_course/"+this.props.match.params.id,{method:'GET',body:null})
              .then(res => res.json())
              .then((result) => {
                
                if(result.length>0)
                {
                  console.log("manoooo");
                  console.log(result)
                  const selected_option=[];
                  for(var x=0;x<result.length;x++)
                  {
                    selected_option.push(result[x].course_id._id)
                  }

                  console.log(selected_option);
                  this.setState({selected:selected_option})
                  this.setState({course: result});
                  this.get_course();
                }             
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

  get_course()
  {
    var course=this.state.course;
    var options_select=this.state.options_select;

    for(var x=0;x<course.length;x++)
    {
      options_select.push({value: course[x]._id, label: course[x].name});
    }

    this.setState({options_select:options_select});
    
  }

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
    fetch("/api/college/update", {
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

        this.save_college(this.props.match.params.id);

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

  save_college(id)
  {
    fetch('/api/college_course/deleteall/'+this.props.match.params.id,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
    })

    const selected=this.state.selected;
    for(var x=0;x<selected.length;x++)
    {
      console.log();
      console.log(selected[x]);

      fetch('/api/college_course/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: qs.stringify({
          college_id: id,
          course_id: selected[x]
        })
      })
      
    }

    
  }

  onChange(e){
    this.setState({[e.target.name]:e.target.value});
  }
 
  render() {
    const {isLoaded,alerttext,options} = this.state;
    return (
      <div className="animated fadeIn">
      <div className="title-bar" id="title-cont">
                Edit College
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
                      <Label htmlFor="email-input">Email:</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="email"  id="email" name="email" value={this.state.email} onChange ={this.onChange} placeholder="Email" autoComplete="email"/>
                      
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="email-input">Contact:</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="number" id="mobileno" name="mobileno" value={this.state.mobileno} onChange ={this.onChange} placeholder="Contact Number" autoComplete="email"/>
                     
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
                      <Label htmlFor="email-input">University:</Label>
                    </Col>
                    <Col xs="12" md="9">
                     
                      <Input type="select" name="university_id" id="exampleSelectMulti" value={this.state.university_id} onChange ={this.onChange}>
                        
                        {options.map(tile => (

                          <option value={tile._id}>{tile.name}</option>

                          ))}
                          </Input>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="email-input">Course:</Label>
                    </Col>
                    <Col xs="12" md="9">
                    <DualListBox
                        options={this.state.options_select}
                        selected={this.state.selected}
                        onChange={(selected) => {
                            this.setState({ selected });
                        }}
                    />
                    </Col>
                  </FormGroup>


                  </CardBody>
              <CardFooter>
              <Button type="reset" variant="contained" color="secondary" className="left-margin"   >Reset</Button>
              <Button type="submit" variant="contained" color="primary" className="left-margin rightbtn"  >Save</Button>
              <Button type="button" variant="contained" onClick={()=>{history.goBack()}} className="left-margin rightbtn">Cancel</Button>
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
