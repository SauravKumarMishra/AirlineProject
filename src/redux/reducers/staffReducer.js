import {
  GET_PASSENGERS,
  CHECK_IN,
  ADD_PASSENGER,
  GET_FLIGHTS,
  LOGIN,
  LOG_OUT,
  UPDATE_FLIGHT
} from '../actions/actionTypes';

let passengersData = {
  allPassengers: [],
  authenticated: false
};

export default function staffReducer(state = passengersData, action) {
  switch (action.type) {
    case GET_PASSENGERS:
      return {
        ...state,
        allPassengers: action.passengers
      };
    case LOGIN:
      console.log('You are authenticated. Enjoy.');
      return {
        ...state,
        authenticated: true,
        name: action.name
      };
    case LOG_OUT:
      console.log('You will properly be logged out soon.');
      return {
        ...state,
        authenticated: false
      };
    case CHECK_IN:
      let count = Number(action.data.passengerId) - 1;
      console.log('the action and the count', action, count);
      console.log('State hai = ', state.allPassengers[count]);

      return [
        ...this.state.allPassengers.slice(0, count),
        {
          ...this.state.allPassengers[count],
          checkedInStatus: true,
          seatNo: action.data.seatNo
        },
        ...this.state.allPassengers.slice(count + 1)
      ];
    case ADD_PASSENGER:
      console.log('Action hai = ', action.flights);
      return {
        ...state,
        allPassengers: [...state.allPassengers, action.passenger]
      };
    case GET_FLIGHTS:
      console.log('Flights action', action.flights);
      return { ...state, allFlights: action.flights };
    case UPDATE_FLIGHT:
      return state;
    default:
      return state;
  }
}
