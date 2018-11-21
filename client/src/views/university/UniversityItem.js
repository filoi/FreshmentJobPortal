import React ,{Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { deleteUniversity, updateUniversity } from '../../actions/universityActions';
import TextFieldGroup from '../../components/common/TextFieldGroup';


class UniversitiesItem extends Component{

    constructor(props) {
        super(props);
        this.state = {
          modal: false,
          university:'',
          email:'',
          description:'',
          affiliated:'',
          mobileno:'',
          _id:''
        };
    
        this.toggle = this.toggle.bind(this);
        this.onChange = this.onChange.bind(this); 
        this.onUpdate = this.onUpdate.bind(this);
      }
    
      toggle() {
        this.setState({
          modal: !this.state.modal,
        });
      }

      onDeleteClick(e) {
        this.props.deleteUniversity(e);
      }


      onUpdate(e){
        // e.preventDefault();
    
        const universityData ={
          university : this.state.university,
          email:this.state.email,
          mobileno:this.state.mobileno,
          description:this.state.description,
          affiliated:this.state.affiliated,
          _id:this.state._id
        }
        console.log(universityData)
    
        this.props.updateUniversity(universityData,this.props.history);
      }
    
      onChange(e){
        this.setState({[e.target.name]:e.target.value});
      }

      componentDidMount() {
        console.log(this.props.university);
        this.setState({
          university:this.props.university.name,
          email:this.props.university.email,
          description:this.props.university.description,
          affiliated:this.props.university.affiliated,
          mobileno:this.props.university.mobileno,
          _id:this.props.university._id
        });
      }
    



    render(){
        const {university} = this.props;
        const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>;

        return(
            <li className="list-group-item d-flex justify-content-between align-items-center">
             <i className="fa fas fa-graduation-cap bg-info p-2 font-1xl mr-1 float-left"></i>
                     {university.name} | {university.email} | {university.mobileno} 

            <span className="badge">  <Button color="primary" onClick={this.toggle}>Edit</Button>
            <button onClick={this.onDeleteClick.bind(this,university._id)} className="btn btn-danger m-2">
              Delete
            </button>
            </span>

          
         
                  <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                     <ModalHeader toggle={this.toggle} close={closeBtn}>Edit University</ModalHeader>
                         <ModalBody>
                         <div className="univesrity">
                               <div className="conatiner-fluid">
                               <div className="row p-2">
                               <div className="col-md-12 m-auto">
                          <form onSubmit={this.onUpdate}>
                        <TextFieldGroup
                             placeholder ="University Name"
                             name ="university"
                             value={this.state.university}
                             onChange ={this.onChange}
                     
                         />
                        <TextFieldGroup
                            placeholder ="Email"
                            name ="email"
                            value={this.state.email}
                            onChange ={this.onChange}
                     
                        />
                        <TextFieldGroup
                            placeholder ="Description"
                            name ="description"
                            value={this.state.description}
                            onChange ={this.onChange}
                     
                         />
                        <TextFieldGroup
                            placeholder ="Affiliated From"
                            name ="affiliated"
                            value={this.state.affiliated}
                            onChange ={this.onChange}
                     
                        />
                        <TextFieldGroup
                            placeholder ="Mobile No"
                            name ="mobileno"
                            value={this.state.mobileno}
                            onChange ={this.onChange}
                    
                        />
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
    auth: state.auth
  });
  

export default connect(mapStateToProps,{deleteUniversity,updateUniversity})(withRouter(UniversitiesItem));