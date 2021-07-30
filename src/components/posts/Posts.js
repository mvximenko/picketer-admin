import { useEffect } from 'react';
import { useDispatch, shallowEqual } from 'react-redux';
import { useSelector } from '../../redux/store';
import { getPosts } from '../../redux/slices/postSlice';
import PostsItem from './PostsItem';

export default function Posts() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts, shallowEqual);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <>
      <h1>Events</h1>

      {posts.map((post) => (
        <PostsItem key={post._id} post={post} />
      ))}
    </>
  );
}