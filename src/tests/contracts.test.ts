import { describe, it, expect } from 'vitest';
import { ALL_ROLE_LENSES } from '../components/Navigation/RoleSwitcher';

describe('Presentation & Role Contracts (20 Role Lenses)', () => {
  it('contains all 20 exact unique role lenses from ROLE-LENSES.json', () => {
    expect(ALL_ROLE_LENSES).toHaveLength(20);
    const ids = ALL_ROLE_LENSES.map(l => l.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(20);
    expect(ids).toContain('originator');
    expect(ids).toContain('setup');
    expect(ids).toContain('processor');
    expect(ids).toContain('underwriter');
    expect(ids).toContain('compliance');
    expect(ids).toContain('closing');
    expect(ids).toContain('funding');
    expect(ids).toContain('funding-control-approver');
    expect(ids).toContain('shipping');
    expect(ids).toContain('insurance');
    expect(ids).toContain('secondary');
    expect(ids).toContain('collateral');
    expect(ids).toContain('manager');
    expect(ids).toContain('quality-control');
    expect(ids).toContain('administrator');
    expect(ids).toContain('auditor');
    expect(ids).toContain('security-administrator');
    expect(ids).toContain('infrastructure-data-custodian');
    expect(ids).toContain('separated-approver');
    expect(ids).toContain('support-recovery-operator');
  });
});
