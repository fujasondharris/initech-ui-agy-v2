import React, { useState } from 'react';

type InsuringAgency = 'fha' | 'va';

export const GovernmentInsuringTool: React.FC<{ loanNumber: string }> = ({ loanNumber: _loanNumber }) => {
  const [agency, setAgency] = useState<InsuringAgency>('fha');

  // FHA State
  const [fhaCaseNumber, setFhaCaseNumber] = useState('494-5717316');
  const [ufmipAmount] = useState(7000.00);
  const [ufmipPaidDate] = useState('2026-08-29');
  const [lateEndorsement, setLateEndorsement] = useState(false);

  // VA State (VA Form 26-6393)
  const [familySize, setFamilySize] = useState(4);
  const [region, setRegion] = useState<'Northeast' | 'Midwest' | 'South' | 'West'>('South');
  const [grossMonthlyIncome, setGrossMonthlyIncome] = useState(9850.00);
  const [federalTaxes, setFederalTaxes] = useState(1250.00);
  const [stateTaxes, setStateTaxes] = useState(380.00);
  const [socialSecurity, setSocialSecurity] = useState(610.70);
  const [proposedPiti, setProposedPiti] = useState(2650.00);
  const [installmentDebts, setInstallmentDebts] = useState(485.00);
  const [squareFootage, setSquareFootage] = useState(2400);

  // Maintenance & Utilities formula: $0.14 per sq ft
  const maintenanceUtilities = squareFootage * 0.14;
  const totalDeductions = federalTaxes + stateTaxes + socialSecurity + proposedPiti + installmentDebts + maintenanceUtilities;
  const netResidualIncome = grossMonthlyIncome - totalDeductions;

  // VA Guideline Residual Requirement Table (for loan amount > $80k)
  const getRequiredResidual = (size: number, reg: string) => {
    const table: Record<string, number[]> = {
      Northeast: [450, 755, 909, 1025, 1060],
      Midwest: [429, 720, 866, 977, 1010],
      South: [429, 720, 866, 977, 1010],
      West: [460, 772, 930, 1048, 1080]
    };
    const row = table[reg] || table['South'];
    const idx = Math.min(Math.max(size - 1, 0), 4);
    return row[idx] + (size > 5 ? (size - 5) * 80 : 0);
  };

  const requiredResidual = getRequiredResidual(familySize, region);
  const residualSurplus = netResidualIncome - requiredResidual;

  return (
    <div className="space-y-4 font-mono text-xs">
      {/* Top Banner */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-wrap justify-between items-center gap-3">
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Government Program Insuring Gateway</span>
          <div className="text-xl font-bold text-cyan-300">
            {agency === 'fha' ? `FHA 203(b) CASE #${fhaCaseNumber}` : 'VA LOAN GUARANTY & RESIDUAL ANALYSIS'}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            {agency === 'fha'
              ? 'Agency XML Gateway Preflight Passed • Zero Warning Kickouts'
              : `VA Form 26-6393 Residual Surplus: +$${residualSurplus.toFixed(2)}/mo (${region} Region)`}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-slate-900 border border-slate-700 rounded p-0.5">
            <button
              onClick={() => setAgency('fha')}
              className={`px-3 py-1 rounded font-bold transition-all ${
                agency === 'fha' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🏛️ FHA Lane (B2G)
            </button>
            <button
              onClick={() => setAgency('va')}
              className={`px-3 py-1 rounded font-bold transition-all ${
                agency === 'va' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🎖️ VA Lane (Form 26-6393)
            </button>
          </div>
        </div>
      </div>

      {/* FHA Lane */}
      {agency === 'fha' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 space-y-3">
            <h4 className="font-bold text-cyan-400 text-xs uppercase tracking-wider border-b border-slate-800 pb-1.5">
              FHA B2G Portal Endorsement Preflight
            </h4>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">FHA Case Number:</span>
              <input
                type="text"
                value={fhaCaseNumber}
                onChange={e => setFhaCaseNumber(e.target.value)}
                className="w-36 bg-slate-900 border border-slate-700 text-slate-100 p-1 text-right rounded font-bold"
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Upfront MIP (1.75%):</span>
              <span className="text-emerald-400 font-bold">${ufmipAmount.toLocaleString()} (Paid {ufmipPaidDate})</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">AF14 Appraisal Logging Match:</span>
              <span className="text-emerald-400 font-bold">✓ Case Binder Matched</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Late Endorsement (&gt; 60 Days):</span>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={lateEndorsement}
                  onChange={e => setLateEndorsement(e.target.checked)}
                  className="accent-cyan-500"
                />
                <span className="text-slate-300">Requires Justification</span>
              </label>
            </div>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 space-y-2 text-[11px]">
            <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider border-b border-slate-800 pb-1.5">
              Portal Payload Status & MIC Dispatch
            </h4>
            <div className="space-y-1 text-slate-400">
              <div className="flex justify-between"><span>Borrower SSN Match:</span><span className="text-emerald-400 font-bold">✓ Matched</span></div>
              <div className="flex justify-between"><span>Property Address Normalization:</span><span className="text-emerald-400 font-bold">✓ USPS Standardized</span></div>
              <div className="flex justify-between"><span>LDP / SAM Excluded Parties Scrub:</span><span className="text-emerald-400 font-bold">✓ 0 Records</span></div>
              <div className="flex justify-between"><span>Maximum Insurable Mortgage Test:</span><span className="text-emerald-400 font-bold">✓ $400,000 &le; $498,257 Cap</span></div>
            </div>
            <div className="border-t border-slate-800 pt-2 text-right">
              <button
                onClick={() => alert('FHA B2G Insurance Application dispatched successfully!')}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded font-bold transition-all shadow"
              >
                Submit B2G Insurance Binder →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VA Lane */}
      {agency === 'va' && (
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-4">
          <h4 className="font-bold text-cyan-400 text-xs uppercase tracking-wider border-b border-slate-800 pb-1.5">
            VA Form 26-6393 Loan Analysis & Residual Income Engine
          </h4>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
              <span className="text-[10px] text-slate-500 block">Family / Household Size</span>
              <input
                type="number"
                value={familySize}
                onChange={e => setFamilySize(parseInt(e.target.value) || 1)}
                className="w-full bg-slate-950 border border-slate-700 text-slate-100 p-1 text-right rounded font-bold"
              />
            </div>

            <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
              <span className="text-[10px] text-slate-500 block">VA Geographic Region</span>
              <select
                value={region}
                onChange={e => setRegion(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-700 text-slate-100 p-1 rounded font-bold text-xs"
              >
                <option value="South">South Region</option>
                <option value="West">West Region</option>
                <option value="Midwest">Midwest Region</option>
                <option value="Northeast">Northeast Region</option>
              </select>
            </div>

            <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
              <span className="text-[10px] text-slate-500 block">Gross Living Area (Sq Ft)</span>
              <input
                type="number"
                value={squareFootage}
                onChange={e => setSquareFootage(parseInt(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-700 text-slate-100 p-1 text-right rounded font-bold"
              />
            </div>

            <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
              <span className="text-[10px] text-slate-500 block">Gross Monthly Income ($)</span>
              <input
                type="number"
                value={grossMonthlyIncome}
                onChange={e => setGrossMonthlyIncome(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-700 text-slate-100 p-1 text-right rounded font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px]">
            <div className="bg-slate-900 p-3 rounded border border-slate-800 space-y-1.5">
              <span className="font-bold text-slate-300 block">Monthly Deductions & Withholdings</span>
              <div className="flex justify-between text-slate-400"><span>Proposed PITI:</span><span className="text-slate-200 font-bold">${proposedPiti.toFixed(2)}</span></div>
              <div className="flex justify-between text-slate-400"><span>Fed & State Income Taxes:</span><span className="text-slate-200 font-bold">${(federalTaxes + stateTaxes).toFixed(2)}</span></div>
              <div className="flex justify-between text-slate-400"><span>Social Security / FICA:</span><span className="text-slate-200 font-bold">${socialSecurity.toFixed(2)}</span></div>
              <div className="flex justify-between text-slate-400"><span>Installment & Revolving Debts:</span><span className="text-slate-200 font-bold">${installmentDebts.toFixed(2)}</span></div>
              <div className="flex justify-between text-slate-400"><span>Maintenance & Utilities ($0.14/sqft):</span><span className="text-slate-200 font-bold">${maintenanceUtilities.toFixed(2)}</span></div>
              <div className="border-t border-slate-800 pt-1 flex justify-between font-bold text-slate-200">
                <span>Total Monthly Deductions:</span>
                <span className="text-rose-400">${totalDeductions.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-slate-900 p-3 rounded border border-slate-800 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="font-bold text-slate-300 block">VA Form 26-6393 Residual Results</span>
                <div className="flex justify-between text-slate-400">
                  <span>Net Residual Income:</span>
                  <span className="text-emerald-400 font-bold text-sm">${netResidualIncome.toFixed(2)}/mo</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Required Residual ({region}, Size {familySize}):</span>
                  <span className="text-slate-200 font-bold">${requiredResidual.toFixed(2)}/mo</span>
                </div>
                <div className="flex justify-between font-bold border-t border-slate-800 pt-1">
                  <span>Residual Surplus Margin:</span>
                  <span className={residualSurplus >= 0 ? 'text-emerald-400 font-bold text-sm' : 'text-rose-400 font-bold text-sm'}>
                    +${residualSurplus.toFixed(2)}/mo ({((netResidualIncome / requiredResidual) * 100).toFixed(0)}% of guideline)
                  </span>
                </div>
              </div>

              <div className="text-[10px] text-emerald-400 font-bold pt-2">
                ✓ VA Residual Benchmark Exceeded • COE Verified
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
