import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actionCreators  from './actions';
import DeparturesBoardComponent from './components/departures-board';

class App extends Component {
    render() {
        return (
            <div className="container">
                <h1 className="page-header">
                    Departures Board
                </h1>

                <DeparturesBoardComponent
                    fetchDepartures={ this.props.fetchDepartures }
                    departuresData={ this.props.departures }/>
            </div>
        );
    }
}

App.propTypes = {
    fetchDepartures: PropTypes.func,
    departures: PropTypes.array
};

function mapStateToProps(state) {
    return { ...state.departuresBoard }
}

export default connect(mapStateToProps, actionCreators)(App)
