import React, { useState } from 'react';
import { LoanProjection, BannerTileConfig } from '../../contracts/loanProjection';

interface LoanBannerProps {
  loan: LoanProjection;
}

export const LoanBanner: React.FC<LoanBannerProps> = ({ loan }) => {
  const [config, setConfig] = useState<BannerTileConfig>({
    amount: true,
    rate: true,
    ltv: true,
    dti: true,
    fico: true,
    milestone: true,
    lock: true,
    occupancy: true,
    property: true
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleTile = (key: keyof BannerTileConfig) => {
    setConfig(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <header className="bg-slate-900 border-b border-slate-800 p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
      <div className="flex items-center gap-3">
        <div className="bg-cyan-950 border border-cyan-800 px-2.5 py-1 rounded text-cyan-300 font-bold flex items-center gap-1.5">
          <span>📁</span>
          <span>LN #{loan.loanNumber}</span>
        </div>
        <div>
          <div className="font-bold text-slate-100 flex items-center gap-2">
            <span>{loan.borrowerName}</span>
            {loan.coBorrowerName && <span className="text-slate-400 font-normal">/ {loan.coBorrowerName}</span>}
          </div>
          <div className="text-[10px] text-slate-500 font-mono flex items-center gap-2">
            <span>{loan.propertyCity}, {loan.propertyState}</span>
            <span>•</span>
            <span>Version: {loan.sourceVersion}</span>
            {loan.isStale && <span className="text-amber-400 font-bold">[STALE DATA]</span>}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {config.amount && (
          <div className="bg-slate-950 border border-slate-800 px-2 py-1 rounded">
            <span className="text-[9px] text-slate-500 block uppercase">Loan Amount</span>
            <span className="font-bold text-emerald-400">${loan.baseLoanAmount.toLocaleString()}</span>
          </div>
        )}
        {config.rate && (
          <div className="bg-slate-950 border border-slate-800 px-2 py-1 rounded">
            <span className="text-[9px] text-slate-500 block uppercase">Note Rate</span>
            <span className="font-bold text-slate-200">{loan.noteRate.toFixed(3)}%</span>
          </div>
        )}
        {config.ltv && (
          <div className="bg-slate-950 border border-slate-800 px-2 py-1 rounded">
            <span className="text-[9px] text-slate-500 block uppercase">LTV / CLTV</span>
            <span className="font-bold text-slate-200">{loan.ltv.toFixed(1)}%</span>
          </div>
        )}
        {config.dti && (
          <div className="bg-slate-950 border border-slate-800 px-2 py-1 rounded">
            <span className="text-[9px] text-slate-500 block uppercase">DTI Ratio</span>
            <span className="font-bold text-slate-200">{loan.dti.toFixed(1)}%</span>
          </div>
        )}
        {config.fico && (
          <div className="bg-slate-950 border border-slate-800 px-2 py-1 rounded">
            <span className="text-[9px] text-slate-500 block uppercase">FICO Score</span>
            <span className={`font-bold ${loan.representativeFico >= 700 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {loan.representativeFico}
            </span>
          </div>
        )}
        {config.lock && (
          <div className="bg-slate-950 border border-slate-800 px-2 py-1 rounded">
            <span className="text-[9px] text-slate-500 block uppercase">Lock Expiry</span>
            <span className="font-bold text-cyan-400">{loan.lockStatus} ({loan.lockDaysRemaining}d)</span>
          </div>
        )}
        {config.milestone && (
          <div className="bg-slate-950 border border-slate-800 px-2 py-1 rounded">
            <span className="text-[9px] text-slate-500 block uppercase">Milestone</span>
            <span className="font-bold text-indigo-300">{loan.milestone}</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded text-[11px] flex items-center gap-1 border border-slate-700 transition-colors"
          title="Customize Banner Tiles"
          aria-label="Customize Banner Tiles"
        >
          <span>⚙️</span>
          <span>Tiles</span>
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => setIsModalOpen(false)}>
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 w-full max-w-sm shadow-2xl space-y-3" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <h3 className="font-bold text-slate-100 flex items-center gap-1.5">
                <span>⚙️</span>
                <span>Customize Header Metric Tiles</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-slate-200">✕</button>
            </div>
            <p className="text-[11px] text-slate-400">Toggle which key indicators are pinned to the active loan banner:</p>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              {Object.keys(config).map((key) => (
                <label key={key} className="flex items-center gap-2 p-1.5 bg-slate-950 rounded border border-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config[key as keyof BannerTileConfig]}
                    onChange={() => toggleTile(key as keyof BannerTileConfig)}
                    className="accent-cyan-500"
                  />
                  <span className="capitalize text-slate-300">{key}</span>
                </label>
              ))}
            </div>
            <div className="text-right pt-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-cyan-600 hover:bg-cyan-500 text-white px-3 py-1 rounded text-xs font-bold transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
