import React from 'react';
import ReactDOM from 'react-dom';
import DeparturesBoardComponent from './departures-board';

describe("DeparturesBoardComponent", () => {
    const fetchDeparturesSpy = jest.fn();
    const mockedDepartures = [
        ['TimeStamp','Origin','Trip','Destination','ScheduledTime','Lateness','Track,Status'],
        [1481650692,"North Station","411","Wachusett",1481652000,0,,"On Time"]
    ];

    let component;
    beforeEach(() => {
        const div = document.createElement('div');
        component = ReactDOM.render(<DeparturesBoardComponent
            departuresData={mockedDepartures}
            fetchDepartures={fetchDeparturesSpy}
        />, div);
    });

    it('called fetchDepartures to fetch data', () => {
        expect(fetchDeparturesSpy.mock.calls.length).toBe(1);
    });

    it('should set the departures as a property', () => {
        expect(component.props.departuresData).toBe(mockedDepartures);
    });
});
