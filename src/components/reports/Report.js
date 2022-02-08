import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, shallowEqual } from 'react-redux';
import { useSelector } from '../../redux/store';
import {
  getReport,
  resetReport,
  updateReport,
} from '../../redux/slices/reportSlice';
import Spinner from '../spinner/Spinner';
import api from '../../utils/api';
import {
  Container,
  Top,
  Heading,
  Card,
  TitleLink,
  Picketer,
  Gallery,
  Image,
  Wrapper,
  Input,
  TextArea,
  Buttons,
  Button,
} from './ReportStyles';

export default function Report() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.report.error);
  const email = useSelector((state) => state.auth.user.email);
  const report = useSelector((state) => state.report.report, shallowEqual);
  const {
    title,
    post,
    name,
    surname,
    patronymic,
    location,
    picketer,
    images,
    text,
    subject,
    to,
  } = report;

  useEffect(() => {
    if (id) dispatch(getReport(id));
    return () => dispatch(resetReport());
  }, [id, dispatch]);

  useEffect(() => {
    const template = [
      'Hi!\n',
      '\n',
      `Event: ${title}\n`,
      `${location ? `Location: ${location}\n` : ''}`,
      '\n',
      `Picketer: ${surname ? `${surname} ${name} ${patronymic}\n` : ''}`,
      `Picketer's Email: ${picketer}`,
    ];

    dispatch(updateReport({ name: 'subject', value: title }));
    dispatch(updateReport({ name: 'text', value: template.join('') }));
  }, [title, location, surname, name, patronymic, picketer, post, dispatch]);

  if (!error && !title) return <Spinner />;
  if (error) return <h1>Not Found</h1>;

  const deleteReport = async (id) => {
    try {
      await api.delete(`/report/${id}`);
      toast.success('Report archived');
      history.push(`/reports`);
    } catch (err) {
      toast.error(err.toString());
    }
  };

  const onChange = (e) => {
    dispatch(updateReport({ name: e.target.name, value: e.target.value }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await api.put('/report/send-report', { subject, text, to, images });
      toast.success('Done');
    } catch (err) {
      toast.error(err.toString());
    }
  };

  return (
    <Container>
      <Top>
        <Heading>Report</Heading>
      </Top>

      <Card>
        <TitleLink to={`/edit-post/${post}`}>{title}</TitleLink>

        <Picketer>Picketer: {picketer}</Picketer>

        <Gallery>
          {images.map((image, index) => (
            <a
              href={image}
              key={index}
              target='_blank'
              rel='noreferrer'
              download
            >
              <Image src={image} alt={index} />
            </a>
          ))}
        </Gallery>

        <form onSubmit={handleSubmit}>
          <Wrapper>
            <label htmlFor='subject'>Subject</label>
            <Input
              type='text'
              name='subject'
              id='subject'
              placeholder='Subject'
              value={subject}
              onChange={onChange}
              required
            />
          </Wrapper>

          <Wrapper>
            <label htmlFor='text'>Message</label>
            <TextArea
              type='text'
              name='text'
              id='text'
              placeholder='Describe everything about this post here'
              value={text}
              onChange={onChange}
              required
            />
          </Wrapper>

          <Wrapper>
            <label htmlFor='to'>Recipient</label>
            <Input
              type='text'
              name='to'
              id='to'
              placeholder='example@gmail.com'
              value={to}
              onChange={onChange}
              required
            />
          </Wrapper>

          <Buttons>
            <div>
              <Button
                type='button'
                variant='red'
                onClick={() => deleteReport(id)}
              >
                Delete
              </Button>

              <Button type='submit' variant='yellow'>
                Reject
              </Button>
            </div>

            <Button type='submit' variant='blue'>
              Accept
            </Button>
          </Buttons>
        </form>
      </Card>
    </Container>
  );
}
