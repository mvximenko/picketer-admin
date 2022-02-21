import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, shallowEqual } from 'react-redux';
import { useSelector } from '../../redux/store';
import { resetUser, updateUser } from '../../redux/slices/userSlice';
import api from '../../utils/api';
import {
  OuterContainer,
  InnerContainer,
  Form,
  Heading,
  Grid,
  Wrapper,
  Input,
  Select,
  Buttons,
  Button,
} from './styles';

export default function EditUser() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user, shallowEqual);
  const { email, role } = user;

  useEffect(() => {
    return () => dispatch(resetUser());
  }, [dispatch]);

  const onChange = (e) => {
    dispatch(updateUser({ name: e.target.name, value: e.target.value }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await api.post('/invite', { to: email, role });
      toast.success('User invited');
      dispatch(resetUser());
    } catch (err) {
      toast.error(err.toString());
    }
  };

  return (
    <OuterContainer>
      <InnerContainer>
        <Form onSubmit={handleSubmit}>
          <Heading>Invite User</Heading>

          <Grid>
            <Wrapper>
              <label htmlFor='role'>Role</label>
              <Select
                name='role'
                id='role'
                placeholder='role'
                value={role}
                onChange={onChange}
                required
              >
                <option value=''>Select the role</option>
                <option value='user'>User</option>
                <option value='admin'>Admin</option>
              </Select>
            </Wrapper>

            <Wrapper>
              <label htmlFor='email'>Email</label>
              <Input
                type='email'
                name='email'
                id='email'
                placeholder='Email'
                value={email}
                onChange={onChange}
                required
              />
            </Wrapper>

            <Buttons>
              <Button type='submit' variant='blue'>
                Invite User
              </Button>
            </Buttons>
          </Grid>
        </Form>
      </InnerContainer>
    </OuterContainer>
  );
}
