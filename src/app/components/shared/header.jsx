import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import { history } from '../../helper/history'

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUserName: ''
    };
    this.logout = this.logout.bind(this);
  }
  UNSAFE_componentWillMount() {
    const userId = localStorage.getItem("UserId");
    if (userId != "" && userId != null && userId != undefined) {
      this.setState({
        loggedInUserName: localStorage.getItem("UserName")
      })
    }
  }
  logout() {
    localStorage.setItem("UserId", "");
    history.push('/login')
  }
  render() {
    return (
      <div>
        <header>
          <Link to={'/dashboard'} className="logo" >
            <img src="../../src/assets/img/logo.jpg" alt="Admin Dashboard Logo" />
          </Link>
          <ul id="header-actions" className="clearfix">
            <li className="list-box user-admin hidden-xs dropdown">
              <a id="drop4" role="button" className="dropdown-toggle defaultCursor" data-toggle="dropdown">
                <i className="icon-user"></i>
              </a>
              <ul className="dropdown-menu sm">
                <li onClick={this.logout} className="dropdown-content"><a>
                  <FormattedMessage id="APP.LOGOUT" defaultMessage="Logout" /></a></li>
              </ul>
            </li>
          </ul>
          <div className="log-detail">
            <div className="name">&nbsp;</div>
            <div className="designation defaultCursor">{this.state.loggedInUserName}</div>
          </div>
          <div className="custom-search hidden-sm hidden-xs">

            <div className="styled-input">
              <div className="form-group">
                <select className="form-control pointerCursor" name='languages' value={this.props.language} onChange={this.props.languageChangeProp}>
                  {this.props.languagesProp.map((e, key) => {
                    return <option key={key} value={e.value}>{e.name}</option>;
                  })}
                </select>
              </div>
            </div>
          </div>

        </header>
      </div>
    );
  }
}
// Action creators
const actionCreators = {
};
export default withRouter(connect(null, actionCreators)(injectIntl(Header)));
