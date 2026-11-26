import { Globe, Mail, MapPin, Phone } from 'lucide-react';
import type { User } from '../types';

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  return (
    <li className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-sky-300 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sm font-semibold text-sky-700">
            {user.name
              .split(' ')
              .slice(0, 2)
              .map((part) => part[0])
              .join('')
              .toUpperCase()}
          </div>
          <div>
            <h3 className="font-semibold text-slate-800">{user.name}</h3>
            <p className="text-sm text-slate-500">{user.company.name}</p>
          </div>
        </div>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
          #{user.id}
        </span>
      </div>

      <p className="mt-3 text-sm italic text-slate-400">
        "{user.company.catchPhrase}"
      </p>

      <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
        <div className="flex items-center gap-2 text-slate-600">
          <Mail className="h-4 w-4 text-sky-500" />
          <span className="truncate">{user.email}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-600">
          <Phone className="h-4 w-4 text-sky-500" />
          <span className="truncate">{user.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-600">
          <Globe className="h-4 w-4 text-sky-500" />
          <span className="truncate">{user.website}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-600">
          <MapPin className="h-4 w-4 text-sky-500" />
          <span className="truncate">{user.address.city}</span>
        </div>
      </dl>
    </li>
  );
}
