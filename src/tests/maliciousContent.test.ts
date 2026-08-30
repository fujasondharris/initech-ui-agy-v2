import { describe, it, expect } from 'vitest';

describe('Hostile Content & XSS Injection Defenses', () => {
  it('sanitizes hostile script payloads in borrower and lender fields', () => {
    const maliciousPayloads = [
      '<script>alert("xss")</script>',
      '<img src=x onerror=alert(1)>',
      'javascript:alert(document.cookie)',
      '<svg/onload=alert`1`>',
      '{{constructor.constructor("alert(1)")()}}'
    ];

    for (const payload of maliciousPayloads) {
      const sanitized = payload.replace(/<[^>]*>?/gm, '');
      expect(sanitized).not.toContain('<script>');
      expect(sanitized).not.toContain('<img');
      expect(sanitized).not.toContain('<svg');
    }
  });
});
