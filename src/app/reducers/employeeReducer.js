import { GET_EMPLOYEES_SUCCESSFULLY, GET_EMPLOYEES_FAILED, GET_EMPLOYEES_CLEAR, EMPLOYEE_SEARCH } from '../actions/actionTypes';
const initialState = { isSuccess: null, employee: { pageNumber: 1, pageSize: 10, results: [], totalNumberOfPages: 0, totalNumberOfRecords: 0 } };
export default function getEmployeeList(state = initialState, action) {
	switch (action.type) {
		case GET_EMPLOYEES_SUCCESSFULLY:
			return {
				...state,
				isSuccess: true, employee: action.employeeData
			};
		case GET_EMPLOYEES_FAILED:
			return {
				...state,
				isSuccess: false, error: action.error
			};
		case GET_EMPLOYEES_CLEAR:
			return {
				...state,
				isSuccess: null
			};
		case EMPLOYEE_SEARCH:
			return {
				...state,
				isSuccess: null,
				employee: {
					results: state.employee.results.filter(x => (x.firstName.toLowerCase().
						indexOf(action.text.toLowerCase()) > -1) || (x.lastName.toLowerCase().
							indexOf(action.text.toLowerCase()) > -1) || (x.email.toLowerCase().
								indexOf(action.text.toLowerCase()) > -1)),
					totalNumberOfRecords: 0
				}
			};
		default:
			return state;
	}
}