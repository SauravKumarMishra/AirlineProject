import React from 'react';
import CardLogic from './CardLogic';
import jsonData from '../db.json';

const AirlineCards = () => {
  let flights = jsonData.flights;

  return (
    <div className='container'>
      <div className='row'>
        {flights.map((val) => (
          <CardLogic key={val.id} values={val} />
        ))}
      </div>
    </div>
  );
};

export default AirlineCards;
