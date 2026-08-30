import React, { useState, useEffect } from 'react';
import { TaskToolId } from '../../contracts/workItem';
import { LensId } from '../../contracts/roleLens';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTool: (toolId: TaskToolId) => void;
  onSelectLens: (lensId: LensId) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectTool,
  onSelectLens
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    { id: 'tool_income', label: 'Open Income Calculation Studio', type: 'tool', toolId: 'calculate_income' as TaskToolId, icon: '💵' },
    { id: 'tool_credit', label: 'Open Credit to 1003 Normalization', type: 'tool', toolId: 'credit_normalization' as TaskToolId, icon: '💳' },
    { id: 'tool_appraisal', label: 'Open UAD 3.6 Appraisal Studio', type: 'tool', toolId: 'review_appraisal' as TaskToolId, icon: '🏡' },
    { id: 'tool_condo', label: 'Open Condo Project Clearance Engine', type: 'tool', toolId: 'review_condo' as TaskToolId, icon: '🏢' },
    { id: 'tool_aus', label: 'Open Dual AUS Comparative Matrix', type: 'tool', toolId: 'order_services' as TaskToolId, icon: '⚡' },
    { id: 'tool_cd', label: 'Open 3-Party Fee Control & CD Balancing', type: 'tool', toolId: 'balance_cd' as TaskToolId, icon: '⚖️' },
    { id: 'tool_compliance', label: 'Open Regulatory Compliance Engine (QM & APOR)', type: 'tool', toolId: 'compliance_mavent' as TaskToolId, icon: '🛡️' },
    { id: 'tool_insuring', label: 'Open Government Insuring Gateway', type: 'tool', toolId: 'insure_loan' as TaskToolId, icon: '🏛️' },
    { id: 'tool_postclosing', label: 'Open Post-Closing Investor Fleet', type: 'tool', toolId: 'post_closing_fleet' as TaskToolId, icon: '🚢' },
    { id: 'lens_underwriter', label: 'Switch Role to Credit Underwriter', type: 'lens', lensId: 'underwriter' as LensId, icon: '⚖️' },
    { id: 'lens_closing', label: 'Switch Role to Closing & Settlement', type: 'lens', lensId: 'closing' as LensId, icon: '🚀' },
    { id: 'lens_processor', label: 'Switch Role to Loan Processor', type: 'lens', lensId: 'processor' as LensId, icon: '⚙️' },
  ];

  const filtered = actions.filter(a => a.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-start justify-center pt-20" onClick={onClose}>
      <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-lg shadow-2xl overflow-hidden font-mono text-xs" onClick={e => e.stopPropagation()}>
        <div className="p-3 border-b border-slate-800 flex items-center gap-2">
          <span className="text-slate-500">⌘K</span>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Type a command, tool, or role to navigate..."
            className="w-full bg-transparent text-slate-100 placeholder-slate-500 focus:outline-none"
          />
          <button onClick={onClose} className="text-slate-500 hover:text-slate-200">ESC</button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.map(action => (
            <div
              key={action.id}
              onClick={() => {
                if (action.type === 'tool') onSelectTool(action.toolId!);
                if (action.type === 'lens') onSelectLens(action.lensId!);
                onClose();
              }}
              className="p-2.5 rounded-lg hover:bg-slate-800 cursor-pointer flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span>{action.icon}</span>
                <span className="text-slate-200">{action.label}</span>
              </div>
              <span className="text-[10px] bg-slate-950 text-slate-500 px-1.5 py-0.5 rounded uppercase">
                {action.type}
              </span>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="p-6 text-center text-slate-500">No matching commands found.</div>
          )}
        </div>
      </div>
    </div>
  );
};
