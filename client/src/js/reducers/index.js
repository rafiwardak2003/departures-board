import departuresReducer from './departures-reducer';

function DeparturesBoardReducers(state = {}, action) {
    let newState = state;

    newState = departuresReducer(newState, action);
    return newState;
}

export default  {
    departuresBoard: DeparturesBoardReducers
}