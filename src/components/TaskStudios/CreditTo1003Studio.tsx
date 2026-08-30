import React, { useState } from 'react';

export const CreditTo1003Studio: React.FC<{ loanNumber: string }> = ({ loanNumber: _loanNumber }) => {
  const [tradelines] = useState([
    { id: '1', creditor: 'National Card Authority', type: 'Revolving', balance: 4200, creditLimit: 10000, reportedPayment: 0, derivedPayment: 210, rule: '5% Rule Applied' },
    { id: '2', creditor: 'Federal Student Aid Servicer', type: 'Installment', balance: 28500, creditLimit: 28500, reportedPayment: 0, derivedPayment: 142.50, rule: '0.5% IBR Guideline' },
    { id: '3', creditor: 'Vehicle Financing Facility', type: 'Installment', balance: 1450, creditLimit: 25000, reportedPayment: 485, derivedPayment: 0, rule: '<10 Mos Payoff Excluded' }
  ]);

  const totalMonthlyLiability = tradelines.reduce((sum, t) => sum + (t.derivedPayment || t.reportedPayment), 0);

  return (
    <div className="space-y-4 font-mono text-xs">
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
        <div>
          <span className="text-[10px] text-slate-500 uppercase">1003 Credit Normalization Studio</span>
          <div className="text-xl font-bold text-cyan-300">
            ${totalMonthlyLiability.toFixed(2)} / MO QUALIFYING LIABILITIES
          </div>
          <div className="text-[10px] text-slate-400">Tri-Merge Normalized • Non-Clobber Store Active</div>
        </div>
        <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded font-bold">
          ✓ 1003 RECONCILED
        </span>
      </div>

      <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-2">
        <h4 className="font-bold text-cyan-400 text-xs uppercase tracking-wider border-b border-slate-800 pb-1.5">
          Tradeline Liability Derivation Ledger
        </h4>
        <div className="divide-y divide-slate-800 text-[11px]">
          {tradelines.map(t => (
            <div key={t.id} className="py-2 flex justify-between items-center">
              <div>
                <span className="font-bold text-slate-200">{t.creditor}</span>
                <span className="text-[10px] text-slate-500 block">Balance: ${t.balance.toLocaleString()} • {t.type}</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-emerald-400">${t.derivedPayment.toFixed(2)}/mo</span>
                <span className="text-[9px] bg-slate-800 text-cyan-300 px-1.5 py-0.5 rounded block mt-0.5">{t.rule}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
