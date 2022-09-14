import React from 'react';
import Form from '../styles/layout/Form';
import InputGroup from '../components/Inputs/InputGroup';
import Wrapper from '../styles/layout/Wrapper';
import Button from '../styles/components/Button';
import Alert from '../styles/components/Alert';
import { useAppContext } from '../context/context';
import { useNavigate } from 'react-router-dom';
import InputRoom from '../components/Inputs/InputRoom';

function Login() {
  const navigate = useNavigate();
  const { loginUser } = useAppContext();
  const [username, setUsername] = React.useState('');
  const [room, setRoom] = React.useState('general');
  const [isError, setIsError] = React.useState({
    error: false,
    type: 'danger',
    msg: 'Alert danger!',
  });

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (!username) {
      setIsError({
        error: true,
        type: 'danger',
        msg: 'Please enter your username.',
      });
      clearError();
      return;
    }

    // username must last then 25 characters long
    if (username.length > 25 || username.length < 2) {
      return setIsError({
        error: true,
        type: 'danger',
        msg: 'Username must be between 2 to 25 characters long.',
      });
    }

    loginUser(username, room);
    setIsError({
      error: true,
      type: 'success',
      msg: 'You are login successfully.',
    });
    clearError();
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  const clearError = (s = 2) => {
    setTimeout(() => {
      setIsError({ error: false, msg: '' });
    }, s * 1000);
  };
  return (
    <Wrapper className="center">
      <div className="container">
        <Form $padding="2rem">
          <h2>Login to start chatting</h2>
          <form action="" onSubmit={handleLoginSubmit}>
            <InputGroup
              type="text"
              name="username"
              labelText="username"
              onChange={(e) => setUsername(e.target.value)}
            />

            <InputRoom
              room={['general', 'javascript', 'python', 'C++']}
              name={'room'}
              labelText="Please select room:"
              currentValue={room}
              onChangeHandle={setRoom}
            />

            <Button primary>Login</Button>
          </form>
        </Form>
        {isError.error && <Alert $type={isError.type}>{isError.msg}</Alert>}
      </div>
    </Wrapper>
  );
}

export default Login;
