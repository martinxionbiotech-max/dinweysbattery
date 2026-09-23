# Source Registry — N150 vs N200

| source_id | title | url | publisher | tier | access_date | entity | claim_supported |
|-----------|-------|-----|-----------|------|-------------|--------|-----------------|
| S01 | DINWEYS battery-master-data.json | https://dinweysbattery.com/batteries/jis/n150/ | DINWEYS (Chengguang Power Tech Co., Ltd.) | 1 | 2026-09-09 | 145G51, 190H52 | First-party specs |
| S02 | Bosch battery brochure | https://www.boschaftermarket.com/xrm/media/images/country_specific/ph/services_and_support_4/downloads_16/final_bosch_battery_brochure.pdf | Bosch | 2 | 2026-09-09 | 145G51, 190H52 | JIS model cross-reference |
| S03 | Century Battery Cross-Reference Chart | https://www.centurybatteries.com.au/media/3mmlm2ll/amktg-019-century-au-cross-reference-chart_rev.pdf | Century Batteries | 2 | 2026-09-09 | N150, N200 | Model cross-reference |
| S04 | Club Assist Commercial Fitment Guide | (referenced in DINWEYS /truck-models/) | Club Assist | 2 | 2026-09-09 | Hino 700, Volvo FH/FM, MAN TGS/TGX, Scania R | Fitment mapping |
| S05 | SSB Silver ESN150 | https://batterybrands.com.au/products/esn150-ssb-silver-truck-bus-battery-sn150-n150mff-emfn150r-n150-mf-n150-rhd-n150-1415 | Battery Brands Warehouse | 3 | 2026-09-09 | N150 | Third-party N150 spec |
| S06 | Yuasa N150 MF | https://www.yuasabatteries.com.au/products/n150-mf | Yuasa | 3 | 2026-09-09 | N150 | Third-party N150 case dims |
| S07 | Powsea JIS catalog | https://powseabattery.com/battery-category/mf-battery/jis | Powsea | 3 | 2026-09-09 | N150, N200 | Third-party JIS specs |
| S08 | BCI Group Sizes | https://batterycouncil.org/wp-content/uploads/2023/10/BCI-Group-Sizes.pdf | Battery Council International | 1 | 2026-09-09 | N150, N200 | Standard group dimensions |

## Claim Ledger

| claim_id | claim | type | source_ids | confidence | status |
|----------|-------|------|-----------|------------|--------|
| C001 | N150 and N200 are 12V JIS D5301 flooded Pb-Sb, JIS type A terminal | F | S01, S02 | High | Verified |
| C002 | N200 is larger and higher CCA/RC than N150 | F | S01, S02 | High | Verified |
| C003 | "N" number is a size class, model code carries the rating | D | S01, S03, S08 | High | Verified |
| C004 | N200 (278mm) will not fit an N150 (222mm) tray | D | S01, S02, S08 | High | Verified |
| C005 | Third-party N150 CCA ranges 750–1100A | F | S02, S05 | High | Verified |
| C006 | DINWEYS 145G51 = 135Ah/900A/220RC; 190H52 = 200Ah/1100A/320RC | F | S01 | High (first-party) | Verified |
| C007 | 24V series pair requires two identical batteries | D | S01, site 24V page | High | Verified |
