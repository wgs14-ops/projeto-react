import { useEffect, useState } from 'react';

type Status = 'loading' | 'success' | 'error';

interface FetchResult<T> {
  data: T[];
  status: Status;
  error: string | null;
  refetch: () => void;
}

export function useFetch<T>(url: string): FetchResult<T> {
  const [data, setData] = useState<T[]>([]);
  const [status, setStatus] = useState<Status>('loading');
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setStatus('loading');
      setError(null);

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }
        const json = await response.json();

        if (!cancelled) {
          setData(json);
          setStatus('success');
        }
      } catch (err) {
        if (!cancelled) {
          const message =
            err instanceof Error ? err.message : 'Erro desconhecido ao buscar dados.';
          setError(message);
          setStatus('error');
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [url, reloadKey]);

  const refetch = () => setReloadKey((k) => k + 1);

  return { data, status, error, refetch };
}
