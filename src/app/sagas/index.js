import { LOGIN_REQUEST, GET_EMPLOYEES_REQUEST, GET_EMPLOYEE_DETAIL_REQUEST } from '../actions/actionTypes';
import { takeLatest, all } from 'redux-saga/effects';
import { login } from '../actions/loginAction'
import { getEmployees } from '../actions/employeeAction'
import { getEmployeeDetail } from '../actions/employeeInformationAction'

function* actionWatcher() {
  yield takeLatest(LOGIN_REQUEST, login)
  yield takeLatest(GET_EMPLOYEES_REQUEST, getEmployees)
  yield takeLatest(GET_EMPLOYEE_DETAIL_REQUEST, getEmployeeDetail)
}

export default function* rootSaga() {
  yield all([
    actionWatcher(),
  ]);
}
