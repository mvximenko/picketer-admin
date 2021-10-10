import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, shallowEqual } from 'react-redux';
import { useSelector } from '../../redux/store';
import { getPost, resetPost, updatePost } from '../../redux/slices/postSlice';
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
} from './PostFormStyles';

export default function PostForm() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
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
    <OuterContainer>
      <InnerContainer>
        <Form onSubmit={handleSubmit}>
          <Heading>{id ? 'Edit Post' : 'Add Post'}</Heading>

          <Wrapper>
            <label htmlFor='title'>Title</label>
            <Input
              type='text'
              name='title'
              id='title'
              placeholder='Title'
              value={title}
              onChange={onChange}
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
            />
          </Wrapper>

          <Wrapper>
            <label htmlFor='picketer'>Picketer Email</label>
            <Input
              type='text'
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
            />
          </Wrapper>

          <Buttons>
            {id && (
              <Button
                type='button'
                variant='red'
                onClick={() => archivePost(id)}
              >
                Archive Post
              </Button>
            )}

            <Button type='submit' variant='blue'>
              {id ? 'Edit Post' : 'Add Post'}
            </Button>
          </Buttons>
        </Form>
      </InnerContainer>
    </OuterContainer>
  );
}
