import { describe, it, expect } from 'vitest';
import { TOKENS } from '../tokens';

describe('Responsive Layout & Typography Scales', () => {
  it('defines valid micro, caption, body, and title typography scales', () => {
    expect(TOKENS.typography.fontSize.micro).toBe('0.625rem');
    expect(TOKENS.typography.fontSize.caption).toBe('0.6875rem');
    expect(TOKENS.typography.fontSize.body).toBe('0.75rem');
    expect(TOKENS.typography.fontSize.title).toBe('1.125rem');
  });
});
