import { useEffect, useRef, useState } from 'react';

const useAppendD3Chart = (fn, data) => {
  const elRef = useRef();
  const [containerWidth, setContainerWidth] = useState(1000);

  useEffect(() => {
    if (!elRef.current) {
      return null;
    }

    function renderChart() {
      elRef.current.innerHTML = '';
      const chart = fn(elRef.current);
      elRef.current.append(chart);
      setContainerWidth(elRef.current?.parentElement?.clientWidth);
    }
    renderChart();
    window.addEventListener('resize', renderChart);
    return () => window.removeEventListener('resize', renderChart);
  }, [fn, data]);

  return [elRef, containerWidth];
};

export default useAppendD3Chart;
