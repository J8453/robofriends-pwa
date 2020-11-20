import {
	CHANGE_SEARCHFIELD,
	REQUEST_ROBOTS_PENDING,
	REQUEST_ROBOTS_SUCCESS,
	REQUEST_ROBOTS_FAILED
} from './constants';
import * as actions from './actions';

import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';

const mockStore = configureMockStore([thunkMiddleware]);

// reference: Best practices for unit testing with a React/Redux approach
// https://willowtreeapps.com/ideas/best-practices-for-unit-testing-with-a-react-redux-approach
// allows us to easily return reponses and/or success/fail for a thunk that calls a service
const mockServiceCreator = (body, succeeds = true) => () =>
  new Promise((resolve, reject) => {
    setTimeout(() => (succeeds ? resolve(body) : reject(body)), 10);
	});
	

it('should create an action to search robots', () => {
	const text = 'wooo';
	const expectedAction = {
		type: CHANGE_SEARCHFIELD,
		payload: text
	};
	expect(actions.setSearchField(text)).toEqual(expectedAction);
})

it('handles requesting robots API', () => {
	const store = mockStore();
	store.dispatch(actions.requestRobots());
	const action = store.getActions();
	const expectedAction = {
		type: REQUEST_ROBOTS_PENDING,
	};
	expect(action[0]).toEqual(expectedAction);
})

it('dispatch REQUEST_ROBOTS_SUCCESS action while API succeeded', () => {
	const store = mockStore();
	
	const mockData = {
		data: 'testdata',
	};

	return store.dispatch(actions.requestRobots(mockServiceCreator(mockData)))
		.then(() => {
			const actualActions = store.getActions();

			// const expectedPendingAction = {
			// 	type: REQUEST_ROBOTS_PENDING,
			// };
			const expectedSuccessAction = {
				type: REQUEST_ROBOTS_SUCCESS,
				payload: mockData,
			};

			// expect(actualActions).toContainEqual(expectedPendingAction);
			expect(actualActions).toContainEqual(expectedSuccessAction);
		});
})

it('dispatch REQUEST_ROBOTS_FAILED action while API failed', () => {
	const store = mockStore();
	
	const mockError = new Error('QQ!');

	return store.dispatch(actions.requestRobots(mockServiceCreator(mockError, false)))
		.then(() => {
			const actualActions = store.getActions();
			
			const expectedFailedAction = {
				type: REQUEST_ROBOTS_FAILED,
				payload: mockError,
			};
			
			expect(actualActions).toContainEqual(expectedFailedAction);
		});
})
