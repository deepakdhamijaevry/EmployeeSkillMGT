import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import translator from '../../translator.jsx';
import { toast } from 'react-toastify';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Rating from 'react-rating';
import moment from 'moment'
import { getEmployeeDetailRequest } from '../../actions/employeeInformationAction';
class ViewEmployee extends Component {

    constructor(props) {
        super(props);
        this.state = {
            employee: null,
            isSuccess: null
        }
        this.getEmployeeDetail();
    }
    // Get the employee detail
    getEmployeeDetail() {
        if (this.props.match.params.id != '' && this.props.match.params.id != undefined) {
            this.props.getEmployeeDetail(this.props.match.params.id);
        }
    }
    // Navigate to edit the employee
    handleEdit() {
        this.props.history.push("/employee/add/" + this.props.match.params.id);
    }
    // Calling before render form
    static getDerivedStateFromProps(props, state) {
        if (props.isSuccess !== state.isSuccess) {
            if (props.isSuccess != null) {
                return {
                    employee: props.employee, isSuccess: props.isSuccess
                }
            } return { isSuccess: props.isSuccess }
        }
        return null;
    }
    render() {
        const { employee, isSuccess } = this.state;
        if (isSuccess == null && employee == null) { return null; }
        else if (isSuccess == false && employee == null) { toast.error(translator(this, 'APP.SOMEERROROCCURED')); return null; }
        return (
            <div className="dashboard-wrapper dashboard-wrapper-lg">
                <div className="container-fluid panel">
                    <div className="top-bar clearfix">
                        <div className="row gutter">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div className="page-title">
                                    <h3><FormattedMessage id="EMPLOYEE.EMPLOYEESDETAIL" defaultMessage="Employee Detail" /> </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="padding-xl ">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="row">
                                <div className="col-sm-5">
                                    <div className="padding-xl">
                                        <FormattedMessage id="APP.EDIT" defaultMessage="EDIT">
                                            {
                                                (msg) =>
                                                    (
                                                        <button className="btn btn-info" type="button" title={msg} onClick={() => this.handleEdit()}>
                                                            <span className="icon-edit"></span>  {msg}</button>
                                                    )
                                            }
                                        </FormattedMessage>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="panel-body">
                                <div className="container-fluid-new">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className="wdh-20"> <label><FormattedMessage id="EMPLOYEE.FIRSTNAME" defaultMessage="First Name" /></label></td>
                                                <td><label>{employee.firstName}</label></td>
                                            </tr>
                                            <tr>
                                                <td className="wdh-20"><label><FormattedMessage id="EMPLOYEE.LASTNAME" defaultMessage="Last Name" /></label></td>
                                                <td><label>{employee.lastName}</label></td>
                                            </tr>
                                            <tr>
                                                <td className="wdh-20"><label><FormattedMessage id="EMPLOYEE.EMAIL" defaultMessage="Email Address" /></label></td>
                                                <td><label>{employee.email}</label></td>
                                            </tr>
                                            <tr>
                                                <td className="wdh-20"><label><FormattedMessage id="EMPLOYEE.GENDER" defaultMessage="Gender" /></label></td>
                                                <td><label>{employee.sex}</label></td>
                                            </tr>
                                            <tr>
                                                <td className="wdh-20"><label><FormattedMessage id="EMPLOYEE.DOB" defaultMessage="Date Of Birth" /></label></td>
                                                <td><label>{moment(new Date(employee.dob)).format('MM/DD/YYYY')}</label></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <Accordion>
                                        <Card>
                                            <Card.Header>
                                                <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
                                                    <label><FormattedMessage id="EMPLOYEE.EMPLOYEESKILLS" defaultMessage="Employee SKills" /></label>
                                                </Accordion.Toggle>
                                            </Card.Header>
                                            <Accordion.Collapse eventKey="0">
                                                <Card.Body><table>
                                                    {
                                                        employee.skills.length == 0 ? (
                                                            <tbody><tr><td><label><FormattedMessage id="EMPLOYEE.NOSKILLAVAILABLE" defaultMessage="No skill available" /></label></td></tr></tbody>
                                                        ) : employee.skills.map((skill, i) =>
                                                            <tbody key={i} >
                                                                <tr className="bottom-clr">
                                                                    <td className="wdh-15"><label><FormattedMessage id="EMPLOYEE.SKILL" defaultMessage="Skill" /></label></td>
                                                                    <td className="wdh-25"><label>{skill.skill}</label></td>
                                                                    <td className="wdh-15"><label><FormattedMessage id="EMPLOYEE.LEVEL" defaultMessage="Level" /></label></td>
                                                                    <td className="wdh-25"><Rating readonly initialRating={skill.level} /> </td>
                                                                </tr>
                                                            </tbody>
                                                        )
                                                    }
                                                </table></Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                        <Card>
                                            <Card.Header>
                                                <Accordion.Toggle as={Card.Header} variant="link" eventKey="1">
                                                    <label><FormattedMessage id="EMPLOYEE.EMPLOYEEEXPERIENCE" defaultMessage="Employee Experience" /></label>
                                                </Accordion.Toggle>
                                            </Card.Header>
                                            <Accordion.Collapse eventKey="1">
                                                <Card.Body><table>
                                                    {employee.experiences.length == 0 ? (
                                                        <tbody><tr><td><label><FormattedMessage id="EMPLOYEE.NOSEXPERIENCEAVAILABLE" defaultMessage="No experience available" /></label> </td></tr></tbody>
                                                    ) : employee.experiences.sort((a, b) => moment(new Date(b.toDate)) - moment(new Date(a.toDate))).map((exp, j) =>
                                                        <tbody key={j}>
                                                            <tr>
                                                                <td className="wdh-15"><label><FormattedMessage id="EMPLOYEE.DATE" defaultMessage="Date" /></label></td>
                                                                <td><label>{moment(new Date(exp.fromDate)).format('MM/DD/YYYY')} </label>

                                                                    <label>&nbsp; - &nbsp;</label><label>{moment(new Date(exp.toDate)).format('MM/DD/YYYY')}</label></td>
                                                            </tr>
                                                            <tr className="bottom-clr">
                                                                <td className="wdh-10"><label><FormattedMessage id="EMPLOYEE.COMPANY" defaultMessage="Company" /></label></td>
                                                                <td className="wdh-25"><label>{exp.company}</label></td>
                                                                <td className="wdh-10"><label><FormattedMessage id="EMPLOYEE.DESIGNATION" defaultMessage="Designation" /></label></td>
                                                                <td className="wdh-25"><label>{exp.designation}</label></td>
                                                                <td className="wdh-10"><label><FormattedMessage id="EMPLOYEE.LEVEL" defaultMessage="Level" /></label></td>
                                                                <td className="wdh-20"> <Rating initialRating={exp.level} readonly /> </td>
                                                            </tr>
                                                        </tbody>
                                                    )}
                                                </table></Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    </Accordion>
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
        employee: state.employeeInformationReducer.employee,
        isSuccess: state.employeeInformationReducer.isSuccess
    }
};
// Action creators
const actionCreators = {
    getEmployeeDetail: getEmployeeDetailRequest
};
export default withRouter(connect(mapStateToProps, actionCreators)(injectIntl(ViewEmployee)));
