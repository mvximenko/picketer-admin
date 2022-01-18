import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, shallowEqual } from 'react-redux';
import { useSelector } from '../../redux/store';
import { getUsers } from '../../redux/slices/userSlice';
import useMediaQuery from '../../hooks/useMediaQuery';
import Post from './Post';
import Row from './Row';
import { ReactComponent as SearchIcon } from '../../assets/search.svg';
import { ReactComponent as ArrowIcon } from '../../assets/arrow.svg';
import {
  Container,
  Top,
  Heading,
  SearchPanel,
  SelectContainer,
  Select,
  ArrowIconWrapper,
  Search,
  CreateLink,
  SearchIconWrapper,
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
  const matches = useMediaQuery('(min-width: 600px)');

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (value) dispatch(getUsers(`/?name=${value}`));
    }, 500);

    if (value) {
    } else if (archive) {
      dispatch(getUsers('/archive'));
    } else {
      dispatch(getUsers());
    }

    return () => clearTimeout(timeout);
  }, [archive, value, dispatch]);

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
      <Top>
        <Heading>Users</Heading>
        <CreateLink to='/create-user'>Create User</CreateLink>
      </Top>

      <SearchPanel>
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
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <Input
              type='text'
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder='Search'
            />
          </Search>
        )}
      </SearchPanel>

      <>
        {matches ? (
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
                    <Row user={user} archive={archive} key={user._id} />
                  ))}
                </tbody>
              </Table>
            </InnerContainer>
          </OuterContainer>
        ) : (
          <ul>
            {users.map((user) => (
              <>
                {!archive ? (
                  <Link to={`/user/${user._id}`}>
                    <Post user={user} key={user._id} />
                  </Link>
                ) : (
                  <Post user={user} key={user._id} />
                )}
              </>
            ))}
          </ul>
        )}
      </>
    </Container>
  );
}
