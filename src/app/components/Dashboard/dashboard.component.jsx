import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import { getEmployeesRequest } from '../../actions/employeeAction';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pageNo: 1,
      pageLimit: 10
    }
    this.getTotalEmployee();
  }
  // Get the total count of the employees
  getTotalEmployee() {
    this.props.getEmployeeCount(this.state.pageNo, this.state.pageLimit, '', '');
  }
  render() {
    return (
      <div className="dashboard-wrapper dashboard-wrapper-lg">
        <div className="container-fluid">

          <div className="top-bar clearfix">
            <div className="row gutter">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <div className="page-title">
                  <h3><FormattedMessage id="HEADER.WELCOME" defaultMessage="Welcome to Dashboard" /> </h3>
                  <p>
                    <FormattedMessage id="HEADER.WELCOMEDES" defaultMessage="Employee Skill Management Application Using React Redux" />
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row gutter">
            <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
              <div className="row gutter">
                <div className="col-lg-6 col-md-3 col-sm-3 col-xs-6">
                  <div className="panel height1">
                    <div className="panel-heading">
                      <h3><FormattedMessage id="EMPLOYEE.EMPLOYEES" defaultMessage="Employees" /></h3>
                    </div>
                    <div>
                      <div className="sessions">
                        <h2 className="text-warning">
                          <span className="pointer" onClick={() => this.props.history.push('/employee')}>{this.props.employee.totalNumberOfRecords}</span>
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
// map state to props
const mapStateToProps = state => {
  return {
    employee: state.employeeReducer.employee
  }
};
// Action creators
const actionCreators = {
  getEmployeeCount: getEmployeesRequest
};
export default withRouter(connect(mapStateToProps, actionCreators)(injectIntl(Dashboard)));