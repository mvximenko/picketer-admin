import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Moment from 'react-moment';
import { toast } from 'react-toastify';
import { useDispatch, shallowEqual } from 'react-redux';
import { useSelector } from '../../redux/store';
import { getPosts } from '../../redux/slices/postSlice';
import { Container } from './PostsStyles';

export default function Posts() {
  const history = useHistory();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts, shallowEqual);
  const [value, setValue] = useState('');
  const [date, setDate] = useState('');
  const [archive, setArchive] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (archive) {
        dispatch(getPosts('/archive'));
      } else if (value) {
        dispatch(getPosts(`?value=${value}`));
      } else {
        dispatch(getPosts());
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [archive, value, dispatch]);

  const handleRowClick = (id) => {
    if (archive) {
      toast.error(`You can't edit archived posts`);
    } else {
      history.push(`/post/${id}`);
    }
  };

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
        <Container key={post._id} onClick={() => handleRowClick(post._id)}>
          <p>{post.text}</p>
          <p>{post.location}</p>
          <p>
            <Moment format='HH:MM DD/MM/YY'>{post.date}</Moment>
          </p>
        </Container>
      ))}
    </>
  );
}
