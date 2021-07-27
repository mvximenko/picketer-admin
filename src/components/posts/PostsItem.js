import React from 'react';
import Moment from 'react-moment';
import { Container } from './PostsItemStyles';

export default function PostsItem({ post: { text, location, date } }) {
  return (
    <Container>
      <p>{text}</p>
      <p>{location}</p>
      <p>
        Posted on <Moment format='HH:MM DD/MM/YY'>{date}</Moment>
      </p>
    </Container>
  );
}
