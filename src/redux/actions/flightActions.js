import {
  GET_PASSENGERS,
  CHECK_IN,
  ADD_PASSENGER,
  GET_FLIGHTS,
  UPDATE_FLIGHT
} from './actionTypes';
import Axios from 'axios';

export const getPassengers = (passengers) => {
  console.log(passengers);
  return { type: GET_PASSENGERS, passengers: passengers };
};

export const updateFlight = (flight) => {
  return (dispatch, getState) => {
    let url = `http://localhost:3001/flights/${flight.id}`;
    console.log('First url is :', url);
    Axios.patch(url, flight)
      .then((res) => {
        console.log('The first call ', res);
        dispatch({ type: UPDATE_FLIGHT, flight });
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

export const checkIn = (data) => {
  console.log('Data in flightAction = ', data);
  let passengerId = data.passengerId;
  let seatID = data.seatId;
  let seatNo = data.seatNo;
  return (dispatch, getState) => {
    //Make Async Call
    let url = `http://localhost:3001/passengers/${passengerId}`;
    console.log('First url is :', url);
    Axios.patch(url, {
      checkedInStatus: true,
      seatNo: seatNo
    })
      .then((res) => {
        console.log('The first call ', res);
        let url = `http://localhost:3001/flightSeats/${seatID}`;
        console.log('Second url is :', url);
        Axios.patch(url, {
          occupied: true
        })
          .then((res) => {
            console.log('The second call ', res);
            dispatch({ type: CHECK_IN, data });
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

export const addPassenger = (passenger) => {
  let url = `http://localhost:3001/passengers`;
  return (dispatch, getState) => {
    Axios.post(url, passenger)
      .then((res) => {
        console.log(
          'Passenger Data in action as post call is successful =',
          passenger
        );
        dispatch({ type: ADD_PASSENGER, passenger });
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

export const getFlights = () => {
  console.log('Here in flight Action');
  return (dispatch, getState) => {
    Axios.get('http://localhost:3001/flights').then((res) => {
      dispatch({ type: GET_FLIGHTS, flights: res.data });
    });
  };
};
