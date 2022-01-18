import { ListItem, Container, Name, Email, RoleSpan } from './PostStyles';

export default function Post({ user }) {
  const { surname, name, patronymic, email, role } = user;
  return (
    <ListItem>
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
