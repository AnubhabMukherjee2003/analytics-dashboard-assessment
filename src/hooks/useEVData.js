import { useState, useEffect } from 'react';
import { loadCSVFromPublic } from '../utils/csvParser';

const useEVData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const evData = await loadCSVFromPublic('/data/Electric_Vehicle_Population_Data.csv');
        setData(evData);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useEVData;