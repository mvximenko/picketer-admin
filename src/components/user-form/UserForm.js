import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, shallowEqual } from 'react-redux';
import { useSelector } from '../../redux/store';
import { getUser, resetUser } from '../../redux/slices/userSlice';

export default function UserForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user, shallowEqual);
  const { name, surname, patronymic, email, role } = user;

  useEffect(() => {
    dispatch(getUser(id));

    return () => dispatch(resetUser());
  }, [id, dispatch]);

  return (
    <div>
      {name && (
        <h1>
          {surname} {name} {patronymic} {email} {role}
        </h1>
      )}
    </div>
  );
}
