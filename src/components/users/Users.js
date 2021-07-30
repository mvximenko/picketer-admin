import { useEffect } from 'react';
import { useDispatch, shallowEqual } from 'react-redux';
import { useSelector } from '../../redux/store';
import { getUsers } from '../../redux/slices/userSlice';

export default function Users() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users, shallowEqual);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <>
      {users.map((user) => (
        <p>{`${user.surname} ${user.name} ${user.patronymic} ${user.email} ${user.date} ${user.role}`}</p>
      ))}
    </>
  );
}
