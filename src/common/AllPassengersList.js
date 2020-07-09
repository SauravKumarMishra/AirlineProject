import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as passengersAction from '../redux/actions/flightActions';
import './Passenger.css';
import WIFI from '../assets/WIFI.png';
import Veg from '../assets/vegetarian-food-symbol.png';
import NonVeg from '../assets/non-vegetarian-food-symbol.png';
import Entertainment from '../assets/Entertainment.png';

class AllPassengersList extends React.Component {
  state = {
    passengers: [],
    status: null,
    user: localStorage.getItem('user'),
    modalShow: false
  };
  componentDidMount() {
    //this.props.dispatch(passengersAction.getPassengers([1, 2]));
    console.log('the dynamic flight id', this.props.flightId);
    axios
      .get('http://localhost:3001/passengers?flightId=' + this.props.flightId)
      .then((res) => {
        this.setState({
          ...this.state,
          passengers: res.data
        });
        this.props.addPassengers(res.data);
      });
  }

  modalClose = () => {
    this.setState({
      ...this.state,
      modalShow: false
    });
  };

  handleDrop = (event) => {
    if (event.target.value === 'ckIn') {
      let ckInPassengers = this.props.passengers.filter(
        (passenger) => passenger.checkedInStatus === true
      );
      ckInPassengers.length
        ? this.setState({
            ...this.state,
            passengers: ckInPassengers,
            status: 0
          })
        : this.setState({
            ...this.state,
            passengers: ckInPassengers,
            status: 1
          });
    }
    if (event.target.value === 'notCkIn') {
      let notCkInPassengers = this.props.passengers.filter(
        (passenger) => passenger.checkedInStatus === false
      );
      notCkInPassengers.length
        ? this.setState({
            ...this.state,
            passengers: notCkInPassengers,
            status: 0
          })
        : this.setState({
            ...this.state,
            passengers: notCkInPassengers,
            status: 1
          });
    }
    if (event.target.value === 'whCh') {
      let wheelPassengers = this.props.passengers.filter(
        (passenger) => passenger.category === 'wheelchair'
      );
      wheelPassengers.length
        ? this.setState({
            ...this.state,
            passengers: wheelPassengers,
            status: 0
          })
        : this.setState({
            ...this.state,
            passengers: wheelPassengers,
            status: 1
          });
    }
    if (event.target.value === 'inf') {
      let infants = this.props.passengers.filter(
        (passenger) => passenger.category === 'infant'
      );
      infants.length
        ? this.setState({ ...this.state, passengers: infants, status: 0 })
        : this.setState({ ...this.state, passengers: infants, status: 1 });
    }
    if (event.target.value === 'dob') {
      let noDOB = this.props.passengers.filter(
        (passenger) => passenger.DOB === null
      );
      noDOB.length
        ? this.setState({ ...this.state, passengers: noDOB, status: 0 })
        : this.setState({ ...this.state, passengers: noDOB, status: 1 });
    }
    if (event.target.value === 'pass') {
      let noPass = this.props.passengers.filter(
        (passenger) => passenger.Passport === null
      );
      noPass.length
        ? this.setState({ ...this.state, passengers: noPass, status: 0 })
        : this.setState({ ...this.state, passengers: noPass, status: 1 });
    }
    if (event.target.value === 'add') {
      let noAdd = this.props.passengers.filter(
        (passenger) => passenger.address === null
      );
      noAdd.length
        ? this.setState({ ...this.state, passengers: noAdd, status: 0 })
        : this.setState({ ...this.state, passengers: noAdd, status: 1 });
    }
  };

  render() {
    const passengers = this.state.passengers;
    const passengersList = passengers.length ? (
      passengers.map((passenger) => {
        return (
          <div className='col-12 mt-3' key={passenger.pnr}>
            <div className='card'>
              <div className='card-horizontal'>
                <div className='card-body'>
                  <Link to={'/' + passenger.pnr}>
                    <h4 className='card-title'>
                      {passenger.name} {`  `}
                      {passenger.category === 'wheelchair' ? (
                        <span role='img' aria-label='wheelchair'>
                          ♿
                        </span>
                      ) : (
                        <></>
                      )}
                    </h4>
                  </Link>
                  <p className='card-text'>Seat No : {passenger.seatNo}</p>
                  {passenger.ancillaryServices ? (
                    <span>
                      {passenger.ancillaryServices.wifi ? (
                        <img src={WIFI} alt='WIFI' />
                      ) : (
                        <span></span>
                      )}
                      {passenger.ancillaryServices.meal === 'No' ? (
                        <span></span>
                      ) : (
                        <img
                          src={
                            passenger.ancillaryServices.meal === 'Veg'
                              ? Veg
                              : NonVeg
                          }
                          alt='FOOD'
                        />
                      )}
                      {passenger.ancillaryServices.InFlightEntertainment ? (
                        <img src={Entertainment} alt='WIFI' />
                      ) : (
                        <span></span>
                      )}
                    </span>
                  ) : (
                    <span></span>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })
    ) : this.state.status === 0 ? (
      <div
        style={{
          textAlign: 'center',
          paddingTop: '150px',
          paddingBottom: '150px'
        }}
      >
        <h2>Content is loading...</h2>
      </div>
    ) : (
      <div
        style={{
          textAlign: 'center',
          paddingTop: '150px',
          paddingBottom: '150px'
        }}
      >
        <h2>No passengers found.</h2>
      </div>
    );

    return (
      <div className='container'>
        <h3 style={{ textAlign: 'center', paddingTop: '10px' }}>
          Passenger's list
        </h3>
        <div className='form-group'>
          <label>Filter Passengers:</label>
          <select
            className='form-control'
            onChange={this.handleDrop}
            defaultValue='select'
          >
            <option value='select'>--select to filter--</option>
            <option value='ckIn'>Checked In</option>
            <option value='notCkIn'>Not Checked In</option>
            <option value='whCh'>Wheel Chair</option>
            <option value='inf'>Infants</option>
            {this.state.user === 'admin' ? (
              <>
                <option value='pass'>Missing Passport</option>
                <option value='add'>Missing Address</option>
                <option value='dob'>Missing DOB</option>
              </>
            ) : (
              <></>
            )}
          </select>
        </div>
        {passengersList}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let flightId = ownProps.match.params.flight_id;
  return {
    passengers: state.staffReducer.allPassengers,
    flightId
  };
};

const mapDisptchToProps = (dispatch) => {
  return {
    addPassengers: (data) => dispatch(passengersAction.getPassengers(data))
  };
};

export default connect(mapStateToProps, mapDisptchToProps)(AllPassengersList);
