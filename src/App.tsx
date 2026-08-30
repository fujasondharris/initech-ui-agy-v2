import React, { useState } from 'react';
import { LensId } from './contracts/roleLens';
import { WorkItem, TaskToolId } from './contracts/workItem';
import { LoanProjection } from './contracts/loanProjection';
import { EvidenceItem } from './contracts/evidenceItem';
import { RoleSwitcher } from './components/Navigation/RoleSwitcher';
import { LoanBanner } from './components/Header/LoanBanner';
import { WorkItemQueue } from './components/TaskQueue/WorkItemQueue';
import { EvidenceDock } from './components/Evidence/EvidenceDock';
import { AuditTimeline, AuditEvent } from './components/Audit/AuditTimeline';
import { HandoffBar } from './components/Handoff/HandoffBar';
import { CommandPalette } from './components/CommandPalette/CommandPalette';
import { TaskToolFrame } from './components/UniversalTaskFrame/TaskToolFrame';
import { ComponentShowcase } from './components/Showcase/ComponentShowcase';
import { AdminConsole } from './components/Admin/AdminConsole';
import { InstallerConsole } from './components/Installer/InstallerConsole';

export const App: React.FC = () => {
  const [activeLensId, setActiveLensId] = useState<LensId>('processor');
  const [activeTab, setActiveTab] = useState<'queue' | 'studios' | 'evidence' | 'audit' | 'showcase' | 'admin' | 'installer'>('queue');
  const [activeToolId, setActiveToolId] = useState<TaskToolId>('calculate_income');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  const mockLoan: LoanProjection = {
    loanId: 'LN-2026-904128',
    loanNumber: '100099412',
    borrowerName: 'Sarah Jenkins',
    coBorrowerName: 'Michael Jenkins',
    baseLoanAmount: 400000.00,
    noteRate: 6.375,
    qualifyingRate: 6.375,
    ltv: 80.0,
    dti: 36.4,
    representativeFico: 742,
    milestone: 'Underwriting Review',
    lockStatus: 'Locked',
    lockExpirationDate: '2026-09-24',
    lockDaysRemaining: 25,
    occupancyType: 'PrimaryResidence',
    propertyAddress: '742 Evergreen Terrace',
    propertyCity: 'Austin',
    propertyState: 'TX',
    propertyZip: '78701',
    unitsCount: 1,
    appraisedValue: 500000.00,
    purchasePrice: 500000.00,
    sourceVersion: 'v4.1-rc',
    isStale: false
  };

  const mockWorkItems: WorkItem[] = [
    {
      id: 'task-1',
      loanId: mockLoan.loanId,
      loanNumber: mockLoan.loanNumber,
      borrowerName: mockLoan.borrowerName,
      roleLensId: 'underwriter',
      taskToolId: 'calculate_income',
      title: 'Derive 24-Month Qualifying Income',
      description: 'Audit 2025/2024 W-2 base salary + overtime trend. Mitigate variable income fluctuations.',
      priority: 'urgent',
      status: 'ready',
      slaDeadline: 'Today 17:00 CDT',
      preconditions: ['Received 2025 W-2', 'Received Recent Paystub'],
      doneCriteria: 'Income calculation assertion emitted with hash seal.',
      assignedTo: 'Underwriting Desk',
      createdAt: '2026-08-30T09:00:00Z'
    },
    {
      id: 'task-2',
      loanId: mockLoan.loanId,
      loanNumber: mockLoan.loanNumber,
      borrowerName: mockLoan.borrowerName,
      roleLensId: 'underwriter',
      taskToolId: 'review_appraisal',
      title: 'Review UAD 3.6 Appraisal & Comps',
      description: 'Verify component-level condition ratings (C1-C6) and Collateral Underwriter (CU) risk score.',
      priority: 'high',
      status: 'in_progress',
      slaDeadline: 'Tomorrow 12:00 CDT',
      preconditions: ['Received XML UAD 3.6 Appraisal'],
      doneCriteria: 'Appraisal review clear without unmitigated major variances.',
      assignedTo: 'Collateral Desk',
      createdAt: '2026-08-30T09:30:00Z'
    },
    {
      id: 'task-3',
      loanId: mockLoan.loanId,
      loanNumber: mockLoan.loanNumber,
      borrowerName: mockLoan.borrowerName,
      roleLensId: 'closing',
      taskToolId: 'balance_cd',
      title: 'Balance Closing Disclosure & 3-Party Locks',
      description: 'Reconcile 2015 itemization against Title Closing Statement. Achieve $0.00 variance.',
      priority: 'normal',
      status: 'waiting_external',
      slaDeadline: '09/02/2026',
      preconditions: ['Approved Underwriting Decision', 'Title Settlement Statement Received'],
      doneCriteria: 'All 3 fee parties locked and wire callback verified.',
      assignedTo: 'Settlement Closer',
      createdAt: '2026-08-30T10:00:00Z'
    },
    {
      id: 'task-4',
      loanId: mockLoan.loanId,
      loanNumber: mockLoan.loanNumber,
      borrowerName: mockLoan.borrowerName,
      roleLensId: 'insurance',
      taskToolId: 'insure_loan',
      title: 'FHA 203(b) Insurance Preflight Submission',
      description: 'Validate federal B2G XML payload and check for mandatory appraisal log match.',
      priority: 'normal',
      status: 'ready',
      slaDeadline: '09/05/2026',
      preconditions: ['Note Date Logged', 'UFMIP Remitted'],
      doneCriteria: 'FHA B2G Insurance application accepted with 0 kickouts.',
      assignedTo: 'Government Insuring Desk',
      createdAt: '2026-08-30T11:00:00Z'
    },
    {
      id: 'task-5',
      loanId: mockLoan.loanId,
      loanNumber: mockLoan.loanNumber,
      borrowerName: mockLoan.borrowerName,
      roleLensId: 'compliance',
      taskToolId: 'compliance_mavent',
      title: 'Audit ATR-QM Points & Fees and HOEPA APOR Spread',
      description: 'Run automated regulatory rule tests across 3% points/fees cap, Section 32/35 rate spreads, and TRID cures.',
      priority: 'urgent',
      status: 'ready',
      slaDeadline: 'Today 18:00 CDT',
      preconditions: ['Locked Loan Estimate', 'Settlement Fee Schedule'],
      doneCriteria: '100% compliance audit pass without uncurable tolerance violations.',
      assignedTo: 'Compliance Officer',
      createdAt: '2026-08-30T11:30:00Z'
    }
  ];

  const mockEvidence: EvidenceItem[] = [
    {
      id: 'ev-1',
      packetId: 'pkt-w2-2025',
      docType: 'W-2 Wage Statement',
      docTitle: '2025 W-2 Wage and Tax Statement',
      pageNumber: 1,
      boundingBox: { x: 140, y: 280, width: 220, height: 32 },
      confidence: 0.99,
      ocrSnippet: 'Box 1 Wages: $108,500.00',
      observedAt: '2026-08-30 09:12 CDT',
      reviewStatus: 'accepted'
    },
    {
      id: 'ev-2',
      packetId: 'pkt-paystub-aug',
      docType: 'Paystub',
      docTitle: 'Recent Earnings Statement (August 2026)',
      pageNumber: 1,
      boundingBox: { x: 80, y: 190, width: 310, height: 40 },
      confidence: 0.98,
      ocrSnippet: 'Hourly Rate: $48.50 | YTD OT: $8,450.00',
      observedAt: '2026-08-30 09:14 CDT',
      reviewStatus: 'accepted'
    },
    {
      id: 'ev-3',
      packetId: 'pkt-appraisal-xml',
      docType: 'UAD 3.6 Appraisal',
      docTitle: 'MISMO 3.6 Collateral Valuation Packet',
      pageNumber: 1,
      boundingBox: { x: 200, y: 450, width: 260, height: 35 },
      confidence: 0.97,
      ocrSnippet: 'Final Reconciled Value: $485,000.00 (C2/Q3)',
      observedAt: '2026-08-30 09:35 CDT',
      reviewStatus: 'accepted'
    }
  ];

  const mockAuditEvents: AuditEvent[] = [
    {
      id: 'evt-1',
      timestamp: '2026-08-30 09:12:04 CDT',
      actor: 'Underwriting Desk',
      action: 'Income Calculation Derived ($10,064.58/mo)',
      target: 'Loan #100099412',
      digest: 'sha256-4bb45e520bf4a5db9021',
      status: 'verified'
    },
    {
      id: 'evt-2',
      timestamp: '2026-08-30 09:36:12 CDT',
      actor: 'Collateral Engine',
      action: 'UAD 3.6 Appraisal Cleared (CU Score 1.2)',
      target: 'Loan #100099412',
      digest: 'sha256-a99182bf901cde0459a1',
      status: 'verified'
    },
    {
      id: 'evt-3',
      timestamp: '2026-08-30 10:15:30 CDT',
      actor: 'Settlement Closer',
      action: 'Three-Party Fee Control Sealed (Broker/Lender/Title)',
      target: 'Loan #100099412',
      digest: 'sha256-8679884ac2145229a230',
      status: 'verified'
    }
  ];

  const handleOpenTaskTool = (toolId: TaskToolId) => {
    setActiveToolId(toolId);
    setActiveTab('studios');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-mono text-xs">
      <div className="bg-slate-950 border-b border-slate-800 px-4 py-2 flex flex-wrap justify-between items-center gap-3">
        <div className="flex items-center gap-3">
          <span className="text-cyan-400 font-bold text-sm tracking-wider flex items-center gap-1.5">
            <span>⚡</span>
            <span>INITECH APPLIANCE OS (V2)</span>
          </span>
          <span className="text-[10px] bg-slate-900 text-slate-400 border border-slate-800 px-1.5 py-0.5 rounded">
            AGY INDEPENDENT BUILD
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 px-2.5 py-1 rounded text-xs flex items-center gap-2 transition-colors cursor-pointer"
          >
            <span>🔍 Search / Jump</span>
            <kbd className="bg-slate-950 border border-slate-700 px-1 py-0.5 rounded text-[10px] text-slate-400">⌘K</kbd>
          </button>

          <RoleSwitcher activeLensId={activeLensId} onSelectLens={setActiveLensId} />
        </div>
      </div>

      <LoanBanner loan={mockLoan} />

      <div className="bg-slate-900/60 border-b border-slate-800 px-4 flex flex-wrap gap-1">
        <button
          onClick={() => setActiveTab('queue')}
          className={`px-4 py-2.5 font-bold transition-all border-b-2 ${
            activeTab === 'queue' ? 'border-cyan-400 text-cyan-300 bg-slate-900' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          📋 Work Queue ({mockWorkItems.length})
        </button>

        <button
          onClick={() => setActiveTab('studios')}
          className={`px-4 py-2.5 font-bold transition-all border-b-2 ${
            activeTab === 'studios' ? 'border-cyan-400 text-cyan-300 bg-slate-900' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          🔧 Task Studios (11)
        </button>

        <button
          onClick={() => setActiveTab('evidence')}
          className={`px-4 py-2.5 font-bold transition-all border-b-2 ${
            activeTab === 'evidence' ? 'border-cyan-400 text-cyan-300 bg-slate-900' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          📑 Evidence Dock ({mockEvidence.length})
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2.5 font-bold transition-all border-b-2 ${
            activeTab === 'audit' ? 'border-cyan-400 text-cyan-300 bg-slate-900' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          📜 Audit Stream
        </button>

        <button
          onClick={() => setActiveTab('showcase')}
          className={`px-4 py-2.5 font-bold transition-all border-b-2 ${
            activeTab === 'showcase' ? 'border-cyan-400 text-cyan-300 bg-slate-900' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          🎨 UI Showcase
        </button>

        <button
          onClick={() => setActiveTab('admin')}
          className={`px-4 py-2.5 font-bold transition-all border-b-2 ${
            activeTab === 'admin' ? 'border-cyan-400 text-cyan-300 bg-slate-900' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          ⚡ Admin Console
        </button>

        <button
          onClick={() => setActiveTab('installer')}
          className={`px-4 py-2.5 font-bold transition-all border-b-2 ${
            activeTab === 'installer' ? 'border-cyan-400 text-cyan-300 bg-slate-900' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          🛠️ Installer & Lifecycle
        </button>
      </div>

      <main className="flex-1 p-4 max-w-7xl w-full mx-auto space-y-4">
        {activeTab === 'queue' && (
          <WorkItemQueue
            items={mockWorkItems}
            activeLensId={activeLensId}
            onOpenTaskTool={handleOpenTaskTool}
          />
        )}

        {activeTab === 'studios' && (
          <TaskToolFrame
            loanNumber={mockLoan.loanNumber}
            initialToolId={activeToolId}
          />
        )}

        {activeTab === 'evidence' && (
          <EvidenceDock items={mockEvidence} />
        )}

        {activeTab === 'audit' && (
          <AuditTimeline events={mockAuditEvents} />
        )}

        {activeTab === 'showcase' && (
          <ComponentShowcase />
        )}

        {activeTab === 'admin' && (
          <AdminConsole />
        )}

        {activeTab === 'installer' && (
          <InstallerConsole />
        )}
      </main>

      <footer className="p-4 max-w-7xl w-full mx-auto pt-0">
        <HandoffBar
          currentLens={activeLensId}
          loanNumber={mockLoan.loanNumber}
          onExecuteHandoff={(e) => alert(`Handoff executed from ${e.fromRole} to ${e.toRole} on Loan #${mockLoan.loanNumber}`)}
        />
      </footer>

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectTool={(t) => { setActiveToolId(t); setActiveTab('studios'); }}
        onSelectLens={(l) => setActiveLensId(l)}
      />
    </div>
  );
};

export default App;
