import { GET_EMPLOYEES_FAILED, GET_EMPLOYEES_SUCCESSFULLY, GET_EMPLOYEES_CLEAR, EMPLOYEE_SEARCH, GET_EMPLOYEES_REQUEST } from './actionTypes';
import { put } from 'redux-saga/effects';
import { baseUrl } from './config';
import requestMethod from '../helper/constant.js'
import axios from 'axios';
axios.defaults.headers.get['Pragma'] = 'no-cache';
/****  GET ALL EMPLOYEES ****/
export const getEmployeesRequest = (pageNo, PageLimit, isAsc, column) => {
    return {
        type: GET_EMPLOYEES_REQUEST,
        pageNo, PageLimit, isAsc, column
    };
};
export function* getEmployees(requestData) {
    try {
        const data = yield fetch(`${baseUrl}/${requestMethod.Employees}/${requestData.pageNo}/${requestData.PageLimit}/${requestData.isAsc}/${requestData.column}`)
            .then(response => response.json());
        yield put({ type: GET_EMPLOYEES_SUCCESSFULLY, employeeData: data });
    } catch (err) {
        yield put({ type: GET_EMPLOYEES_FAILED, error: err });
        yield put({ type: GET_EMPLOYEES_CLEAR });
    }
};
/****  END - GET ALL EMPLOYEES ****/

/****  EMPLOYEE SEARCH ****/
export const searchEmployeeRequest = (text) => {
    return {
        type: EMPLOYEE_SEARCH,
        text
    };
};
/****  END - EMPLOYEE SEARCH ****/