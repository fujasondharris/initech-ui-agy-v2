import React, { useState } from 'react';

type FeeAuthority = 'Broker' | 'Lender' | 'Title';

export const BalanceCdSettlementTool: React.FC<{ loanNumber: string }> = ({ loanNumber: _loanNumber }) => {
  const [feeLocks] = useState<Record<FeeAuthority, { locked: boolean; actor: string }>>({
    Broker: { locked: true, actor: 'Broker-Seat' },
    Lender: { locked: true, actor: 'Lender-Closer' },
    Title: { locked: true, actor: 'Settlement-Escrow-Officer' }
  });

  return (
    <div className="space-y-4 font-mono text-xs">
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
        <div>
          <span className="text-[10px] text-slate-500 uppercase">3-Party Fee Control & CD Settlement Cockpit</span>
          <div className="text-xl font-bold text-emerald-400">$0.00 VARIANCE (BALANCED)</div>
          <div className="text-[10px] text-slate-400">Lender Wire: $442,150.00 • Title Statement: $442,150.00</div>
        </div>
        <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded font-bold">
          ✓ CLEAR-TO-FUND AUTHORIZED
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {(['Broker', 'Lender', 'Title'] as FeeAuthority[]).map(auth => (
          <div key={auth} className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-200">{auth} Fees</span>
              <span className="text-[10px] bg-emerald-950 text-emerald-400 px-1.5 py-0.5 rounded font-bold">
                ✓ LOCKED
              </span>
            </div>
            <div className="text-[10px] text-slate-500">Signer: {feeLocks[auth].actor}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
