// create.component.js

import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import translator from '../../translator.jsx';
import common from '../../helper/common.jsx';
import { Tabs, Tab } from 'react-bootstrap-tabs';
import Rating from 'react-rating';
// for calendar start
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import { formatDate, parseDate } from "react-day-picker/moment";
import moment from 'moment'
// for calendar end
import { addEmployeeInformationRequest, updateEmployeeInformationRequest, getEmployeeDetailRequest } from '../../actions/employeeInformationAction';

class AddEmployee extends Component {
    constructor(props) {
        super(props);
        // Employee Model Properties
        this.state = {
            employee: {
                employeeId: '0',
                firstName: '',
                lastName: '',
                email: '',
                dob: '',
                sex: '',
                skills: [{
                    skill: '',
                    level: '',
                }
                ],
                experiences: [{
                    company: '',
                    designation: '',
                    fromDate: '',
                    toDate: '',
                    level: '',
                }
                ],
            },
            errors: {
            },
            skillErrors: [{ rowNum: '', skill: '', level: '' }],
            experienceErrors: [{ rowNum: '', company: '', designation: '', fromDate: '', toDate: '', level: '' }],
            genders:
                [
                    { value: '', name: 'Select' },
                    { value: 'Male', name: 'Male' },
                    { value: 'Female', name: 'Female' }
                ],
            tabIndex: 0,
            employeeId: ''
        }

        // Event handlers     
        this.handleSubmit = this.handleSubmit.bind(this)
        this.logChange = this.logChange.bind(this)
        this.removeValidation = this.removeValidation.bind(this)
        this.handleDayChange = this.handleDayChange.bind(this);
        this.handleAddClick = this.handleAddClick.bind(this);
        this.handleRemoveClick = this.handleRemoveClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handleBack = this.handleBack.bind(this);
        //get the member details
        if (this.props.match.params.id != '' && this.props.match.params.id != undefined) {
            this.state.employeeId = this.props.match.params.id;
            this.props.getEmployeeDetail(this.props.match.params.id);
        } //get the member details
    }
    // handle click event of the Add More button
    handleAddClick(type) {
        const employee = this.state.employee;
        if (type == "skill") {
            employee.skills.push({ skill: '', level: '' });
        }
        else {
            employee.experiences.push({ company: '', designation: '', fromDate: '', toDate: '', level: '' });
        }
        this.setState({ employee });
    }
    //handle next and back button functionality
    handleNext(type) {
        if (type == 'employee') {
            if (this.validateEmployeeForm()) {
                this.setState({ tabIndex: 1 });
            }
        }
        else if (type == 'skill') {
            if (this.validateEmployeeSkillForm()) {
                this.setState({ tabIndex: 2 });
            }
        }
    }
    handleBack(type) {
        if (type == 'experience') {
            this.setState({ tabIndex: 1 });
        }
        else if (type == 'skill') {
            this.setState({ tabIndex: 0 });
        }
    }
    // date change method
    handleDayChange(day) {
        let employee = this.state.employee;
        employee['dob'] = day;
        this.setState({
            employee
        });
    }
    // handle dates change for Experience
    handleDayChangeExperience(day, index, name) {
        const employee = this.state.employee;
        employee.experiences[index][name] = day;
        this.removeExperienceValidation(name, index);
        this.setState({ employee });
    }
    // value change on form
    logChange(e) {
        let employee = this.state.employee;
        employee[e.target.name] = e.target.value;
        this.setState({
            employee
        });
        this.removeValidation(e);
    }
    // handle input change for skill & Experience
    handleInputChange(e, index, type) {
        const { name, value } = e.target;
        const employee = this.state.employee;
        if (type == "skill") {
            employee.skills[index][name] = value;
            this.removeSkillValidation(name, index);
        } else {
            employee.experiences[index][name] = value;
            this.removeExperienceValidation(name, index);
        }
        this.setState({ employee });
    }
    // handle Rate level change
    handleRateChange(value, index, type) {
        const employee = this.state.employee;
        if (type == "skill") {
            employee.skills[index]["level"] = value;
            this.removeSkillValidation('level', index);
        }
        else {
            employee.experiences[index]["level"] = value;
            this.removeExperienceValidation('level', index);
        }
        this.setState({ employee });
    }
    // handle click event of the Remove button for delete the row
    handleRemoveClick(index, type) {
        const employee = this.state.employee;
        if (type == "skill") {
            employee.skills.splice(index, 1);
            // Clear error item from error array
            var errors = this.state.skillErrors;
            errors.splice(index, 1);
            this.setState({ skillError: errors });
            // Clear error item from error array
        }
        else {
            employee.experiences.splice(index, 1);
            // Clear error item from error array
            var errors = this.state.experienceErrors;
            errors.splice(index, 1);
            this.setState({ experienceErrors: errors });
            // Clear error item from error array
        }
        this.setState({ employee });
    }
    // to clear employee validation
    removeValidation(e) {
        let self = this;
        const type = e.target.name;
        let employee = self.state.employee;
        let errors = self.state.errors;
        if (!employee[type]) {
            errors[type] = 'APP.REQUIRED';
        } else {
            errors[type] = "";
        }
        this.setState({
            errors: errors
        });
    }
    // to clear skill validation
    removeSkillValidation(type, index) {
        let errors = this.state.skillErrors;
        if (errors.find(x => x.skill != '' || x.level != '')) {
            if (errors[index] != undefined) {
                errors[index][type] = ''
            }
        }
        this.setState({ skillErrors: errors });
    }
    // to clear experience validation
    removeExperienceValidation(type, index) {
        let errors = this.state.experienceErrors;
        if (errors.find(x => x.company != '' || x.designation != '' || x.level != '' || x.fromDate != '' || x.toDate != '')) {
            if (errors[index] != undefined) {
                errors[index][type] = ''
            }
        }
        this.setState({ experienceErrors: errors });
    }
    // to validate form
    validateEmployeeForm() {
        let employee = this.state.employee;
        let errors = {};
        let formIsValid = true;

        if (!employee["firstName"]) {
            formIsValid = false;
            errors["firstName"] = 'APP.REQUIRED';
        }
        if (!employee["lastName"]) {
            formIsValid = false;
            errors["lastName"] = 'APP.REQUIRED';
        }
        if (!employee["dob"]) {
            formIsValid = false;
            errors["dob"] = 'APP.REQUIRED';
        }
        if (!employee["sex"]) {
            formIsValid = false;
            errors["sex"] = 'APP.REQUIRED';
        }
        if (!employee["email"]) {
            formIsValid = false;
            errors["email"] = 'APP.REQUIRED';
        }
        else if (!common.validateEmail(employee["email"])) {
            formIsValid = false;
            errors["email"] = 'APP.EMAILFORMATREQUIRED';
        }
        this.setState({
            errors: errors
        });
        return formIsValid;
    }
    // to validate skill form
    validateEmployeeSkillForm() {
        let formIsValid = true;
        let skills = this.state.employee.skills;
        let errors = [], index = 0;
        for (const skill of skills) {
            if (skill.skill != '' && skill.level == '') { errors.push({ rowNum: index, skill: '', level: 'APP.REQUIRED' }); formIsValid = false; }
            else if (skill.skill == '' && skill.level != '') { errors.push({ rowNum: index, skill: 'APP.REQUIRED', level: '' }); formIsValid = false; }
            else { errors.push({ rowNum: index, skill: '', level: '' }) }
            index++;
        }
        this.setState({ skillErrors: errors });
        return formIsValid;
    }
    // to validate experience form
    validateEmployeeExperienceForm() {
        let formIsValid = true;
        let experiences = this.state.employee.experiences;
        let errors = [], index = 0;
        for (const experience of experiences) {
            let company = '', designation = '', fromDate = '', toDate = '', level = '';
            if (experience.company != '' || experience.designation != '' ||
                (experience.fromDate != '' && experience.fromDate != undefined) ||
                (experience.toDate != '' && experience.toDate != undefined) ||
                experience.level != '') {

                if (experience.company == '') { company = 'APP.REQUIRED'; formIsValid = false; }
                if (experience.designation == '') { designation = 'APP.REQUIRED'; formIsValid = false; }
                if (experience.fromDate == '' || experience.fromDate == undefined) { fromDate = 'APP.REQUIRED'; formIsValid = false; }
                if (experience.toDate == '' || experience.toDate == undefined) { toDate = 'APP.REQUIRED'; formIsValid = false; }
                if (experience.level == '') { level = 'APP.REQUIRED'; formIsValid = false; }
                if (experience.fromDate != '' && experience.fromDate != undefined && experience.toDate != '' && experience.toDate != undefined) {
                    if ((Date.parse(experience.fromDate) > Date.parse(experience.toDate))) { fromDate = 'APP.DATESHOULDBEGREATER'; formIsValid = false; }
                }
                if (!formIsValid) { errors.push({ rowNum: index, company: company, designation: designation, fromDate: fromDate, toDate: toDate, level: level }); }
                else { errors.push({ rowNum: index, company: '', designation: '', fromDate: '', toDate: '', level: '' }) }
            }
            else { errors.push({ rowNum: index, company: '', designation: '', fromDate: '', toDate: '', level: '' }) }
            index++;
        }
        this.setState({ experienceErrors: errors });
        return formIsValid;
    }
    // to save employee
    handleSubmit(event) {
        event.preventDefault();
        if (this.validateEmployeeExperienceForm()) {
            //Clear Empty items from Skills & Experience Array before save
            const skills = this.state.employee.skills;
            const experiences = this.state.employee.experiences;
            this.state.employee.skills = skills.filter(function (el) { return el.skill != '' && el.level != ''; });
            this.state.employee.experiences = experiences.filter(function (el) {
                return el.company != '' && el.designation != '' && el.fromDate != '' && el.toDate != '' && el.level != '';
            });
            //Clear Empty items from Skills & Experience Array
            if (this.state.employeeId) {
                this.props.updateEmployeeInformation(this.state.employeeId, this.state.employee);
            } else {
                this.props.addEmployeeInformation(this.state.employee);
            }
        }
    }
    // Calling before render form to bind the state values from props in edit
    static getDerivedStateFromProps(props, state) {
        if ((state.employeeId != '' && props.employee != null) || props.isSuccess == false) {
            var employee = props.isSuccess == false ? state.employee : props.employee;
            if (employee != null) {
                // Bind again empty array becuase remove the empty items during add/update
                if (employee.skills.length == 0) { employee.skills.push({ skill: '', level: '' }); }
                if (employee.experiences.length == 0) { employee.experiences.push({ company: '', designation: '', fromDate: '', toDate: '', level: '' }); }
                // Bind again empty array becuase remove the empty items during add/update
            }
            return {
                employee: employee,
            }
        }
        return null;
    }
    render() {
        const { employee, isSuccess, isFetching } = this.props;
        if (isSuccess && (employee != null && employee != {}) && !isFetching) { toast.success(translator(this, 'APP.RECORDINSERTEDSUCCESSFULLY')); return <Redirect to='/employee' /> }
        else if (isSuccess == false) { toast.error(translator(this, 'APP.SOMEERROROCCURED')); }
        return (
            <div className="dashboard-wrapper dashboard-wrapper-lg">
                <div className="container-fluid panel">
                    <div className="top-bar clearfix">
                        <div className="row gutter">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div className="page-title">
                                    <h3><FormattedMessage id="EMPLOYEE.ADDEMPLOYEE" defaultMessage=" Add Employee" /> </h3>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="panel-body">
                                <form onSubmit={this.handleSubmit} method="POST">
                                    <div className="row">
                                        <section>
                                            <Tabs selected={this.state.tabIndex} className="tab-container-with-green-border" headerClass="tab-header-bold" activeHeaderClass="btn-info-tabs" contentClass="tab-content-yellow">
                                                <Tab label={translator(this, 'EMPLOYEE.EMPLOYEEDETAIL')}>
                                                    <div className="form-group">
                                                        <div className="row gutter">
                                                            <div className="col-md-6">
                                                                <label><FormattedMessage id="EMPLOYEE.FIRSTNAME" defaultMessage="First Name" /></label>
                                                                <label className="errorMsg">
                                                                    <FormattedMessage id={this.state.errors.firstName || 'APP.Empty'} />
                                                                </label>
                                                                <input className="form-control" value={this.state.employee.firstName || ''} onChange={(e) => this.logChange(e)} name='firstName' />
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label><FormattedMessage id="EMPLOYEE.LASTNAME" defaultMessage="last Name" /></label>
                                                                <label className="errorMsg">
                                                                    <FormattedMessage id={this.state.errors.lastName || 'APP.Empty'} />
                                                                </label>
                                                                <input className="form-control" value={this.state.employee.lastName || ''} onChange={(e) => this.logChange(e)} name='lastName' />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="row gutter">
                                                            <div className="col-md-6">
                                                                <label><FormattedMessage id="EMPLOYEE.EMAIL" defaultMessage="Email Address" /></label>
                                                                <label className="errorMsg">
                                                                    <FormattedMessage id={this.state.errors.email || 'APP.Empty'} />
                                                                </label>
                                                                <input className="form-control" value={this.state.employee.email || ''} onChange={(e) => this.logChange(e)} name='email' />
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label><FormattedMessage id="EMPLOYEE.GENDER" defaultMessage="Gender" /></label>
                                                                <label className="errorMsg">
                                                                    <FormattedMessage id={this.state.errors.sex || 'APP.Empty'} />
                                                                </label>
                                                                <div>
                                                                    <select className="form-control" name='sex' value={this.state.employee.sex} onChange={(e) => this.logChange(e)}>
                                                                        {this.state.genders.map((e, key) => {
                                                                            return <option key={key} value={e.value}>{e.name}</option>;
                                                                        })}
                                                                    </select>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="row gutter">
                                                            <div className="col-md-6">
                                                                <label><FormattedMessage id="EMPLOYEE.DOB" defaultMessage=" DOB" /></label>
                                                                <label className="errorMsg">
                                                                    <FormattedMessage id={this.state.errors.dob || 'APP.Empty'} />
                                                                </label>
                                                                <div>
                                                                    <DayPickerInput
                                                                        dayPickerProps={{ modifiers: { disabled: [{ after: new Date() }] } }}
                                                                        value={(this.state.employee.dob != '' && this.state.employee.dob != undefined) ? moment(this.state.employee.dob).format('MM/DD/YYYY') : this.state.employee.dob}
                                                                        onDayChange={this.handleDayChange}
                                                                        formatDate={formatDate}
                                                                        parseDate={parseDate}
                                                                        placeholder={`mm/dd/yyyy`}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="row gutter pad-top80">
                                                            <div className="col-md-11">
                                                            </div>
                                                            <div>
                                                                <div className="action-btn">
                                                                    <FormattedMessage id="APP.NEXT">
                                                                        {
                                                                            (msg) =>
                                                                                (
                                                                                    <input className="btn btn-primary" type="button" onClick={() => this.handleNext('employee')} value={msg} />
                                                                                )
                                                                        }
                                                                    </FormattedMessage>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Tab>
                                                <Tab label={translator(this, 'EMPLOYEE.EMPLOYEESKILL')} disabled>
                                                    <div>
                                                        {this.state.employee.skills.map((x, i) => {
                                                            return (
                                                                <div className="form-group" key={i}>
                                                                    <div className="row gutter">
                                                                        <div className="col-md-6">
                                                                            <label><FormattedMessage id="EMPLOYEE.SKILL" defaultMessage="Skill" /></label>
                                                                            <label className="errorMsg">
                                                                                {this.state.skillErrors[i] != undefined ? <FormattedMessage id={this.state.skillErrors[i].skill || 'APP.Empty'} /> : ''}
                                                                            </label>
                                                                            <input className="form-control" value={x.skill || ''} onChange={e => this.handleInputChange(e, i, 'skill')} name='skill' />
                                                                        </div>
                                                                        <div className="col-md-3">
                                                                            <label><FormattedMessage id="EMPLOYEE.LEVEL" defaultMessage="Level" /></label>
                                                                            <label className="errorMsg">
                                                                                {this.state.skillErrors[i] != undefined ? <FormattedMessage id={this.state.skillErrors[i].level || 'APP.Empty'} /> : ''}
                                                                            </label>
                                                                            <div>
                                                                                <Rating name='level' initialRating={x.level} onChange={e => this.handleRateChange(e, i, 'skill')}
                                                                                    onHover={(rate) => document.getElementById('label-skill-onrate_' + i).innerHTML = rate || ''} />
                                                                                <span className="label label-default" id={"label-skill-onrate_" + i}></span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-3">
                                                                            <label></label>
                                                                            <div className="action-btn">
                                                                                {this.state.employee.skills.length !== 1 &&
                                                                                    <FormattedMessage id="APP.REMOVE">
                                                                                        {
                                                                                            (msg) =>
                                                                                                (

                                                                                                    <input className="btn btn-danger" type="button" value={msg} onClick={() => this.handleRemoveClick(i, 'skill')} />
                                                                                                )
                                                                                        }
                                                                                    </FormattedMessage>
                                                                                }
                                                                                {this.state.employee.skills.length - 1 === i &&
                                                                                    <FormattedMessage id="APP.ADD">
                                                                                        {
                                                                                            (msg) =>
                                                                                                (

                                                                                                    <input className="btn btn-info" type="button" value={msg} onClick={() => this.handleAddClick('skill')} />
                                                                                                )
                                                                                        }
                                                                                    </FormattedMessage>
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                        <div className="form-group">
                                                            <div className="row gutter pad-top80">
                                                                <div className="col-md-11">
                                                                    <div className="action-btn">
                                                                        <FormattedMessage id="APP.BACK">
                                                                            {
                                                                                (msg) =>
                                                                                    (

                                                                                        <input className="btn btn-primary" type="button" onClick={() => this.handleBack('skill')} value={msg} />
                                                                                    )
                                                                            }
                                                                        </FormattedMessage>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="action-btn">
                                                                        <FormattedMessage id="APP.NEXT">
                                                                            {
                                                                                (msg) =>
                                                                                    (

                                                                                        <input className="btn btn-primary" type="button" onClick={() => this.handleNext('skill')} value={msg} />
                                                                                    )
                                                                            }
                                                                        </FormattedMessage>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Tab>
                                                <Tab label={translator(this, 'EMPLOYEE.EMPLOYEEEXPERIENCE')} disabled>
                                                    {this.state.employee.experiences.map((x, i) => {
                                                        return (
                                                            <div key={i}>
                                                                <div className="form-group">
                                                                    <div className="row gutter">
                                                                        <div className="col-md-6">
                                                                            <label><FormattedMessage id="EMPLOYEE.COMPANY" defaultMessage="Company" /></label>
                                                                            <label className="errorMsg">
                                                                                {this.state.experienceErrors[i] != undefined ? <FormattedMessage id={this.state.experienceErrors[i].company || 'APP.Empty'} /> : ''}
                                                                            </label>
                                                                            <input className="form-control" value={x.company || ''} onChange={e => this.handleInputChange(e, i, 'experience')} name='company' />
                                                                        </div>
                                                                        <div className="col-md-6">
                                                                            <label><FormattedMessage id="EMPLOYEE.DESIGNATION" defaultMessage="Designation" /></label>
                                                                            <label className="errorMsg">
                                                                                {this.state.experienceErrors[i] != undefined ? <FormattedMessage id={this.state.experienceErrors[i].designation || 'APP.Empty'} /> : ''}
                                                                            </label>
                                                                            <input className="form-control" value={x.designation || ''} onChange={e => this.handleInputChange(e, i, 'experience')} name='designation' />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <div className="row gutter">
                                                                        <div className="col-md-3">
                                                                            <label><FormattedMessage id="EMPLOYEE.FROMDATE" defaultMessage="From Date" /></label>
                                                                            <label className="errorMsg">
                                                                                {this.state.experienceErrors[i] != undefined ? <FormattedMessage id={this.state.experienceErrors[i].fromDate || 'APP.Empty'} /> : ''}
                                                                            </label>
                                                                            <div>
                                                                                <DayPickerInput
                                                                                    dayPickerProps={{ modifiers: { disabled: [{ after: new Date() }] } }}
                                                                                    value={(x.fromDate != '' && x.fromDate != undefined) ? moment(x.fromDate).format('MM/DD/YYYY') : x.fromDate}
                                                                                    onDayChange={e => this.handleDayChangeExperience(e, i, 'fromDate')}
                                                                                    formatDate={formatDate}
                                                                                    parseDate={parseDate}
                                                                                    placeholder={`mm/dd/yyyy`}

                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-3">
                                                                            <label><FormattedMessage id="EMPLOYEE.TODATE" defaultMessage="To Date" /></label>
                                                                            <label className="errorMsg">
                                                                                {this.state.experienceErrors[i] != undefined ? <FormattedMessage id={this.state.experienceErrors[i].toDate || 'APP.Empty'} /> : ''}
                                                                            </label>
                                                                            <div>
                                                                                <DayPickerInput
                                                                                    dayPickerProps={{ modifiers: { disabled: [{ after: new Date() }] } }}
                                                                                    value={(x.toDate != '' && x.toDate != undefined) ? moment(x.toDate).format('MM/DD/YYYY') : x.toDate}
                                                                                    onDayChange={e => this.handleDayChangeExperience(e, i, 'toDate')}
                                                                                    formatDate={formatDate}
                                                                                    parseDate={parseDate}
                                                                                    placeholder={`mm/dd/yyyy`}

                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-3">
                                                                            <label><FormattedMessage id="EMPLOYEE.LEVEL" defaultMessage="Level" /></label>
                                                                            <label className="errorMsg">
                                                                                {this.state.experienceErrors[i] != undefined ? <FormattedMessage id={this.state.experienceErrors[i].level || 'APP.Empty'} /> : ''}
                                                                            </label>
                                                                            <div>
                                                                                <Rating name='level' initialRating={x.level} onChange={e => this.handleRateChange(e, i, 'experience')}
                                                                                    onHover={(rate) => document.getElementById('label-exp-onrate_' + i).innerHTML = rate || ''} />
                                                                                <span className="label label-default" id={"label-exp-onrate_" + i}></span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-3">
                                                                            <label></label>
                                                                            <div className="action-btn">
                                                                                {this.state.employee.experiences.length !== 1 &&
                                                                                    <FormattedMessage id="APP.REMOVE">
                                                                                        {
                                                                                            (msg) =>
                                                                                                (
                                                                                                    <input className="btn btn-danger" type="button" value={msg} onClick={() => this.handleRemoveClick(i, 'experience')} />
                                                                                                )
                                                                                        }
                                                                                    </FormattedMessage>
                                                                                }
                                                                                {this.state.employee.experiences.length - 1 === i &&
                                                                                    <FormattedMessage id="APP.ADD">
                                                                                        {
                                                                                            (msg) =>
                                                                                                (

                                                                                                    <input className="btn btn-info" type="button" value={msg} onClick={() => this.handleAddClick('experience')} />
                                                                                                )
                                                                                        }
                                                                                    </FormattedMessage>
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                    <div className="form-group">
                                                        <div className="row gutter pad-top80">
                                                            <div className="col-md-10">
                                                                <div className="action-btn">
                                                                    <FormattedMessage id="APP.BACK">
                                                                        {
                                                                            (msg) =>
                                                                                (

                                                                                    <input className="btn btn-primary" type="button" onClick={() => this.handleBack('experience')} value={msg} />
                                                                                )
                                                                        }
                                                                    </FormattedMessage>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="action-btn">
                                                                    <FormattedMessage id="APP.SUBMIT">
                                                                        {
                                                                            (msg) =>
                                                                                (

                                                                                    <input className="btn btn-primary mrg-lft-60" type="submit" value={msg} />
                                                                                )
                                                                        }
                                                                    </FormattedMessage>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Tab>
                                            </Tabs>
                                        </section>
                                    </div>
                                </form>
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
        isSuccess: state.employeeInformationReducer.isSuccess,
        isFetching: state.employeeInformationReducer.isFetching
    }
};
// Action creators
const actionCreators = {
    addEmployeeInformation: addEmployeeInformationRequest,
    updateEmployeeInformation: updateEmployeeInformationRequest,
    getEmployeeDetail: getEmployeeDetailRequest
};
export default withRouter(connect(mapStateToProps, actionCreators)(injectIntl(AddEmployee)));