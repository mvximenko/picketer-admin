import tw, { styled } from 'twin.macro';

export const Card = styled.div`
  ${tw`
    w-full mb-5 transition-all duration-150 bg-white
    rounded-md shadow-md hover:shadow-xl cursor-pointer
    border border-gray-300
  `}
`;

export const Title = styled.h1`
  ${tw`text-lg my-2 font-bold text-gray-800 px-4 py-2 block`}
`;

export const HR = styled.hr`
  ${tw`border-gray-300`}
`;

export const Description = styled.p`
  ${tw`w-full px-4 py-2 my-2 text-justify text-gray-700`}
`;
export const Location = styled.div`
  ${tw`text-gray-700 px-4 py-2 my-2`}
`;

export const Picketer = styled.div`
  ${tw`text-gray-700 px-4 pt-2 mt-2`}
`;

export const DateInfo = styled.p`
  ${tw`px-4 pb-2 mb-2 flex justify-end text-xs text-gray-600`}
`;
