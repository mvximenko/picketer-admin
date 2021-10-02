import Moment from 'react-moment';
import { TD, Paragraph, RoleSpan, LinkEdit } from './RowStyles';

export default function Row({ user, archive }) {
  const { surname, name, patronymic, email, date, role, _id } = user;
  return (
    <tr>
      <TD>
        <Paragraph>
          {surname} {name} {patronymic}
        </Paragraph>
      </TD>

      <TD>
        <Paragraph>{email}</Paragraph>
      </TD>

      <TD>
        <Paragraph>
          <Moment format='DD/MM/YY'>{date}</Moment>
        </Paragraph>
      </TD>

      <TD>
        <RoleSpan variant={role}>{role}</RoleSpan>
      </TD>

      <TD>{!archive && <LinkEdit to={`/user/${_id}`}>Edit</LinkEdit>}</TD>
    </tr>
  );
}
