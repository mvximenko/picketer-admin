import { Route, Redirect } from 'react-router-dom';
import { useSelector } from '../../redux/store';

export default function PrivateRoute({ component: Component, ...rest }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);

  if (loading) return <h1>Loading</h1>;

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Redirect to='/login' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}
