import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

const useAppWrite = (fn: any) => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await fn();
      if (result) {
        setData(result);
        setFinished(true);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [fn]);

  const reFetch = () => fetchData();
  return { data, loading, reFetch, finished };
};

export default useAppWrite;
