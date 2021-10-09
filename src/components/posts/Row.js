import Moment from 'react-moment';
import { TD, Paragraph, Span, LinkEdit } from './RowStyles';

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
        <Span>{picketer ? picketer : 'No Picketer'}</Span>
      </TD>

      <TD>{!archive && <LinkEdit to={`/edit-post/${_id}`}>Edit</LinkEdit>}</TD>
    </tr>
  );
}
