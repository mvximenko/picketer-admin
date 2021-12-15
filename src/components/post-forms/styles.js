import tw, { styled } from 'twin.macro';

const containerVariants = {
  red: tw`bg-red-500 hover:bg-red-600`,
  blue: tw`bg-blue-500 hover:bg-blue-600`,
};

export const OuterContainer = styled.div`
  ${tw`flex items-center justify-center`}
  min-height: calc(100vh - 5rem);

  @media only screen and (min-width: 600px) {
    min-height: calc(100vh - 4rem);
  }
`;

export const InnerContainer = styled.div`
  ${tw`container`}
`;

export const Form = styled.form`
  ${tw`
    bg-white rounded shadow-lg p-4 px-4 md:p-8
    m-4 mb-6 text-sm max-w-screen-md sm:mx-auto
  `}
`;

export const Heading = styled.h1`
  ${tw`text-gray-600 text-center font-medium text-2xl mt-2 mb-5`}
`;

export const Wrapper = styled.div`
  ${tw`py-2`}
`;

export const Input = styled.input`
  ${tw`h-10 border mt-1 rounded px-4 w-full bg-gray-50 outline-none`}
`;

export const TextArea = styled.textarea`
  ${tw`
    bg-gray-100 p-3 h-24 border border-gray-300 outline-none
    border mt-1 rounded px-4 w-full bg-gray-50
  `}
`;

export const Buttons = styled.div`
  ${tw`flex justify-end`}

  button + button {
    ${tw`ml-2`}
  }
`;

export const Button = styled.button`
  ${tw`text-white font-bold py-2 px-4 rounded transition ease-in duration-300`}
  ${({ variant }) => containerVariants[variant]}
`;
