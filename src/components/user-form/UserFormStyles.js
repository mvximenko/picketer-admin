import tw, { styled, css } from 'twin.macro';

const containerVariants = {
  red: tw`bg-red-500 hover:bg-red-600`,
  blue: tw`bg-blue-500 hover:bg-blue-600`,
};

const input = css`
  ${tw`h-10 border mt-1 rounded px-4 w-full bg-gray-50 outline-none`}
`;

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

export const Grid = styled.div`
  ${tw`grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-4`}
`;

export const Wrapper = styled.div`
  ${tw`md:col-span-2`}
`;

export const Input = styled.input`
  ${input}
`;

export const Select = styled.select`
  ${input}
`;

export const Buttons = styled.div`
  ${tw`md:col-span-4 text-right flex justify-end`}

  button + button {
    ${tw`ml-2`}
  }
`;

export const Button = styled.button`
  ${tw`text-white font-bold py-2 px-4 rounded transition ease-in duration-300`}
  ${({ variant }) => containerVariants[variant]}
`;
