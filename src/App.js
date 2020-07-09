import React from 'react';
import './App.css';
import FlightHeader from './common/FlightHeader';
import FlightFooter from './common/FlightFooter';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import AirlineCards from './components/AirlineCards';
import 'bootstrap/dist/css/bootstrap.min.css';
import AllPassengersList from './common/AllPassengersList';
import PassengersDetails from './common/PassengersDetails';
import AeroplaneSeats from './common/AeroplaneSeats';
import MapSeatToPassenger from './common/MapSeatToPassenger';
import NavigationPage from './common/NavigationPage';
import FlightDetails from './common/FlightDetails';
import Login from './common/Login';
import { connect } from 'react-redux';

function App(props) {
  return (
    <BrowserRouter>
      <div className='App'>
        <FlightHeader />
        <Switch>
          <Route exact path='/' component={AirlineCards} />
          <Route path='/login' component={Login} />
          <Route path='/staff/:flight_id' component={NavigationPage} />
          <Route path='/admin/:flight_id' component={NavigationPage} />
          {props.userState ? (
            <Route path='/list/:flight_id' component={AllPassengersList} />
          ) : null}
          {props.userState ? (
            <Route path='/seats/:flight_id' component={AeroplaneSeats} />
          ) : null}
          {props.userState ? (
            <Route path='/flight/:flight_id' component={FlightDetails} />
          ) : null}
          {props.userState ? (
            <Route
              path='/map/:seat_id/:seat_no'
              component={MapSeatToPassenger}
            />
          ) : null}
          {props.userState ? (
            <Route path='/:passenger_id' component={PassengersDetails} />
          ) : null}
          <Redirect to='/' />
        </Switch>

        <FlightFooter />
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    userState: state.staffReducer.authenticated
  };
};
export default connect(mapStateToProps, null)(App);
