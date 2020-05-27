import login from './loginReducer';
import employeeReducer from './employeeReducer';
import employeeInformationReducer from './employeeInformationReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	login,
	employeeReducer,
	employeeInformationReducer
});
export default rootReducer;