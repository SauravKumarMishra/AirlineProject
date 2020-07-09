import React from 'react';
import { Card, Button } from 'react-bootstrap';
import AirIndia from '../assets/AirIndia.png';
import { useHistory } from 'react-router';

const CardLogic = (props) => {
  const history = useHistory();
  const handleClick = (event) => {
    let data = event.target.value;
    localStorage.setItem('user', data);
    let url =
      data === 'staff'
        ? '/staff/' + props.values.id
        : '/admin/' + props.values.id;
    history.push({
      pathname: url
    });
  };
  return (
    <Card
      className='col-xs-12 col-sm-12 col-md-4 col-lg-4'
      style={{ width: '18rem' }}
    >
      <Card.Img variant='top' src={AirIndia} />
      <Card.Body>
        <Card.Title style={{ textAlign: 'center', color: '#0066ff' }}>
          {props.values.flightName} {props.values.id}
        </Card.Title>
        <Card.Text>
          <span>Source</span>
          <span style={{ float: 'right' }}>{props.values.src}</span>
          <br />
          <span>Destination</span>
          <span style={{ float: 'right' }}>{props.values.dest}</span>
          <br />
          <span>Duration</span>
          <span style={{ float: 'right' }}>{props.values.duration}</span>
        </Card.Text>
        <Button variant='primary' value='staff' onClick={handleClick}>
          Staff
        </Button>
        <span> </span>
        <Button variant='danger' value='admin' onClick={handleClick}>
          Admin
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CardLogic;
