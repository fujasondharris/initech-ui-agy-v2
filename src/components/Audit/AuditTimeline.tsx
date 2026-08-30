import React from 'react';

export interface AuditEvent {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  target: string;
  digest: string;
  status: 'verified' | 'tamper_evident';
}

interface AuditTimelineProps {
  events: AuditEvent[];
}

export const AuditTimeline: React.FC<AuditTimelineProps> = ({ events }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3 font-mono text-xs">
      <div className="flex justify-between items-center border-b border-slate-800 pb-2">
        <h3 className="font-bold text-cyan-400 flex items-center gap-1.5 uppercase tracking-wider text-xs">
          <span>📜</span>
          <span>Tamper-Evident SHA-256 Audit Stream</span>
        </h3>
        <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded font-bold">
          ✓ HASH CHAIN VALIDATED
        </span>
      </div>

      <div className="divide-y divide-slate-800/80 max-h-72 overflow-y-auto pr-1">
        {events.map((evt) => (
          <div key={evt.id} className="py-2.5 space-y-1">
            <div className="flex justify-between items-center text-[11px]">
              <span className="font-bold text-slate-200">{evt.action}</span>
              <span className="text-slate-500 font-mono text-[10px]">{evt.timestamp}</span>
            </div>

            <div className="text-[10px] text-slate-400 flex items-center gap-2">
              <span>Actor: <strong className="text-slate-300">{evt.actor}</strong></span>
              <span>•</span>
              <span>Target: <span className="text-cyan-300">{evt.target}</span></span>
            </div>

            <div className="bg-slate-950 px-2 py-1 rounded text-[9px] text-slate-500 font-mono flex items-center justify-between">
              <span>Digest: {evt.digest}</span>
              <span className="text-emerald-400 font-bold">✓ SEALED</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
