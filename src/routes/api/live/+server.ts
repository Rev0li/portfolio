import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { site } from '$lib/site';
import { cached, collectServices, commitsThisWeek, parseServices, type LiveData } from '$lib/server/live';

// Sondes des services : au plus une mesure par minute ; commits GitHub : une par heure.
const services = cached(60_000, () => collectServices(parseServices(env.LIVE_SERVICES)));
const commits = cached(60 * 60_000, () => commitsThisWeek(site.githubUser, new Date()));

export async function GET() {
	const [s, c] = await Promise.all([services(), commits()]);
	const body: LiveData = { ...s, deployedAt: __BUILD_TIME__, commitsWeek: c };
	return json(body, { headers: { 'cache-control': 'public, max-age=30' } });
}
