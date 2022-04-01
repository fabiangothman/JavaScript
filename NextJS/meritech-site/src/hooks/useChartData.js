import useSWRImmutable from 'swr/immutable';
import { useEffect, useState } from 'react';
import filter from 'lodash/filter';

const useChartData = ({ slug, filters, filterRow }) => {
  const [filteredData, setFilteredData] = useState(null);

  const { data, error } = useSWRImmutable(
    `/data/benchmarking${slug}.json`,
    async (url) => {
      const response = await fetch(url);

      if (!response.ok) {
        throw Error(response.statusText);
      }

      return response.json();
    },
  );

  useEffect(() => {
    if (data) {
      const filtered = filter(data, (row) => filterRow(row, filters));

      setFilteredData(filtered || null);
    }
  }, [data, filters, filterRow]);

  return { filteredData, data, error };
};

export default useChartData;
