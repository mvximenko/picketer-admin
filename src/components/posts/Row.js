import Moment from 'react-moment';
import { TD, Paragraph, RoleSpan, LinkEdit } from './RowStyles';

export default function Row({ post, archive }) {
  const { title, location, date, picketer, _id } = post;
  return (
    <tr>
      <TD>
        <Paragraph>{title}</Paragraph>
      </TD>

      <TD>
        <Paragraph>{location}</Paragraph>
      </TD>

      <TD>
        <Paragraph>
          <Moment format='DD/MM/YY'>{date}</Moment>
        </Paragraph>
      </TD>

      <TD>
        <RoleSpan> {picketer ? picketer : 'No Picketer'}</RoleSpan>
      </TD>

      <TD>{!archive && <LinkEdit to={`/edit-post/${_id}`}>Edit</LinkEdit>}</TD>
    </tr>
  );
}
