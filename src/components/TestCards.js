import React from 'react';
import { Card, Button } from 'react-bootstrap';

const TestCards = (props) => {
  return (
    <Card
      className='col-xs-12 col-sm-12 col-md-4 col-lg-4'
      style={{ width: '18rem' }}
    >
      <Card.Img
        variant='top'
        src='https://www.w3schools.com/html/pic_trulli.jpg'
      />
      <Card.Body>
        <Card.Title>{props.data}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant='primary'>Staff</Button>
        <span> </span>
        <Button variant='primary'>Admin</Button>
      </Card.Body>
    </Card>
  );
};

export default TestCards;
