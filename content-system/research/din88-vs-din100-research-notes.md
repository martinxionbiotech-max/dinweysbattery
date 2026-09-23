# Research Notes — DIN88 vs DIN100 (DIN Heavy-Duty Comparison)

**Project**: DINWEYS Battery V2.0 Content Engineering
**Mode**: B — Content Creation (Comparison Engine, Type B)
**Date**: 2026-09-09
**Skill**: deep-research-human-writer V3.0

## Primary Entity
- Topic: DIN88 (58827) vs DIN100 (60038) heavy-duty truck battery
- Intent: comparison / commercial_investigation
- Audience: fleet operators, distributors, importers, mechanics in DIN markets (Europe, Middle East, North Africa)

## Sources (Tier-annotated)

| ID | Source | Tier | Claim supported |
|----|--------|------|-----------------|
| S01 | DINWEYS battery-master-data.json (first-party) | 1 | 58827: 88Ah/800A EN/150RC/353×175×190mm; 60038: 100Ah/870A EN/170RC/393×175×190mm |
| S02 | The Battery Centre DIN88 page | 3 | DIN88 = 353×175×190mm, 850 CCA, alias LN5/H8, Standard Euro terminal |
| S03 | Geekzone forum (battery fitters) | 4 | DIN88 ≈ 352×174×174mm (height variance by brand) |
| S04 | Suzuki Battery SG battery codes guide | 2 | EN 50342-1 CCA definition (30s @ −18°C, ≥7.2V for 12V); DIN code digits: 5xx = <100Ah, 6xx = 100–199Ah |

## Verified Facts (F-class)
- Both DIN88 (58827) and DIN100 (60038) are 12V, EN 50342-1 cold-cranking, European conical (T1) terminal, left positive. [S01]
- The DIN88 and DIN100 share identical width (175mm) and height (190mm); the DIN100 is 40mm longer (393mm vs 353mm). [S01]
- Both are available in flooded, EFB and AGM technologies. [S01]
- EN CCA is measured to EN 50342-1 (30s at −18°C, ≥7.2V), NOT directly comparable to JIS CCA or SAE CCA. [S01, S04]
- In the DIN code (58827 / 60038), the leading digits encode 12V and the Ah class (5xx = <100Ah, 6xx = 100–199Ah). [S04]

## Conflicting / Variable Data
| Field | DINWEYS (S01) | The Battery Centre (S02) | Geekzone (S03) |
|-------|--------------|--------------------------|----------------|
| DIN88 height | 190 mm | 190 mm | 174 mm |
| DIN88 CCA | 800 A EN | 850 A EN | — |
| DIN88 L×W×H | 353×175×190 | 353×175×190 | 352×174×174 |

**Resolution**: The Battery Centre independently confirms DINWEYS's 353×175×190mm footprint, giving the DIN88 case high confidence. The 174mm-height variant (Geekzone) is an older/low-profile build — height is the field most likely to differ by brand. CCA also varies (800–850A EN). This variance is the buyer insight: confirm the specific datasheet and measure the actual tray height.

## Competitor Gap Analysis
Competitors (Bosch, Yuasa, Century, SSB, Powsea, The Battery Centre) publish DIN spec tables but:
1. None explain that DIN88→DIN100 is a **length-only** upgrade (same width and height) — unlike the JIS N150→N200 jump where width is the blocker.
2. None connect the DIN number (58827/60038) to what it actually encodes (voltage + Ah class + case dimensions), leaving buyers to guess.
3. None flag the EN-vs-JIS/SAE CCA comparison trap for European-market buyers.
4. None tie the size-class choice to the independent technology choice (flooded/EFB/AGM) — buyers conflate the two decisions.

## Original Insights (for content)
1. **Length-only upgrade** — DIN88→DIN100 keeps width (175mm) and height (190mm) identical; only length grows 40mm. This is the opposite of the JIS N150→N200 upgrade where width is the constraint. In DIN, "bigger" mostly means "need a longer tray."
2. **The number is a size code, not a spec** — "DIN88/DIN100" names the case class; the model code (58827/60038) encodes voltage (5/6 = 12V) and Ah (88/100). Two "DIN88" batteries from different brands can differ in CCA and height.
3. **EN CCA is its own test** — 800A EN ≠ 800A SAE ≠ 800A JIS. Comparing a DIN battery's EN rating to a JIS battery's CCA is the most common European-market buyer error.
4. **Size and technology are independent axes** — you can choose DIN88 in AGM (smaller, maintenance-free) or DIN100 in flooded (larger, lower cost). Don't let the size decision force a technology decision.
5. **Same-width stacking** — because DIN88 and DIN100 share width/height, a tray that fits a DIN100 will usually fit a DIN88 (with a spacer/block), making DIN88 the safe "downgrade" when the larger case is not needed.

## Direct Answer

> **DIN88 → DIN100 is a length-only upgrade.** DIN88 (58827) and DIN100 (60038) share width (175mm) and height (190mm); the DIN100 adds 40mm of length, buying 12Ah and 70A EN cold-cranking. So the only fit question is tray length. EN cold-cranking (EN 50342) is not comparable to JIS or SAE CCA — compare within one standard.
