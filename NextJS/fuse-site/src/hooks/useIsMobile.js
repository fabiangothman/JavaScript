import { useState, useEffect } from 'react';

/*
useIsMobile() returns a boolean indicating whether it is mobile or not.
*/

const useIsMobile = (limit = 992) => {
  const [isMobile, setIsMobile] = useState(() => {
    return typeof window !== 'undefined' && window.innerWidth < limit;
  });

  useEffect(() => {
    const checkIfIsMobile = () => {
      setIsMobile(window.innerWidth < limit);
    };
    window.addEventListener('resize', checkIfIsMobile);
    return () => {
      window.removeEventListener('resize', checkIfIsMobile);
    };
  }, [limit]);

  return isMobile;
};

export default useIsMobile;
