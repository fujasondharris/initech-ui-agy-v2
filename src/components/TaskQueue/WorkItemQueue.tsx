import React, { useState } from 'react';
import { WorkItem, TaskPriority, TaskStatus, TaskToolId } from '../../contracts/workItem';
import { LensId } from '../../contracts/roleLens';

interface WorkItemQueueProps {
  items: WorkItem[];
  activeLensId: LensId;
  onOpenTaskTool: (toolId: TaskToolId, loanNumber: string) => void;
}

export const WorkItemQueue: React.FC<WorkItemQueueProps> = ({
  items,
  activeLensId: _activeLensId,
  onOpenTaskTool
}) => {
  const [filterPriority, setFilterPriority] = useState<TaskPriority | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<TaskStatus | 'all'>('all');

  const filteredItems = items.filter(item => {
    if (filterPriority !== 'all' && item.priority !== filterPriority) return false;
    if (filterStatus !== 'all' && item.status !== filterStatus) return false;
    return true;
  });

  const getPriorityBadge = (p: TaskPriority) => {
    switch (p) {
      case 'urgent': return 'bg-rose-950 text-rose-300 border-rose-800 animate-pulse';
      case 'high': return 'bg-amber-950 text-amber-300 border-amber-800';
      case 'normal': return 'bg-cyan-950 text-cyan-300 border-cyan-800';
      case 'low': return 'bg-slate-900 text-slate-400 border-slate-700';
    }
  };

  const getStatusBadge = (s: TaskStatus) => {
    switch (s) {
      case 'ready': return 'bg-emerald-950 text-emerald-300 border-emerald-800';
      case 'in_progress': return 'bg-cyan-950 text-cyan-300 border-cyan-800';
      case 'blocked_dependency': return 'bg-rose-950 text-rose-300 border-rose-800';
      case 'waiting_external': return 'bg-amber-950 text-amber-300 border-amber-800';
      case 'completed': return 'bg-slate-900 text-slate-400 border-slate-800';
      default: return 'bg-slate-900 text-slate-400 border-slate-800';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 border border-slate-800 p-3 rounded-lg text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-200">Work Queue</span>
          <span className="bg-slate-800 text-slate-300 text-[10px] px-1.5 py-0.5 rounded font-mono">
            {filteredItems.length} items
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 text-[11px]">Priority:</span>
            <select
              value={filterPriority}
              onChange={e => setFilterPriority(e.target.value as any)}
              className="bg-slate-950 border border-slate-700 text-slate-200 px-2 py-0.5 rounded text-[11px]"
            >
              <option value="all">All Priorities</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="normal">Normal</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 text-[11px]">Status:</span>
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value as any)}
              className="bg-slate-950 border border-slate-700 text-slate-200 px-2 py-0.5 rounded text-[11px]"
            >
              <option value="all">All Statuses</option>
              <option value="ready">Ready</option>
              <option value="in_progress">In Progress</option>
              <option value="blocked_dependency">Blocked</option>
              <option value="waiting_external">Waiting External</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-2.5">
        {filteredItems.map(item => (
          <div
            key={item.id}
            className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-lg p-3.5 transition-all space-y-2"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${getPriorityBadge(item.priority)}`}>
                  {item.priority}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${getStatusBadge(item.status)}`}>
                  {item.status.replace('_', ' ')}
                </span>
                <span className="text-xs font-bold text-slate-100">{item.title}</span>
              </div>

              <button
                onClick={() => onOpenTaskTool(item.taskToolId, item.loanNumber)}
                className="bg-cyan-600 hover:bg-cyan-500 text-white text-[11px] font-bold px-3 py-1 rounded flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <span>🔧 Open in Tool</span>
                <span>→</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-400">{item.description}</p>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-800/80 text-[10px] text-slate-500 font-mono">
              <div className="flex items-center gap-3">
                <span>Loan: <strong className="text-slate-300">{item.loanNumber}</strong> ({item.borrowerName})</span>
                <span>•</span>
                <span>SLA: <strong className="text-slate-300">{item.slaDeadline}</strong></span>
                <span>•</span>
                <span>Owner: <strong className="text-slate-300">{item.assignedTo}</strong></span>
              </div>

              {item.blockerReason && (
                <span className="text-rose-400 font-bold flex items-center gap-1">
                  <span>⚠️ Blocker:</span>
                  <span>{item.blockerReason}</span>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
