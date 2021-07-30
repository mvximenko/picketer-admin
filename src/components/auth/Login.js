import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../redux/store';
import { login } from '../../redux/slices/authSlice';
import { Container, Heading, Form, Input, InputSubmit } from './LoginStyles';

export default function Login() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <Container>
      <Form onSubmit={(e) => onSubmit(e)}>
        <Heading>Sign In</Heading>
        <div>
          <Input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
          <Input
            type='password'
            placeholder='Password'
            name='password'
            minLength='6'
            value={password}
            onChange={(e) => onChange(e)}
          />
          <InputSubmit type='submit' value='Sign In' />
        </div>
      </Form>
    </Container>
  );
}
