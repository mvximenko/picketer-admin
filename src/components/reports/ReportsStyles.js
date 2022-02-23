import tw, { styled } from 'twin.macro';

const containerVariants = {
  failed: tw`bg-red-500`,
  success: tw`bg-green-500`,
};

export const Container = styled.div`
  ${tw`container px-4 md:p-0 mx-auto md:w-3/5`}
`;

export const Top = styled.div`
  ${tw`flex items-center my-5`}
`;

export const Heading = styled.h2`
  ${tw`text-2xl font-semibold leading-tight`}
`;

export const Card = styled.div`
  ${tw`
    w-full mb-5 transition-all duration-150 bg-white
    rounded-lg shadow-lg hover:shadow-xl cursor-pointer
  `}
`;

export const Title = styled.h1`
  ${tw`text-lg my-2 font-bold text-gray-800 px-4 py-2 block`}
`;

export const Picketer = styled.div`
  ${tw`text-gray-700 truncate`}
`;

export const Wrapper = styled.div`
  ${tw`flex justify-between p-4 pt-2 mt-2`}
`;

export const Status = styled.div`
  ${tw`relative inline-block px-3 py-1 text-sm font-semibold leading-tight rounded-full text-white`}
  ${({ variant }) => containerVariants[variant]}
`;
