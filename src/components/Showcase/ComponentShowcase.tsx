import React from 'react';

export const ComponentShowcase: React.FC = () => {
  return (
    <div className="space-y-6 font-mono text-xs p-6 bg-slate-900 border border-slate-800 rounded-xl">
      <div className="border-b border-slate-800 pb-3">
        <h2 className="text-lg font-bold text-cyan-300">Design System & Component Showcase</h2>
        <p className="text-slate-400 text-xs">Deterministic token system, accessible badges, status representations, and interactive components.</p>
      </div>

      <div className="space-y-2">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Required State Representations</h3>
        <div className="flex flex-wrap gap-2">
          <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 px-2.5 py-1 rounded font-bold">
            ✓ READY / VERIFIED
          </span>
          <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 px-2.5 py-1 rounded font-bold">
            ⚙️ IN PROGRESS
          </span>
          <span className="bg-amber-950 text-amber-300 border border-amber-800 px-2.5 py-1 rounded font-bold">
            ⏳ WAITING EXTERNAL
          </span>
          <span className="bg-rose-950 text-rose-300 border border-rose-800 px-2.5 py-1 rounded font-bold">
            ⚠️ BLOCKED DEPENDENCY
          </span>
          <span className="bg-purple-950 text-purple-300 border border-purple-800 px-2.5 py-1 rounded font-bold">
            ❓ EFFECT UNKNOWN (HOLD)
          </span>
          <span className="bg-slate-950 text-slate-400 border border-slate-800 px-2.5 py-1 rounded font-bold">
            📦 ARCHIVED / STALE
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Action Controls</h3>
        <div className="flex flex-wrap gap-3">
          <button className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-4 py-1.5 rounded transition-colors shadow">
            Primary Action
          </button>
          <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-1.5 rounded transition-colors shadow">
            Confirm & Release
          </button>
          <button className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-1.5 rounded border border-slate-700 transition-colors">
            Secondary Snapshot
          </button>
          <button className="bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-800 font-bold px-4 py-1.5 rounded transition-colors">
            Reject / Exception Hold
          </button>
        </div>
      </div>

      <div className="space-y-2 border-t border-slate-800 pt-3">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Typography Hierarchy</h3>
        <div className="space-y-1 bg-slate-950 p-4 rounded-lg border border-slate-800">
          <div className="text-xl font-bold text-slate-100">Display Title 20px (IBM Plex Mono)</div>
          <div className="text-sm font-bold text-cyan-400">Section Header 14px</div>
          <div className="text-xs text-slate-300">Standard Body 12px with high contrast legibility</div>
          <div className="text-[10px] text-slate-500 font-mono">Micro Metadata 10px (Digests & Hashes)</div>
        </div>
      </div>
    </div>
  );
};
