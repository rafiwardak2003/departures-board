import reducer from './departures-reducer';
import * as type from '../constants/action-types';

describe('Departures Reducers', () => {
    it('should return departures on success', () => {
        const departures = [{ destination: 'South Station'}];
        let initialState = { departures  };

        const action = {
            type: type.FETCH_DEPARTURES_SUCCESS,
            departures
        };

        const finalState = reducer(initialState, action);

        expect(finalState).toEqual(initialState);
    });

    it('should return an error message on error', () => {
        const error = 'A sample error';
        let initialState = { error };

        const action = {
            type: type.FETCH_DEPARTURES_ERROR,
            error
        };

        const finalState = reducer(initialState, action);

        expect(finalState).toEqual(initialState);
    });
});