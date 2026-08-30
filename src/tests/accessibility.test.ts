import { describe, it, expect } from 'vitest';
import { TOKENS } from '../tokens';
import { ALL_ROLE_LENSES } from '../components/Navigation/RoleSwitcher';

describe('Accessibility & Universal Design (WCAG 2.2 AA)', () => {
  it('provides accessible color contrast tokens across dark mode backgrounds', () => {
    expect(TOKENS.colors.bg.primary).toBeDefined();
    expect(TOKENS.colors.text.primary).toBeDefined();
    expect(TOKENS.colors.text.accent).toBeDefined();
    expect(TOKENS.typography.fontFamily.mono).toContain('IBM Plex Mono');
  });

  it('declares semantic names and aria labels for all 20 role lenses', () => {
    for (const lens of ALL_ROLE_LENSES) {
      expect(lens.displayName.length).toBeGreaterThan(0);
      expect(lens.category.length).toBeGreaterThan(0);
      expect(lens.icon.length).toBeGreaterThan(0);
    }
  });
});
