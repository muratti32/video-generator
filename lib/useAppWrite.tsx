import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

const useAppWrite = (fn: any) => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState(undefined);

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await fn();
      if (result) {
        setData(result);
        setFinished(true);
      }
    } catch (error: any) {
      setError(error);
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const reFetch = () => fetchData();
  return { data, loading, reFetch, finished, error };
};

export default useAppWrite;
