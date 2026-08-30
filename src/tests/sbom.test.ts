import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('SBOM & Permissive License Verification', () => {
  it('ensures package.json uses only standard permissive open-source dependencies', () => {
    const pkgPath = path.resolve('package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

    const allowedDeps = ['react', 'react-dom', 'clsx', 'tailwind-merge'];
    for (const dep of Object.keys(pkg.dependencies || {})) {
      expect(allowedDeps).toContain(dep);
    }
  });
});
