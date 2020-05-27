import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FormattedMessage, injectIntl } from 'react-intl';
import translator from '../../translator.jsx';
import Pagination from '../shared/Pagination.jsx';
import moment from 'moment'
import { getEmployeesRequest, searchEmployeeRequest } from '../../actions/employeeAction';
const sortcolumns = { firstName: 'FirstName', dob: 'DOB', sex: 'Sex', email: 'email' }
class EmployeeList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageNo: 1,
            pageLimit: 10,
            pageNeighbours: 1,
            isAsc: false,
            columnToSort: ''
        }
        // This binding is necessary to make "this" work in the callback  
        this.handleEdit = this.handleEdit.bind(this);
        this.navigateToAddEmployee = this.navigateToAddEmployee.bind(this);
        this.onPageChanged = this.onPageChanged.bind(this);
        this.onSortData = this.onSortData.bind(this);
        this.onSearchData = this.onSearchData.bind(this);
        this.getAllEmployees();
    }
    // Navigate to edit the employee
    handleEdit(id) {
        this.props.history.push("/employee/add/" + id);
    }
    // Navigate to view the employee
    handleView(id) {
        this.props.history.push("/employee/detail/" + id);
    }
    // Navigate to add the employee
    navigateToAddEmployee() {
        this.props.history.push("/employee/add");
    }
    // Get all the employees
    getAllEmployees() {
        const pageInfo = this.state;
        this.props.getEmployees(pageInfo.pageNo, pageInfo.pageLimit, pageInfo.isAsc, pageInfo.columnToSort);
    }
    // on Page changing
    onPageChanged(data) {
        this.setState({ pageNo: data.currentPage }, () => { this.getAllEmployees(); });
    }
    // on sorting
    onSortData(columnToSort) {
        this.setState({
            columnToSort: columnToSort,
            isAsc: this.state.columnToSort === columnToSort ? !this.state.isAsc : true
        }, () => { this.getAllEmployees(); });
    }
    // on Seaching the records
    onSearchData(e) {
        if (e.target.value != '') {
            this.props.searchEmployee(e.target.value);
        } else { this.getAllEmployees();}
    }
    render() {
        const { employee, isSuccess } = this.props;
        //if (isSuccess == null) { return null; }// Required for paging
        if (isSuccess == true && employee.results.length === 0) { toast.error(translator(this, 'EMPLOYEE.NOEMPLOYEEFOUND')); }
        else if (isSuccess == false) { toast.error(translator(this, 'APP.SOMEERROROCCURED')); }
        return (
            <div>
                <div className="dashboard-wrapper dashboard-wrapper-lg">
                    <div className="container-fluid">
                        <div className="top-bar clearfix">
                            <div className="row gutter">
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div className="page-title">
                                        <h3><FormattedMessage id="EMPLOYEE.EMPLOYEES" defaultMessage="Employees" /> </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="padding-xl">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="row">
                                    <div className="col-sm-9">
                                        <div className="padding-xl">
                                            <FormattedMessage id="APP.ADDNEW" defaultMessage="Add New">
                                                {
                                                    (msg) =>
                                                        (
                                                            <button className="btn btn-info" type="button" title={msg} onClick={() => this.navigateToAddEmployee()}>
                                                                <span className="icon-circle-with-plus"></span>  {msg}</button>
                                                        )
                                                }
                                            </FormattedMessage>
                                        </div>
                                    </div>

                                    <div className="col-sm-3">

                                        <div className="padding-xl">

                                            <input
                                                className="form-control"
                                                onChange={(e) => this.onSearchData(e)}
                                                placeholder="Search..."
                                            />

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pad-top10">
                            <div className="panel panel-yellow">
                                <div>
                                    <div className="table-responsive">
                                        <table className="table table-hover no-margin table-striped">
                                            <thead className="thead-light">
                                                <tr>
                                                    <th className="pointerCursor wdh-30" onClick={() => this.onSortData(sortcolumns.firstName)}><FormattedMessage id="EMPLOYEE.EMPLOYEENAME" defaultMessage="Employee Name" /><i className={"fa fa-fw " + (this.state.columnToSort === sortcolumns.firstName ? (this.state.isAsc === true ? 'sort-up' : 'sort-down') : 'fa-sort')}></i></th>
                                                    <th className="pointerCursor wdh-30" onClick={() => this.onSortData(sortcolumns.email)}><FormattedMessage id="EMPLOYEE.EMPLOYEEEMAIL" defaultMessage="Email Address" /><i className={"fa fa-fw " + (this.state.columnToSort === sortcolumns.email ? (this.state.isAsc === true ? 'sort-up' : 'sort-down') : 'fa-sort')}></i></th>
                                                    <th className="pointerCursor wdh-10" onClick={() => this.onSortData(sortcolumns.sex)}><FormattedMessage id="EMPLOYEE.GENDER" defaultMessage="Gender" /><i className={"fa fa-fw " + (this.state.columnToSort === sortcolumns.sex ? (this.state.isAsc === true ? 'sort-up' : 'sort-down') : 'fa-sort')}></i></th>
                                                    <th className="pointerCursor wdh-15" onClick={() => this.onSortData(sortcolumns.dob)}><FormattedMessage id="EMPLOYEE.EMPLOYEEDOB" defaultMessage="Date of Birth" /><i className={"fa fa-fw " + (this.state.columnToSort === sortcolumns.dob ? (this.state.isAsc === true ? 'sort-up' : 'sort-down') : 'fa-sort')}></i></th>
                                                    <th className="wdh-15"><FormattedMessage id="EMPLOYEE.ACTIONS" defaultMessage="Actions" /></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    employee.results.map((employee, i) =>
                                                        <tr key={i}>
                                                            <td>{employee.firstName} {employee.lastName}</td>
                                                            <td>{employee.email}</td>
                                                            <td>{employee.sex}</td>
                                                            <td>{moment(new Date(employee.dob)).format('MM/DD/YYYY')}</td>
                                                            <td>
                                                                <a className="action pointer" onClick={() => this.handleEdit(employee.employeeId)}><FormattedMessage id="APP.EDIT" defaultMessage="Edit" /></a> |
                                                                <a className="action pointer" onClick={() => this.handleView(employee.employeeId)}><FormattedMessage id="APP.VIEW" defaultMessage="View" /></a>
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Required for paging else pagin will not load else use on render and return null */}
                    {
                        isSuccess ?
                            <div className="paging-sg-rgt">
                                <Pagination totalRecords={employee.totalNumberOfRecords} pageLimit={this.state.pageLimit} pageNeighbours={this.state.pageNeighbours} onPageChanged={(e) => this.onPageChanged(e)} />
                            </div>
                            : <div></div>
                    }
                </div>
            </div>
        )
    }
}
// map state to props
const mapStateToProps = state => {
    return {
        employee: state.employeeReducer.employee,
        isSuccess: state.employeeReducer.isSuccess,
    }
};
// Action creators
const actionCreators = {
    getEmployees: getEmployeesRequest,
    searchEmployee: searchEmployeeRequest
};
export default withRouter(connect(mapStateToProps, actionCreators)(injectIntl(EmployeeList)));
