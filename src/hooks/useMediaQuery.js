import { useState, useEffect } from 'react';

export default function useMediaQuery(query) {
  const getMatches = (query) => {
    // Prevents SSR issues
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState(getMatches(query));

  useEffect(() => {
    const matchMedia = window.matchMedia(query);
    const handleChange = () => setMatches(getMatches(query));
    matchMedia.addEventListener('change', handleChange);
    return () => matchMedia.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
}
