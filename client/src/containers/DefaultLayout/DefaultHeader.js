import React, { Component } from 'react';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../img/logo-text.png';
import sygnet from '../../assets/img/brand/sygnet.svg';
import admin from '../../assets/admin.png';


import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {logoutUser} from '../../actions/authActions';


class DefaultHeader extends Component {
  
  onLogoutClick(e){
    e.preventDefault();
    this.props.logoutUser();
  }
    
  render() {

    const {isAuthenicated, user} = this.props.auth;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 150, height: 30, alt: 'Job Portal' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'Job Portal' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="ml-auto" navbar>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img src={admin} className="img-avatar" alt="admin@jobportal.com" />
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
              <DropdownItem onClick={this.onLogoutClick.bind(this)}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
        <AppAsideToggler className="d-md-down-none" />
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes ={
  logoutUser : PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth:state.auth
});

export default connect(mapStateToProps,{logoutUser})(DefaultHeader);
