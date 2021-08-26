import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, shallowEqual } from 'react-redux';
import { useSelector } from '../../redux/store';
import { getPost, resetPost, updatePost } from '../../redux/slices/postSlice';
import api from '../../utils/api';
import {
  Container,
  Heading,
  Grid,
  Input,
  InputSubmit,
  Span,
  Wrapper,
  TextArea,
} from './PostFormStyles';

export default function PostForm() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const post = useSelector((state) => state.post.post, shallowEqual);
  const { title, location, picketer, description } = post;

  useEffect(() => {
    if (id) dispatch(getPost(id));
    return () => dispatch(resetPost());
  }, [id, dispatch]);

  const onChange = (e) => {
    dispatch(updatePost({ name: e.target.name, value: e.target.value }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const hasEmptyFields = [title, location, description].some(
        (value) => value === ''
      );

      if (hasEmptyFields) {
        toast.error('Please fill in all fields');
      } else if (id) {
        await api.put('/posts/post', post);
        toast.success('Post updated');
      } else {
        await api.post('/posts', post);
        toast.success('Post created');
        dispatch(resetPost());
      }
    } catch (err) {
      toast.error(err.toString());
    }
  };

  const archivePost = async (id) => {
    try {
      await api.put(`/posts/archive/${id}`);
      toast.success('Post archived');
      history.push(`/`);
    } catch (err) {
      toast.error(err.toString());
    }
  };

  return (
    <Container>
      <Heading>{id ? 'Edit Post' : 'Add Post'}</Heading>
      <form onSubmit={handleSubmit}>
        <Grid>
          <Input
            type='text'
            name='title'
            placeholder='Title'
            value={title}
            onChange={onChange}
          />
          <Input
            type='text'
            name='location'
            placeholder='Location'
            value={location}
            onChange={onChange}
          />

          {!isOpen ? (
            <Span onClick={() => setIsOpen(true)}>
              {id ? 'Change Picketer' : 'Add Picketer'}
            </Span>
          ) : (
            <Input
              type='email'
              name='picketer'
              placeholder='Picketer Email'
              value={picketer}
              onChange={onChange}
            />
          )}
        </Grid>

        <TextArea
          type='text'
          name='description'
          id='description'
          value={description}
          onChange={onChange}
          placeholder='Description...'
        />

        <Wrapper>
          {id && (
            <InputSubmit
              onClick={() => archivePost(id)}
              type='button'
              value='Archive Post'
              red
            />
          )}
          <InputSubmit type='submit' value={id ? 'Edit Post' : 'Add Post'} />
        </Wrapper>
      </form>
    </Container>
  );
}
