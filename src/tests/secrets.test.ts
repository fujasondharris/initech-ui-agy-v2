import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('Secret Scanning & Zero-PII Enforcement', () => {
  it('ensures zero production API keys or tokens exist in source files', () => {
    const srcDir = path.resolve('src');
    const files = fs.readdirSync(srcDir, { recursive: true }) as string[];

    const secretPatterns = [
      /AIza[0-9A-Za-z-_]{35}/, // Google API key
      /sk-[a-zA-Z0-9]{32,}/,   // OpenAI key
      /AKIA[0-9A-Z]{16}/,      // AWS Access Key
      /ghp_[0-9a-zA-Z]{36}/,   // GitHub Token
    ];

    for (const file of files) {
      if (typeof file === 'string' && (file.endsWith('.ts') || file.endsWith('.tsx'))) {
        const content = fs.readFileSync(path.join(srcDir, file), 'utf8');
        for (const pattern of secretPatterns) {
          expect(pattern.test(content)).toBe(false);
        }
      }
    }
  });
});
