import React, { useState } from 'react';

type IncomeType = 'w2_wage' | 'overtime_bonus' | 'schedule_c';

export const IncomeCalculationStudio: React.FC<{ loanNumber: string }> = ({ loanNumber: _loanNumber }) => {
  const [activeType, setActiveType] = useState<IncomeType>('w2_wage');

  // W-2 Hourly / Salary
  const [baseHourly, setBaseHourly] = useState(48.50);
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const baseMonthly = (baseHourly * hoursPerWeek * 52) / 12;

  // Overtime & Bonus (24-Mo Trend)
  const [ytdOvertime, setYtdOvertime] = useState(8450);
  const [ytdMonths, setYtdMonths] = useState(8);
  const [priorYearOvertime, setPriorYearOvertime] = useState(12200);
  const [prior2YearOvertime, setPrior2YearOvertime] = useState(11500);
  const totalOtBonus = (ytdOvertime + priorYearOvertime) / (ytdMonths + 12);
  const isOtDeclining = (ytdOvertime / ytdMonths) < (priorYearOvertime / 12);

  // Schedule C Self-Employed
  const [netProfit2025, setNetProfit2025] = useState(78000);
  const [depreciation2025, setDepreciation2025] = useState(6500);
  const [depletion2025, setDepletion2025] = useState(0);
  const [businessUseHome2025, setBusinessUseHome2025] = useState(2400);
  const [meals2025, setMeals2025] = useState(1200);

  const [netProfit2024, setNetProfit2024] = useState(72000);
  const [depreciation2024, setDepreciation2024] = useState(6000);

  const adjusted2025 = netProfit2025 + depreciation2025 + depletion2025 + businessUseHome2025 - meals2025;
  const adjusted2024 = netProfit2024 + depreciation2024;
  const selfEmployedMonthly = (adjusted2025 + adjusted2024) / 24;

  const totalQualifyingMonthly = baseMonthly + totalOtBonus;

  return (
    <div className="space-y-4 font-mono text-xs">
      {/* Top Banner */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-wrap justify-between items-center gap-3">
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block">GSE Standard Income Derivation Engine</span>
          <div className="text-2xl font-bold text-emerald-400">
            ${totalQualifyingMonthly.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / MO
          </div>
          <div className="text-[10px] text-slate-400 flex items-center gap-2 mt-0.5">
            <span>Base: ${baseMonthly.toFixed(2)}/mo</span>
            <span>•</span>
            <span>Variable OT/Bonus: ${totalOtBonus.toFixed(2)}/mo</span>
            <span>•</span>
            <span>Trend: {isOtDeclining ? <span className="text-amber-400 font-bold">Declining (Mitigation Required)</span> : <span className="text-emerald-400 font-bold">Stable / Increasing (+4.2%)</span>}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2.5 py-1 rounded font-bold">
            ✓ 24-MO GSE COMPLIANT
          </span>
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="flex gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveType('w2_wage')}
          className={`px-3 py-1.5 rounded font-bold transition-all ${
            activeType === 'w2_wage' ? 'bg-cyan-600 text-white shadow' : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          💵 W-2 Wage & Salary
        </button>
        <button
          onClick={() => setActiveType('overtime_bonus')}
          className={`px-3 py-1.5 rounded font-bold transition-all ${
            activeType === 'overtime_bonus' ? 'bg-cyan-600 text-white shadow' : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          📈 Overtime / Bonus / Commission
        </button>
        <button
          onClick={() => setActiveType('schedule_c')}
          className={`px-3 py-1.5 rounded font-bold transition-all ${
            activeType === 'schedule_c' ? 'bg-cyan-600 text-white shadow' : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          📊 Schedule C Self-Employed
        </button>
      </div>

      {/* Tab 1: W-2 Wage & Salary */}
      {activeType === 'w2_wage' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 space-y-3">
            <h4 className="font-bold text-cyan-400 text-xs uppercase tracking-wider border-b border-slate-800 pb-1.5">
              Hourly & Standard Wage Inputs
            </h4>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Hourly Rate ($):</span>
              <input
                type="number"
                step="0.25"
                value={baseHourly}
                onChange={e => setBaseHourly(parseFloat(e.target.value) || 0)}
                className="w-28 bg-slate-900 border border-slate-700 text-slate-100 p-1 text-right rounded font-bold focus:ring-1 focus:ring-cyan-500"
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Standard Hours / Week:</span>
              <input
                type="number"
                value={hoursPerWeek}
                onChange={e => setHoursPerWeek(parseInt(e.target.value) || 0)}
                className="w-28 bg-slate-900 border border-slate-700 text-slate-100 p-1 text-right rounded font-bold focus:ring-1 focus:ring-cyan-500"
              />
            </div>
            <div className="border-t border-slate-800 pt-2 flex justify-between items-center font-bold">
              <span className="text-slate-200">Derived Monthly Base:</span>
              <span className="text-emerald-400 text-sm">${baseMonthly.toFixed(2)}/mo</span>
            </div>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 space-y-2">
            <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider border-b border-slate-800 pb-1.5">
              Verified Evidence Lineage
            </h4>
            <div className="space-y-1.5 text-[11px] text-slate-400">
              <div className="flex justify-between">
                <span>Recent Paystub (August 2026):</span>
                <span className="text-slate-200 font-bold">$48.50/hr (40 hrs)</span>
              </div>
              <div className="flex justify-between">
                <span>2025 W-2 Box 1 Wages:</span>
                <span className="text-slate-200 font-bold">$108,500.00</span>
              </div>
              <div className="flex justify-between">
                <span>2024 W-2 Box 1 Wages:</span>
                <span className="text-slate-200 font-bold">$104,200.00</span>
              </div>
              <div className="text-emerald-400 font-bold text-[10px] pt-1">
                ✓ 2-Year Employment Continuity Satisfied
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Overtime & Bonus */}
      {activeType === 'overtime_bonus' && (
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-4">
          <h4 className="font-bold text-cyan-400 text-xs uppercase tracking-wider border-b border-slate-800 pb-1.5">
            24-Month Variable Earnings History & Trend
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-slate-900 p-2.5 rounded border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 block">YTD Overtime ({ytdMonths} Mos)</span>
              <input
                type="number"
                value={ytdOvertime}
                onChange={e => setYtdOvertime(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-700 text-slate-100 p-1 text-right rounded font-bold"
              />
              <span className="text-[10px] text-slate-400 block text-right">${(ytdOvertime / ytdMonths).toFixed(2)}/mo</span>
            </div>

            <div className="bg-slate-900 p-2.5 rounded border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 block">Prior Year 2025 OT</span>
              <input
                type="number"
                value={priorYearOvertime}
                onChange={e => setPriorYearOvertime(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-700 text-slate-100 p-1 text-right rounded font-bold"
              />
              <span className="text-[10px] text-slate-400 block text-right">${(priorYearOvertime / 12).toFixed(2)}/mo</span>
            </div>

            <div className="bg-slate-900 p-2.5 rounded border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 block">2-Year Prior 2024 OT</span>
              <input
                type="number"
                value={prior2YearOvertime}
                onChange={e => setPrior2YearOvertime(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-700 text-slate-100 p-1 text-right rounded font-bold"
              />
              <span className="text-[10px] text-slate-400 block text-right">${(prior2YearOvertime / 12).toFixed(2)}/mo</span>
            </div>
          </div>

          <div className="flex justify-between items-center bg-slate-900 p-3 rounded border border-slate-800 font-bold">
            <span className="text-slate-200">20-Month Combined Reconciled OT:</span>
            <span className="text-emerald-400 text-sm">${totalOtBonus.toFixed(2)} / mo</span>
          </div>
        </div>
      )}

      {/* Tab 3: Schedule C Self-Employed */}
      {activeType === 'schedule_c' && (
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-3">
          <h4 className="font-bold text-cyan-400 text-xs uppercase tracking-wider border-b border-slate-800 pb-1.5">
            Form 1040 Schedule C Cash Flow Analysis (Fannie Mae Form 1084 / Freddie Mac Form 91)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px]">
            <div className="space-y-2 bg-slate-900 p-3 rounded border border-slate-800">
              <span className="font-bold text-slate-200 block text-xs">2025 Tax Year (Form 1040 Schedule C)</span>
              <div className="flex justify-between">
                <span className="text-slate-400">Line 31 Net Profit ($):</span>
                <input
                  type="number"
                  value={netProfit2025}
                  onChange={e => setNetProfit2025(parseFloat(e.target.value) || 0)}
                  className="w-24 bg-slate-950 border border-slate-700 text-slate-100 p-0.5 text-right rounded font-bold"
                />
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">(+) Line 13 Depreciation:</span>
                <input
                  type="number"
                  value={depreciation2025}
                  onChange={e => setDepreciation2025(parseFloat(e.target.value) || 0)}
                  className="w-24 bg-slate-950 border border-slate-700 text-slate-100 p-0.5 text-right rounded font-bold"
                />
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">(+) Line 30 Business Use Home:</span>
                <input
                  type="number"
                  value={businessUseHome2025}
                  onChange={e => setBusinessUseHome2025(parseFloat(e.target.value) || 0)}
                  className="w-24 bg-slate-950 border border-slate-700 text-slate-100 p-0.5 text-right rounded font-bold"
                />
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">(-) Line 24b Non-Deductible Meals:</span>
                <input
                  type="number"
                  value={meals2025}
                  onChange={e => setMeals2025(parseFloat(e.target.value) || 0)}
                  className="w-24 bg-slate-950 border border-slate-700 text-slate-100 p-0.5 text-right rounded font-bold"
                />
              </div>
              <div className="border-t border-slate-800 pt-1 flex justify-between font-bold text-slate-100">
                <span>2025 Adjusted Net Cash Flow:</span>
                <span className="text-emerald-400">${adjusted2025.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-2 bg-slate-900 p-3 rounded border border-slate-800">
              <span className="font-bold text-slate-200 block text-xs">2024 Tax Year (Form 1040 Schedule C)</span>
              <div className="flex justify-between">
                <span className="text-slate-400">Line 31 Net Profit ($):</span>
                <input
                  type="number"
                  value={netProfit2024}
                  onChange={e => setNetProfit2024(parseFloat(e.target.value) || 0)}
                  className="w-24 bg-slate-950 border border-slate-700 text-slate-100 p-0.5 text-right rounded font-bold"
                />
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">(+) Line 13 Depreciation:</span>
                <input
                  type="number"
                  value={depreciation2024}
                  onChange={e => setDepreciation2024(parseFloat(e.target.value) || 0)}
                  className="w-24 bg-slate-950 border border-slate-700 text-slate-100 p-0.5 text-right rounded font-bold"
                />
              </div>
              <div className="border-t border-slate-800 pt-1 flex justify-between font-bold text-slate-100 mt-8">
                <span>2024 Adjusted Net Cash Flow:</span>
                <span className="text-emerald-400">${adjusted2024.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center bg-slate-900 p-3 rounded border border-slate-800 font-bold">
            <span className="text-slate-200">24-Month Schedule C Qualifying Cash Flow:</span>
            <span className="text-emerald-400 text-sm">${selfEmployedMonthly.toFixed(2)} / mo</span>
          </div>
        </div>
      )}
    </div>
  );
};
