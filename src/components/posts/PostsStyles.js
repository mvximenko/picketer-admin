import tw, { styled } from 'twin.macro';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  ${tw`container mx-auto px-4 sm:px-8 py-8`}
`;

export const Heading = styled.h2`
  ${tw`text-2xl font-semibold leading-tight`}
`;

export const Top = styled.div`
  ${tw`my-2 flex sm:flex-row flex-col sm:items-center`}
`;

export const SelectContainer = styled.div`
  ${tw`flex flex-row mb-1 sm:mb-0 relative`}
`;

export const Select = styled.select`
  ${tw`
    appearance-none h-full rounded sm:rounded-r-none border
    block appearance-none w-full bg-white border-gray-400
    text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none
  `}
`;

export const ArrowIconWrapper = styled.div`
  ${tw`pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700`}
  svg {
    ${tw`fill-current h-4 w-4`}
  }
`;

export const Search = styled.div`
  ${tw`relative mb-1 sm:mb-0`}
`;

export const SearchIconWrapper = styled.span`
  ${tw`h-full absolute inset-y-0 left-0 flex items-center pl-2`}
  svg {
    ${tw`h-4 w-4 fill-current text-gray-500`}
  }
`;

export const Input = styled.input`
  ${tw`
    appearance-none rounded-l sm:rounded-l-none
    border sm:border-l-0 border-gray-400 block pl-8 pr-6 py-2
    w-full bg-white text-sm placeholder-gray-400 text-gray-700
    focus:bg-white focus:placeholder-gray-600 focus:text-gray-700
    focus:outline-none
  `}
`;

export const Date = styled.input`
  ${tw`
  appearance-none rounded-r rounded-l sm:rounded-l-none
  border border-gray-400 border-b block pl-8 pr-6 py-2
  w-full bg-white text-sm placeholder-gray-400
  text-gray-700 focus:bg-white focus:placeholder-gray-600
  focus:text-gray-700 focus:outline-none sm:border-l-0 mb-5 sm:mb-0
  `}
`;

export const CreateLink = styled(Link)`
  ${tw`
    mx-auto sm:ml-auto mr-0 px-3 py-2 font-semibold
    text-white leading-tight rounded-md bg-indigo-500
    hover:bg-indigo-600 transition ease-in duration-300
  `}
`;

export const OuterContainer = styled.div`
  ${tw`-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto`}
`;

export const InnerContainer = styled.div`
  ${tw`inline-block min-w-full shadow rounded-lg overflow-hidden`}
`;

export const Table = styled.table`
  ${tw`min-w-full leading-normal`}
`;

export const TH = styled.th`
  ${tw`
    px-5 py-3 border-b-2 border-gray-200 bg-gray-100
    text-left text-xs font-semibold text-gray-600
    uppercase tracking-wider
  `}
`;
