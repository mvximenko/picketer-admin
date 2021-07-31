import styled from 'styled-components';

export const Container = styled.div`
  margin: 6%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
`;

export const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  max-width: 330px;
  background: #fff;
  padding: 32px;
  padding-bottom: 48px;
  border-radius: 8px;
  box-shadow: 0 10px 40px -14px rgba(0, 0, 0, 0.25);
`;

export const Heading = styled.h1`
  font-weight: bold;
  text-align: center;
  line-height: 1.5em;
  margin-top: 4px;
  margin-bottom: 30px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 14px;
  margin-bottom: 16px;
  color: #384047;
  background: #e8eeef;
  border: none;
  border-radius: 4px;
  box-sizing: border-box;
  &:focus {
    outline: none;
  }
`;

export const InputSubmit = styled.input`
  width: 100%;
  color: #fff;
  padding: 14px;
  margin-top: 16px;
  background: #4bc970;
  border: none;
  border-radius: 4px;
  font-size: 19px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  transition: all 200ms ease-in-out;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
  &:hover {
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.3);
    transform: translateY(-4px);
  }
`;
