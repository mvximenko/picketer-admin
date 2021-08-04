import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Moment from 'react-moment';
import { useDispatch, shallowEqual } from 'react-redux';
import { useSelector } from '../../redux/store';
import { getUsers } from '../../redux/slices/userSlice';
import {
  Container,
  Top,
  Heading,
  Input,
  Link,
  Table,
  Row,
  Cell,
} from './UsersStyles';

export default function Users() {
  const history = useHistory();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users, shallowEqual);
  const [value, setValue] = useState('');
  const [archive, setArchive] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (archive) {
        dispatch(getUsers('/archive'));
      } else if (value) {
        dispatch(getUsers(`?name=${value}`));
      } else {
        dispatch(getUsers());
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [archive, value, dispatch]);

  const handleRowClick = (id) => {
    history.push(`/user/${id}`);
  };

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

        <Link to='/create-user'>Create New User</Link>
      </Top>

      <Table>
        <Row header>
          <Cell>Name</Cell>
          <Cell>Email</Cell>
          <Cell>Date</Cell>
          <Cell>Role</Cell>
        </Row>
        {users.map((user) => (
          <Row key={user.email} onClick={() => handleRowClick(user._id)}>
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
