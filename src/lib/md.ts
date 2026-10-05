/**
 * Markdown-variant builders (AI Readiness — 方案 D).
 *
 * Generate clean machine-readable markdown from the data layer
 * (public/data/battery-master-data.json, public/data/vehicle-fitment.json).
 *
 * Zero-fabrication policy: every spec/fitment value is read from the JSON data
 * layer by the calling endpoint. Section headings and field labels are localized
 * (en/ar/es); English prose fields (application, vehicle_type, notes, source) are
 * emitted verbatim from the source data — no translation is invented for ar/es.
 */
import type { BatteryModel, Vehicle } from './data';
import { frontmatter, mdTable } from './markdown';

export type Locale = 'en' | 'ar' | 'es';

export const SITE_URL = 'https://dinweysbattery.com';

type Labels = Record<string, string>;

const EN: Labels = {
  field: 'Field',
  value: 'Value',
  notPublished: 'not published',
  specsHeading: 'Specifications',
  model: 'Model',
  group: 'Group',
  standard: 'Standard',
  voltage: 'Voltage',
  capacity: 'Capacity (C20)',
  cca: 'Cold Cranking Amps (CCA)',
  testStandard: 'Test Standard',
  rc: 'Reserve Capacity (RC)',
  dimensions: 'Dimensions (L×W×H)',
  terminals: 'Terminals',
  technology: 'Technology',
  maintenance: 'Maintenance',
  verification: 'Verification status',
  applicationsHeading: 'Applications',
  vehicleTypesHeading: 'Vehicle types',
  sourceHeading: 'Source',
  notesHeading: 'Notes',
  humanPageHeading: 'Human-readable page',
  viewFullModel: 'View the full model page',
  fitmentHeading: 'Fitment',
  brand: 'Brand',
  modelLabel: 'Model',
  generation: 'Generation',
  year: 'Year',
  market: 'Market',
  electricalSystem: 'Electrical system',
  batteryStandard: 'Battery standard',
  batteryGroup: 'Battery group',
  dinweysModel: 'DINWEYS model',
  confidence: 'Confidence',
  verificationStatus: 'Verification status',
  viewFitment: 'View the full fitment reference',
  noDirectModel: 'no direct DINWEYS model — needs inquiry',
};

const AR: Labels = {
  field: 'الحقل',
  value: 'القيمة',
  notPublished: 'غير منشور',
  specsHeading: 'المواصفات',
  model: 'الموديل',
  group: 'المجموعة',
  standard: 'المعيار',
  voltage: 'الجهد',
  capacity: 'السعة (C20)',
  cca: 'أمبير التدوير البارد (CCA)',
  testStandard: 'معيار الاختبار',
  rc: 'السعة الاحتياطية (RC)',
  dimensions: 'الأبعاد (ط×ع×ارتفاع)',
  terminals: 'الأقطاب',
  technology: 'التقنية',
  maintenance: 'الصيانة',
  verification: 'حالة التحقق',
  applicationsHeading: 'التطبيقات',
  vehicleTypesHeading: 'أنواع المركبات',
  sourceHeading: 'المصدر',
  notesHeading: 'ملاحظات',
  humanPageHeading: 'الصفحة الكاملة',
  viewFullModel: 'عرض صفحة الموديل الكاملة',
  fitmentHeading: 'الملاءمة',
  brand: 'العلامة التجارية',
  modelLabel: 'الموديل',
  generation: 'الجيل',
  year: 'السنة',
  market: 'السوق',
  electricalSystem: 'النظام الكهربائي',
  batteryStandard: 'معيار البطارية',
  batteryGroup: 'مجموعة البطارية',
  dinweysModel: 'موديل DINWEYS',
  confidence: 'مستوى الثقة',
  verificationStatus: 'حالة التحقق',
  viewFitment: 'عرض مرجع الملاءمة الكامل',
  noDirectModel: 'لا يوجد موديل DINWEYS مباشر — يتطلب استفسارًا',
};

const ES: Labels = {
  field: 'Campo',
  value: 'Valor',
  notPublished: 'no publicado',
  specsHeading: 'Especificaciones',
  model: 'Modelo',
  group: 'Grupo',
  standard: 'Norma',
  voltage: 'Voltaje',
  capacity: 'Capacidad (C20)',
  cca: 'Amperios de arranque en frío (CCA)',
  testStandard: 'Norma de ensayo',
  rc: 'Capacidad de reserva (RC)',
  dimensions: 'Dimensiones (L×An×Al)',
  terminals: 'Bornes',
  technology: 'Tecnología',
  maintenance: 'Mantenimiento',
  verification: 'Estado de verificación',
  applicationsHeading: 'Aplicaciones',
  vehicleTypesHeading: 'Tipos de vehículo',
  sourceHeading: 'Fuente',
  notesHeading: 'Notas',
  humanPageHeading: 'Página legible',
  viewFullModel: 'Ver la página completa del modelo',
  fitmentHeading: 'Compatibilidad',
  brand: 'Marca',
  modelLabel: 'Modelo',
  generation: 'Generación',
  year: 'Año',
  market: 'Mercado',
  electricalSystem: 'Sistema eléctrico',
  batteryStandard: 'Norma de batería',
  batteryGroup: 'Grupo de batería',
  dinweysModel: 'Modelo DINWEYS',
  confidence: 'Nivel de confianza',
  verificationStatus: 'Estado de verificación',
  viewFitment: 'Ver la referencia de compatibilidad completa',
  noDirectModel: 'sin modelo DINWEYS directo — requiere consulta',
};

const LABELS: Record<Locale, Labels> = { en: EN, ar: AR, es: ES };

function label(locale: Locale, key: string): string {
  return LABELS[locale]?.[key] ?? EN[key] ?? key;
}

/** Render a value, substituting a localized "not published" for empty values. */
function fmt(value: unknown, locale: Locale): string {
  if (value === null || value === undefined || value === '') {
    return label(locale, 'notPublished');
  }
  return String(value);
}

function batteryDescription(m: BatteryModel, locale: Locale): string {
  const t: Record<Locale, string> = {
    en: `DINWEYS ${m.model} (${m.alternate_model}) — ${m.voltage}, ${m.capacity_ah} Ah, ${m.dimensions}.`,
    ar: `بطارية DINWEYS ${m.model} (${m.alternate_model}) — ${m.voltage}، ${m.capacity_ah} أمبير-ساعة، ${m.dimensions}.`,
    es: `Batería DINWEYS ${m.model} (${m.alternate_model}) — ${m.voltage}, ${m.capacity_ah} Ah, ${m.dimensions}.`,
  };
  return t[locale];
}

function batteryDefinition(m: BatteryModel, locale: Locale): string {
  const t: Record<Locale, string> = {
    en: `The DINWEYS ${m.model} (${m.alternate_model}) is a ${m.standard} ${m.group} heavy-duty starting battery — ${m.voltage}, ${m.capacity_ah} Ah (C20), ${m.dimensions}.`,
    ar: `بطارية DINWEYS ${m.model} (${m.alternate_model}) هي بطارية تشغيل للخدمة الشاقة وفق معيار ${m.standard} فئة ${m.group} — ${m.voltage}، سعة ${m.capacity_ah} أمبير-ساعة (C20)، أبعاد ${m.dimensions}.`,
    es: `La batería DINWEYS ${m.model} (${m.alternate_model}) es una batería de arranque de servicio pesado ${m.standard} grupo ${m.group} — ${m.voltage}, ${m.capacity_ah} Ah (C20), ${m.dimensions}.`,
  };
  return t[locale];
}

export function buildBatteryMarkdown(m: BatteryModel, locale: Locale): string {
  const canonical = m.url;
  const title = `DINWEYS ${m.model} (${m.alternate_model})`;

  const rows: [string, unknown][] = [
    [label(locale, 'model'), m.model],
    [label(locale, 'group'), m.group],
    [label(locale, 'standard'), m.standard],
    [label(locale, 'voltage'), m.voltage],
    [label(locale, 'capacity'), m.capacity_ah !== null ? `${m.capacity_ah} Ah` : null],
    [label(locale, 'cca'), m.cca !== null ? `${m.cca} A` : null],
    [label(locale, 'testStandard'), m.cca_standard],
    [label(locale, 'rc'), m.reserve_capacity !== null ? `${m.reserve_capacity} min` : null],
    [label(locale, 'dimensions'), m.dimensions],
    [label(locale, 'terminals'), m.terminal],
    [label(locale, 'technology'), m.technology],
    [label(locale, 'maintenance'), m.maintenance],
    [label(locale, 'verification'), m.verification_status],
  ];

  return [
    frontmatter({
      title,
      description: batteryDescription(m, locale),
      canonical,
      updated: m.last_verified,
      type: 'battery',
      standard: m.standard,
      group: m.group,
    }),
    `# ${title}`,
    '',
    batteryDefinition(m, locale),
    '',
    `## ${label(locale, 'specsHeading')}`,
    '',
    mdTable(
      [label(locale, 'field'), label(locale, 'value')],
      rows.map(([k, v]) => [k, fmt(v, locale)]),
    ),
    '',
    `## ${label(locale, 'applicationsHeading')}`,
    '',
    fmt(m.application, locale),
    '',
    `## ${label(locale, 'vehicleTypesHeading')}`,
    '',
    fmt(m.vehicle_type, locale),
    '',
    `## ${label(locale, 'sourceHeading')}`,
    '',
    fmt(m.source, locale),
    '',
    `## ${label(locale, 'notesHeading')}`,
    '',
    fmt(m.notes, locale),
    '',
    `## ${label(locale, 'humanPageHeading')}`,
    '',
    `[${label(locale, 'viewFullModel')}](${canonical})`,
    '',
  ].join('\n');
}

function fitmentDefinition(v: Vehicle, locale: Locale): string {
  const t: Record<Locale, string> = {
    en: `${v.brand} ${v.model} — ${v.battery_voltage} ${v.battery_standard} system, group ${v.battery_group}. Fitment confidence: ${v.confidence}.`,
    ar: `${v.brand} ${v.model} — نظام ${v.battery_voltage} وفق معيار ${v.battery_standard}، المجموعة ${v.battery_group}. مستوى الثقة في الملاءمة: ${v.confidence}.`,
    es: `${v.brand} ${v.model} — sistema ${v.battery_voltage} ${v.battery_standard}, grupo ${v.battery_group}. Nivel de confianza: ${v.confidence}.`,
  };
  return t[locale];
}

function fitmentDescription(v: Vehicle, locale: Locale): string {
  const t: Record<Locale, string> = {
    en: `${v.brand} ${v.model} (${v.generation ?? '—'}, ${v.year ?? '—'}) — ${v.battery_voltage} ${v.battery_standard}, group ${v.battery_group}.`,
    ar: `${v.brand} ${v.model} (${v.generation ?? '—'}، ${v.year ?? '—'}) — ${v.battery_voltage} ${v.battery_standard}، المجموعة ${v.battery_group}.`,
    es: `${v.brand} ${v.model} (${v.generation ?? '—'}, ${v.year ?? '—'}) — ${v.battery_voltage} ${v.battery_standard}, grupo ${v.battery_group}.`,
  };
  return t[locale];
}

export function buildFitmentMarkdown(
  v: Vehicle,
  locale: Locale,
  updated: string,
): string {
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const canonical = `${SITE_URL}${prefix}/truck-models/`;
  const title = `${v.brand} ${v.model}`;
  const dinweys = v.battery_model ?? label(locale, 'noDirectModel');

  const rows: [string, unknown][] = [
    [label(locale, 'brand'), v.brand],
    [label(locale, 'modelLabel'), v.model],
    [label(locale, 'generation'), v.generation],
    [label(locale, 'year'), v.year],
    [label(locale, 'market'), v.market],
    [label(locale, 'electricalSystem'), v.battery_voltage],
    [label(locale, 'batteryStandard'), v.battery_standard],
    [label(locale, 'batteryGroup'), v.battery_group],
    [label(locale, 'dinweysModel'), dinweys],
    [label(locale, 'confidence'), v.confidence],
    [label(locale, 'verificationStatus'), v.verification_status],
  ];

  return [
    frontmatter({
      title,
      description: fitmentDescription(v, locale),
      canonical,
      updated,
      type: 'truck-fitment',
      confidence: v.confidence,
    }),
    `# ${title}`,
    '',
    fitmentDefinition(v, locale),
    '',
    `## ${label(locale, 'fitmentHeading')}`,
    '',
    mdTable(
      [label(locale, 'field'), label(locale, 'value')],
      rows.map(([k, val]) => [k, fmt(val, locale)]),
    ),
    '',
    `## ${label(locale, 'sourceHeading')}`,
    '',
    fmt(v.source, locale),
    '',
    `## ${label(locale, 'notesHeading')}`,
    '',
    fmt(v.notes, locale),
    '',
    `## ${label(locale, 'humanPageHeading')}`,
    '',
    `[${label(locale, 'viewFitment')}](${canonical})`,
    '',
  ].join('\n');
}
