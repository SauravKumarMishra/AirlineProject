import React from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as passengersAction from '../redux/actions/flightActions';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

class AddAPassenger extends React.Component {
  state = {
    snackbaropen: false,
    snackbarmsg: ''
  };
  makeid = (length, characters) => {
    let result = '';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let numbers = '0123456789';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let pnr = this.makeid(2, characters) + this.makeid(3, numbers);
    let passenger = {
      name: event.target.PassengerName.value,
      email: event.target.PassengerEmail.value,
      amount: event.target.PassengerAmount.value,
      address: event.target.PassengerAddress.value,
      Passport: event.target.PassengerPassport.value,
      flightId: this.props.flightid,
      DOB: event.target.PassengerDOB.value,
      category: event.target.PassengerCategory.value,
      checkedInStatus: false,
      seatNo: null,
      pnr: pnr,
      ancillaryServices: {
        meal:
          event.target.PassengerMeal.value === null
            ? null
            : event.target.PassengerMeal.value,
        wifi: event.target.PassengerWifi.checked,
        InFlightEntertainment: event.target.PassengerEntertainment.checked
      }
    };
    console.log(passenger);
    this.props.addPassenger(passenger);
    this.setState({
      ...this.state,
      snackbaropen: true,
      snackbarmsg: 'Successfully added a passenger.'
    });
    this.props.onHide();
  };

  snackbarClose = (event) => {
    this.setState({ ...this.state, snackbaropen: false });
  };

  render() {
    return (
      <>
        <Modal
          {...this.props}
          size='lg'
          aria-labelledby='contained-modal-title-vcenter'
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id='contained-modal-title-vcenter'>
              Add a Passenger
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='container'>
              <Row>
                <Col>
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId='PassengerName'>
                      <Form.Label>Passenger Name:</Form.Label>
                      <Form.Control
                        type='text'
                        name='PassengerName'
                        required
                        placeholder='Passenger Name'
                      />
                    </Form.Group>
                    <Form.Group controlId='PassengerEmail'>
                      <Form.Label>Passenger Email ID:</Form.Label>
                      <Form.Control
                        type='email'
                        name='PassengerEmail'
                        required
                        placeholder='Passenger Email'
                      />
                    </Form.Group>
                    <Form.Group controlId='PassengerAmount'>
                      <Form.Label>Passenger Amount:</Form.Label>
                      <Form.Control
                        type='text'
                        name='PassengerAmount'
                        required
                        placeholder='Passenger Amount'
                      />
                    </Form.Group>
                    <Form.Group controlId='PassengerAddress'>
                      <Form.Label>Passenger Address:</Form.Label>
                      <Form.Control
                        type='text'
                        name='PassengerAddress'
                        required
                        placeholder='Passenger Address'
                      />
                    </Form.Group>
                    <Form.Group controlId='PassengerPassport'>
                      <Form.Label>Passenger Passport:</Form.Label>
                      <Form.Control
                        type='text'
                        name='PassengerPassport'
                        required
                        placeholder='Passenger Passport'
                      />
                    </Form.Group>
                    <Form.Group controlId='PassengerDOB'>
                      <Form.Label>Passenger DOB:</Form.Label>
                      <Form.Control
                        type='text'
                        name='PassengerDOB'
                        required
                        placeholder='Passenger DOB'
                      />
                    </Form.Group>
                    <Form.Group controlId='PassengerWifi'>
                      <Form.Check type='checkbox' label='In-flight WIFI' />
                    </Form.Group>
                    <Form.Group controlId='PassengerEntertainment'>
                      <Form.Check
                        type='checkbox'
                        label='In-flight Entertainment'
                      />
                    </Form.Group>
                    <Form.Row>
                      <Form.Group as={Col} controlId='PassengerMeal'>
                        <Form.Label>Meal:</Form.Label>
                        <Form.Control as='select' defaultValue='No'>
                          <option>No</option>
                          <option>Veg</option>
                          <option>Non Veg</option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group as={Col} controlId='PassengerCategory'>
                        <Form.Label>Category:</Form.Label>
                        <Form.Control as='select' defaultValue='normal'>
                          <option>normal</option>
                          <option>wheelchair</option>
                          <option>infant</option>
                        </Form.Control>
                      </Form.Group>
                    </Form.Row>

                    <Button variant='primary' type='submit'>
                      Submit
                    </Button>
                  </Form>
                </Col>
              </Row>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='primary' onClick={this.props.onHide}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
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
      </>
    );
  }
}

const mapDisptchToProps = (dispatch) => {
  return {
    addPassenger: (passenger) =>
      dispatch(passengersAction.addPassenger(passenger))
  };
};

export default connect(null, mapDisptchToProps)(AddAPassenger);
