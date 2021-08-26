import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  padding: 40px;
  margin: 0 auto;
  max-width: 800px;
`;

export const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 580px) {
    margin-bottom: 30px;
    flex-wrap: wrap;
  }
`;

export const Heading = styled.h1`
  cursor: pointer;
  &:hover {
    color: #57646e;
  }
`;

export const Input = styled.input`
  margin: auto 0;
`;

export const StyledLink = styled(Link)`
  color: #fff;
  background: #4bc970;
  font-weight: bold;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background: #40ad60;
  }
  @media screen and (max-width: 580px) {
    width: 100%;
    text-align: center;
  }
`;

export const Table = styled.div`
  width: 100%;
  display: table;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  @media screen and (max-width: 580px) {
    display: block;
  }
`;

export const Row = styled.div`
  width: 100%;
  display: table-row;
  background: #f6f6f6;
  &:nth-of-type(odd) {
    background: #e9e9e9;
  }
  ${({ header }) =>
    header &&
    `
    color: #fff;  
    cursor: default;
    font-weight: bold; 
    &:first-child { 
      background: #4bc970; 
    }
  `}

  @media screen and (max-width: 580px) {
    padding: 14px 0 7px;
    display: block;
    ${({ header }) =>
      header &&
      `
      padding: 0; 
      height: 6px; 
      background: #4bc970; 
      ${Cell} { 
        display: none;
      }
    `}
  }
`;

export const Cell = styled.div`
  padding: 12px;
  display: table-cell;
  @media screen and (max-width: 580px) {
    display: block;
    padding: 2px 16px;
    margin-bottom: 10px;
    &:before {
      margin-bottom: 3px;
      content: attr(data-title);
      min-width: 98px;
      font-size: 10px;
      line-height: 10px;
      font-weight: bold;
      text-transform: uppercase;
      color: #969696;
      display: block;
    }
  }
  ${({ width }) => width && `width: ${width}%;`}
`;

export const LinkEdit = styled(Link)`
  cursor: pointer;
  &:hover {
    background: #d1d1d1;
  }
`;
