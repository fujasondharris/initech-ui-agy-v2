import React from 'react';
import { LensId } from '../../contracts/roleLens';

export const ALL_ROLE_LENSES: Array<{ id: LensId; displayName: string; category: string; icon: string }> = [
  { id: "originator", displayName: "Loan Officer / Originator", category: "Loan Operations", icon: "👔" },
  { id: "setup", displayName: "Setup / Intake Desk", category: "Loan Operations", icon: "📥" },
  { id: "processor", displayName: "Loan Processor", category: "Loan Operations", icon: "⚙️" },
  { id: "underwriter", displayName: "Credit Underwriter", category: "Credit Decision", icon: "⚖️" },
  { id: "compliance", displayName: "Compliance Officer", category: "Control", icon: "🛡️" },
  { id: "closing", displayName: "Closing & Settlement", category: "Loan Operations", icon: "🚀" },
  { id: "funding", displayName: "Funding & Treasury", category: "Controlled Effect", icon: "🏦" },
  { id: "funding-control-approver", displayName: "Funding Control Approver", category: "Independent Approval", icon: "🔐" },
  { id: "shipping", displayName: "Shipping / Post-Closing", category: "Post-Close", icon: "📦" },
  { id: "insurance", displayName: "Insurance & Guaranty", category: "Post-Close", icon: "🏛️" },
  { id: "secondary", displayName: "Secondary & Capital Markets", category: "Capital Markets", icon: "📈" },
  { id: "collateral", displayName: "Collateral & Appraisal Desk", category: "Specialist", icon: "🏡" },
  { id: "manager", displayName: "Manager & Pipeline Supervisor", category: "Management", icon: "📊" },
  { id: "quality-control", displayName: "Quality Control (QC)", category: "Independent Review", icon: "🔍" },
  { id: "administrator", displayName: "Product Administrator", category: "Administration", icon: "⚡" },
  { id: "auditor", displayName: "Auditor (Read-Only Observer)", category: "Independent Review", icon: "📜" },
  { id: "security-administrator", displayName: "Security & Identity Admin", category: "Administration", icon: "🔒" },
  { id: "infrastructure-data-custodian", displayName: "Data & Custody Admin", category: "Lender Custody", icon: "💾" },
  { id: "separated-approver", displayName: "Separated Approver", category: "Independent Approval", icon: "🛡️" },
  { id: "support-recovery-operator", displayName: "Support & Recovery Desk", category: "Operations", icon: "🛠️" }
];

interface RoleSwitcherProps {
  activeLensId: LensId;
  onSelectLens: (lensId: LensId) => void;
}

export const RoleSwitcher: React.FC<RoleSwitcherProps> = ({ activeLensId, onSelectLens }) => {
  const activeLens = ALL_ROLE_LENSES.find(l => l.id === activeLensId) || ALL_ROLE_LENSES[0];

  return (
    <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs">
      <span className="text-slate-500 font-semibold text-[10px] uppercase tracking-wider">Role Lens:</span>
      <select
        value={activeLensId}
        onChange={(e) => onSelectLens(e.target.value as LensId)}
        className="bg-slate-950 border border-slate-700 text-cyan-300 font-bold px-2 py-0.5 rounded focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer"
        aria-label="Select Role Lens"
      >
        {ALL_ROLE_LENSES.map((lens) => (
          <option key={lens.id} value={lens.id}>
            {lens.icon} {lens.displayName} ({lens.category})
          </option>
        ))}
      </select>
      <span className="text-[10px] bg-cyan-950/80 text-cyan-400 border border-cyan-800 px-1.5 py-0.5 rounded font-mono">
        {activeLens.category}
      </span>
    </div>
  );
};
