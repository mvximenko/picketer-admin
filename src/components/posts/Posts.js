import { useState, useEffect } from 'react';
import { useDispatch, shallowEqual } from 'react-redux';
import { useSelector } from '../../redux/store';
import { getPosts } from '../../redux/slices/postSlice';
import Row from './Row';
import { ReactComponent as SearchIcon } from '../../assets/search.svg';
import { ReactComponent as ArrowIcon } from '../../assets/arrow.svg';
import {
  Container,
  Heading,
  Top,
  SelectContainer,
  Select,
  ArrowIconWrapper,
  Search,
  Date,
  CreateLink,
  HomeIconWrapper,
  Input,
  OuterContainer,
  InnerContainer,
  Table,
  TH,
} from './PostsStyles';

export default function Posts() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts, shallowEqual);
  const [value, setValue] = useState('');
  const [date, setDate] = useState('');
  const [archive, setArchive] = useState(false);

  useEffect(() => {
    if (archive) {
      dispatch(getPosts('/archive'));
    } else {
      dispatch(getPosts());
    }
  }, [archive, dispatch]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (value) dispatch(getPosts(`/?value=${value}`));
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
    setDate('');
  };

  return (
    <Container>
      <Heading>Posts</Heading>

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
          <>
            <Search>
              <HomeIconWrapper>
                <SearchIcon />
              </HomeIconWrapper>
              <Input
                type='text'
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder='Search'
              />
            </Search>

            <Search>
              <Date
                type='date'
                value={date}
                onChange={(e) => {
                  setValue(e.target.value);
                  setDate(e.target.value);
                }}
                min='2020-01-01'
                max='2025-01-01'
              />
            </Search>
          </>
        )}

        <CreateLink to='/create-post'>Create New Post</CreateLink>
      </Top>

      <OuterContainer>
        <InnerContainer>
          <Table>
            <thead>
              <tr>
                <TH>Title</TH>
                <TH>Location</TH>
                <TH>Date</TH>
                <TH>Picketer</TH>
                <TH>Actions</TH>
              </tr>
            </thead>

            <tbody>
              {posts.map((post) => (
                <Row post={post} archive={archive} key={post._id} />
              ))}
            </tbody>
          </Table>
        </InnerContainer>
      </OuterContainer>
    </Container>
  );
}
