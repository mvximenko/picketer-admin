import tw, { styled } from 'twin.macro';

export const Container = styled.div`
  ${tw`absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2`}
`;

export const Circle = styled.div`
  ${tw`border-solid animate-spin rounded-full border-indigo-400 border-8 h-32 w-32`}
  border-top-color: transparent;
`;
