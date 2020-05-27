import {
	ADD_UPDATE_EMPLOYEE_DETAIL_FAILED, ADD_UPDATE_EMPLOYEE_DETAIL_SUCCESSFULLY, ADD_UPDATE_EMPLOYEE_DETAIL_CLEAR,
	GET_EMPLOYEE_DETAIL_SUCCESSFULLY, GET_EMPLOYEE_DETAIL_FAILED, GET_EMPLOYEE_DETAIL_CLEAR
} from '../actions/actionTypes';

const initialState = { isSuccess: null, employee: null, error: null, isFetching: null };
export default function employeeInformation(state = initialState, action) {
	switch (action.type) {
		case ADD_UPDATE_EMPLOYEE_DETAIL_SUCCESSFULLY:
			return {
				...state,
				isSuccess: true, employee: action.employeeData
			};
		case ADD_UPDATE_EMPLOYEE_DETAIL_FAILED:
			return {
				...state,
				isSuccess: false, error: action.error, employee: null
			};
		case ADD_UPDATE_EMPLOYEE_DETAIL_CLEAR:
			return {
				...state,
				isSuccess: null, isFetching: null, error: null, employee: null
			};
		case GET_EMPLOYEE_DETAIL_SUCCESSFULLY:
			return {
				...state,
				isSuccess: true, isFetching: true, employee: action.employeeData
			};
		case GET_EMPLOYEE_DETAIL_FAILED:
			return {
				...state,
				isFetching: true, isSuccess: false, employee: null
			};
		case GET_EMPLOYEE_DETAIL_CLEAR:
			return {
				...state,
				isFetching: null, isSuccess: null, employee: null
			};
		default:
			return state;
	}
}