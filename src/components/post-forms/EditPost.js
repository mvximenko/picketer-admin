import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, shallowEqual } from 'react-redux';
import { useSelector } from '../../redux/store';
import { getPost, resetPost, updatePost } from '../../redux/slices/postSlice';
import Spinner from '../spinner/Spinner';
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

export default function EditPost() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { post, error } = useSelector((state) => state.post, shallowEqual);
  const { _id, title, location, picketer, description } = post;

  useEffect(() => {
    dispatch(getPost(id));
    return () => dispatch(resetPost());
  }, [id, dispatch]);

  const onChange = (e) => {
    dispatch(updatePost({ name: e.target.name, value: e.target.value }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await api.put('/posts/post', post);
      toast.success('Post updated');
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

  if (!error && !_id) return <Spinner />;
  if (error) return <h1>Not Found</h1>;

  return (
    <OuterContainer>
      <InnerContainer>
        <Form onSubmit={handleSubmit}>
          <Heading>Edit Post</Heading>

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
            <Button type='button' variant='red' onClick={() => archivePost(id)}>
              Archive Post
            </Button>

            <Button type='submit' variant='blue'>
              Edit Post
            </Button>
          </Buttons>
        </Form>
      </InnerContainer>
    </OuterContainer>
  );
}
