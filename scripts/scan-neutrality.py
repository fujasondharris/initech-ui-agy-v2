#!/usr/bin/env python3
import os
import re
import sys

PROHIBITED_IDENTIFIERS = [
    # Legacy & Reviewed Private Systems
    r'\bCarbonFib3r\b',
    r'\bMilton\b',
    r'\bInitrode\b',
    r'\bVesta\b',
    # Private LOS & Software Vendors
    r'\bEncompass\b',
    r'\bEllie\s*Mae\b',
    r'\bRoostify\b',
    r'\bBlend\b',
    r'\bnCino\b',
    r'\bSimpleNexus\b',
    r'\bByte(?:Pro)?\b',
    r'\bBlue\s*Sage\b',
    r'\bCalyx\b',
    r'\bPointCentral\b',
    r'\bOpenClose\b',
    # Private Lenders & Investors
    r'\bPennyMac\b',
    r'\bMr\.?\s*Cooper\b',
    r'\bNewRez\b',
    r'\bAmeriHome\b',
    r'\bPlanet\s*(?:Home)?\b',
    r'\bRocket\s*Mortgage\b',
    r'\bLoanDepot\b',
    r'\bUWM\b',
    r'\bUnited\s*Wholesale\b',
    r'\bFreedom\s*Mortgage\b',
    r'\bGuaranteed\s*Rate\b',
    r'\bCaliber\s*Home\b',
    # Private Settlement, AMC & Valuation Vendors
    r'\bFirst\s*American\b',
    r'\bFidelity\s*National\b',
    r'\bStewart\s*Title\b',
    r'\bOld\s*Republic\b',
    r'\bServiceLink\b',
    r'\bClear\s*Capital\b',
    r'\bSolidifi\b',
    r'\bClass\s*Valuation\b',
    r'\bMercury\s*Network\b',
    # Private Credit, Verification & Compliance Vendors
    r'\bXactus\b',
    r'\bCoreLogic\b',
    r'\bAdvantage\s*Credit\b',
    r'\bInformative\s*Research\b',
    r'\bCredco\b',
    r'\bCBCInnovis\b',
    r'\bMavent\b',
    r'\bComplianceEase\b',
    r'\bAsurity\b',
    r'\bQuestSoft\b',
    r'\bLoanLogics\b',
    r'\bLoanSafe\b',
    r'\bOcrolus\b',
    r'\bThe\s*Work\s*Number\b',
]

def scan_repository(root_dir):
    violations = []
    excludes = {'.git', 'node_modules', 'dist', 'build', '.cache', '.vite', '.vitest'}

    for root, dirs, files in os.walk(root_dir):
        dirs[:] = [d for d in dirs if d not in excludes]
        for f in files:
            # Check source code, schemas, documentation, and tests
            if f.endswith(('.ts', '.tsx', '.json', '.html', '.css', '.md')) and f not in ('scan-neutrality.py', 'PROVENANCE.md', 'PRODUCT-BRIEF-RECEIPT.md', 'BUILD_STATUS.md'):
                file_path = os.path.join(root, f)
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as fh:
                    for line_num, line in enumerate(fh, 1):
                        for pattern in PROHIBITED_IDENTIFIERS:
                            if re.search(pattern, line, re.IGNORECASE):
                                violations.append((file_path, line_num, line.strip(), pattern))

    return violations

if __name__ == '__main__':
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    violations = scan_repository(root)
    if violations:
        print(f"❌ FAIL: Found {len(violations)} prohibited private-company identifiers:")
        for path, line_no, content, pat in violations:
            print(f"  {os.path.relpath(path, root)}:{line_no} [Pattern: {pat}] -> {content}")
        sys.exit(1)
    else:
        print("✅ PASS: Zero prohibited private-company identifiers found across neutral codebase.")
        sys.exit(0)
