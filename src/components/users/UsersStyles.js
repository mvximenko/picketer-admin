import styled from 'styled-components';

export const Container = styled.div`
  padding: 40px;
  margin: 0 auto;
  max-width: 800px;
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
  display: table-row;
  background: #f6f6f6;
  &:nth-of-type(odd) {
    background: #e9e9e9;
  }

  ${({ header }) =>
    header &&
    `
    font-weight: bold; 
    color: #ffffff;  
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
`;
