import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock';

import * as actions from '../actions';
import * as actionTypes from '../constants/action-types';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('Departures Actions', () => {
    afterEach(() => {
        fetchMock.restore();
    });

    it('should return the json data and call the success action on success', () => {
        const departures = [{ destination: 'South Station' }];
        fetchMock.get('/departures', departures);

        const expectedActions = [
            {
                type: actionTypes.FETCH_DEPARTURES_SUCCESS,
                departures
            }
        ];

        const store = mockStore({ departures: [] });

        return store.dispatch(actions.fetchDepartures())
            .then(() => { // return of async actions
                expect(store.getActions()).toEqual(expectedActions)
            });
    });

    it('should call a failure action on error', () => {
        const departures = [{ destination: 'South Station' }];
        fetchMock.mock('/departures', 503);

        const expectedActions = [
            {
                type: actionTypes.FETCH_DEPARTURES_ERROR,
                error: 'An error occured. Please contact the admin.'
            }
        ];

        const store = mockStore({ departures: [] });

        return store.dispatch(actions.fetchDepartures())
            .then(() => { // return of async actions
                expect(store.getActions()).toEqual(expectedActions)
            });
    });
});