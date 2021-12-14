import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, shallowEqual } from 'react-redux';
import { useSelector } from '../../redux/store';
import { resetUser, updateUser } from '../../redux/slices/userSlice';
import api from '../../utils/api';
import {
  OuterContainer,
  InnerContainer,
  Form,
  Heading,
  Grid,
  Wrapper,
  Input,
  Select,
  Buttons,
  Button,
} from './styles';

export default function AddUser() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user, shallowEqual);
  const { name, surname, patronymic, email, role, password } = user;

  useEffect(() => {
    return () => dispatch(resetUser());
  }, [dispatch]);

  const onChange = (e) => {
    dispatch(updateUser({ name: e.target.name, value: e.target.value }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await api.post('/users', user);
      toast.success('User created');
      dispatch(resetUser());
    } catch (err) {
      toast.error(err.toString());
    }
  };

  return (
    <OuterContainer>
      <InnerContainer>
        <Form onSubmit={handleSubmit}>
          <Heading>Add User</Heading>

          <Grid>
            <Wrapper>
              <label htmlFor='name'>Name</label>
              <Input
                type='text'
                name='name'
                id='name'
                placeholder='Name'
                value={name}
                onChange={onChange}
                required
              />
            </Wrapper>

            <Wrapper>
              <label htmlFor='surname'>Surname</label>
              <Input
                type='text'
                name='surname'
                id='surname'
                placeholder='Surname'
                value={surname}
                onChange={onChange}
                required
              />
            </Wrapper>

            <Wrapper>
              <label htmlFor='patronymic'>Patronymic</label>
              <Input
                type='text'
                name='patronymic'
                id='patronymic'
                placeholder='Patronymic'
                value={patronymic}
                onChange={onChange}
                required
              />
            </Wrapper>

            <Wrapper>
              <label htmlFor='email'>Email</label>
              <Input
                type='email'
                name='email'
                id='email'
                placeholder='Email'
                value={email}
                onChange={onChange}
                required
              />
            </Wrapper>

            <Wrapper>
              <label htmlFor='role'>Role</label>
              <Select
                name='role'
                id='role'
                placeholder='role'
                value={role}
                onChange={onChange}
                required
              >
                <option value=''>Select the role</option>
                <option value='user'>User</option>
                <option value='admin'>Admin</option>
              </Select>
            </Wrapper>

            <Wrapper>
              <label htmlFor='password'>Password</label>
              <Input
                type='password'
                name='password'
                id='password'
                placeholder='Password'
                autoComplete='off'
                minLength='6'
                value={password}
                onChange={onChange}
                required
              />
            </Wrapper>

            <Buttons>
              <Button type='submit' variant='blue'>
                Add User
              </Button>
            </Buttons>
          </Grid>
        </Form>
      </InnerContainer>
    </OuterContainer>
  );
}
