import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Moment from 'react-moment';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../redux/slices/postSlice';
import {
  Card,
  Title,
  HR,
  Description,
  Location,
  Picketer,
  DateInfo,
} from './PostStyles';

export default function Posts({ post }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { _id, title, description, location, picketer, date } = post;

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const handleClick = (e, id) => {
    if (window.getSelection().toString()) {
      e.preventDefault();
    } else {
      history.push(`/edit-post/${id}`);
    }
  };

  return (
    <Card key={_id} onClick={(e) => handleClick(e, _id)}>
      <Title>{title}</Title>
      <HR />

      <Description>{description}</Description>
      <HR />

      <Location>Location: {location}</Location>
      <HR />

      <Picketer>{picketer ? `Picketer: ${picketer}` : 'No Picketer'}</Picketer>

      <DateInfo>
        <Moment format='HH:MM DD/MM/YY'>{date}</Moment>
      </DateInfo>
    </Card>
  );
}
