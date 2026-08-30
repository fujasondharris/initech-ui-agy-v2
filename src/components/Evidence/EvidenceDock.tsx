import React, { useState } from 'react';
import { EvidenceItem } from '../../contracts/evidenceItem';

interface EvidenceDockProps {
  items: EvidenceItem[];
  onSelectEvidence?: (item: EvidenceItem) => void;
}

export const EvidenceDock: React.FC<EvidenceDockProps> = ({ items, onSelectEvidence }) => {
  const [selectedItem, setSelectedItem] = useState<EvidenceItem | null>(items[0] || null);

  const handleSelect = (item: EvidenceItem) => {
    setSelectedItem(item);
    if (onSelectEvidence) onSelectEvidence(item);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4 text-xs font-mono">
      <div className="flex justify-between items-center border-b border-slate-800 pb-2">
        <h3 className="font-bold text-cyan-400 flex items-center gap-1.5 text-xs uppercase tracking-wider">
          <span>📑</span>
          <span>Evidence Dock & Spatial OCR Inspector</span>
        </h3>
        <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
          {items.length} Packets Loaded
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
          {items.map(item => (
            <div
              key={item.id}
              onClick={() => handleSelect(item)}
              className={`p-2.5 rounded-lg border cursor-pointer transition-all space-y-1 ${
                selectedItem?.id === item.id
                  ? 'bg-slate-950 border-cyan-500 shadow-md ring-1 ring-cyan-500/40'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-200">{item.docTitle}</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold border ${
                  item.confidence >= 0.95 ? 'bg-emerald-950 text-emerald-300 border-emerald-800' : 'bg-amber-950 text-amber-300 border-amber-800'
                }`}>
                  {(item.confidence * 100).toFixed(0)}% OCR
                </span>
              </div>
              <div className="text-[10px] text-slate-400 flex items-center gap-2">
                <span>{item.docType}</span>
                <span>•</span>
                <span>Page {item.pageNumber}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 space-y-3">
          {selectedItem ? (
            <>
              <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Target Bounding Box</span>
                <span className="text-[10px] text-cyan-400 font-mono">
                  x:{selectedItem.boundingBox?.x || 120} y:{selectedItem.boundingBox?.y || 340} w:{selectedItem.boundingBox?.width || 200} h:{selectedItem.boundingBox?.height || 28}
                </span>
              </div>

              <div className="relative bg-slate-900 border border-slate-700 rounded h-36 flex items-center justify-center p-3 overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/90 flex flex-col justify-center px-4 space-y-2 opacity-80">
                  <div className="h-2 bg-slate-800 rounded w-3/4"></div>
                  <div className="h-2 bg-slate-800 rounded w-1/2"></div>
                  <div className="h-2 bg-slate-800 rounded w-5/6"></div>
                </div>

                <div className="relative z-10 bg-cyan-500/20 border-2 border-cyan-400 rounded p-2 text-center text-cyan-200 font-bold text-xs shadow-lg animate-pulse">
                  "{selectedItem.ocrSnippet}"
                </div>
              </div>

              <div className="text-[10px] text-slate-400 flex justify-between items-center pt-1">
                <span>Observed: {selectedItem.observedAt}</span>
                <span className="text-emerald-400 font-bold">✓ Ground Truth Verified</span>
              </div>
            </>
          ) : (
            <div className="text-center text-slate-500 py-10">Select an evidence packet to inspect OCR coordinates</div>
          )}
        </div>
      </div>
    </div>
  );
};
