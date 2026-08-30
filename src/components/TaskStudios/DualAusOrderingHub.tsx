import React from 'react';

export const DualAusOrderingHub: React.FC<{ loanNumber: string }> = ({ loanNumber: _loanNumber }) => {
  return (
    <div className="space-y-4 font-mono text-xs">
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
        <div>
          <span className="text-[10px] text-slate-500 uppercase">Dual AUS Comparative Ordering Hub</span>
          <div className="text-xl font-bold text-emerald-400">Agency DU: APPROVE/ELIGIBLE • Agency LPA: ACCEPT</div>
          <div className="text-[10px] text-slate-400">Simultaneous Atomic Run Completed</div>
        </div>
        <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded font-bold">
          ✓ DUAL AUS MATCH
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-2">
          <span className="font-bold text-cyan-400 text-xs block">Agency Automated Underwriting Engine A</span>
          <div className="text-[11px] text-slate-300 space-y-1">
            <div>Recommendation: <strong className="text-emerald-400">Approve/Eligible</strong></div>
            <div>Documentation: 1-Year Tax Return Waiver</div>
            <div>Appraisal Waiver: Eligible (PIW Offered)</div>
          </div>
        </div>

        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-2">
          <span className="font-bold text-cyan-400 text-xs block">Agency Automated Underwriting Engine B</span>
          <div className="text-[11px] text-slate-300 space-y-1">
            <div>Recommendation: <strong className="text-emerald-400">Accept / Eligible</strong></div>
            <div>Documentation: 1-Year W-2 Validation</div>
            <div>Collateral: ACE Appraisal Waiver</div>
          </div>
        </div>
      </div>
    </div>
  );
};
