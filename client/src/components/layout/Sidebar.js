
import React, { Component } from 'react';

class Sidebar extends Component {

  render() {

    return (
        <div className="sidebar">
            <nav className="sidebar-nav">
                <ul className="nav">
                    <li className="nav-item">
                        <a className="nav-link sidebar-link" href="">
                        <i className="nav-icon icon-home"></i> Home
                        </a>
                    </li>
                </ul>
            </nav>
            <button className="sidebar-minimizer brand-minimizer" type="button"></button>`;
        </div>
    );
  }
}


export default Sidebar;






