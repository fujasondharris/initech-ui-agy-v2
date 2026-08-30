import React, { useState } from 'react';

export const CondoProjectReviewer: React.FC<{ loanNumber: string }> = ({ loanNumber: _loanNumber }) => {
  const [projectName, setProjectName] = useState('LAKEVIEW CONDOMINIUMS');
  const [unitNumber, setUnitNumber] = useState('402');
  const [totalUnits] = useState(120);
  const [singleEntityUnits, setSingleEntityUnits] = useState(5);
  const [commercialSqFtPercent, setCommercialSqFtPercent] = useState(8.5);
  const [hoaReservePercent, setHoaReservePercent] = useState(12.0);
  const [activeTab, setActiveTab] = useState<'critical_repairs' | 'reciprocity' | 'financials'>('critical_repairs');

  const singleEntityPercent = (singleEntityUnits / totalUnits) * 100;
  const isSingleEntityPass = singleEntityPercent <= 20.0;
  const isCommercialPass = commercialSqFtPercent <= 35.0;
  const isReservePass = hoaReservePercent >= 10.0;

  return (
    <div className="space-y-4 font-mono text-xs">
      {/* Top Banner */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-wrap justify-between items-center gap-3">
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block">2026 Condo Project Clearance &amp; Reciprocity Engine</span>
          <div className="text-xl font-bold text-emerald-400">
            {projectName} #{unitNumber}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            Full Review Streamline • Reciprocity Active • CPM Prohibited List: Clear
          </div>
        </div>

        <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2.5 py-1 rounded font-bold">
          ✓ 100% PROJECT CLEARABLE
        </span>
      </div>

      {/* Sub Tabs */}
      <div className="flex gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('critical_repairs')}
          className={`px-3 py-1.5 rounded font-bold transition-all ${
            activeTab === 'critical_repairs' ? 'bg-cyan-600 text-white shadow' : 'bg-slate-950 text-slate-400 border border-slate-800'
          }`}
        >
          🏗️ Critical Repairs &amp; LL-2021-14
        </button>
        <button
          onClick={() => setActiveTab('reciprocity')}
          className={`px-3 py-1.5 rounded font-bold transition-all ${
            activeTab === 'reciprocity' ? 'bg-cyan-600 text-white shadow' : 'bg-slate-950 text-slate-400 border border-slate-800'
          }`}
        >
          🔄 4-Agency Reciprocity Matrix
        </button>
        <button
          onClick={() => setActiveTab('financials')}
          className={`px-3 py-1.5 rounded font-bold transition-all ${
            activeTab === 'financials' ? 'bg-cyan-600 text-white shadow' : 'bg-slate-950 text-slate-400 border border-slate-800'
          }`}
        >
          📊 HOA Budget &amp; Concentration
        </button>
      </div>

      {/* Tab 1: Critical Repairs */}
      {activeTab === 'critical_repairs' && (
        <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 space-y-3">
          <h4 className="font-bold text-cyan-400 text-xs uppercase tracking-wider border-b border-slate-800 pb-1.5">
            Structural Integrity &amp; Critical Repairs Audit (LL-2021-14 / Bulletin 5701.3)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] text-slate-300">
            <div className="flex items-center gap-2 text-emerald-400"><span>✓</span><span>No unaddressed critical repairs or safety hazards</span></div>
            <div className="flex items-center gap-2 text-emerald-400"><span>✓</span><span>Zero unallocated special assessments</span></div>
            <div className="flex items-center gap-2 text-emerald-400"><span>✓</span><span>No evacuation orders or structural condemnations</span></div>
            <div className="flex items-center gap-2 text-emerald-400"><span>✓</span><span>Structural Integrity Reserve Study completed</span></div>
            <div className="flex items-center gap-2 text-emerald-400"><span>✓</span><span>Building envelope and balconies certified sound</span></div>
            <div className="flex items-center gap-2 text-emerald-400"><span>✓</span><span>No active structural defect litigation against HOA</span></div>
          </div>
        </div>
      )}

      {/* Tab 2: Reciprocity Matrix */}
      {activeTab === 'reciprocity' && (
        <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 space-y-3">
          <h4 className="font-bold text-cyan-400 text-xs uppercase tracking-wider border-b border-slate-800 pb-1.5">
            Cross-Agency Reciprocity Recognition Matrix
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-center text-[11px]">
            <div className="bg-slate-900 p-2.5 rounded border border-emerald-800">
              <span className="text-[10px] text-slate-500 block">Agency Conventional 1</span>
              <span className="font-bold text-emerald-300 block mt-1">✓ Full Review Clear</span>
            </div>
            <div className="bg-slate-900 p-2.5 rounded border border-emerald-800">
              <span className="text-[10px] text-slate-500 block">Agency Conventional 2</span>
              <span className="font-bold text-emerald-300 block mt-1">✓ Reciprocal Accept</span>
            </div>
            <div className="bg-slate-900 p-2.5 rounded border border-emerald-800">
              <span className="text-[10px] text-slate-500 block">FHA HRAP / DELRAP</span>
              <span className="font-bold text-emerald-300 block mt-1">✓ Approved (ID #P00492)</span>
            </div>
            <div className="bg-slate-900 p-2.5 rounded border border-emerald-800">
              <span className="text-[10px] text-slate-500 block">VA Approved List</span>
              <span className="font-bold text-emerald-300 block mt-1">✓ Accepted List</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: HOA Financials */}
      {activeTab === 'financials' && (
        <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 space-y-3">
          <h4 className="font-bold text-cyan-400 text-xs uppercase tracking-wider border-b border-slate-800 pb-1.5">
            HOA Budget Ratios &amp; Concentration Limits
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px]">
            <div className="bg-slate-900 p-3 rounded border border-slate-800 space-y-1">
              <span className="text-slate-400 block">Single-Entity Ownership:</span>
              <span className="font-bold text-slate-100">{singleEntityUnits} / {totalUnits} Units ({singleEntityPercent.toFixed(1)}%)</span>
              <span className={`text-[10px] font-bold block ${isSingleEntityPass ? 'text-emerald-400' : 'text-rose-400'}`}>
                {isSingleEntityPass ? '✓ Pass (≤ 20% Cap)' : '✗ Fails 20% Threshold'}
              </span>
            </div>

            <div className="bg-slate-900 p-3 rounded border border-slate-800 space-y-1">
              <span className="text-slate-400 block">Commercial Floor Space:</span>
              <span className="font-bold text-slate-100">{commercialSqFtPercent.toFixed(1)}% of Project</span>
              <span className={`text-[10px] font-bold block ${isCommercialPass ? 'text-emerald-400' : 'text-rose-400'}`}>
                {isCommercialPass ? '✓ Pass (≤ 35% Cap)' : '✗ Exceeds 35% Cap'}
              </span>
            </div>

            <div className="bg-slate-900 p-3 rounded border border-slate-800 space-y-1">
              <span className="text-slate-400 block">HOA Replacement Reserve:</span>
              <span className="font-bold text-slate-100">{hoaReservePercent.toFixed(1)}% Annual Dues</span>
              <span className={`text-[10px] font-bold block ${isReservePass ? 'text-emerald-400' : 'text-rose-400'}`}>
                {isReservePass ? '✓ Pass (≥ 10% Guideline)' : '✗ Below 10% Min'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
