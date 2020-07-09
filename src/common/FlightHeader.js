import React, { useEffect, useState } from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, ButtonToolbar } from 'react-bootstrap';
import Login from './Login';
import { useHistory } from 'react-router';

const FlightHeader = () => {
  const history = useHistory();
  const [localUserStatus, setLocalUserStatus] = useState('');
  const [localUserName, setLocalUserName] = useState('');
  const [modalShow, setModalShow] = useState(false);

  const userData = useSelector((state) => [
    state.staffReducer.authenticated,
    state.staffReducer.name
  ]);

  const modalClose = () => {
    setModalShow(false);
  };

  console.log(userData);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('First time load hota hai');
    setLocalUserStatus(localStorage.getItem('userStatus'));
    setLocalUserName(localStorage.getItem('userName'));
    if (localStorage.getItem('userName')) {
      console.log('Yes local user name is present.');
      dispatch({ type: 'LOGIN', name: localStorage.getItem('userName') });
    }
  }, []);

  const handleClick = () => {
    localStorage.removeItem('userStatus');
    localStorage.removeItem('userName');
    setModalShow(false);
    dispatch({ type: 'LOG_OUT' });
    history.push({
      pathname: '/'
    });
  };

  return (
    <div className='header'>
      <div className='inner_header'>
        <div className='logo_container'>
          <h1>
            <Link to='/'>
              <span>Flights</span> Inc.
            </Link>
          </h1>
        </div>
        <ul className='navigation'>
          {userData[0] ? (
            <span>
              <li className='welcometext'>Welcome, {userData[1]} |</li>
              <Button
                variant='link'
                style={{
                  textDecoration: 'none',
                  paddingTop: '0px',
                  color: 'white'
                }}
                onClick={handleClick}
              >
                Log Out
              </Button>
            </span>
          ) : (
            <ButtonToolbar>
              <Button
                style={{ textDecoration: 'none' }}
                variant='link'
                onClick={() => setModalShow(true)}
              >
                Log In
              </Button>
              <Login show={modalShow} onHide={modalClose} />
            </ButtonToolbar>
          )}
        </ul>
      </div>
    </div>
  );
};

export default FlightHeader;
