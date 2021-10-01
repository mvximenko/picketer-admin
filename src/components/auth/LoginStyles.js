import tw, { styled } from 'twin.macro';

export const OuterContainer = styled.div`
  ${tw`relative min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8 relative`}
`;

export const InnerContainer = styled.div`
  ${tw`max-w-md w-full space-y-8 p-10`}
`;

export const TextContainer = styled.div`
  ${tw`text-center`}
`;

export const Heading = styled.h2`
  ${tw`mt-6 text-3xl font-bold text-gray-900`}
`;

export const Paragraph = styled.p`
  ${tw`mt-2 text-sm text-gray-600`}
`;

export const Form = styled.form`
  ${tw`mt-8 space-y-6`}
`;

export const Label = styled.label`
  ${tw`text-sm font-bold text-gray-700 tracking-wide`}
`;

export const Input = styled.input`
  ${tw`w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500`}
`;

export const Button = styled.button`
  ${tw`
    w-full flex justify-center bg-indigo-500 text-gray-100 p-4
    rounded-full tracking-wide font-semibold focus:outline-none
    focus:ring hover:bg-indigo-600 shadow-lg cursor-pointer
    transition ease-in duration-300
  `}
`;
