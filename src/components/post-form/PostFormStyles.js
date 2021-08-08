import styled from 'styled-components';

export const Container = styled.div`
  padding: 40px;
  margin: 4% auto;
  max-width: 700px;
  background: #fff;
  border-radius: 8px;
  box-sizing: border-box;
  box-shadow: 0 10px 40px -14px rgba(0, 0, 0, 0.25);
  @media (max-width: 580px) {
    margin: 4%;
  }
`;

export const Heading = styled.h1`
  font-weight: bold;
  text-align: center;
  line-height: 1.5em;
  margin-top: 0;
  margin-bottom: 30px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 35px;
  @media (max-width: 580px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 12px;
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
  padding: 14px;
  margin: 10px 0;
  display: block;
  color: #fff;
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
  ${({ red }) => red && `background: #e74c3c`}
`;

export const Wrapper = styled.div`
  display: flex;
  input + input {
    margin-left: 30px;
  }
  @media (max-width: 580px) {
    input + input {
      margin-left: 10px;
    }
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  box-sizing: border-box;
`;
