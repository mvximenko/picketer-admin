import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, shallowEqual } from 'react-redux';
import { useSelector } from '../../redux/store';
import { getReport, resetReport } from '../../redux/slices/reportSlice';
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
  const { title, post, picketer, images } = report;

  useEffect(() => {
    if (id) dispatch(getReport(id));
    return () => dispatch(resetReport());
  }, [id, dispatch]);

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

        <Buttons>
          <Button type='button' variant='red' onClick={() => deleteReport(id)}>
            Delete
          </Button>

          <div>
            <Button type='submit' variant='yellow'>
              Reject
            </Button>

            <Button type='submit' variant='blue'>
              Accept
            </Button>
          </div>
        </Buttons>
      </Card>
    </Container>
  );
}
