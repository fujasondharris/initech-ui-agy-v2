import React from 'react';

export const AppraisalReviewStudio: React.FC<{ loanNumber: string }> = ({ loanNumber: _loanNumber }) => {
  return (
    <div className="space-y-4 font-mono text-xs">
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
        <div>
          <span className="text-[10px] text-slate-500 uppercase">UAD 3.6 Collateral Valuation Studio</span>
          <div className="text-xl font-bold text-emerald-400">$485,000.00 APPRAISED VALUE</div>
          <div className="text-[10px] text-slate-400">CU Risk Score: 1.2 (Low Risk) • Zero Severe Variances</div>
        </div>
        <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded font-bold">
          ✓ UAD 3.6 CLEAR
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
          <span className="text-slate-500 text-[10px] block">ROOF STRUCTURE</span>
          <span className="font-bold text-emerald-400">C2 (Like New)</span>
        </div>
        <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
          <span className="text-slate-500 text-[10px] block">FOUNDATION</span>
          <span className="font-bold text-emerald-400">C2 (No Settling)</span>
        </div>
        <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
          <span className="text-slate-500 text-[10px] block">HVAC / MECHANICAL</span>
          <span className="font-bold text-emerald-400">C1 (New 2026)</span>
        </div>
        <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
          <span className="text-slate-500 text-[10px] block">ADU COMPLIANCE</span>
          <span className="font-bold text-emerald-400">Permitted Unit</span>
        </div>
      </div>
    </div>
  );
};
