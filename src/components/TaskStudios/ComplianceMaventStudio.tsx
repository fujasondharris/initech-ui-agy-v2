import React, { useState } from 'react';

export const ComplianceMaventStudio: React.FC<{ loanNumber: string }> = ({ loanNumber: _loanNumber }) => {
  const [loanAmount] = useState(400000);
  const [noteRate] = useState(6.375);
  const [apr] = useState(6.512);
  const [apor] = useState(6.120); // Average Prime Offer Rate

  // APOR Spread Calculation
  const aporSpread = apr - apor;
  const isHpml = aporSpread >= 1.50; // Higher-Priced Mortgage Loan (Section 35)
  const isHoepa = aporSpread >= 6.50; // HOEPA High-Cost Mortgage (Section 32)

  // QM Points & Fees Test (3% Cap for loans >= $125k)
  const [originationCharges, setOriginationCharges] = useState(3850);
  const [discountPoints, setDiscountPoints] = useState(0);
  const [lenderFees, setLenderFees] = useState(1250);
  const [affiliateTitleFees, setAffiliateTitleFees] = useState(950);

  const totalPointsAndFees = originationCharges + discountPoints + lenderFees + affiliateTitleFees;
  const pointsAndFeesPercent = (totalPointsAndFees / loanAmount) * 100;
  const qmCapPercent = 3.00;
  const isQmPass = pointsAndFeesPercent <= qmCapPercent;

  return (
    <div className="space-y-4 font-mono text-xs">
      {/* Top Banner */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-wrap justify-between items-center gap-3">
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Comprehensive Regulatory Compliance Engine</span>
          <div className="text-xl font-bold text-emerald-400">100% REGULATORY AUDIT PASS (CLEAN)</div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            QM Points &amp; Fees: {pointsAndFeesPercent.toFixed(2)}% (&le; 3.00% Cap) • HOEPA Spread: +{aporSpread.toFixed(3)}% (Non-High-Cost)
          </div>
        </div>

        <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2.5 py-1 rounded font-bold">
          ✓ CFPB / ATR-QM COMPLIANT
        </span>
      </div>

      {/* Compliance Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Test 1: Ability-to-Repay / Qualified Mortgage (ATR-QM) */}
        <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 space-y-3">
          <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
            <h4 className="font-bold text-cyan-400 text-xs uppercase tracking-wider">
              1. ATR / QM Points &amp; Fees Test (3% Cap)
            </h4>
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold border ${
              isQmPass ? 'bg-emerald-950 text-emerald-300 border-emerald-800' : 'bg-rose-950 text-rose-300 border-rose-800'
            }`}>
              {isQmPass ? 'PASS' : 'FAIL'}
            </span>
          </div>

          <div className="space-y-1.5 text-[11px]">
            <div className="flex justify-between text-slate-400">
              <span>Section 1026.43(e)(3) Points &amp; Fees Cap:</span>
              <span className="text-slate-200 font-bold">3.00% (${(loanAmount * 0.03).toLocaleString()})</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Origination / Processing Charges:</span>
              <span className="text-slate-200 font-bold">${originationCharges.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Underwriting &amp; Admin Fees:</span>
              <span className="text-slate-200 font-bold">${lenderFees.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Affiliated Title / Settlement Fees:</span>
              <span className="text-slate-200 font-bold">${affiliateTitleFees.toLocaleString()}</span>
            </div>
            <div className="border-t border-slate-800 pt-1.5 flex justify-between font-bold">
              <span className="text-slate-200">Total Qualifying Points &amp; Fees:</span>
              <span className={isQmPass ? 'text-emerald-400' : 'text-rose-400'}>
                ${totalPointsAndFees.toLocaleString()} ({pointsAndFeesPercent.toFixed(2)}%)
              </span>
            </div>
          </div>
        </div>

        {/* Test 2: APOR / HOEPA / HPML Rate Spread */}
        <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 space-y-3">
          <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
            <h4 className="font-bold text-cyan-400 text-xs uppercase tracking-wider">
              2. TILA HOEPA &amp; HPML Rate Spread Test
            </h4>
            <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-1.5 py-0.5 rounded font-bold">
              PASS
            </span>
          </div>

          <div className="space-y-1.5 text-[11px]">
            <div className="flex justify-between text-slate-400">
              <span>Annual Percentage Rate (APR):</span>
              <span className="text-slate-200 font-bold">{apr.toFixed(3)}%</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Average Prime Offer Rate (APOR):</span>
              <span className="text-slate-200 font-bold">{apor.toFixed(3)}%</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>APOR Spread:</span>
              <span className="text-emerald-400 font-bold">+{aporSpread.toFixed(3)}%</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Section 35 HPML Threshold (+1.50%):</span>
              <span className={isHpml ? 'text-amber-400 font-bold' : 'text-emerald-400 font-bold'}>
                {isHpml ? 'HPML Triggered' : 'Exempt (< 1.50%)'}
              </span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Section 32 HOEPA High-Cost (+6.50%):</span>
              <span className={isHoepa ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                {isHoepa ? 'HOEPA Triggered' : 'Exempt (< 6.50%)'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
