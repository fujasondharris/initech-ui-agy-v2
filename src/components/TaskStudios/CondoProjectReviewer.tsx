import React from 'react';

export const CondoProjectReviewer: React.FC<{ loanNumber: string }> = ({ loanNumber: _loanNumber }) => {
  return (
    <div className="space-y-4 font-mono text-xs">
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
        <div>
          <span className="text-[10px] text-slate-500 uppercase">2026 Condo Clearance Engine</span>
          <div className="text-xl font-bold text-emerald-400">LAKEVIEW CONDOMINIUMS #402</div>
          <div className="text-[10px] text-slate-400">Reciprocity Active (Federal Program Active → 5-Doc Streamline)</div>
        </div>
        <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded font-bold">
          ✓ 100% CLEARABLE
        </span>
      </div>

      <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-2">
        <h4 className="font-bold text-cyan-400 text-xs uppercase tracking-wider border-b border-slate-800 pb-1.5">
          Critical Repairs & Structural Integrity Checks
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] text-slate-300">
          <div className="flex items-center gap-2 text-emerald-400">
            <span>✓</span> <span>No structural or safety deficiencies</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-400">
            <span>✓</span> <span>Zero unallocated special assessments</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-400">
            <span>✓</span> <span>Single-entity ownership: 4.2% (Cap: ≤20%)</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-400">
            <span>✓</span> <span>GSE Prohibited List: Clear</span>
          </div>
        </div>
      </div>
    </div>
  );
};
