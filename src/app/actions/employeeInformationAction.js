import {
    ADD_UPDATE_EMPLOYEE_DETAIL_FAILED, ADD_UPDATE_EMPLOYEE_DETAIL_SUCCESSFULLY, ADD_UPDATE_EMPLOYEE_DETAIL_CLEAR,
    ADD_UPDATE_EMPLOYEE_DETAIL_BEGIN, GET_EMPLOYEE_DETAIL_FAILED, GET_EMPLOYEE_DETAIL_SUCCESSFULLY, GET_EMPLOYEE_DETAIL_CLEAR
} from './actionTypes';

import { baseUrl } from './config';
import requestMethod from '../helper/constant.js'
import axios from 'axios';

/***** EMPLOYEE ADD UPDATE *****/
export const addUpdateEmployeeBegin = () => {
    return {
        type: ADD_UPDATE_EMPLOYEE_DETAIL_BEGIN
    };
}
export const addUpdateEmployeeFailed = (error) => {
    return {
        type: ADD_UPDATE_EMPLOYEE_DETAIL_FAILED,
        error
    }
};
export const addUpdateEmployeeSuccessfully = (data) => {
    return {
        type: ADD_UPDATE_EMPLOYEE_DETAIL_SUCCESSFULLY,
        employeeData: data,
    };
};
export const addUpdateEmployeeClear = () => {
    return {
        type: ADD_UPDATE_EMPLOYEE_DETAIL_CLEAR
    };
}
export function addEmployeeInformationRequest(employee) {
    return dispatch => {
        dispatch(addUpdateEmployeeBegin());
        return axios
            .post(`${baseUrl}/${requestMethod.Employees}`, employee)
            .then(response => {
                dispatch(addUpdateEmployeeSuccessfully(response.data));
            }).then(() => {
                dispatch(addUpdateEmployeeClear());
            }).catch(err => {
                dispatch(addUpdateEmployeeFailed(err));
                dispatch(addUpdateEmployeeClear());
            });
    };
}
export function updateEmployeeInformationRequest(id, employee) {
    return dispatch => {
        dispatch(addUpdateEmployeeBegin());
        return axios
            .put(`${baseUrl}/${requestMethod.Employees}/${id}`, employee)
            .then(response => {
                dispatch(addUpdateEmployeeSuccessfully(response.data));
            }).then(() => {
                dispatch(addUpdateEmployeeClear());
            }).catch(err => {
                dispatch(addUpdateEmployeeFailed(err));
                dispatch(addUpdateEmployeeClear());
            });
    };
}
/***** END - EMPLOYEE ADD UPDATE *****/

/*****  EMPLOYEE DETAIL *****/
export const getEmployeeFailed = (error) => {
    return {
        type: GET_EMPLOYEE_DETAIL_FAILED,
        error
    }
};
export const getEmployeeSuccessfully = (data) => {
    return {
        type: GET_EMPLOYEE_DETAIL_SUCCESSFULLY,
        employeeData: data,
    };
};
export const getEmployeeClear = () => {
    return {
        type: GET_EMPLOYEE_DETAIL_CLEAR
    };
};
export function getEmployeeDetailRequest(employeeId) {
    return function (dispatch) {
        return axios.get(`${baseUrl}/${requestMethod.Employees}/${employeeId}`)
            .then(({ data }) => {
                dispatch(getEmployeeSuccessfully(data));
            }).then(() => {
                dispatch(getEmployeeClear());
            }).catch(err => {
                dispatch(getEmployeeFailed(err));
                dispatch(getEmployeeClear());
            });
    };
}
/*****  END - EMPLOYEE DETAIL *****/