// AppWrapper.Component.js

import React, { Component } from 'react';
import { Switch, BrowserRouter, Route, withRouter } from 'react-router-dom';
/** CSS **/
import '../../assets/styles/bootstrap.min.css'
import '../../assets/styles/main.scss'
import '../../assets/fonts/icomoon/icomoon.css'
import "../../assets/styles/Dashboard.css";
import '../../assets/sass/style.scss'

import { appendScript } from '../helper/AppendScript';

/** Shared Components **/
import HeaderBar from './shared/header.jsx';
import LeftSidebar from './shared/left-sidebar.jsx';
import FooterBar from './shared/footer.jsx';

/** Components **/
import Dashboard from './Dashboard/dashboard.component.jsx';
import AddEmployee from './Employee/add-employee.component.jsx';
import EmployeeList from './Employee/employee-list.component.jsx';
import ViewEmployee from './Employee/view-employee.component.jsx';
/** Others **/
import { IntlProvider, addLocaleData } from "react-intl";
import translations from "../../i18n/locales";
const language = 'en'; //Default Language (english)
class AppWrapperComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: this.props.language,//Default Language (en or nb -> as of now)
      messages: translations[this.props.language],
      languages: [
        { value: 'en', name: 'English' },
        { value: 'nb', name: 'Norwegian' }
      ],
    }
    addLocaleData(require(`react-intl/locale-data/${language}`));
    this.languageChange = this.languageChange.bind(this);
  }
  UNSAFE_componentWillMount() {
    const userId = localStorage.getItem("UserId");
    if (userId == null || userId == undefined || userId == "") {
      this.props.history.push("/login");
    }
  }
  componentDidMount() {
    appendScript("/src/assets/js/bootstrap.min.js");
    appendScript("/src/assets/js/jquery.scrollUp.js");
    appendScript("/src/assets/js/custom.js");
  }
  render() {
    document.body.classList.remove('body-login');
    return (
      <IntlProvider locale={this.state.language} messages={this.state.messages}>
        <BrowserRouter>
          <div>
            <HeaderBar languagesProp={this.state.languages} languageChangeProp={this.languageChange} language={this.state.language}>
            </HeaderBar>
            <LeftSidebar location={this.props.location}></LeftSidebar>
            <FooterBar></FooterBar>

            <Switch>
              <Route exact path='/dashboard' component={Dashboard} />
              <Route exact path='/employee' component={EmployeeList} />
              <Route exact path='/employee/detail/:id' component={ViewEmployee} />
              <Route exact path='/employee/add' component={AddEmployee} />
              <Route exact path='/employee/add/:id' component={AddEmployee} />
            </Switch>
          </div>
        </BrowserRouter>
      </IntlProvider>
    );
  }

  languageChange(e) {
    let self = this;
    this.language = e.target.value;
    self.setState({
      language: this.language,
      messages: translations[this.language]
    });
    addLocaleData(require(`react-intl/locale-data/${this.language}`));
  }
}
export default withRouter(AppWrapperComponent);
