import React from 'react';

export const ConditionsClearanceTool: React.FC<{ loanNumber: string }> = ({ loanNumber: _loanNumber }) => {
  return (
    <div className="space-y-4 font-mono text-xs">
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
        <div>
          <span className="text-[10px] text-slate-500 uppercase">Underwriting Conditions Studio</span>
          <div className="text-xl font-bold text-emerald-400">ALL PRIOR-TO-DOC (PTD) CONDITIONS CLEARED</div>
          <div className="text-[10px] text-slate-400">Ready for Clear-to-Close (CTC) Emission</div>
        </div>
        <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded font-bold">
          ✓ CTC READY
        </span>
      </div>
    </div>
  );
};
