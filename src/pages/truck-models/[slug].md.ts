// Truck model fitment markdown variant (en) — data-driven from vehicle-fitment.json.
import { loadFitment, type Vehicle } from '../../lib/data';
import { buildFitmentMarkdown } from '../../lib/md';
import { mdResponse, slugify } from '../../lib/markdown';

export function getStaticPaths() {
  const data = loadFitment();
  return data.vehicles.map((vehicle) => ({
    params: { slug: slugify(`${vehicle.brand} ${vehicle.model}`) },
    props: { vehicle, updated: data.dateModified },
  }));
}

export function GET({ props }: { props: { vehicle: Vehicle; updated: string } }) {
  return mdResponse(buildFitmentMarkdown(props.vehicle, 'en', props.updated));
}
