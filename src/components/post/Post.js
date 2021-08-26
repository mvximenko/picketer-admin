import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Moment from 'react-moment';
import { useDispatch, shallowEqual } from 'react-redux';
import { useSelector } from '../../redux/store';
import { getPost, resetPost } from '../../redux/slices/postSlice';

export default function Post() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post.post, shallowEqual);
  const { title, location, description, picketer, date } = post;

  useEffect(() => {
    if (id) dispatch(getPost(id));
    return () => dispatch(resetPost());
  }, [id, dispatch]);

  return (
    <>
      <h1>Title: {title}</h1>
      <h1>Location: {location}</h1>
      <h1>Description: {description}</h1>
      <h1>Description: {description}</h1>
      <h1>Picketer: {'Empty' && picketer}</h1>
      <h1>
        {`Date: `}
        <Moment format='HH:MM DD/MM/YY'>{date}</Moment>
      </h1>
    </>
  );
}
