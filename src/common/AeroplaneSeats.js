import React from 'react';
import './AeroplaneSeats.css';
import Axios from 'axios';
import { Link } from 'react-router-dom';

class AeroplaneSeats extends React.Component {
  state = {
    aeroplaneSeats: [],
    planeId: 0
  };
  componentDidMount = () => {
    let id = this.props.match.params.flight_id;
    this.setState({
      ...this.state,
      planeId: id
    });
    console.log('id =', id);
    let url = 'http://localhost:3001/flightSeats?flightId=' + id;
    Axios.get(url).then((res) => {
      console.log(res.data);
      this.setState({ ...this.state, aeroplaneSeats: res.data });
    });
  };

  render() {
    const aeroplanedata = this.state.aeroplaneSeats ? (
      this.state.aeroplaneSeats.map((seat) => {
        return (
          <div className='box' key={seat.seatnumber}>
            {seat.occupied ? (
              <span style={{ background: '#66ff66' }}>{seat.seatnumber}</span>
            ) : (
              <span style={{ background: '#ff4d4d' }}>
                <Link
                  style={{ textDecoration: 'none' }}
                  to={'/map/' + seat.id + '/' + seat.seatnumber}
                >
                  {seat.seatnumber}
                </Link>
              </span>
            )}
          </div>
        );
      })
    ) : (
      <div>Loading...</div>
    );
    return <div className='container seats'>{aeroplanedata}</div>;
  }
}

export default AeroplaneSeats;
