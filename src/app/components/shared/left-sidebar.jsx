// App.js
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { withRouter, Link } from 'react-router-dom';

class LeftSidebar extends Component {
  constructor() {
    super();

  }
  render() {
    return (
      <div className="vertical-nav">
        <button className="collapse-menu">
          <i className="icon-menu2"></i>
        </button>
        <div className="clearfix"></div>
        <ul className="menu clearfix">
          <li className={this.props.location.pathname.includes('/dashboard') ? 'active selected' : ''}>

            <Link to={'/dashboard'} >
              <i className="icon-air-play"></i>
              <span className="menu-item">
                <FormattedMessage id="HEADER.DASHBOARD" defaultMessage="Dashboard" />
              </span>
            </Link>
          </li>
          <li className={this.props.location.pathname.includes('/employee') ? 'active selected' : ''}>
            <Link to={'/employee'} >
              <i className="icon-users"></i>
              <span className="menu-item">
                <FormattedMessage id="EMPLOYEE.EMPLOYEE" defaultMessage="Employee" />
              </span>
            </Link>
          </li>
        </ul>

      </div>
    );
  }

}
export default withRouter(LeftSidebar);
