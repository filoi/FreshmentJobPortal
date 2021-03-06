import React, { Component } from 'react';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import { getCollege } from '../../actions/collegeActions';

import CollegeItem from './CollegeItem';
import College from './College';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

import CollegeFilter from './CollegeFilter';
import {  Table, Input, Button, Icon, } from 'antd';
import "antd/dist/antd.css";
import Avatar from 'material-ui/Avatar';
import { SpeedDial, BubbleList, BubbleListItem } from 'react-speed-dial';
import IconEdit from 'material-ui/svg-icons/image/edit';
import IconAdd from 'material-ui/svg-icons/content/add';
import IconSearch from 'material-ui/svg-icons/action/search';
import IconDelete from 'material-ui/svg-icons/action/delete';
import IconEmail from 'material-ui/svg-icons/communication/email';
import { blue500,red600 } from 'material-ui/styles/colors';
import { red500 } from 'material-ui/styles/colors';
import createHistory from 'history/createBrowserHistory'
import swal from 'sweetalert'

const history = createHistory();

function onChange(pagination, filters, sorter) {
  console.log('params', pagination, filters, sorter);
}

class UniversityList extends Component {

  constructor(props){
    super(props);
    this.state = {
      universities:'',
      searchText:'',
      data:[],
      rows:[],
      uni:[],
      filter_uni:[],
      universitiesList:[],
      isLoaded:false
    };

    this.handleSearchInput = this.handleSearchInput.bind(this); 
    this.editData = this.editData.bind(this); 
    this.printTable = this.printTable.bind(this); 
    this.setTable = this.setTable.bind(this); 

  }

  componentDidMount() {
    this.setState({
      universitiesList: this.props.universities.universities
    });
    this.printTable();
    this.get_colleges();
   // this.setTable();
    
  }

  get_colleges()
  {
    try{
      fetch("/api/university/all",{method:'GET',body:null})
        .then(res => res.json())
        .then(async(result) => {
          this.setState({uni: result});
          this.get_filter_values();
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

  get_filter_values()
  {
    const uni=this.state.uni;
    var filter_uni=[];

    for(var x=0;x<uni.length;x++)
    {
      filter_uni.push({"text":uni[x].name,"value":uni[x].name});
    }

    this.setState({filter_uni:filter_uni})
    
  }

  printTable(){
    try{
      fetch("/api/college/all",{method:'GET',body:null})
        .then(res => res.json())
        .then((result) => {
          this.setState({data: result});
          // console.log(data);
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


  setTable(data){
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    let i= 1;
    data.map(item => { 
      item.key = i++; 
      item.action =<div><IconButton aria-label="Delete" color="primary" onClick={() => { this.editData(item) }} ><EditIcon fontSize="small" />
      </IconButton><IconButton aria-label="Delete" color="secondary" onClick={() => { this.deleteData(item._id) }} >
      <DeleteIcon fontSize="small" /></IconButton></div>;
    });
    return data;
  }

  editData(item){
    console.log('====================================');
    console.log(item);
    console.log('====================================');
    this.props.history.push({
      pathname: '/main/college/edit/'+item._id,
      query: item
   })
  }

  deleteData(id) {

    swal({
      title: "Delete COnfirmation",
      text: "Are you sure that you want to delete this College?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this.setState({
          isLoadedData: true,  
        });
        this.DeleteQuery(id);
        this.setState({
          isLoadedData: false,  
        });
      } else {
        //swal("Your imaginary file is safe!");
      }
    });
  }

  DeleteQuery = (id) => {
    
      this.deleteRows(id);

      fetch("/api/college/"+id,{method:'DELETE',body:null})
      .then(res => res.json())
      .then((result) => {
      
          },
            (error) => {
           
          }
        );

    }




  deleteRows = (id) => {
    
    let data = this.state.data.slice()
    data = data.filter(row => row._id !== id)
    this.setState({ data })
}


addRow = () =>{
  this.props.history.push({
    pathname: '/main/college/add/'
 })
}

  handleSearchInput(e){
    var universitiesList = [];
    if(this.state.universitiesList.length != null){
      universitiesList = this.props.universities.universities;
    } 
    const list = CollegeFilter(universitiesList,e.target.value);

    this.setState({
      universitiesList: list
    });
  
  }

  handleSearch = (selectedKeys, confirm) => () => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  }

  handleReset = clearFilters => () => {
    clearFilters();
    this.setState({ searchText: '' });
  }

  render() {
    const { user } = this.props.auth;

    const list =  {
      items: [
       
        {
          primaryText: 'Add',
          rightAvatar: <Avatar backgroundColor={blue500} icon={<IconAdd />} />,
          href: '/main/college/add',
        }
      ],
    }

const listbutton =
    <BubbleList>
    <BubbleListItem {...list.items[0]} />
    </BubbleList>;


const floatingActionButtonProps =
    {
		backgroundColor: blue500
    };
    let dashboardContent,university;

    const columns = [ {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      filterDropdown: ({
        setSelectedKeys, selectedKeys, confirm, clearFilters,
      }) => (
        <div className="custom-filter-dropdown">
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="Search name"
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={this.handleSearch(selectedKeys, confirm)}
          />
          <Button type="primary" onClick={this.handleSearch(selectedKeys, confirm)}>Search</Button>
          <Button onClick={this.handleReset(clearFilters)}>Reset</Button>
        </div>
      ),
      filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#108ee9' : '#aaa' }} />,
      onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => {
            this.searchInput.focus();
          });
        }
      },
      render: (text) => {
        const { searchText } = this.state;
        return searchText ? (
          <span>
            {text.split(new RegExp(`(${searchText})`, 'gi')).map((fragment, i) => (
              fragment.toLowerCase() === searchText.toLowerCase()
                ? <span key={i} className="highlight">{fragment}</span> : fragment // eslint-disable-line
            ))}
          </span>
        ) : text;
      },
    }, {
      title: 'Email',
      dataIndex: 'email',
      key: 'age',
      filterDropdown: ({
        setSelectedKeys, selectedKeys, confirm, clearFilters,
      }) => (
        <div className="custom-filter-dropdown">
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="Search Email"
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={this.handleSearch(selectedKeys, confirm)}
          />
          <Button type="primary" onClick={this.handleSearch(selectedKeys, confirm)}>Search</Button>
          <Button onClick={this.handleReset(clearFilters)}>Reset</Button>
        </div>
      ),
      filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#108ee9' : '#aaa' }} />,
      onFilter: (value, record) => record.email.toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => {
            this.searchInput.focus();
          });
        }
      },
      render: (text) => {
        const { searchText } = this.state;
        return searchText ? (
          <span>
            {text.split(new RegExp(`(${searchText})`, 'gi')).map((fragment, i) => (
              fragment.toLowerCase() === searchText.toLowerCase()
                ? <span key={i} className="highlight">{fragment}</span> : fragment // eslint-disable-line
            ))}
          </span>
        ) : text;
      },
    }, {
      title: 'Mobile Number',
      dataIndex: 'mobileno',
      key: 'address',
    },
    {
      title: 'University',
      dataIndex: 'university_id.name',
      key: 'name',
      filters: this.state.filter_uni,
      onFilter: (value, record) => record.university_id.name.indexOf(value) === 0,
    }];

    if(this.state.universitiesList != null){
      university  = this.state.universitiesList.map(university => (
       <CollegeItem key ={university._id} university = {university}/>
      ));
    }
    else{
      university = <div className="m-3">No University found</div>;
    }

      // Check role of the user 
      if (user.role === 'admin') {
        dashboardContent = (
          <div>
            <div className="title-bar" id="title-cont">
                Manage Colleges
            </div>
            <div className="content-body">
                <div className="row">
                  <div className="col-12 col-xl-12">     
                  <Table columns={columns} dataSource={this.setTable(this.state.data)} onChange={onChange} />
                </div>  
                </div>
            </div>
          </div>
        );
      } else {
    }

    return (
      <div className="dashboard">
        {dashboardContent}
                <MuiThemeProvider>
                <SpeedDial
                hasBackdrop={false}
                floatingActionButtonProps={floatingActionButtonProps}
                >
                {listbutton}
                </SpeedDial>
                </MuiThemeProvider>
      </div>
    );
  }
}

UniversityList.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  universities: state.universities
});

export default connect(mapStateToProps)(
  UniversityList
);
