import React, { Component } from 'react';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import SubjectsItem from './SubjectItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import SubjectFilter from './SubjectFilter';
import {Table, Input, Button, Icon, } from 'antd';
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

function onChange(pagination, filters, sorter)
{
  console.log('params', pagination, filters, sorter);
}

class SubjectList extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      subjects:'',
      searchText:'',
      data:[],
      rows:[],
      subjectList:[],
      isLoaded:false
    };

    this.handleSearchInput = this.handleSearchInput.bind(this); 
    this.editData = this.editData.bind(this); 
    this.printTable = this.printTable.bind(this); 
    this.setTable = this.setTable.bind(this); 
  }

  componentDidMount()
  {
    //this.setState({subjectList: this.props.subjects.subjects});
    this.printTable();
   // this.setTable();
  }

  printTable()
  {
    try{
      fetch("/api/subject/all",{method:'GET',body:null})
        .then(res => res.json())
        .then((result) => {
          this.setState({data: result});
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
      item.action =<div><IconButton aria-label="Delete" color="primary" onClick={() => {this.editData(item)}} ><EditIcon fontSize="small" /></IconButton><IconButton aria-label="Delete" color="secondary" onClick={() => { this.deleteData(item._id) }} ><DeleteIcon fontSize="small" /></IconButton></div>;
    });
    return data;
  }

  editData(item)
  {
    console.log('====================================');
    console.log(item);
    console.log('====================================');
    this.props.history.push({pathname: '/main/subjects/edit/'+item._id, query: item})
  }

  deleteData(id) {

    swal({
      title: "Delete Confirmation",
      text: "Are you sure that you want to delete this subject?",
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
      }
    });
  }

  DeleteQuery = (id) => {
    
      this.deleteRows(id);

      fetch("/api/subject/"+id,{method:'DELETE',body:null})
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
    pathname: '/main/subjects/add/'
 })
}

  handleSearchInput(e){
    var subjectList = [];
    if(this.state.subjectList.length != null){
      subjectList = this.props.subjects.subjects;
    } 
    const list = SubjectFilter(subjectList,e.target.value);

    this.setState({
      subjectList: list
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
          href: '/main/subjects/add',
        }
      ],
    }

const listbutton = <BubbleList> <BubbleListItem {...list.items[0]} /> </BubbleList>;

const floatingActionButtonProps =
    {
		backgroundColor: blue500
    };
    let dashboardContent, subject;

    const columns = [ {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      filterDropdown: ({
        setSelectedKeys, selectedKeys, confirm, clearFilters,
      }) => (
        <div className="custom-filter-dropdown">
          <Input ref={ele => this.searchInput = ele} placeholder="Search name" value={selectedKeys[0]} onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])} onPressEnter = {this.handleSearch(selectedKeys, confirm)}/>
          <Button type="primary" onClick={this.handleSearch(selectedKeys, confirm)}>Search</Button>
          <Button onClick={this.handleReset(clearFilters)}>Reset</Button>
        </div>),

      filterIcon: filtered => <Icon type="search" style={{color: filtered ? '#108ee9' : '#aaa' }} />,
      onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible)
        {
          setTimeout(() => {this.searchInput.focus();});
        }
      },
      render: (text) => {
        const { searchText } = this.state;
        return searchText ? (
          <span>
            {text.split(new RegExp(`(${searchText})`, 'gi')).map((fragment, i) => (
              fragment.toLowerCase() === searchText.toLowerCase() ? <span key={i} className="highlight">{fragment}</span> : fragment))}
          </span>
        ) : text;
      },
    }, {
      title: 'Code',
      dataIndex: 'code',
      key: 'age',
      filterDropdown: ({
        setSelectedKeys, selectedKeys, confirm, clearFilters,
      }) => (
        <div className="custom-filter-dropdown">
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="Search name"
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={this.handleSearch(selectedKeys, confirm)}/>
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
      title: 'Category',
      dataIndex: 'sub_category_id',
      key: 'sub_category_id',

      title: 'Status',
      dataIndex: 'status ',
      key: 'status',
    }];

    if(this.state.subjectList != null){
      subject  = this.state.subjectList.map(subject => (
       <SubjectsItem key ={subject._id} subject = {subject}/>
      ));
    }
    else{
      subject = <div className="m-3">No Subject found</div>;
    }

      // Check role of the user 
      if (user.role === 'admin') {
        dashboardContent = (
          <div>
            <div className="title-bar" id="title-cont">
                Manage Subjects
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
                className ="flotingBtn">
                {listbutton}
                </SpeedDial>
                </MuiThemeProvider>
      </div>
    );
  }
}

SubjectList.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  subjects: state.subjects
});

export default connect(mapStateToProps)(SubjectList);
