import { useState, useEffect, useCallback } from 'react';

/*
useIsMobile() returns a boolean indicating whether it is mobile or not.
*/

const useIsMobile = (mobileLimit = 992) => {
  const [isMobile, setIsMobile] = useState(() => {
    return typeof window !== 'undefined' && window.innerWidth < mobileLimit;
  });

  const checkIfIsMobile = useCallback(() => {
    setIsMobile(window.innerWidth < mobileLimit);
  }, [mobileLimit]);

  useEffect(() => {
    window.addEventListener('resize', checkIfIsMobile);
    return () => {
      window.removeEventListener('resize', checkIfIsMobile);
    };
  }, [checkIfIsMobile]);

  return isMobile;
};

export default useIsMobile;
