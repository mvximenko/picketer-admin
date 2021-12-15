import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, shallowEqual } from 'react-redux';
import { useSelector } from '../../redux/store';
import { resetPost, updatePost } from '../../redux/slices/postSlice';
import api from '../../utils/api';
import {
  OuterContainer,
  InnerContainer,
  Form,
  Heading,
  Wrapper,
  Input,
  TextArea,
  Buttons,
  Button,
} from './styles';

export default function AddPost() {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post.post, shallowEqual);
  const { title, location, picketer, description } = post;

  useEffect(() => {
    return () => dispatch(resetPost());
  }, [dispatch]);

  const onChange = (e) => {
    dispatch(updatePost({ name: e.target.name, value: e.target.value }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await api.post('/posts', post);
      toast.success('Post created');
      dispatch(resetPost());
    } catch (err) {
      toast.error(err.toString());
    }
  };

  return (
    <OuterContainer>
      <InnerContainer>
        <Form onSubmit={handleSubmit}>
          <Heading>Add Post</Heading>

          <Wrapper>
            <label htmlFor='title'>Title</label>
            <Input
              type='text'
              name='title'
              id='title'
              placeholder='Title'
              value={title}
              onChange={onChange}
              required
            />
          </Wrapper>

          <Wrapper>
            <label htmlFor='location'>Location</label>
            <Input
              type='text'
              name='location'
              id='location'
              className=''
              placeholder='Location'
              value={location}
              onChange={onChange}
              required
            />
          </Wrapper>

          <Wrapper>
            <label htmlFor='picketer'>Picketer Email</label>
            <Input
              type='email'
              name='picketer'
              id='picketer'
              placeholder='Picketer Email'
              value={picketer}
              onChange={onChange}
            />
          </Wrapper>

          <Wrapper>
            <label htmlFor='description'>Description</label>
            <TextArea
              type='text'
              name='description'
              id='description'
              placeholder='Describe everything about this post here'
              value={description}
              onChange={onChange}
              required
            />
          </Wrapper>

          <Buttons>
            <Button type='submit' variant='blue'>
              Add Post
            </Button>
          </Buttons>
        </Form>
      </InnerContainer>
    </OuterContainer>
  );
}
