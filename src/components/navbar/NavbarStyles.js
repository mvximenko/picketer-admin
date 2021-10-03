import tw, { styled } from 'twin.macro';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  ${tw`flex flex-col md:items-center md:justify-between md:flex-row px-4 md:px-8 lg:px-12 border-b-2 bg-white`}
`;

export const Div = styled.div`
  ${tw`py-4 flex flex-row items-center justify-between`}
`;

export const Logo = styled(Link)`
  ${tw`text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg  focus:outline-none focus:ring`}
`;

export const Button = styled.button`
  ${tw`md:hidden rounded-lg focus:outline-none focus:ring`}
`;

export const IconWrapper = styled.div`
  svg {
    ${tw`w-6 h-6`}
  }
`;

export const Nav = styled.nav`
  ${tw`flex-col flex-grow pb-4 md:pb-0 hidden md:flex md:justify-end md:flex-row`}
  ${({ open }) => (open ? tw`flex` : tw`hidden`)}
`;

export const StyledLink = styled(Link)`
  ${tw`
    px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg
    md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900
    hover:bg-gray-200 focus:bg-gray-200 focus:outline-none
    focus:ring
  `}
`;
