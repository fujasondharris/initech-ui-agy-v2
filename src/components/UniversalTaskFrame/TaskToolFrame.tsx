import React, { useState } from 'react';
import { TaskToolId } from '../../contracts/workItem';
import { IncomeCalculationStudio } from '../TaskStudios/IncomeCalculationStudio';
import { CreditTo1003Studio } from '../TaskStudios/CreditTo1003Studio';
import { AppraisalReviewStudio } from '../TaskStudios/AppraisalReviewStudio';
import { CondoProjectReviewer } from '../TaskStudios/CondoProjectReviewer';
import { DualAusOrderingHub } from '../TaskStudios/DualAusOrderingHub';
import { DiscloseLoanTool } from '../TaskStudios/DiscloseLoanTool';
import { BalanceCdSettlementTool } from '../TaskStudios/BalanceCdSettlementTool';
import { GovernmentInsuringTool } from '../TaskStudios/GovernmentInsuringTool';
import { PostClosingFleetTool } from '../TaskStudios/PostClosingFleetTool';
import { ConditionsClearanceTool } from '../TaskStudios/ConditionsClearanceTool';

interface TaskToolFrameProps {
  loanNumber: string;
  initialToolId?: TaskToolId;
  onClose?: () => void;
}

export const TaskToolFrame: React.FC<TaskToolFrameProps> = ({
  loanNumber,
  initialToolId = 'calculate_income',
  onClose
}) => {
  const [selectedToolId, setSelectedToolId] = useState<TaskToolId>(initialToolId);
  const activeStep = 2;

  const tools: Array<{ id: TaskToolId; title: string; icon: string }> = [
    { id: 'calculate_income', title: 'Qualifying Income Studio', icon: '💵' },
    { id: 'credit_normalization', title: '1003 Credit Normalization', icon: '💳' },
    { id: 'review_appraisal', title: 'UAD 3.6 Appraisal Studio', icon: '🏡' },
    { id: 'review_condo', title: '2026 Condo Clearance Engine', icon: '🏢' },
    { id: 'order_services', title: 'Dual AUS Ordering Hub', icon: '⚡' },
    { id: 'disclose_loan', title: 'TRID Disclosures Tool', icon: '📜' },
    { id: 'balance_cd', title: '3-Party Fee Control & CD', icon: '⚖️' },
    { id: 'insure_loan', title: 'Government Insuring Tool', icon: '🏛️' },
    { id: 'post_closing_fleet', title: 'Post-Closing Fleet', icon: '🚢' },
    { id: 'clear_conditions', title: 'Conditions Clearance', icon: '✅' },
  ];

  const currentTool = tools.find(t => t.id === selectedToolId) || tools[0];

  const renderStudio = () => {
    switch (selectedToolId) {
      case 'calculate_income': return <IncomeCalculationStudio loanNumber={loanNumber} />;
      case 'credit_normalization': return <CreditTo1003Studio loanNumber={loanNumber} />;
      case 'review_appraisal': return <AppraisalReviewStudio loanNumber={loanNumber} />;
      case 'review_condo': return <CondoProjectReviewer loanNumber={loanNumber} />;
      case 'order_services': return <DualAusOrderingHub loanNumber={loanNumber} />;
      case 'disclose_loan': return <DiscloseLoanTool loanNumber={loanNumber} />;
      case 'balance_cd': return <BalanceCdSettlementTool loanNumber={loanNumber} />;
      case 'insure_loan': return <GovernmentInsuringTool loanNumber={loanNumber} />;
      case 'post_closing_fleet': return <PostClosingFleetTool loanNumber={loanNumber} />;
      case 'clear_conditions': return <ConditionsClearanceTool loanNumber={loanNumber} />;
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl font-mono text-xs space-y-0">
      <div className="bg-slate-950 border-b border-slate-800 p-3.5 flex flex-wrap justify-between items-center gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-base">{currentTool.icon}</span>
            <div>
              <h2 className="text-sm font-bold text-slate-100">{currentTool.title}</h2>
              <span className="text-[10px] text-slate-500 font-mono">Loan #{loanNumber} • Active Task Studio</span>
            </div>
          </div>
          <span className="text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800 px-2 py-0.5 rounded font-bold">
            ⚡ DETERMINISTIC ENGINE
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-500 text-[11px]">Task Tool:</span>
          <select
            value={selectedToolId}
            onChange={e => setSelectedToolId(e.target.value as TaskToolId)}
            className="bg-slate-900 border border-slate-700 text-slate-200 px-2 py-1 rounded text-[11px] font-bold focus:outline-none"
          >
            {tools.map(t => (
              <option key={t.id} value={t.id}>{t.icon} {t.title}</option>
            ))}
          </select>
          {onClose && (
            <button onClick={onClose} className="text-slate-500 hover:text-slate-200 px-2">✕</button>
          )}
        </div>
      </div>

      <div className="bg-slate-950/60 border-b border-slate-800 px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-[10px]">
        <div className="flex items-center gap-4">
          <span className={activeStep >= 1 ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
            ✓ 1. Ingestion & Preconditions
          </span>
          <span>→</span>
          <span className={activeStep >= 2 ? 'text-cyan-300 font-bold bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800' : 'text-slate-500'}>
            ⚙️ 2. Analysis & Calculation
          </span>
          <span>→</span>
          <span className={activeStep >= 3 ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
            3. Exceptions & Rules
          </span>
          <span>→</span>
          <span className={activeStep >= 4 ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
            4. Tamper-Evident Signoff
          </span>
        </div>

        <span className="text-slate-500 font-mono">Status: Ready for Assertion Emission</span>
      </div>

      <div className="p-4 bg-slate-900/90">
        {renderStudio()}
      </div>

      <div className="bg-slate-950 border-t border-slate-800 p-3 flex justify-between items-center">
        <div className="text-[10px] text-slate-500">
          Assertion: <span className="text-emerald-400 font-mono">sha256-4bb45e... verified</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => alert(`Saved state for ${currentTool.title} on Loan #${loanNumber}`)}
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1 rounded text-xs transition-colors"
          >
            Save Snapshot
          </button>
          <button
            onClick={() => alert(`Tamper-evident assertion emitted for ${currentTool.title}!`)}
            className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-4 py-1 rounded text-xs transition-colors shadow-sm"
          >
            Emit Assertion & Seal →
          </button>
        </div>
      </div>
    </div>
  );
};
