import { useState, useEffect } from 'react';
import { useDispatch, shallowEqual } from 'react-redux';
import { useSelector } from '../../redux/store';
import { getUsers } from '../../redux/slices/userSlice';
import Row from './Row';
import { ReactComponent as HomeIcon } from '../../assets/search.svg';
import { ReactComponent as ArrowIcon } from '../../assets/arrow.svg';
import {
  Container,
  Heading,
  Top,
  SelectContainer,
  Select,
  ArrowIconWrapper,
  Search,
  CreateLink,
  HomeIconWrapper,
  Input,
  OuterContainer,
  InnerContainer,
  Table,
  TH,
} from './UsersStyles';

export default function Users() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users, shallowEqual);
  const [value, setValue] = useState('');
  const [archive, setArchive] = useState(false);

  useEffect(() => {
    if (archive) {
      dispatch(getUsers('/archive'));
    } else {
      dispatch(getUsers());
    }
  }, [archive, dispatch]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (value) dispatch(getUsers(`/?name=${value}`));
    }, 500);

    return () => clearTimeout(timeout);
  }, [value, dispatch]);

  const handleChange = (e) => {
    e.preventDefault();

    if (e.target.value === 'Active') {
      setArchive(false);
    } else {
      setArchive(true);
    }
    setValue('');
  };

  return (
    <Container>
      <Heading>Users</Heading>

      <Top>
        <SelectContainer>
          <Select onChange={handleChange}>
            <option>Active</option>
            <option>Archive</option>
          </Select>
          <ArrowIconWrapper>
            <ArrowIcon />
          </ArrowIconWrapper>
        </SelectContainer>

        {!archive && (
          <Search>
            <HomeIconWrapper>
              <HomeIcon />
            </HomeIconWrapper>
            <Input
              type='text'
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder='Search'
            />
          </Search>
        )}

        <CreateLink to='/create-user'>Create New User</CreateLink>
      </Top>

      <OuterContainer>
        <InnerContainer>
          <Table>
            <thead>
              <tr>
                <TH>User</TH>
                <TH>Email</TH>
                <TH>Date</TH>
                <TH>Role</TH>
                <TH>Actions</TH>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <Row user={user} archive={archive} />
              ))}
            </tbody>
          </Table>
        </InnerContainer>
      </OuterContainer>
    </Container>
  );
}
