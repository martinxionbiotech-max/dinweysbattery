// Battery model markdown variant (ar) — data-driven from battery-master-data.json.
import { loadBatteryMaster, type BatteryModel } from '../../../lib/data';
import { buildBatteryMarkdown } from '../../../lib/md';
import { mdResponse } from '../../../lib/markdown';

export function getStaticPaths() {
  const data = loadBatteryMaster();
  return data.models
    .filter((m) => m.url.includes('/batteries/'))
    .map((model) => ({ params: { slug: model.slug }, props: { model } }));
}

export function GET({ props }: { props: { model: BatteryModel } }) {
  return mdResponse(buildBatteryMarkdown(props.model, 'ar'));
}
