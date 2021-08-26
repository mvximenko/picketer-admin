import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  background: #fff;
  border: 2px solid grey;
  margin: 10px;
`;

export const Info = styled.span`
  width: 100%;
`;

export const StyledLink = styled(Link)`
  display: flex;
  width: 100%;
  margin: 10px;
`;

export const LinkEdit = styled(Link)`
  padding: 10px;
`;
