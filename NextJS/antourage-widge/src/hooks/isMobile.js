import { useState, useEffect } from 'react';

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
