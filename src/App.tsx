import { Search, Users } from 'lucide-react';
import { useMemo, useState } from 'react';
import { EmptyMessage, ErrorMessage, LoadingMessage } from './components/StatusMessage';
import { UserList } from './components/UserList';
import { useFetch } from './hooks/useFetch';
import type { User } from './types';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export default function App() {
  const { data, status, error, refetch } = useFetch<User>(API_URL);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return data;
    const q = query.toLowerCase();
    return data.filter(
      (user) =>
        user.name.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q) ||
        user.company.name.toLowerCase().includes(q),
    );
  }, [data, query]);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-600 text-white">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">Lista de Usuários</h1>
              <p className="text-sm text-slate-500">
                Dados consumidos via <code>fetch</code> da API JSONPlaceholder
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por nome, email ou empresa..."
              className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition-colors focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            />
          </div>
          {status === 'success' && (
            <span className="text-sm text-slate-500">
              {filtered.length} de {data.length} usuários
            </span>
          )}
        </div>

        {status === 'loading' && <LoadingMessage />}
        {status === 'error' && <ErrorMessage message={error ?? ''} onRetry={refetch} />}
        {status === 'success' && filtered.length === 0 && (
          <EmptyMessage label="Nenhum usuário corresponde à sua busca." />
        )}
        {status === 'success' && filtered.length > 0 && <UserList users={filtered} />}
      </main>
    </div>
  );
}
