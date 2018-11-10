
import React, { Component } from 'react';

class sidebar extends Component {

  render() {

    return (
        <div className="sidebar">
        <nav className="sidebar-nav ps">
            <ul className="nav">
                <li className="nav-item">
                    <a className="nav-link" href="index.html">
                        <i className="nav-icon icon-speedometer"></i> Dashboard
                        <span className="badge badge-primary">NEW</span>
                    </a>
                </li>
            </ul>
            <div className="ps__rail-x" style={{left: 0+'px', bottom: 0+'px'}}>
                <div className="ps__thumb-x" style={{left: 0+'px', width: 0+'px'}}></div>
            </div>
            <div className="ps__rail-y" style={{top: 0+'px', right: 0+'px'}}>
                <div className="ps__thumb-y" style={{top: 0+'px',height: 0+'px'}}></div>
            </div>
        </nav>
        <button className="sidebar-minimizer brand-minimizer" type="button"></button>
    </div>
    );
  }
}


export default   sidebar;






