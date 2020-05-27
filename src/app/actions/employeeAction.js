import { GET_EMPLOYEES_FAILED, GET_EMPLOYEES_SUCCESSFULLY, GET_EMPLOYEES_CLEAR,EMPLOYEE_SEARCH   } from './actionTypes';
import { baseUrl } from './config';
import requestMethod from '../helper/constant.js'
import axios from 'axios';
axios.defaults.headers.get['Pragma'] = 'no-cache';
/****  GET ALL EMPLOYEES ****/
export const getEmployeesFailed = (error) => {
    return {
        type: GET_EMPLOYEES_FAILED,
        error
    }
};
export const getEmployeesSuccessfully = (data) => {
    return {
        type: GET_EMPLOYEES_SUCCESSFULLY,
        employeeData: data,
    };
};
export const getEmployeesClear = () => {
    return {
        type: GET_EMPLOYEES_CLEAR
    };
};
export function getEmployeesRequest(pageNo, PageLimit, isAsc, column) {
    return function (dispatch) {
        return axios.get(`${baseUrl}/${requestMethod.Employees}/${pageNo}/${PageLimit}/${isAsc}/${column}`)
            .then(({ data }) => {
                dispatch(getEmployeesSuccessfully(data));
            }).catch(err => {
                dispatch(getEmployeesFailed(err));
                dispatch(getEmployeesClear());
            });
    };
}
/****  END - GET ALL EMPLOYEES ****/

/****  EMPLOYEE SEARCH ****/
export const searchEmployeeRequest = (text) => {
    return {
        type: EMPLOYEE_SEARCH,
        text
    };
};
/****  END - EMPLOYEE SEARCH ****/