import * as types from '../constants/action-types';

export default function(state, action) {
    switch (action.type) {
        case types.FETCH_DEPARTURES_SUCCESS:
            return Object.assign({}, state, { departures: action.departures });
        case types.FETCH_DEPARTURES_ERROR:
            return Object.assign({}, state, { error: action.error });
        default:
            return state;
    }
};