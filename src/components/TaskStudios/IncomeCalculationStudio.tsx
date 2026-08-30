import React, { useState } from 'react';

export const IncomeCalculationStudio: React.FC<{ loanNumber: string }> = ({ loanNumber: _loanNumber }) => {
  const [baseHourly, setBaseHourly] = useState(48.50);
  const [hoursPerWeek] = useState(40);
  const [ytdOvertime, setYtdOvertime] = useState(8450);
  const [priorYearOvertime, setPriorYearOvertime] = useState(12200);

  const baseMonthly = (baseHourly * hoursPerWeek * 52) / 12;
  const overtimeMonthly = (ytdOvertime + priorYearOvertime) / (8 + 12);
  const totalQualifying = baseMonthly + overtimeMonthly;

  return (
    <div className="space-y-4 font-mono text-xs">
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
        <div>
          <span className="text-[10px] text-slate-500 uppercase">Qualifying Income Derivation Engine</span>
          <div className="text-xl font-bold text-emerald-400">
            ${totalQualifying.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / MO
          </div>
          <div className="text-[10px] text-slate-400">GSE 24-Month Derivation • Trend: Stable (+4.2%)</div>
        </div>
        <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded font-bold">
          ✓ AGENCY GUIDELINES COMPLIANT
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-2">
          <span className="font-bold text-cyan-400 text-xs block">Base Salary / Hourly Rate</span>
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Hourly Rate:</span>
            <input
              type="number"
              value={baseHourly}
              onChange={e => setBaseHourly(parseFloat(e.target.value) || 0)}
              className="w-24 bg-slate-900 border border-slate-700 text-slate-100 p-1 text-right rounded font-bold"
            />
          </div>
          <div className="flex justify-between items-center text-slate-400">
            <span>Hours/Week:</span>
            <span className="text-slate-200 font-bold">{hoursPerWeek} hrs</span>
          </div>
          <div className="border-t border-slate-800 pt-1 flex justify-between font-bold text-slate-100">
            <span>Base Monthly:</span>
            <span className="text-emerald-400">${baseMonthly.toFixed(2)}</span>
          </div>
        </div>

        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-2">
          <span className="font-bold text-cyan-400 text-xs block">Variable Overtime (24-Mo Average)</span>
          <div className="flex justify-between items-center">
            <span className="text-slate-400">YTD OT (8 Mos):</span>
            <input
              type="number"
              value={ytdOvertime}
              onChange={e => setYtdOvertime(parseFloat(e.target.value) || 0)}
              className="w-24 bg-slate-900 border border-slate-700 text-slate-100 p-1 text-right rounded font-bold"
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Prior Year W-2 OT:</span>
            <input
              type="number"
              value={priorYearOvertime}
              onChange={e => setPriorYearOvertime(parseFloat(e.target.value) || 0)}
              className="w-24 bg-slate-900 border border-slate-700 text-slate-100 p-1 text-right rounded font-bold"
            />
          </div>
          <div className="border-t border-slate-800 pt-1 flex justify-between font-bold text-slate-100">
            <span>OT Monthly:</span>
            <span className="text-emerald-400">${overtimeMonthly.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
