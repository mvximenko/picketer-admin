import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, shallowEqual } from 'react-redux';
import { useSelector } from '../../redux/store';
import { getUser, resetUser } from '../../redux/slices/userSlice';
import {
  Container,
  Heading,
  Input,
  Select,
  Grid,
  InputSubmit,
} from './UserFormStyles';

export default function UserForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user, shallowEqual);
  const { name, surname, patronymic, email, role } = user;

  useEffect(() => {
    dispatch(getUser(id));

    return () => dispatch(resetUser());
  }, [id, dispatch]);

  return (
    <Container>
      {name && (
        <h1>
          {surname} {name} {patronymic} {email} {role}
        </h1>
      )}

      <Heading>Add User</Heading>
      <form>
        <Grid>
          <Input type='text' name='name' placeholder='Name' />
          <Input type='text' name='surname' placeholder='Surname' />
          <Input type='text' name='patronymic' placeholder='Patronymic' />
          <Input type='email' name='email' placeholder='Email' />
          <Select name='role' placeholder='role'>
            <option value='user'>User</option>
            <option value='admin'>Admin</option>
          </Select>
          <Input type='password' name='password' placeholder='Password' />
        </Grid>
        <InputSubmit type='submit' value='Add User' />
      </form>
    </Container>
  );
}
