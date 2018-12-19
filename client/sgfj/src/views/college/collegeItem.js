import React ,{Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import TextFieldGroup from '../../components/common/TextFieldGroup';
import { deleteCollege,updateCollege } from '../../actions/collegeActions';
import Select from 'react-select';
import MultiselectTwoSides  from '../../components/multiselect';
import {getUniversites } from '../../actions/universityActions';
import { getCourses } from '../../actions/courseActions';
require('./college.css');

class CollegeItem extends Component{

    constructor(props) {
        super(props);
        this.state = {
          college:'',
          email:'',
          mobileno:'',
          year:'',
          code:'',
          value: [],
          highlight: [],
          settings:[{
            label: 'Show controls',
            name: 'showControls',
            value: true
          },
          {
            label: 'Searchable',
            name: 'searchable',
            value: true
          },
          {
            label: 'Clearable',
            name: 'clearable',
            value: true
          },
          {
            label: 'Disabled',
            name: 'disabled',
            value: false
          },
          {
            label: 'Limit',
            name: 'limit',
            value: 50
          }],
          courses:{},
          universityaff: null,
          modal: false,
          UniversityList:null,
        };

        this.onChange = this.onChange.bind(this); 
        this.onUpdate = this.onUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.toggle = this.toggle.bind(this);
        this.universityName = this.universityName.bind(this);
      }

      toggle() {
        this.setState({
          modal: !this.state.modal,
        });
      }
    
     
      onDeleteClick(e) {
        console.log(e);
        this.props.deleteCollege(e);
        window.location.reload(true);
      }


      onUpdate(e){
        // e.preventDefault();
        
        const collegeData ={
          college : this.state.college,
          email:this.state.email,
          mobileno:this.state.mobileno,
          year:this.state.year,
          code:this.state.code,
          universityaff:this.state.universityaff.value,
          value:this.state.value,
          _id:this.state._id
        }
        console.log(collegeData)
        this.props.updateCollege(collegeData,this.props.history);
      }
    
      onChange(e){
        this.setState({[e.target.name]:e.target.value});
      }

      componentDidMount() {
        this.props.getCourses();
        this.props.getUniversites();
       
        this.setState({
          college:this.props.college.name,
          email:this.props.college.email,
          mobileno:this.props.college.mobileno,
          year:this.props.college.year,
          code:this.props.college.code,
          universityaff:this.universityName(this.props.college.universityaff),
          value:this.props.college.value,
          _id:this.props.college._id
        });
      }


     universityName(value){
        var name = '';
          for(var i =0; i<this.props.universities.universities.length;i++){
            if(value === this.props.universities.universities[i]._id){
              name = {value:value,label:this.props.universities.universities[i].name};
            }
          }
        return name;
      }

      //Code for two side multiselect

      handleChange(value) {
          this.setState({value});
        console.log(this.state.value);
      	}

       handleChangeList = (universityaff) => {
           this.setState({ universityaff });
           console.log(`Option selected:`, universityaff);
        }

    



    render(){
      const {courses} = this.props.courses;
      const { universityaff } = this.state;
      const {universities} = this.props.universities;
      
      
      
      var UniversityList =[];
      var options=[];

      if(courses != null){
        courses.map((course)=> options.push({label:course.name,value:course._id}));
      }
     
      if(universities!=null){
          universities.map((university)=>UniversityList.push({value:university._id,label:university.name}))
      }
    
      const {
        highlight,
        settings,
        value
      } = this.state;
      const selectedCount = value.length;
      const availableCount = options.length - selectedCount;
      const s = settings.reduce((a, b) => {
        a[b.name] = b.value;
        return a;
      }, {});
  
        const {college} = this.props;
        const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>;

        return(
            <li className="list-group-item d-flex justify-content-between align-items-center">
             <i className="fa fas fa-graduation-cap bg-info p-2 font-1xl mr-1 float-left"></i>
                     {college.name} | {college.email} | {college.mobileno} 

            <span className="badge">
                <a className="btn btn-primary mr-2" onClick={this.toggle}  aria-label="Skip to main navigation">
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                </a>
               
                 <a className="btn btn-danger" onClick={this.onDeleteClick.bind(this,college._id)} aria-label="Delete">
                       <i className ="fa fa-trash-o" aria-hidden="true"></i>
                  </a>
            </span>


            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                     <ModalHeader toggle={this.toggle} close={closeBtn}>Edit college</ModalHeader>
                         <ModalBody>
                         <div className="College">
                               <div className="conatiner-fluid">
                               <div className="row p-2">
                               <div className="col-md-12 m-auto">
                          <form onSubmit={this.onUpdate}>
                        <TextFieldGroup
                             placeholder ="College Name"
                             name ="college"
                             value={this.state.college}
                             onChange ={this.onChange}
                     
                         />
                        <TextFieldGroup
                            placeholder ="Email"
                            name ="email"
                            value={this.state.email}
                            onChange ={this.onChange}
                          />
                        <TextFieldGroup
                            placeholder ="Mobile No"
                            name ="mobileno"
                            value={this.state.mobileno}
                            onChange ={this.onChange}
                        />
                         <TextFieldGroup
                             placeholder ="Year of Establishment"
                             name ="year"
                             value={this.state.year}
                             onChange ={this.onChange}
                          /> 
                        <TextFieldGroup
                              placeholder ="College Code"
                              name ="code"
                              value={this.state.code}
                              onChange ={this.onChange}
                            /> 
                        <Select
                              value={universityaff}
                              onChange={this.handleChangeList}
                              options={UniversityList}
                              placeholder="Please select University..."
                        />
                            <div>
			                         	<MultiselectTwoSides
			          	              	className="msts_theme_example"
			                        		availableHeader="Available"
			          	                availableFooter={`Available: ${availableCount}`}
			          		              selectedHeader="Selected"
		          			              selectedFooter={`Selected: ${selectedCount}`}
			          	               	placeholder="Filter…"
			                        		options={options}
				                        	highlight={highlight}
					                        value={value}
					                        onChange={this.handleChange}
				                        	{...s}
				                       />
			                        </div>
                
                        <input type="submit" value="Update" className="btn btn-info btn-block mt-4"/>
                    </form>
                      </div>
                     </div>
                    </div>
                    </div>
                        </ModalBody>
                 </Modal>



            </li>
        )


    }
}


  const mapStateToProps = state => ({
    auth: state.auth,
    errors:state.errors,
    courses:state.courses,
    universities:state.universities
  })
  

export default connect(mapStateToProps,{deleteCollege,getCourses,getUniversites,updateCollege})(withRouter(CollegeItem));