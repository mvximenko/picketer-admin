import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useDispatch, shallowEqual } from 'react-redux';
import { useSelector } from '../../redux/store';
import { getPosts } from '../../redux/slices/postSlice';
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
  Date,
  CreateLink,
  SearchIconWrapper,
  Input,
  OuterContainer,
  InnerContainer,
  Table,
  TH,
} from './PostsStyles';
import 'react-datepicker/dist/react-datepicker.css';

export default function Posts() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts, shallowEqual);
  const [value, setValue] = useState('');
  const [date, setDate] = useState('');
  const [archive, setArchive] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (value || date) dispatch(getPosts(`/?value=${value || date}`));
    }, 500);

    if (value || date) {
    } else if (archive) {
      dispatch(getPosts('/archive'));
    } else {
      dispatch(getPosts());
    }

    return () => clearTimeout(timeout);
  }, [archive, value, date, dispatch]);

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
      <Top>
        <Heading>Posts</Heading>
        <CreateLink to='/create-post'>Create New Post</CreateLink>
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
          <>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <Input
                type='text'
                value={value}
                onChange={(e) => {
                  setDate('');
                  setValue(e.target.value);
                }}
                placeholder='Search'
              />
            </Search>

            <Search>
              <DatePicker
                selected={date}
                customInput={<Date />}
                dateFormat='dd/MM/yyyy'
                placeholderText='Choose Date'
                onChange={(date) => {
                  setValue('');
                  setDate(date);
                }}
              />
            </Search>
          </>
        )}
      </SearchPanel>

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
