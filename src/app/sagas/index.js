import { LOGIN_REQUEST } from '../actions/actionTypes';
import { takeLatest, all } from 'redux-saga/effects';
import { login } from '../actions/loginAction'

function* actionWatcher() {
  yield takeLatest(LOGIN_REQUEST, login)
}

export default function* rootSaga() {
  yield all([
    actionWatcher(),
  ]);
}
