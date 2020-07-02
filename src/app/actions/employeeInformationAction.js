import {
    ADD_UPDATE_EMPLOYEE_DETAIL_FAILED, ADD_UPDATE_EMPLOYEE_DETAIL_SUCCESSFULLY, ADD_UPDATE_EMPLOYEE_DETAIL_CLEAR,
    ADD_UPDATE_EMPLOYEE_DETAIL_BEGIN, GET_EMPLOYEE_DETAIL_FAILED, GET_EMPLOYEE_DETAIL_SUCCESSFULLY,
    GET_EMPLOYEE_DETAIL_CLEAR, GET_EMPLOYEE_DETAIL_REQUEST, UPDATE_EMPLOYEE_DETAIL_REQUEST, ADD_EMPLOYEE_DETAIL_REQUEST
} from './actionTypes';
import { put } from 'redux-saga/effects';
import { baseUrl } from './config';
import requestMethod from '../helper/constant.js'
import axios from 'axios';

/***** EMPLOYEE ADD UPDATE *****/
export const addEmployeeInformationRequest = (employee) => {
    return {
        type: ADD_EMPLOYEE_DETAIL_REQUEST,
        employee
    };
};
export function* addEmployeeInformation(requestData) {
    try {
        const data = yield axios
            .post(`${baseUrl}/${requestMethod.Employees}`, requestData.employee)
            .then(response => response.data);
        yield put({ type: ADD_UPDATE_EMPLOYEE_DETAIL_SUCCESSFULLY, employeeData: data });
        yield put({ type: ADD_UPDATE_EMPLOYEE_DETAIL_CLEAR });
    } catch (err) {
        yield put({ type: ADD_UPDATE_EMPLOYEE_DETAIL_FAILED, error: err });
        yield put({ type: ADD_UPDATE_EMPLOYEE_DETAIL_CLEAR });
    }
}
export const updateEmployeeInformationRequest = (id, employee) => {
    return {
        type: UPDATE_EMPLOYEE_DETAIL_REQUEST,
        id, employee
    };
};
export function* updateEmployeeInformation(requestData) {
    try {
        const data = yield axios
            .put(`${baseUrl}/${requestMethod.Employees}/${requestData.id}`, requestData.employee)
            .then(response => response.data);
        yield put({ type: ADD_UPDATE_EMPLOYEE_DETAIL_SUCCESSFULLY, employeeData: data });
        yield put({ type: ADD_UPDATE_EMPLOYEE_DETAIL_CLEAR });
    } catch (err) {
        yield put({ type: ADD_UPDATE_EMPLOYEE_DETAIL_FAILED, error: err });
        yield put({ type: ADD_UPDATE_EMPLOYEE_DETAIL_CLEAR });
    }
}

/***** END - EMPLOYEE ADD UPDATE *****/

/*****  EMPLOYEE DETAIL *****/
export const getEmployeeDetailRequest = (employeeId) => {
    return {
        type: GET_EMPLOYEE_DETAIL_REQUEST,
        employeeId
    };
};
export function* getEmployeeDetail(employee) {
    try {
        const data = yield axios.get(`${baseUrl}/${requestMethod.Employees}/${employee.employeeId}`)
            .then(response => response.data);
        yield put({ type: GET_EMPLOYEE_DETAIL_SUCCESSFULLY, employeeData: data });
        yield put({ type: GET_EMPLOYEE_DETAIL_CLEAR });
    } catch (err) {
        yield put({ type: GET_EMPLOYEE_DETAIL_FAILED, error: err });
        yield put({ type: GET_EMPLOYEE_DETAIL_CLEAR });
    }
};
/*****  END - EMPLOYEE DETAIL *****/