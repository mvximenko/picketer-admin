import { useEffect } from 'react';
import Moment from 'react-moment';
import { useDispatch, shallowEqual } from 'react-redux';
import { useSelector } from '../../redux/store';
import { getUsers } from '../../redux/slices/userSlice';
import { Container, Table, Row, Cell } from './UsersStyles';

export default function Users() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users, shallowEqual);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <Container>
      <h1>Active</h1>
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
