import React from 'react';

export const PostClosingFleetTool: React.FC<{ loanNumber: string }> = ({ loanNumber: _loanNumber }) => {
  return (
    <div className="space-y-4 font-mono text-xs">
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
        <div>
          <span className="text-[10px] text-slate-500 uppercase">Post-Closing Secondary Delivery Fleet</span>
          <div className="text-xl font-bold text-emerald-400">PURCHASE ADVICE RECONCILED: $447,000.00</div>
          <div className="text-[10px] text-slate-400">Correspondent Investor Tier-A • SRP Gain: +$4,850.00</div>
        </div>
        <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded font-bold">
          ✓ 0 PENDS
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-center text-[10px]">
        <div className="bg-slate-950 p-2 rounded border border-emerald-800 text-emerald-300 font-bold">Commitment 1: Cleared</div>
        <div className="bg-slate-950 p-2 rounded border border-slate-800 text-slate-300 font-bold">Commitment 2: Staged</div>
        <div className="bg-slate-950 p-2 rounded border border-emerald-800 text-emerald-300 font-bold">Commitment 3: Purchased</div>
        <div className="bg-slate-950 p-2 rounded border border-slate-800 text-slate-300 font-bold">Commitment 4: Active</div>
        <div className="bg-slate-950 p-2 rounded border border-emerald-800 text-emerald-300 font-bold">Commitment 5: Cleared</div>
      </div>
    </div>
  );
};
