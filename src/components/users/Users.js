import { useState, useEffect } from 'react';
import Moment from 'react-moment';
import { useDispatch, shallowEqual } from 'react-redux';
import { useSelector } from '../../redux/store';
import { getUsers } from '../../redux/slices/userSlice';
import {
  Container,
  Top,
  Heading,
  Input,
  Table,
  Row,
  Cell,
} from './UsersStyles';

export default function Users() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users, shallowEqual);
  const [value, setValue] = useState('');
  const [archive, setArchive] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (archive) {
        dispatch(getUsers('/archive'));
        return;
      }

      if (value) {
        dispatch(getUsers(`?name=${value}`));
        return;
      }

      dispatch(getUsers());
    }, 500);

    return () => clearTimeout(timeout);
  }, [archive, value, dispatch]);

  return (
    <Container>
      <Top>
        <Heading onClick={() => setArchive(!archive)}>
          {archive ? 'Archive' : 'Active'}
        </Heading>

        {!archive && (
          <Input
            type='text'
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder='Search for...'
          />
        )}
      </Top>

      <Table>
        <Row header>
          <Cell>Name</Cell>
          <Cell>Email</Cell>
          <Cell>Date</Cell>
          <Cell>Role</Cell>
        </Row>
        {users.map((user) => (
          <Row key={user.email}>
            <Cell data-title='Name'>
              {user.surname} {user.name} {user.patronymic}
            </Cell>
            <Cell data-title='Email'>{user.email}</Cell>
            <Cell data-title='Date'>
              <Moment format='DD/MM/YY'>{user.date}</Moment>
            </Cell>
            <Cell data-title='Role'>{user.role}</Cell>
          </Row>
        ))}
      </Table>
    </Container>
  );
}
