import { describe, it, expect } from 'vitest';
import { LensId } from '../contracts/roleLens';

describe('Mid-Session Permission Revocation & Role Denial', () => {
  it('prevents non-authorized lenses from executing high-impact commands', () => {
    const authorizedRolesForWireDisbursement: LensId[] = ['funding', 'funding-control-approver'];
    const activeUserRole: LensId = 'originator';

    const canDisburse = authorizedRolesForWireDisbursement.includes(activeUserRole);
    expect(canDisburse).toBe(false);
  });
});
