import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import LoadingScreen from "react-loading-screen";
import swal from "sweetalert";
import createHistory from "history/createBrowserHistory";

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
} from "reactstrap";

const history = createHistory();
class AddSubject extends Component
{
  constructor(props)
  {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      isLoaded: false,
      timeout: 300,
      formdata: "",
      visible: false,
      alerttext: "",
      name: "",
      max_marks: "",
      sub_category_id: "",
      code: "",
      course_id: "",
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
    this.setState(prevState => {
      return { fadeIn: !prevState };
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      isLoaded: true,
      formdata: event.target
    });

    const subjectData = {
      name: this.state.name,
      code: this.state.code,
      max_marks: this.state.max_marks,
      sub_category_id: this.state.sub_category_id,
      status: this.state.status,
      course_id: this.state.course_id
    };

    var formBody = [];
    for (var property in subjectData) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(subjectData[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    console.log("====================================");
    console.log(formBody);
    console.log("====================================");
    fetch("/api/subject/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      body: formBody
    })
      .then(response => response.json())
      .then(
        result => {
          console.log("====================================");
          console.log(JSON.stringify(result));
          console.log("====================================");
          this.setState({
            isLoaded: false
          });

          swal({
            title: "Success",
            icon: "success",
            buttons: {
              catch: {
                text: "Back",
                value: "catch"
              }
            }
          }).then(value => {
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
        error => {
          console.log(error);
        }
      )
      .catch(err => console.log(err));
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { isLoaded, alerttext } = this.state;
    return (
      <div className="animated fadeIn">
        <LoadingScreen
          loading={isLoaded}
          bgColor="block"
          textColor="#676767"
          logoSrc=""
          text="please wait...."
        />
        <Row>
          <Col>
            <Card>
              <Form
                ref={el => (this.myFormRef = el)}
                onSubmit={this.handleSubmit}
                encType="multipart/form-data"
                className="form-horizontal"
              >
                <CardHeader>
                  <strong>Subject Information</strong>
                </CardHeader>
                <CardBody>
                  <Alert
                    color="info"
                    isOpen={this.state.visible}
                    toggle={this.onDismiss}
                  >
                    {alerttext}
                  </Alert>
				  
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Name:</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="name" name="name" value={this.state.name} onChange={this.onChange} placeholder="Subject Name"/>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Code:</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="code" id="code" name="code" value={this.state.code} onChange={this.onChange}placeholder="Subject Code" autoComplete="code"/>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Subject Category:</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="sub_category_id" name="sub_category_id" value={this.state.sub_category_id}onChange={this.onChange} placeholder="Subject Category"/>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Course:</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="course_id" name="course_id" value={this.state.course_id}onChange={this.onChange} placeholder="Course"/>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="email-input">Status:</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="status" name="status" value={this.state.status} onChange={this.onChange} placeholder="Status"/>
                    </Col>
                  </FormGroup>
                </CardBody>

                <CardFooter>
                  <Button type="submit" size="sm" color="primary">
                    <i className="fa fa-dot-circle-o" /> Submit
                  </Button>
                  <Button type="reset" size="sm" color="danger">
                    <i className="fa fa-ban" /> Reset
                  </Button>
                </CardFooter>
                
              </Form>
            </Card>
          </Col>
        </Row>
        <div />
      </div>
    );
  }
}

export default AddSubject;
