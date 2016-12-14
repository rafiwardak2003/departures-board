import React, { Component, PropTypes } from 'react';
import moment from 'moment';

import './departures-board.css';

export default class DeparturesBoardComponent extends Component {
    constructor(props) {
        super(props);

        // Fetch the departures data
        this.props.fetchDepartures();

        this.state = { currentDateTimeStamp: moment() };
    }

    tick = () => {
        this.setState({ currentDateTimeStamp: moment() });
    };

    componentDidMount() {
        // Tick every 30 seconds for time and date
        this.currentTimeInterval = setInterval(this.tick, 30000);
    }

    componentWillUnmount() {
        clearInterval(this.currentTimeInterval);
    }

    renderCurrentDate() {
        return (
            <div className="col-md-3 current-date">
                <h4>
                    <span>{this.state.currentDateTimeStamp.format('dddd')}</span>
                    <span>{ this.state.currentDateTimeStamp.format('MM-DD-YYYY')}</span>
                </h4>
            </div>
        );
    }

    renderCurrentTime() {
        return (
            <div className="col-md-3 current-time">
                <h4>
                    <span>CURRENT TIME</span>
                    <span>{this.state.currentDateTimeStamp.format('LT')}</span>
                </h4>
            </div>
        );
    }

    renderDeparturesHeaders() {
        const { departuresData } = this.props;

        if(departuresData.length === 0) {
            return null;
        }

        const [, Origin, Trip, Destination, ,, Track, Status ] = departuresData[0];

        return (
          <div className="row headers">
              <div className="col-md-2"><h5>{ Origin }</h5></div>
              <div className="col-md-1"><h5>{ Trip }</h5></div>
              <div className="col-md-3"><h5>{ Destination }</h5></div>
              <div className="col-md-1"><h5>Time</h5></div>
              <div className="col-md-1"><h5>Delay</h5></div>
              <div className="col-md-1"><h5>{ Track }</h5></div>
              <div className="col-md-2"><h5>{ Status }</h5></div>
          </div>
        );
    }

    renderLatenessCircles(latness) {
        if (latness) {
            return (<div className="lateness-circle"></div>);
        } else {
            return (<div className="lateness-circle late"></div>);
        }
    }

    renderDepartures() {
        const { departuresData } = this.props;

        if(departuresData.length === 0) {
            return null;
        }

        const formatedDepartures = this.props.departuresData
            .filter((element, index) => index === 0 ? false : true)
            .sort((a, b) => {
                return b[6] - a[6];
            }).map((departure, index) => {
                const [, Origin, Trip, Destination, ScheduledTime, Lateness, Track, Status ] = departure;

                return (
                    <div className="row departure" key={index.toString()}>
                        <div className="col-md-2">{ Origin }</div>
                        <div className="col-md-1">{ Trip }</div>
                        <div className="col-md-3">{ Destination }</div>
                        <div className="col-md-1">{ moment(ScheduledTime, 'x').format('LT') }</div>
                        <div className="col-md-1">{ `${moment.duration(Lateness).minutes()} min` }</div>
                        <div className="col-md-1">{ Track ? Track : 'TBD' }</div>
                        <div className="col-md-2">{ Status }</div>
                        <div className="col-md-1">{ this.renderLatenessCircles(Lateness) }</div>
                    </div>
                );
            });

        return (
          <div className="departures">
              { this.renderDeparturesHeaders() }
              { formatedDepartures }
          </div>
        );
    }

    render() {
        return (
            <div className="departures-board">
                <div className="row departures-header-row">
                    { this.renderCurrentDate() }

                    <div className="col-md-6 board-header">
                        <h3>MBTA DEPARTURES INFORMATION</h3>
                    </div>

                    { this.renderCurrentTime() }
                </div>

                { this.renderDepartures() }
            </div>
        );
    }
}

DeparturesBoardComponent.propTypes = {
    fetchDepartures: PropTypes.func,
    departuresData: PropTypes.array
};