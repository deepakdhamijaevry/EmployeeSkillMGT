import { LOGIN_REQUEST, GET_EMPLOYEES_REQUEST } from '../actions/actionTypes';
import { takeLatest, all } from 'redux-saga/effects';
import { login } from '../actions/loginAction'
import { getEmployees } from '../actions/employeeAction'

function* actionWatcher() {
  yield takeLatest(LOGIN_REQUEST, login)
  yield takeLatest(GET_EMPLOYEES_REQUEST, getEmployees)
}

export default function* rootSaga() {
  yield all([
    actionWatcher(),
  ]);
}
