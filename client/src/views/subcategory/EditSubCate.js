import React, {Component } from 'react';
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
      name: "",
      code: "",
      description: "",
      status: ""     
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
    fetch("/api/sub_cat/"+this.props.match.params.id,{
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
          code:result.code,
          status:result.status,
          description:result.description,
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

    const subCatData = {
      name: this.state.name,
      code: this.state.code,
      description: this.state.description,
      status: this.state.status,
      _id:this.props.match.params.id,
    };


    var formBody = [];
    for (var property in subCatData) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(subCatData[property]);
      formBody.push(encodedKey + "=" + encodedValue);
	  console.log(encodedValue);
    }
    formBody = formBody.join("&");

    console.log('====================================');
    console.log(formBody);
    console.log('====================================');
    fetch("/api/sub_cat/update", {
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
                <strong>Subject Category Information</strong>
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
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        value={this.state.name}
                        onChange={this.onChange}
                        placeholder="Subject Category"
                      />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Code:</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="code"
                        id="code"
                        name="code"
                        value={this.state.code}
                        onChange={this.onChange}
                        placeholder="Category Code"
                        autoComplete="code"
                      />
                    </Col>
                  </FormGroup>


                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="email-input">Description:</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="description"
                        name="description"
                        value={this.state.description}
                        onChange={this.onChange}
                        placeholder="Description"
                      />
                    </Col>

                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="email-input">Status:</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="status"
                        name="status"
                        value={this.state.status}
                        onChange={this.onChange}
                        placeholder="Status"
                      />
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
