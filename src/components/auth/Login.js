import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../redux/store';
import { login } from '../../redux/slices/authSlice';
import {
  OuterContainer,
  InnerContainer,
  TextContainer,
  Heading,
  Paragraph,
  Form,
  Input,
  Label,
  Button,
} from './LoginStyles';

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
    <OuterContainer>
      <InnerContainer>
        <TextContainer>
          <Heading>Welcome Back!</Heading>
          <Paragraph>Please sign into your account</Paragraph>
        </TextContainer>

        <Form onSubmit={(e) => onSubmit(e)}>
          <div>
            <Label>Email</Label>
            <Input
              type='email'
              placeholder='Enter your email'
              name='email'
              value={email}
              required
              onChange={(e) => onChange(e)}
            />
          </div>

          <div>
            <Label>Password</Label>
            <Input
              type='password'
              placeholder='Enter your password'
              name='password'
              value={password}
              required
              onChange={(e) => onChange(e)}
            />
          </div>

          <Button type='submit'>Sign in</Button>
        </Form>
      </InnerContainer>
    </OuterContainer>
  );
}
