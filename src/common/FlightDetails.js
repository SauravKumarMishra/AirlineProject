import React from 'react';
import { connect } from 'react-redux';
import * as passengersAction from '../redux/actions/flightActions';
import AirIndia from '../assets/AirIndia.png';
import { Accordion, Card, Button, Form, Col } from 'react-bootstrap';
import { Snackbar } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';

class FlightDetails extends React.Component {
  state = {
    flight: null,
    snackbaropen: false,
    snackbarmsg: ''
  };

  snackbarClose = (event) => {
    this.setState({ ...this.state, snackbaropen: false });
  };

  componentDidMount = () => {
    console.log('Here in component did mount');
    this.props.getFlights();
  };
  componentWillReceiveProps = (newProps) => {
    console.log('New Props data', newProps.Flights);
    let flightData = newProps.Flights.filter(
      (flight) => flight.id === this.props.flightId
    );
    console.log('the flight Data = ', flightData);
    this.setState({ flight: flightData[0] });
  };
  handleClick = (event, arrName) => {
    console.log('The State is =', this.state);
    let arr = [...this.state.flight.addons[arrName]];
    console.log('the arr is = ', arr);
    arr.splice(event.target.value, 1);
    this.setState((state) => ({
      flight: {
        ...state.flight,
        addons: { ...state.flight.addons, [arrName]: arr }
      }
    }));
  };
  handleSubmit = (event, targetInput, arrName) => {
    event.preventDefault();
    console.log('The data is =', event.target[targetInput].value);
    let arr = [...this.state.flight.addons[arrName]];
    arr.push(event.target[targetInput].value);
    this.setState((state) => ({
      flight: {
        ...state.flight,
        addons: { ...state.flight.addons, [arrName]: arr }
      }
    }));
    event.target[targetInput].value = '';
  };
  updateDB = () => {
    this.props.updateFlight(this.state.flight);
    this.setState({
      ...this.state,
      snackbaropen: true,
      snackbarmsg: 'Successfully updated in database.'
    });
  };
  render() {
    const FlightData =
      this.state.flight != null ? (
        <div className='col-12 mt-3' key={this.state.flight.id}>
          <div className='card'>
            <div className='card-horizontal'>
              <div className='card-body'>
                <h3 style={{ textAlign: 'center' }} className='card-title'>
                  {this.state.flight.flightName}
                </h3>
                <img
                  style={{ position: 'absolute' }}
                  src={AirIndia}
                  variant='top'
                  alt='Air India'
                />
                <span style={{ textAlign: 'center' }} className='card-text'>
                  <p>
                    <b>Flight Number:</b> {this.state.flight.id}
                  </p>
                  <p>
                    <b>Flight Name:</b> {this.state.flight.flightName}
                  </p>
                  <p>
                    <b>Aircraft Type:</b> {this.state.flight.aircraftType}
                  </p>
                  <p>
                    <b>Source:</b> {this.state.flight.src}
                  </p>
                  <p>
                    <b>Destination:</b> {this.state.flight.dest}
                  </p>
                  <p>
                    <b>Duration:</b> {this.state.flight.duration}
                  </p>
                  <p>
                    <b>Meal:</b>{' '}
                    {this.state.flight.addons.meal.map((data) => data + ' ')}
                  </p>
                  <p>
                    <b>Ancillary:</b>{' '}
                    {this.state.flight.addons.inShopEntertainment.map(
                      (data) => data + ' '
                    )}
                  </p>
                  <p>
                    <b>WIFI:</b>{' '}
                    {this.state.flight.addons.wifi === true ? (
                      <span>Available</span>
                    ) : (
                      <span>Not Available</span>
                    )}
                  </p>
                </span>
              </div>
            </div>
          </div>
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
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
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
          Flight Details
        </h3>
        {FlightData}
        <h3 style={{ textAlign: 'center' }}>Update flight Details:</h3>
        <Accordion>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant='link' eventKey='0'>
                Update Flight Meal:
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey='0'>
              <Card.Body>
                {this.state.flight != null ? (
                  <>
                    {this.state.flight.addons.meal.map((data, index) => (
                      <span key={index}>
                        {data}
                        <button
                          value={index}
                          onClick={(event) => this.handleClick(event, 'meal')}
                        >
                          -
                        </button>
                        <br />
                      </span>
                    ))}
                    <Form
                      onSubmit={(event) =>
                        this.handleSubmit(event, 'newMeal', 'meal')
                      }
                    >
                      <Form.Row>
                        <Form.Group as={Col} controlId='newMeal'>
                          <Form.Control
                            type='text'
                            name='newMeal'
                            required
                            placeholder='Add new meal'
                          />
                        </Form.Group>

                        <Button variant='link' type='submit'>
                          Add this meal.
                        </Button>
                      </Form.Row>
                    </Form>
                    <Button variant='primary' onClick={this.updateDB}>
                      Update
                    </Button>
                  </>
                ) : (
                  <></>
                )}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant='link' eventKey='1'>
                Update Flight Ancillary:
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey='1'>
              <Card.Body>
                {this.state.flight != null ? (
                  <>
                    {this.state.flight.addons.inShopEntertainment.map(
                      (data, index) => (
                        <span key={index}>
                          {data}
                          <button
                            value={index}
                            onClick={(event) =>
                              this.handleClick(event, 'inShopEntertainment')
                            }
                          >
                            -
                          </button>
                          <br />
                        </span>
                      )
                    )}
                    <Form
                      onSubmit={(event) =>
                        this.handleSubmit(
                          event,
                          'newAncillary',
                          'inShopEntertainment'
                        )
                      }
                    >
                      <Form.Row>
                        <Form.Group as={Col} controlId='newAncillary'>
                          <Form.Control
                            type='text'
                            name='newAncillary'
                            required
                            placeholder='Add new meal'
                          />
                        </Form.Group>

                        <Button variant='link' type='submit'>
                          Add
                        </Button>
                      </Form.Row>
                    </Form>
                    <Button variant='primary' onClick={this.updateDB}>
                      Update
                    </Button>
                  </>
                ) : (
                  <></>
                )}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  let flightId = ownProps.match.params.flight_id;
  return {
    Flights: state.staffReducer.allFlights,
    flightId: flightId
  };
};

const mapDisptchToProps = (dispatch) => {
  return {
    getFlights: () => dispatch(passengersAction.getFlights()),
    updateFlight: (data) => dispatch(passengersAction.updateFlight(data))
  };
};
export default connect(mapStateToProps, mapDisptchToProps)(FlightDetails);
