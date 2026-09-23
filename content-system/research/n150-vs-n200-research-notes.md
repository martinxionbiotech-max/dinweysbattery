# Research Notes — N150 vs N200 (JIS Heavy-Duty Comparison)

**Project**: DINWEYS Battery V2.0 Content Engineering
**Mode**: B — Content Creation (Comparison Engine, Type B)
**Date**: 2026-09-09
**Skill**: deep-research-human-writer V3.0

## Primary Entity
- Topic: JIS N150 (145G51) vs JIS N200 (190H52) heavy-duty truck battery
- Intent: comparison / commercial_investigation
- Audience: fleet operators, distributors, importers, mechanics in JIS markets (Asia, Middle East, Africa)

## Sources (Tier-annotated)

| ID | Source | Tier | Claim supported |
|----|--------|------|-----------------|
| S01 | DINWEYS battery-master-data.json (first-party) | 1 | 145G51: 135Ah/900A CCA/220RC/508×222×212mm; 190H52: 200Ah/1100A CCA/320RC/520×278×220mm |
| S02 | Bosch battery brochure (boschaftermarket.com PDF) | 2 | 145G51 JIS 150Ah, CCA 750–950, 508×222×238–257mm; 190H52 JIS 200Ah, CCA 1130, 521–523×279×240–248mm |
| S03 | Century Batteries AU cross-reference chart | 2 | N150 = 145G51/190G51/160G51 family; N200 = 190H52 |
| S04 | Club Assist Commercial Fitment Guide (via site) | 2 | Hino 700, Volvo FH/FM, MAN TGS/TGX, Scania R = N150/N200 |
| S05 | SSB Silver (batterybrands.com.au) | 3 | N150: 135Ah/1100CCA/330RC/510×220×196mm, 33kg |
| S06 | Yuasa N150 MF | 3 | 500×220×210mm (case) |
| S07 | Powsea JIS catalog | 3 | N150 508×211×193mm; N200 515×267×216mm |
| S08 | BCI Group Sizes PDF (batterycouncil.org) | 1 | BCI cross-ref: N150 = 508×222mm footprint; N200 = 521×278mm |

## Verified Facts (F-class)
- Both N150 and N200 are 12V, JIS D5301, flooded Pb-Sb thick-plate, JIS type A (large taper post) terminal. [S01]
- N200 is physically larger and higher output than N150 in every dimension and rating. [S01, S02]
- The "N" number is a JIS size class; the model code (145G51/190H52) carries the specific rating. [S01, S03]

## Conflicting / Variable Data
| Field | DINWEYS (S01) | Bosch (S02) | SSB (S05) | Powsea (S07) |
|-------|--------------|-------------|-----------|--------------|
| N150 CCA | 900 A | 750–950 A | 1100 A | — |
| N150 L×W×H | 508×222×212 | 508×222×238–257 | 510×220×196 | 508×211×193 |
| N200 CCA | 1100 A | 1130 A | — | — |
| N200 L×W×H | 520×278×220 | 521–523×279×240–248 | — | 515×267×216 |

**Resolution**: CCA and dimensions vary by manufacturer and product version. Within JIS D5301 the N150 typically spans ~750–1100A and N200 ~1100–1200A. DINWEYS's figures are first-party and specific to its models; third-party figures are reference ranges. This variance is itself the key buyer insight: compare within one standard and confirm the specific datasheet.

## Competitor Gap Analysis
Competitors (Bosch, Yuasa, Century, SSB, Powsea, 247 Auto) publish spec tables and fitment charts but:
1. None explain the *relationship* between N150/N200 and the specific truck models in one place with an OEM path.
2. None explain "why the difference matters" for tray fit, series pairing, and cold-climate selection.
3. None address the common buyer mistake of treating "N150 vs N200" as a simple "bigger is better" upgrade without tray/cable/terminal verification.
4. Few connect the comparison to a 24V series-pairing decision.

## Original Insights (for content)
1. **"N number" ≠ capacity** — N150/N200 are size classes; the model code (145G51/190H52) carries the actual rating. A 190G51 and a 145G51 are both "N150" but differ in CCA.
2. **The upgrade decision is a tray-width problem, not a power problem** — N200's 278mm width vs N150's 222mm means it usually will NOT fit an N150 tray. Power is rarely the blocker; footprint is.
3. **Same standard, different numbers** — CCA must be compared within JIS D5301. Third-party N150 CCA ranges from 750–1100A, so "900A" only means something against the specific datasheet, not against another vendor's N150.
4. **Series-pair symmetry rule** — in a 24V truck, two N150s (or two N200s) must be identical; you cannot pair an N150 with an N200.
5. **Cold-climate + high-load = N200 only if tray fits** — the RC jump (220→320 min) and CCA jump (900→1100A) matter most for cold starts and heavy accessory load, but only the larger tray accepts it.

## Direct Answer

> **N150 vs N200 is a tray-fit decision, not a power decision.** N150 (145G51) is the standard JIS heavy-truck battery at 508×222×212mm; N200 (190H52) is wider (278mm), taller and higher-output (200Ah / 1100A vs 135Ah / 900A). The N200 usually will not fit an N150 tray, so the upgrade is blocked by footprint more often than by power. In a 24V truck, always pair two identical units — never mix N150 and N200.
