import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, shallowEqual } from 'react-redux';
import { useSelector } from '../../redux/store';
import { getReports } from '../../redux/slices/reportSlice';
import {
  Container,
  Top,
  Heading,
  Card,
  Title,
  Picketer,
} from './ReportsStyles';

export default function Reports() {
  const dispatch = useDispatch();
  const history = useHistory();
  const reports = useSelector((state) => state.report.reports, shallowEqual);

  useEffect(() => {
    dispatch(getReports());
  }, [dispatch]);

  const handleClick = (e, id) => {
    history.push(`/report/${id}`);
  };

  return (
    <Container>
      <Top>
        <Heading>Reports</Heading>
      </Top>

      {reports.map((report) => (
        <Card key={report._id} onClick={(e) => handleClick(e, report._id)}>
          <Title>{report.title}</Title>
          <Picketer>Picketer: {report.picketer}</Picketer>
        </Card>
      ))}
    </Container>
  );
}
