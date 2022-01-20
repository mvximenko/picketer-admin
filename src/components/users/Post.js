import { useHistory } from 'react-router-dom';

import { ListItem, Container, Name, Email, RoleSpan } from './PostStyles';

export default function Post({ user, archive }) {
  const history = useHistory();

  const { surname, name, patronymic, email, role, _id } = user;

  const handleClick = (e, id) => {
    if (window.getSelection().toString()) {
      e.preventDefault();
    } else {
      history.push(`/user/${id}`);
    }
  };

  return (
    <ListItem onClick={(e) => !archive && handleClick(e, _id)}>
      <Container>
        <Name>
          {surname} {name} {patronymic}
        </Name>
        <Email>{email}</Email>
      </Container>

      <RoleSpan variant={role}>{role}</RoleSpan>
    </ListItem>
  );
}
