import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, shallowEqual } from 'react-redux';
import { useSelector } from '../../redux/store';
import { getUser, resetUser, updateUser } from '../../redux/slices/userSlice';
import api from '../../utils/api';
import {
  Container,
  Heading,
  Grid,
  Input,
  Select,
  InputSubmit,
  Span,
} from './UserFormStyles';

export default function UserForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
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
    e.preventDefault();

    const hasEmptyFields = Object.values(user).some((value) => value === '');

    if (hasEmptyFields) {
      console.log('Please fill in all fields', hasEmptyFields);
      return;
    }

    if (id) {
      await api.put('/users/user', user);
      return;
    }

    await api.post('/users', user);
  };

  return (
    <Container>
      <Heading>{id ? 'Edit User' : 'Add User'}</Heading>
      <form onSubmit={handleSubmit}>
        <Grid>
          <Input
            type='text'
            name='name'
            placeholder='Name'
            value={name}
            onChange={onChange}
          />
          <Input
            type='text'
            name='surname'
            placeholder='Surname'
            value={surname}
            onChange={onChange}
          />
          <Input
            type='text'
            name='patronymic'
            placeholder='Patronymic'
            value={patronymic}
            onChange={onChange}
          />
          <Input
            type='email'
            name='email'
            placeholder='Email'
            value={email}
            onChange={onChange}
          />
          <Select
            name='role'
            placeholder='role'
            value={role}
            onChange={onChange}
          >
            <option value=''>Select the role</option>
            <option value='user'>User</option>
            <option value='admin'>Admin</option>
          </Select>
          {id && !isOpen ? (
            <Span onClick={() => setIsOpen(true)}>Change Password?</Span>
          ) : (
            <Input
              type='password'
              name='password'
              placeholder='Password'
              value={password}
              onChange={onChange}
            />
          )}
        </Grid>
        <InputSubmit type='submit' value={id ? 'Update User' : 'Add User'} />
      </form>
    </Container>
  );
}
