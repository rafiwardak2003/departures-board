import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'

import departureBoardReducers from './js/reducers';

import App from './js/app';
import './css/bootstrap.min.css';

// Load our combined reducers - the reason the store is created here is you may want
// to use this app in some other system and the data fetch might not be the same, so
// you can inject actions and data
const combinedReducers = combineReducers(departureBoardReducers);
const store = createStore(
    combinedReducers, {
        departuresBoard: {
            departures: [],
            fetchDepartures: () => { alert("getDepartures from default store") }

        }
    },
    applyMiddleware(thunk)
);

ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>,
    document.getElementById('container')
);
