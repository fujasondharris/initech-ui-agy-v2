import React from 'react';

export const DiscloseLoanTool: React.FC<{ loanNumber: string }> = ({ loanNumber: _loanNumber }) => {
  return (
    <div className="space-y-4 font-mono text-xs">
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
        <div>
          <span className="text-[10px] text-slate-500 uppercase">TRID Disclosures & Tolerance Studio</span>
          <div className="text-xl font-bold text-emerald-400">$0.00 CURE REQUIRED (100% COMPLIANT)</div>
          <div className="text-[10px] text-slate-400">10% Tolerance Margin: $210.00 Remaining</div>
        </div>
        <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded font-bold">
          ✓ TRID SAFE
        </span>
      </div>

      <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-[11px] space-y-2">
        <div className="flex justify-between">
          <span className="text-slate-400">Initial LE Delivery Date:</span>
          <span className="text-slate-200 font-bold">08/12/2026 (e-Signed 08/12/2026)</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Closing Disclosure 3-Day Waiting Period:</span>
          <span className="text-emerald-400 font-bold">Satisfied (Day 4 of 3)</span>
        </div>
      </div>
    </div>
  );
};
