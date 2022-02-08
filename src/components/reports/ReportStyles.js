import tw, { styled } from 'twin.macro';
import { Link } from 'react-router-dom';

const containerVariants = {
  red: tw`bg-red-500 hover:bg-red-600`,
  blue: tw`bg-blue-500 hover:bg-blue-600`,
  yellow: tw`bg-yellow-500 hover:bg-yellow-600`,
};

export const Container = styled.div`
  ${tw`container px-4 md:p-0 mx-auto md:w-3/5`}
`;

export const Top = styled.div`
  ${tw`flex items-center my-6`}
`;

export const Heading = styled.h2`
  ${tw`text-2xl font-semibold leading-tight`}
`;

export const Card = styled.div`
  ${tw`
    w-full mb-7 px-4 transition-all duration-150
    bg-white rounded-lg shadow-md
  `}
`;

export const TitleLink = styled(Link)`
  ${tw`my-2 inline-block text-lg font-bold text-gray-800 hover:text-gray-500`}
`;

export const Picketer = styled.div`
  ${tw`text-gray-700 my-2`}
`;

export const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 15px;
  padding-bottom: 20px;
`;

export const Image = styled.img`
  aspect-ratio: 1;
  object-fit: cover;
`;

export const Wrapper = styled.div`
  ${tw`py-2`}
`;

export const Input = styled.input`
  ${tw`h-10 border mt-1 rounded px-4 w-full bg-gray-50 outline-none`}
`;

export const TextArea = styled.textarea`
  ${tw`
    bg-gray-100 p-3 h-52 border border-gray-300 outline-none
    border mt-1 rounded px-4 w-full bg-gray-50
  `}
`;

export const Buttons = styled.div`
  ${tw`flex justify-between pb-4 pt-6`}

  button + button {
    ${tw`ml-2`}
  }
`;

export const Button = styled.button`
  ${tw`text-white font-bold py-2 px-4 rounded transition ease-in duration-300`}
  ${({ variant }) => containerVariants[variant]}
`;
