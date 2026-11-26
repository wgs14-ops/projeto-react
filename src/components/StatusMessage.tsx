import { AlertCircle, Inbox, Loader2, RotateCw } from 'lucide-react';

interface LoadingMessageProps {
  label?: string;
}

export function LoadingMessage({ label = 'Carregando dados...' }: LoadingMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white py-16 text-slate-500">
      <Loader2 className="h-8 w-8 animate-spin text-sky-500" />
      <p className="text-sm">{label}</p>
    </div>
  );
}

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-red-200 bg-red-50 py-16 text-center">
      <AlertCircle className="h-8 w-8 text-red-500" />
      <div>
        <p className="font-medium text-red-700">Falha ao carregar os dados</p>
        <p className="mt-1 max-w-md text-sm text-red-500">{message}</p>
      </div>
      {onRetry && (
        <button onClick={onRetry} className="mt-2 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white">
          <RotateCw className="h-4 w-4" />
          Tentar novamente
        </button>
      )}
    </div>
  );
}

export function EmptyMessage({ label = 'Nenhum resultado encontrado.' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-slate-300 bg-white py-16 text-slate-400">
      <Inbox className="h-8 w-8" />
      <p className="text-sm">{label}</p>
    </div>
  );
}
