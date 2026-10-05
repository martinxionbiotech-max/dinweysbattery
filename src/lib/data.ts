/**
 * Data-layer loader for the markdown-variant endpoints.
 *
 * Reads the single source of truth JSON files in `public/data/` at build time.
 * `getStaticPaths` runs inside the Astro build process (cwd = project root via
 * `npm run build`), so `process.cwd()` resolves to the repository root.
 *
 * These files are also served verbatim at `/data/*.json` — the loader reads the
 * same files, so the markdown can never drift from the served dataset.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

export function loadJson<T>(relPath: string): T {
  return JSON.parse(readFileSync(path.join(ROOT, relPath), 'utf-8')) as T;
}

export interface BatteryModel {
  model: string;
  alternate_model: string;
  model_family: string | null;
  manufacturer_code: string | null;
  standard: string;
  group: string;
  case_size: string | null;
  slug: string;
  url: string;
  voltage: string;
  capacity_ah: number | null;
  capacity_rate: string | null;
  cca: number | null;
  cca_standard: string | null;
  reserve_capacity: number | null;
  rc_standard: string | null;
  dimensions: string | null;
  length_mm: number | null;
  width_mm: number | null;
  height_mm: number | null;
  weight_kg: number | null;
  terminal: string | null;
  polarity: string | null;
  technology: string | null;
  maintenance: string | null;
  application: string | null;
  vehicle_type: string | null;
  truck_brand: string | null;
  country: string | null;
  source: string | null;
  source_url: string | null;
  verification_status: string | null;
  last_verified: string | null;
  notes: string | null;
}

export interface BatteryMasterData {
  dateModified: string;
  models: BatteryModel[];
}

export interface Vehicle {
  brand: string;
  model: string;
  generation: string | null;
  year: string | null;
  market: string | null;
  battery_voltage: string;
  battery_standard: string;
  battery_group: string;
  battery_model: string | null;
  capacity: string | null;
  cca: string | null;
  dimensions: string | null;
  terminal: string | null;
  polarity: string | null;
  source: string;
  verification_status: string;
  confidence: string;
  notes: string;
}

export interface FitmentData {
  dateModified: string;
  vehicles: Vehicle[];
}

export function loadBatteryMaster(): BatteryMasterData {
  return loadJson<BatteryMasterData>('public/data/battery-master-data.json');
}

export function loadFitment(): FitmentData {
  return loadJson<FitmentData>('public/data/vehicle-fitment.json');
}
