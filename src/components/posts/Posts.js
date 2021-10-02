import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { useDispatch, shallowEqual } from 'react-redux';
import { useSelector } from '../../redux/store';
import { getPosts } from '../../redux/slices/postSlice';
import { Container, Info, StyledLink, LinkEdit } from './PostsStyles';

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

  return (
    <>
      <div>
        <h1 onClick={() => setArchive(!archive)}>
          {archive ? 'Archive' : 'Active'}
        </h1>

        {!archive && (
          <>
            <input
              type='text'
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setDate('');
              }}
              placeholder='Search for...'
            />

            <input
              type='date'
              value={date}
              onChange={(e) => {
                setValue(e.target.value);
                setDate(e.target.value);
              }}
              min='2020-01-01'
              max='2025-01-01'
            />
          </>
        )}

        <Link to='/create-post'>Create New Post</Link>
      </div>

      {posts.map((post) => (
        <Container key={post._id}>
          <StyledLink to={`/posts/${post._id}`}>
            <Info>Description: {post.description}</Info>
            <Info>Location: {post.location}</Info>
            <Info>
              {`Date: `} <Moment format='HH:MM DD/MM/YY'>{post.date}</Moment>
            </Info>
            <Info>Picketer: {'Empty' && post.picketer}</Info>
          </StyledLink>

          {!archive && <LinkEdit to={`/edit-post/${post._id}`}>Edit</LinkEdit>}
        </Container>
      ))}
    </>
  );
}
