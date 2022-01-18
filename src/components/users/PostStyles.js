import tw, { styled } from 'twin.macro';

const containerVariants = {
  admin: tw`bg-green-200 text-green-700`,
  user: tw`bg-yellow-200 text-yellow-700`,
};

export const ListItem = styled.li`
  ${tw`
    flex items-center space-x-4 my-3 p-3
    border border-gray-300 shadow-md rounded-md
    bg-white
  `}
`;

export const Container = styled.div`
  ${tw`flex-1 min-w-0`}
`;

export const Name = styled.p`
  ${tw`text-sm font-medium text-gray-900 truncate`}
`;

export const Email = styled.p`
  ${tw`text-sm text-gray-500 truncate`}
`;

export const RoleSpan = styled.span`
  ${tw`relative inline-block px-3 py-1 text-sm font-semibold leading-tight rounded-full`}
  ${({ variant }) => containerVariants[variant]}
`;
