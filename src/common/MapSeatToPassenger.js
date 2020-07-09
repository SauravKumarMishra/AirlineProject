import React from 'react';
import { connect } from 'react-redux';
import * as passengersAction from '../redux/actions/flightActions';
import './Passenger.css';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import { Button } from 'react-bootstrap';

class MapSeatToPassenger extends React.Component {
  state = {
    availablePassengers: [],
    snackbaropen: false,
    snackbarmsg: '',
    loader: null
  };

  snackbarClose = (event) => {
    this.setState({ ...this.state, snackbaropen: false });
  };

  componentDidMount = () => {
    let passengersList = this.props.passengers.filter(
      (passenger) => passenger.checkedInStatus === false
    );
    let count = passengersList.length ? 1 : null;
    this.setState({
      ...this.state,
      availablePassengers: passengersList,
      loader: count
    });
  };

  bookSeat = (event) => {
    console.log('The id is', event.target.value);
    let data = {
      passengerId: event.target.value,
      seatId: this.props.seatId,
      seatNo: this.props.seatNo
    };
    this.props.checkIN(data);
    this.setState({
      ...this.state,
      snackbaropen: true,
      snackbarmsg: 'Successfully Mapped seat to the passenger.'
    });
    setTimeout(() => {
      this.props.history.push('/');
    }, 2000);
  };

  render() {
    console.log('In render the state is = ', this.state);
    console.log('The seat number is :', this.props.seatId);
    const passengers = this.state.availablePassengers;
    const passengersList = passengers.length ? (
      passengers.map((passenger) => {
        return (
          <div className='col-12 mt-3' key={passenger.pnr}>
            <div className='card'>
              <div className='card-horizontal'>
                <div className='card-body'>
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
                  <p className='card-text'>PNR : {passenger.pnr}</p>
                  <Button
                    varient='primary'
                    value={passenger.id}
                    onClick={this.bookSeat}
                  >
                    Book seat
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      })
    ) : this.state.loader === null ? (
      <div
        style={{
          textAlign: 'center',
          paddingTop: '150px',
          paddingBottom: '150px'
        }}
      >
        <h2>No passengers left.</h2>
      </div>
    ) : (
      <div
        style={{
          textAlign: 'center',
          paddingTop: '150px',
          paddingBottom: '150px'
        }}
      >
        <h2>Content is loading...</h2>
      </div>
    );

    return (
      <div className='container'>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={this.state.snackbaropen}
          autoHideDuration={2000}
          onClose={this.snackbarClose}
          message={<span id='message-id'>{this.state.snackbarmsg}</span>}
          action={[
            <IconButton
              key='close'
              aria-label='Close'
              color='inherit'
              onClick={this.snackbarClose}
            >
              x
            </IconButton>
          ]}
        />
        <h3 style={{ textAlign: 'center', paddingTop: '10px' }}>
          Passenger's list
          {passengersList}
        </h3>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let seatNo = ownProps.match.params.seat_no;
  let seatId = ownProps.match.params.seat_id;
  return {
    passengers: state.staffReducer.allPassengers,
    seatId: seatId,
    seatNo: seatNo
  };
};

const mapDisptchToProps = (dispatch) => {
  return {
    checkIN: (data) => dispatch(passengersAction.checkIn(data))
  };
};

export default connect(mapStateToProps, mapDisptchToProps)(MapSeatToPassenger);
