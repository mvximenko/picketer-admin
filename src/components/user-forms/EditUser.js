import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, shallowEqual } from 'react-redux';
import { useSelector } from '../../redux/store';
import { getUser, resetUser, updateUser } from '../../redux/slices/userSlice';
import Spinner from '../spinner/Spinner';
import api from '../../utils/api';
import {
  OuterContainer,
  InnerContainer,
  Form,
  Heading,
  Grid,
  Wrapper,
  Input,
  Span,
  Select,
  Buttons,
  Button,
} from './styles';

export default function EditUser() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { user, error } = useSelector((state) => state.user, shallowEqual);
  const { _id, name, surname, patronymic, email, role, password } = user;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getUser(id));
    return () => dispatch(resetUser());
  }, [id, dispatch]);

  const onChange = (e) => {
    dispatch(updateUser({ name: e.target.name, value: e.target.value }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await api.put('/users/user', user);
      toast.success('User updated');
    } catch (err) {
      toast.error(err.toString());
    }
  };

  const archiveUser = async (id) => {
    try {
      await api.put(`/users/archive/${id}`);
      toast.success('User archived');
      history.push(`/users`);
    } catch (err) {
      toast.error(err.toString());
    }
  };

  if (!error && !_id) return <Spinner />;
  if (error) return <h1>Not Found</h1>;

  return (
    <OuterContainer>
      <InnerContainer>
        <Form onSubmit={handleSubmit}>
          <Heading>Edit User</Heading>

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

              <Span onClick={() => setOpen(!open)}>
                {open ? 'Close' : 'Change'}
              </Span>

              {open && (
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
              )}
            </Wrapper>

            <Buttons>
              <Button
                type='button'
                variant='red'
                onClick={() => archiveUser(id)}
              >
                Archive User
              </Button>

              <Button type='submit' variant='blue'>
                Edit User
              </Button>
            </Buttons>
          </Grid>
        </Form>
      </InnerContainer>
    </OuterContainer>
  );
}
