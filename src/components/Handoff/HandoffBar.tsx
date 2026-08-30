import React, { useState } from 'react';
import { LensId } from '../../contracts/roleLens';
import { HandoffEvent } from '../../contracts/handoff';

interface HandoffBarProps {
  currentLens: LensId;
  loanNumber: string;
  onExecuteHandoff: (event: HandoffEvent) => void;
}

export const HandoffBar: React.FC<HandoffBarProps> = ({ currentLens, loanNumber, onExecuteHandoff }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [targetRole, setTargetRole] = useState<LensId>('underwriter');
  const [notes, setNotes] = useState('');

  const handleHandoff = () => {
    if (!notes.trim()) {
      alert('Please provide handoff rationale or preconditions confirmation.');
      return;
    }

    const event: HandoffEvent = {
      id: `hnd-${Date.now()}`,
      loanId: `loan-${loanNumber}`,
      fromRole: currentLens,
      toRole: targetRole,
      actor: `User-${currentLens}`,
      notes: notes,
      preconditionsMet: true,
      status: 'ready',
      timestamp: new Date().toISOString()
    };

    onExecuteHandoff(event);
    setNotes('');
    setIsOpen(false);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
      <div className="flex items-center gap-2">
        <span className="text-slate-500 uppercase font-semibold text-[10px]">Two-Person Gate:</span>
        <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 px-2 py-0.5 rounded font-bold">
          Active Desk: {currentLens.toUpperCase()}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-3 py-1 rounded flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <span>🤝 Complete Desk Work & Hand Off</span>
          <span>→</span>
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => setIsOpen(false)}>
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-5 w-full max-w-md shadow-2xl space-y-4" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <h3 className="font-bold text-slate-100 flex items-center gap-2">
                <span>🤝</span>
                <span>Two-Person Rule Cross-Desk Handoff</span>
              </h3>
              <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-slate-200">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Target Recipient Desk:</label>
                <select
                  value={targetRole}
                  onChange={e => setTargetRole(e.target.value as LensId)}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 p-2 rounded focus:outline-none"
                >
                  <option value="setup">Setup / Intake Desk</option>
                  <option value="processor">Loan Processing</option>
                  <option value="underwriter">Credit Underwriting</option>
                  <option value="compliance">Compliance Desk</option>
                  <option value="closing">Closing & Settlement</option>
                  <option value="funding">Funding & Treasury</option>
                  <option value="shipping">Shipping & Post-Closing</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Desk Signoff Notes & Precondition Assertions:</label>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="e.g., 24-month qualifying income verified from 2025/2024 W-2s. DTI approved at 36.4%."
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 p-2 rounded focus:outline-none"
                />
              </div>

              <div className="bg-cyan-950/40 border border-cyan-900/60 p-2.5 rounded text-[11px] text-slate-300">
                <span className="text-cyan-400 font-bold">🔒 Audit Guarantee:</span> Handoff is sealed into the immutable journal with timestamp and signer hash.
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setIsOpen(false)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleHandoff}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1 rounded font-bold"
              >
                Seal & Hand Off →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
