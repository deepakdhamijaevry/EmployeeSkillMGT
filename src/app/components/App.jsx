// App.js

import React, { Component } from 'react';
import { Switch, BrowserRouter, Route, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
/** Layouts **/
import AppWrapper from "./AppWrapper.component.jsx";
/** Components **/
import Login from "./Login/login.component.jsx";
import { IntlProvider, addLocaleData } from "react-intl";
import translations from "../../i18n/locales";
const language = 'en'; //Default Language (english)
class App extends Component {
  constructor() {
    super();
    this.state = {
      language: language,
      messages: translations[language],
      languages: [
        { value: 'en', name: 'English' },
        { value: 'nb', name: 'Norwegian' }
      ]
      //Default Language (en or nb -> as of now)
    }
    addLocaleData(require(`react-intl/locale-data/${language}`));
    this.languageChange = this.languageChange.bind(this);
  }
  render() {
    return (
      <IntlProvider locale={this.state.language} messages={this.state.messages}>
        <div>
          <ToastContainer />
          <BrowserRouter>
            <div>
              <Switch>
                {/* BASE  ROUTES  */}
                <Route exact path="/">
                  <Redirect to="/login" />
                </Route>

                {/* LOGIN  ROUTES  */}
                <Login exact path="/login" component={Login} languagesProp={this.state.languages} languageChangeProp={this.languageChange}></Login>

                {/* APP WRAPPER  ROUTES  */}
                <Route render={props => (
                  <AppWrapper language={this.state.language}>
                    <Component {...props} />
                  </AppWrapper>
                )} />

              </Switch>
            </div>
          </BrowserRouter>
        </div>
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

export default App;
