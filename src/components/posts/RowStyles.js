import tw, { styled } from 'twin.macro';
import { Link } from 'react-router-dom';

const containerVariants = {
  admin: tw`bg-green-200 text-green-700`,
  user: tw`bg-yellow-200 text-yellow-700`,
};

export const TD = styled.td`
  ${tw`px-5 py-5 border-b border-gray-200 bg-white text-sm`}
`;

export const Paragraph = styled.p`
  ${tw`text-gray-900 whitespace-nowrap`}
`;

export const Span = styled.span`
  ${tw`relative inline-block py-1 font-semibold leading-tight`}
  ${({ variant }) => containerVariants[variant]}
`;

export const LinkEdit = styled(Link)`
  ${tw`
    relative inline-block px-3 py-1 font-semibold
    text-white leading-tight bg-indigo-500 rounded-full
    hover:bg-indigo-600 transition ease-in duration-300
  `}
`;
