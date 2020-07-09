import React from 'react';
import Axios from 'axios';
import checkedinImg from '../assets/CheckedIn.png';
import NotCheckedIn from '../assets/NotCheckedIn.png';
import WIFI from '../assets/WIFI.png';
import Veg from '../assets/vegetarian-food-symbol.png';
import NonVeg from '../assets/non-vegetarian-food-symbol.png';
import Entertainment from '../assets/Entertainment.png';

class PassengersDetails extends React.Component {
  state = {
    passenger: null
  };
  componentDidMount = () => {
    let id = this.props.match.params.passenger_id;
    console.log('id', id);
    let url = 'http://localhost:3001/passengers?pnr=' + id;
    Axios.get(url).then((res) => {
      console.log('res.data', res.data[0]);
      this.setState({ passenger: res.data[0] });
    });
  };
  render() {
    //console.log('the state', this.state.passenger);
    const passengerData = this.state.passenger ? (
      <div className='col-12 mt-3'>
        <div className='card'>
          <div className='card-horizontal'>
            <div className='card-body'>
              <h4 className='card-title'>
                {this.state.passenger.name} {`  `}
                {this.state.passenger.category === 'wheelchair' ? (
                  <span role='img' aria-label='wheelchair'>
                    ♿
                  </span>
                ) : (
                  <span></span>
                )}
              </h4>
              <span className='card-text'>
                <p>Seat No : {this.state.passenger.seatNo}</p>
                <p>PNR : {this.state.passenger.pnr}</p>
                <p>Flight Number : {this.state.passenger.flightId}</p>
                <p>Email Id : {this.state.passenger.email}</p>
                <p>
                  Check In Status :{' '}
                  {
                    <img
                      src={
                        this.state.passenger.checkedInStatus === true
                          ? checkedinImg
                          : NotCheckedIn
                      }
                      alt='check in status'
                    />
                  }
                </p>
              </span>
              {this.state.passenger.ancillaryServices ? (
                <span>
                  <h5>Ancillary Services Opted:</h5>
                  {this.state.passenger.ancillaryServices.wifi ? (
                    <img src={WIFI} alt='WIFI' />
                  ) : (
                    <span></span>
                  )}
                  {this.state.passenger.ancillaryServices.meal === 'No' ? (
                    <span></span>
                  ) : (
                    <img
                      src={
                        this.state.passenger.ancillaryServices.meal === 'Veg'
                          ? Veg
                          : NonVeg
                      }
                      alt='FOOD'
                    />
                  )}
                  {this.state.passenger.ancillaryServices
                    .InFlightEntertainment ? (
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
    ) : (
      <div className='center'>Loading Details...</div>
    );

    return (
      <div className='container'>
        <h3 style={{ textAlign: 'center', paddingTop: '10px' }}>
          Passenger's Details
        </h3>
        {passengerData}
      </div>
    );
  }
}

export default PassengersDetails;
