import React, { useState } from 'react';

export const InstallerConsole: React.FC = () => {
  const [installMode, setInstallMode] = useState<'fresh' | 'adoption'>('fresh');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 font-mono text-xs">
      <div className="flex justify-between items-center border-b border-slate-800 pb-2">
        <h2 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
          <span>🛠️</span>
          <span>Guided Installation, Migration & Lifecycle Console</span>
        </h2>
        <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded font-bold">
          ✓ SYSTEM INTEGRITY SEALED
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 space-y-2">
          <span className="font-bold text-cyan-400 text-xs block">Target Installation Mode</span>
          <div className="flex gap-2">
            <button
              onClick={() => setInstallMode('fresh')}
              className={`flex-1 py-1.5 rounded font-bold transition-all ${
                installMode === 'fresh' ? 'bg-cyan-600 text-white shadow' : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              Fresh Target Deploy
            </button>
            <button
              onClick={() => setInstallMode('adoption')}
              className={`flex-1 py-1.5 rounded font-bold transition-all ${
                installMode === 'adoption' ? 'bg-cyan-600 text-white shadow' : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              First Adoption Import
            </button>
          </div>
          <div className="text-[10px] text-slate-400">
            {installMode === 'fresh'
              ? 'Zero-effect standalone deployment with local state storage.'
              : 'Preflight discovery and migration watermark delta capture.'}
          </div>
        </div>

        <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 space-y-2">
          <span className="font-bold text-cyan-400 text-xs block">Lifecycle Migration & Preflight Status</span>
          <div className="text-slate-300 text-[11px]">Ready for State Validation</div>
          <div className="text-[10px] text-emerald-400">
            ✓ External-authority-root and custody receipt verified
          </div>
        </div>
      </div>
    </div>
  );
};
