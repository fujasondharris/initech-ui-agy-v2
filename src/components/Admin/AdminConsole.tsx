import React, { useState } from 'react';

export const AdminConsole: React.FC = () => {
  const [delegations] = useState([
    { id: 'del-1', user: 'Senior Settlement Officer', role: 'Funding Control Approver', expiresAt: '2026-09-01 17:00 CDT', status: 'Active' },
    { id: 'del-2', user: 'Quality Review Lead', role: 'Underwriter Adjudication', expiresAt: '2026-08-31 18:00 CDT', status: 'Active' },
  ]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 font-mono text-xs">
      <div className="flex justify-between items-center border-b border-slate-800 pb-2">
        <h2 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
          <span>⚡</span>
          <span>Product Administration & Separation of Duties Console</span>
        </h2>
        <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
          Zero Default Loan Access
        </span>
      </div>

      <div className="space-y-2">
        <h3 className="font-bold text-slate-200 text-xs uppercase tracking-wider">Active Authority Delegations</h3>
        <div className="divide-y divide-slate-800 bg-slate-950 p-3 rounded-lg border border-slate-800">
          {delegations.map(d => (
            <div key={d.id} className="py-2 flex justify-between items-center">
              <div>
                <span className="font-bold text-slate-200">{d.user}</span>
                <span className="text-[10px] text-slate-500 block">Granted Role: {d.role}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded font-bold">
                  {d.status}
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Expires: {d.expiresAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
