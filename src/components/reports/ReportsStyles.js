import tw, { styled } from 'twin.macro';

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
  ${tw`text-gray-700 p-4 pt-2 mt-2`}
`;
