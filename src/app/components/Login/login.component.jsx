// login.component.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FormattedMessage, injectIntl } from 'react-intl';
import translator from '../../translator.jsx';
import '../../../assets/styles/animate.css';
import '../../../assets/styles/login.css';
import common from '../../helper/common.jsx';
import { loginRequest, loginClear } from '../../actions/loginAction';
const loginModel = { id: '', email: '', password: '' }
class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loginDetailModel: {
        loginModel
      },
      errors: {
      },
      isUserloggedIn: null
    }
    this.logChange = this.logChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    document.body.classList.add('body-login');
  }
  // Submit the form 
  handleSubmit(event) {
    event.preventDefault();
    if (this.validateForm()) {
      this.props.login(this.state.loginDetailModel["email"], this.state.loginDetailModel["password"]);
    }
  }
  //control change event 
  logChange(e) {
    let loginDetailModel = this.state.loginDetailModel;
    loginDetailModel[e.target.name] = e.target.value;
    this.setState({
      loginDetailModel
    });
    this.removeValidation(e);
  }
  // Validate the form
  validateForm() {
    let loginDetailModel = this.state.loginDetailModel;
    let errors = {};
    let formIsValid = true;

    if (!loginDetailModel["email"]) {
      formIsValid = false;
      errors["email"] = 'APP.REQUIRED';
    }
    else if (!common.validateEmail(loginDetailModel["email"])) {
      formIsValid = false;
      errors["email"] = 'APP.EMAILFORMATREQUIRED';
    }
    if (!loginDetailModel["password"] || loginDetailModel["password"] == 0) {
      formIsValid = false;
      errors["password"] = 'APP.REQUIRED';
    }
    this.setState({ errors: errors });
    return formIsValid;
  }
  // Remove validations from control
  removeValidation(e) {
    let self = this;
    const type = e.target.name;
    let loginDetailModel = self.state.loginDetailModel;
    let errors = self.state.errors;
    if (!loginDetailModel[type]) {
      errors[type] = 'APP.REQUIRED'
    } else {
      errors[type] = "";
    }
    this.setState({ errors: errors });
  }
  // Action creator function to clean up redux errors
  // Calling after render form
  componentDidUpdate() {
    if (this.props.loggedIn != null) {
      this.props.loginClear();
    }
  }
  // Manage the current state from current props
  // Calling before render form
  static getDerivedStateFromProps(props, state) {
    if (props.loggedIn !== state.isUserloggedIn) {
      return {
        isUserloggedIn: props.loggedIn,
      }
    }
    return null;
  }
  render() {
    const { isUserloggedIn } = this.state;
    if (isUserloggedIn) {
      toast.success(translator(this, 'LOGIN.SUCCESSLOGIN')); return <Redirect to='/dashboard' />
    } else if (isUserloggedIn == false) { toast.error(translator(this, 'LOGIN.INVALIDLOGIN')); }
    return (
      <form id="wrapper" onSubmit={e => this.handleSubmit(e)} method="POST">
        <div id="box" className="animated bounceIn">
          <div id="top_header">
            <img src="src/assets/img/logo.jpg" alt="Admin Dashboard Logo" />
            <h5>
              <FormattedMessage id="LOGIN.TITLE" defaultMessage="Employee Portal" />
            </h5>
          </div>
          <div id="inputs">
            <div className="form-block">
              <FormattedMessage id="LOGIN.EMAIL">
                {
                  (msg) =>
                    (
                      <input type="text" placeholder={msg} value={this.state.loginDetailModel.email || ''} onChange={e => this.logChange(e)} name='email' />
                    )
                }
              </FormattedMessage>
              <i className="icon-user-check"></i>
            </div>
            <label className="errorMsg-login">
              <FormattedMessage id={this.state.errors.email || 'APP.Empty'} />
            </label>
            <div className="form-block">
              <FormattedMessage id="LOGIN.PASSWORD" >
                {
                  (msg) =>
                    (
                      <input type="password" placeholder={msg} value={this.state.loginDetailModel.password || ''} onChange={e => this.logChange(e)} name='password' />
                    )
                }
              </FormattedMessage>
              <i className="icon-spell-check"></i>
            </div>
            <label className="errorMsg-login ">
              <FormattedMessage id={this.state.errors.password || 'APP.Empty'} />
            </label>
            <FormattedMessage id="LOGIN.SIGNIN" >
              {
                (msg) =>
                  (
                    <input className="signin" type="submit" value={msg} />
                  )
              }
            </FormattedMessage>
          </div>
          <div id="bottom" className="clearfix">
            <div className="pull-right">
              <select className="form-control" name='languages' onChange={e => this.props.languageChangeProp(e)}>
                {this.props.languagesProp.map((e, key) => {
                  return <option key={key} value={e.value}>{e.name}</option>;
                })}
              </select>
            </div>
          </div>
        </div>
      </form>
    )
  }
}
// map state to props
const mapStateToProps = state => {
  return {
    loggedIn: state.login.loggedIn
  }
};
// Action creators
const actionCreators = {
  login: loginRequest,
  loginClear: loginClear
};
export default withRouter(connect(mapStateToProps, actionCreators)(injectIntl(Login)));