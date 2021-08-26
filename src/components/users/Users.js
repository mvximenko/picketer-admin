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
  StyledLink,
  Table,
  Row,
  Cell,
  LinkEdit,
} from './UsersStyles';

export default function Users() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users, shallowEqual);
  const [value, setValue] = useState('');
  const [archive, setArchive] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (value) dispatch(getUsers(`?name=${value}`));
    }, 500);

    if (value) {
    } else if (archive) {
      dispatch(getUsers('/archive'));
    } else {
      dispatch(getUsers());
    }

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

        <StyledLink to='/create-user'>Create New User</StyledLink>
      </Top>

      <Table>
        <Row header>
          <Cell width={45}>Name</Cell>
          <Cell width={25}>Email</Cell>
          <Cell width={15}>Date</Cell>
          <Cell width={15}>Role</Cell>
        </Row>
        {users.map((user) => (
          <Row key={user.email}>
            <Cell width={45} data-title='Name'>
              {user.surname} {user.name} {user.patronymic}
            </Cell>
            <Cell width={25} data-title='Email'>
              {user.email}
            </Cell>
            <Cell width={15} data-title='Date'>
              <Moment format='DD/MM/YY'>{user.date}</Moment>
            </Cell>
            <Cell width={15} data-title='Role'>
              {user.role}

              {!archive && (
                <LinkEdit to={`/user/${user._id}`}>{' Edit'}</LinkEdit>
              )}
            </Cell>
          </Row>
        ))}
      </Table>
    </Container>
  );
}
