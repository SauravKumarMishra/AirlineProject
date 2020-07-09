import React from 'react';
import { Card } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import AddAPassenger from '../admin/AddAPassenger';
import { Snackbar } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';

class NavigationPage extends React.Component {
  state = {
    user: localStorage.getItem('user'),
    modalShow: false,
    flightId: this.props.match.params.flight_id,
    userStatus: localStorage.getItem('userStatus'),
    userName: localStorage.getItem('userName'),
    snackbaropen: false,
    snackbarmsg: ''
  };

  modalClose = () => {
    this.setState({
      ...this.state,
      modalShow: false
    });
  };

  handleClick = (event) => {
    this.state.userStatus || this.props.userState
      ? event.target.value === 'addAPassenger'
        ? this.setState({ ...this.state, modalShow: true })
        : this.props.history.push(
            event.target.value + this.props.match.params.flight_id
          )
      : this.setState({
          ...this.state,
          snackbaropen: true,
          snackbarmsg: 'Kindly Log In first.'
        });
  };

  snackbarClose = (event) => {
    this.setState({ ...this.state, snackbaropen: false });
  };
  render() {
    return (
      <div className='container'>
        <Card>
          <Card.Header as='h5'>Choose an Action</Card.Header>
          <Card.Body>
            <Card.Title>View flight details</Card.Title>
            <Card.Text>View flight details:</Card.Text>
            <Button
              variant='link'
              style={{
                textDecoration: 'none',
                paddingLeft: '0px',
                paddingRight: '0px'
              }}
              value='/flight/'
              onClick={this.handleClick}
            >
              View Flight Details
            </Button>
          </Card.Body>
          <Card.Body>
            <Card.Title>View Passenger's list</Card.Title>
            <Card.Text>
              View all the passengers in the plane and their details.
            </Card.Text>
            <Button
              variant='link'
              style={{
                textDecoration: 'none',
                paddingLeft: '0px',
                paddingRight: '0px'
              }}
              value='/list/'
              onClick={this.handleClick}
            >
              View
            </Button>
          </Card.Body>
          <Card.Body>
            <Card.Title>Map seat to a passenger</Card.Title>
            <Card.Text>Map seat to a passenger.</Card.Text>
            <Button
              variant='link'
              style={{
                textDecoration: 'none',
                paddingLeft: '0px',
                paddingRight: '0px'
              }}
              value='/seats/'
              onClick={this.handleClick}
            >
              View
            </Button>
          </Card.Body>
          {this.state.user === 'admin' ? (
            <Card.Body>
              <Card.Title>Add a Passenger</Card.Title>
              <Card.Text>Add a new passenger in selected flight.</Card.Text>
              <ButtonToolbar>
                <Button
                  variant='link'
                  style={{
                    textDecoration: 'none',
                    paddingLeft: '0px',
                    paddingRight: '0px'
                  }}
                  value='addAPassenger'
                  onClick={this.handleClick}
                >
                  Add a passenger
                </Button>
                <AddAPassenger
                  show={this.state.modalShow}
                  flightid={this.state.flightId}
                  onHide={this.modalClose}
                />
              </ButtonToolbar>
            </Card.Body>
          ) : (
            <></>
          )}
        </Card>
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userState: state.staffReducer.authenticated
  };
};
export default connect(mapStateToProps, null)(NavigationPage);
