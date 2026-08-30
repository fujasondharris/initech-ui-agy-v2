import React from 'react';

export const GovernmentInsuringTool: React.FC<{ loanNumber: string }> = ({ loanNumber: _loanNumber }) => {
  return (
    <div className="space-y-4 font-mono text-xs">
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
        <div>
          <span className="text-[10px] text-slate-500 uppercase">Government Insuring Gateway</span>
          <div className="text-xl font-bold text-emerald-400">FHA CASE #494-5717316 • STATUS: ENDORSED</div>
          <div className="text-[10px] text-slate-400">Federal Portal Preflight Passed • VA Form 26-6393 Verified</div>
        </div>
        <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded font-bold">
          ✓ MIC ISSUED
        </span>
      </div>

      <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-[11px] space-y-2">
        <div className="flex justify-between">
          <span className="text-slate-400">UFMIP Remittance:</span>
          <span className="text-emerald-400 font-bold">$7,000.00 Paid on 08/29/2026</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">AF14 Appraisal Logging:</span>
          <span className="text-emerald-400 font-bold">Matched Case Binder</span>
        </div>
      </div>
    </div>
  );
};
