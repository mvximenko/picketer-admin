import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, shallowEqual } from 'react-redux';
import { useSelector } from '../../redux/store';
import { getUser, resetUser, updateUser } from '../../redux/slices/userSlice';
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
} from './UserFormStyles';

export default function UserForm() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user, shallowEqual);
  const { name, surname, patronymic, email, role, password } = user;

  useEffect(() => {
    if (id) dispatch(getUser(id));
    return () => dispatch(resetUser());
  }, [id, dispatch]);

  const onChange = (e) => {
    dispatch(updateUser({ name: e.target.name, value: e.target.value }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const hasEmptyFields = Object.values(user).some((value) => value === '');

      if (hasEmptyFields) {
        toast.error('Please fill in all fields');
      } else if (id) {
        await api.put('/users/user', user);
        toast.success('User updated');
      } else {
        await api.post('/users', user);
        toast.success('User created');
        dispatch(resetUser());
      }
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

  return (
    <OuterContainer>
      <InnerContainer>
        <Form onSubmit={handleSubmit}>
          <Heading>{id ? 'Edit User' : 'Add User'}</Heading>

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
              />
            </Wrapper>

            <Wrapper>
              <label htmlFor='email'>Email</label>
              <Input
                type='text'
                name='email'
                id='email'
                placeholder='Email'
                value={email}
                onChange={onChange}
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
                value={password ? password : ''}
                onChange={onChange}
              />
            </Wrapper>

            <Buttons>
              {id && (
                <Button
                  type='button'
                  variant='red'
                  onClick={() => archiveUser(id)}
                >
                  Archive User
                </Button>
              )}

              <Button type='submit' variant='blue'>
                {id ? 'Edit User' : 'Add User'}
              </Button>
            </Buttons>
          </Grid>
        </Form>
      </InnerContainer>
    </OuterContainer>
  );
}
