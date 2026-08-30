import React, { useState } from 'react';

export type StateDimension =
  | 'normal'
  | 'loading'
  | 'empty'
  | 'inaccessible'
  | 'partial'
  | 'missing'
  | 'stale'
  | 'offline'
  | 'conflict'
  | 'review'
  | 'validation_failure'
  | 'permission_loss'
  | 'session_expired'
  | 'cancelled'
  | 'failed'
  | 'completed'
  | 'partial_effect'
  | 'effect_unknown'
  | 'causal_verification'
  | 'malicious_content'
  | 'role_configuration'
  | 'installation'
  | 'migration'
  | 'recovery';

interface StateDetail {
  id: StateDimension;
  label: string;
  category: 'Operational' | 'Exception & Hold' | 'Lifecycle & Security';
  badgeStyle: string;
  description: string;
  recoveryAction: string;
}

export const ALL_STATE_DIMENSIONS: StateDetail[] = [
  { id: 'normal', label: 'Normal / Nominal', category: 'Operational', badgeStyle: 'bg-emerald-950 text-emerald-300 border-emerald-800', description: 'Standard operational state with all facts verified and preconditions met.', recoveryAction: 'Proceed with standard pipeline task.' },
  { id: 'loading', label: 'Loading / In-Flight', category: 'Operational', badgeStyle: 'bg-cyan-950 text-cyan-300 border-cyan-800 animate-pulse', description: 'Asynchronous operation or mock-BFF sequence stream currently resolving.', recoveryAction: 'Wait for event stream settlement.' },
  { id: 'empty', label: 'Empty Target', category: 'Operational', badgeStyle: 'bg-slate-900 text-slate-400 border-slate-700', description: 'Zero initial entries or clean deployment state with no loans created.', recoveryAction: 'Initiate intake or guided adoption import.' },
  { id: 'inaccessible', label: 'Inaccessible / Role Guarded', category: 'Lifecycle & Security', badgeStyle: 'bg-rose-950 text-rose-300 border-rose-800', description: 'Access restricted due to strict separation of duties or zero default access policy.', recoveryAction: 'Request delegated authority grant from Administrator.' },
  { id: 'partial', label: 'Partial Ingestion', category: 'Operational', badgeStyle: 'bg-amber-950 text-amber-300 border-amber-800', description: 'Some required document artifacts present while others remain pending.', recoveryAction: 'Request missing borrower evidence packet.' },
  { id: 'missing', label: 'Missing Evidence', category: 'Operational', badgeStyle: 'bg-amber-950 text-amber-300 border-amber-800', description: 'Mandatory verification artifact (e.g. 2025 W-2 or Title Commitment) missing.', recoveryAction: 'Issue targeted evidence condition to borrower/escrow.' },
  { id: 'stale', label: 'Stale Version Conflict', category: 'Exception & Hold', badgeStyle: 'bg-amber-950 text-amber-300 border-amber-800', description: 'Underlying loan projection updated by concurrent underwriting session.', recoveryAction: 'Rebase draft changes against latest authoritative version.' },
  { id: 'offline', label: 'Offline / Disconnected', category: 'Operational', badgeStyle: 'bg-slate-900 text-slate-400 border-slate-700', description: 'Client operating in local offline cache mode with queued command intents.', recoveryAction: 'Replay queued idempotent intents upon reconnect.' },
  { id: 'conflict', label: 'Data Discrepancy Conflict', category: 'Exception & Hold', badgeStyle: 'bg-rose-950 text-rose-300 border-rose-800', description: 'Conflicting values observed between OCR extraction and loan application.', recoveryAction: 'Open side-by-side Evidence Dock to adjudicate ground truth.' },
  { id: 'review', label: 'Underwriter Review Required', category: 'Operational', badgeStyle: 'bg-indigo-950 text-indigo-300 border-indigo-800', description: 'Automated rules detected secondary variance requiring human signoff.', recoveryAction: 'Underwriter enters rationale and applies hash-sealed decision.' },
  { id: 'validation_failure', label: 'Validation Failure', category: 'Exception & Hold', badgeStyle: 'bg-rose-950 text-rose-300 border-rose-800', description: 'Form schema, DTI ceiling, or guideline parameter validation failed.', recoveryAction: 'Correct field values or apply guideline exception waiver.' },
  { id: 'permission_loss', label: 'Permission Loss', category: 'Lifecycle & Security', badgeStyle: 'bg-rose-950 text-rose-300 border-rose-800', description: 'Role lens revoked or expired during active session.', recoveryAction: 'Re-authenticate with active credential token.' },
  { id: 'session_expired', label: 'Session Expired', category: 'Lifecycle & Security', badgeStyle: 'bg-rose-950 text-rose-300 border-rose-800', description: 'Auth token lease expired; mutations blocked to preserve integrity.', recoveryAction: 'Renew cryptographic session token.' },
  { id: 'cancelled', label: 'Command Cancelled', category: 'Operational', badgeStyle: 'bg-slate-900 text-slate-400 border-slate-700', description: 'In-flight service request cancelled prior to external gateway dispatch.', recoveryAction: 'Review command log and re-plan intent if needed.' },
  { id: 'failed', label: 'Terminal Service Failure', category: 'Exception & Hold', badgeStyle: 'bg-rose-950 text-rose-300 border-rose-800', description: 'External service returned a fatal error response code.', recoveryAction: 'Inspect error diagnostics and route to Support Desk.' },
  { id: 'completed', label: 'Completed & Sealed', category: 'Operational', badgeStyle: 'bg-emerald-950 text-emerald-300 border-emerald-800', description: 'Task execution finished with immutable SHA-256 assertion emitted.', recoveryAction: 'Trigger two-person rule cross-desk handoff.' },
  { id: 'partial_effect', label: 'Partial External Effect', category: 'Exception & Hold', badgeStyle: 'bg-purple-950 text-purple-300 border-purple-800', description: 'Multi-part transaction partially committed before connection break.', recoveryAction: 'Query gateway status for deterministic atomic reconciliation.' },
  { id: 'effect_unknown', label: 'Effect Unknown (Hold)', category: 'Exception & Hold', badgeStyle: 'bg-purple-950 text-purple-300 border-purple-800 animate-pulse', description: 'External settlement dispatch timed out; blind retry prohibited.', recoveryAction: 'Perform manual wire callback and causal proof reconciliation.' },
  { id: 'causal_verification', label: 'Causal Proof Verified', category: 'Operational', badgeStyle: 'bg-emerald-950 text-emerald-300 border-emerald-800', description: 'External effect verified via independent IMAD/OMAD confirmation receipt.', recoveryAction: 'Clear hold state and advance loan milestone to Funded.' },
  { id: 'malicious_content', label: 'Malicious Content Neutralized', category: 'Lifecycle & Security', badgeStyle: 'bg-rose-950 text-rose-300 border-rose-800', description: 'Hostile XSS payload or malformed script injection stripped at boundary.', recoveryAction: 'Sanitized input preserved with security audit log entry.' },
  { id: 'role_configuration', label: 'Role Configuration Scope', category: 'Lifecycle & Security', badgeStyle: 'bg-cyan-950 text-cyan-300 border-cyan-800', description: 'Role lens configuration mapped to authorized work queues and surfaces.', recoveryAction: 'Switch role lens via header dropdown.' },
  { id: 'installation', label: 'Guided Fresh Installation', category: 'Lifecycle & Security', badgeStyle: 'bg-cyan-950 text-cyan-300 border-cyan-800', description: 'Initial clean-room environment configuration with zero loan state.', recoveryAction: 'Complete preflight checks and seal external authority root.' },
  { id: 'migration', label: 'Migration Watermark Delta', category: 'Lifecycle & Security', badgeStyle: 'bg-amber-950 text-amber-300 border-amber-800', description: 'Historical state adoption underway with dual-watermark delta capture.', recoveryAction: 'Execute cutover and verify reconciliation checksums.' },
  { id: 'recovery', label: 'Disaster / State Recovery', category: 'Exception & Hold', badgeStyle: 'bg-indigo-950 text-indigo-300 border-indigo-800', description: 'Recovery operator restoring snapshot from immutable journal ledger.', recoveryAction: 'Replay journal entries up to target watermark.' }
];

export const StateMatrixInspector: React.FC = () => {
  const [selectedState, setSelectedState] = useState<StateDetail>(ALL_STATE_DIMENSIONS[0]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 font-mono text-xs">
      <div className="flex justify-between items-center border-b border-slate-800 pb-2">
        <h2 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
          <span>🌐</span>
          <span>Comprehensive State Matrix Inspector (All 24 Operational Dimensions)</span>
        </h2>
        <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded font-bold">
          24 / 24 DIMENSIONS MODELLED
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {ALL_STATE_DIMENSIONS.map(s => (
          <button
            key={s.id}
            onClick={() => setSelectedState(s)}
            className={`p-2 rounded border text-left transition-all ${
              selectedState.id === s.id
                ? 'bg-slate-950 border-cyan-400 ring-1 ring-cyan-400/40 text-slate-100 shadow'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border block mb-1 uppercase truncate ${s.badgeStyle}`}>
              {s.id.replace('_', ' ')}
            </span>
            <span className="text-[11px] font-bold truncate block">{s.label}</span>
          </button>
        ))}
      </div>

      <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-3">
        <div className="flex justify-between items-center border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${selectedState.badgeStyle}`}>
              {selectedState.id}
            </span>
            <span className="font-bold text-slate-100 text-sm">{selectedState.label}</span>
          </div>
          <span className="text-[10px] bg-slate-900 text-slate-400 border border-slate-800 px-2 py-0.5 rounded">
            Category: {selectedState.category}
          </span>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-bold">System Behavior & State Semantics:</span>
          <p className="text-slate-300 text-xs">{selectedState.description}</p>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] text-cyan-400 uppercase font-bold">Deterministic Recovery Path:</span>
          <p className="text-emerald-300 text-xs font-bold">→ {selectedState.recoveryAction}</p>
        </div>
      </div>
    </div>
  );
};
