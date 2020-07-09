import React, { useState, useEffect } from 'react';
import GoogleLogin from 'react-google-login';
import { useDispatch } from 'react-redux';
import { Modal, Row, Col, Button } from 'react-bootstrap';

const Login = (props) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const responseGoogle = (response) => {
    console.log(`Google's response`, response);
    setName(response.profileObj.name);
    setEmail(response.profileObj.email);
  };
  useEffect(() => {
    if (name && email) {
      localStorage.setItem('userStatus', true);
      localStorage.setItem('userName', name);
      dispatch({ type: 'LOGIN', name });
    }
  }, [name, email]);

  const failureResponseGoogle = (response) => {
    console.log(response);
  };
  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>Sign In </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='container'>
          <Row>
            <Col>
              <div style={{ textAlign: 'center' }}>
                <h2>--Sign in with your Google Account--</h2>
                <GoogleLogin
                  clientId='734076133412-iaj8bp3vsvqj5243mn9g84mpa4dq2339.apps.googleusercontent.com'
                  onSuccess={responseGoogle}
                  onFailure={failureResponseGoogle}
                  cookiePolicy={'single_host_origin'}
                />
              </div>
            </Col>
          </Row>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Login;
