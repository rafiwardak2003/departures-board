import * as types from '../constants/action-types';

export function fetchDepartures() {
    return dispatch =>
        fetch('/departures', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(response => response.json()).then(data => {
            dispatch(fetchDeparturesSuccess(data))
        }).catch(() => {
           dispatch(fetchDeparturesError())
        });
}

function fetchDeparturesSuccess(departures) {
    return {
        type: types.FETCH_DEPARTURES_SUCCESS,
        departures
    };
}

function fetchDeparturesError() {
    return {
        type: types.FETCH_DEPARTURES_ERROR,
        error: 'An error occured. Please contact the admin.'
    };
}