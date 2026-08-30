import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('Behavior Retention Ledger (All 70 Items)', () => {
  it('covers all 70 capability items with explicit required disposition schema', () => {
    const retentionPath = path.resolve('docs/behavior-retention.json');
    expect(fs.existsSync(retentionPath)).toBe(true);

    const data = JSON.parse(fs.readFileSync(retentionPath, 'utf8'));
    expect(data.items).toHaveLength(70);

    for (const item of data.items) {
      expect(item.id).toBeDefined();
      expect(item.area).toBeDefined();
      expect(item.capability).toBeDefined();
      expect(['implemented', 'demonstrated_by_honest_synthetic_state']).toContain(item.disposition);
      expect(item.rationale).toBeDefined();
      expect(item.routeOrSurfaceIds.length).toBeGreaterThan(0);
      expect(item.contractIds.length).toBeGreaterThan(0);
      expect(item.scenarioOrTestIds.length).toBeGreaterThan(0);
      expect(item.releaseCommit).toBe('HEAD');
    }
  });
});
