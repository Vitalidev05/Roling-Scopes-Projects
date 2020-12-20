import { useEffect, useState } from 'react';

import { coronaUrl } from '@/constants';
import { ICovid } from '@/types/Covid';
import { Service } from '@/types/Service';

const useCovidMapService = (): Service<ICovid[]> => {
  const [result, setResult] = useState<Service<ICovid[]>>({
    status: 'loading',
  });

  useEffect(() => {
    fetch(coronaUrl)
      .then(response => response.json())
      .then((response: ICovid[]) => setResult({ status: 'loaded', data: response }))
      .catch((error: Error) => setResult({ status: 'error', error }));
  }, []);

  return result;
};

export default useCovidMapService;
