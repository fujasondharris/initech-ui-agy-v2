import { describe, it, expect } from 'vitest';
import path from 'node:path';
import fs from 'node:fs';
import { runAllScenarios } from '../scenarios/scenarioRunner';

describe('14 Common Evaluation Scenarios & Trace Artifacts', () => {
  it('executes all 14 common scenarios and produces exact trace receipts', () => {
    const root = path.resolve('.');
    const results = runAllScenarios(root);

    expect(results).toHaveLength(14);
    for (const r of results) {
      expect(r.status).toBe('PASSED');
      expect(r.assertionsCount).toBeGreaterThan(0);

      const traceFile = path.resolve('traces', `trace.${r.scenarioId}.json`);
      expect(fs.existsSync(traceFile)).toBe(true);

      const trace = JSON.parse(fs.readFileSync(traceFile, 'utf8'));
      expect(trace.result).toBe('PASSED');
      expect(trace.satisfiedAssertions.length).toBe(r.assertionsCount);
    }
  });
});
