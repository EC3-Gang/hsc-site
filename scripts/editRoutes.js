import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

if (process.env.PLATFORM !== 'CLOUDFLARE') {
	console.log('Not Cloudflare, skipping...');
	process.exit(0);
}

console.log('Editing routes...');

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const routesPath = path.join(__dirname, '../dist/_routes.json');

const routes = JSON.parse(await fs.readFile(routesPath, 'utf-8'));

// remove all strings under routes.excludes that starts with /admin and /council-pics
routes.exclude = routes.exclude.filter((exclude) => {
	return !exclude.startsWith('/admin') && !exclude.startsWith('/council-pics');
});

// add /admin/* and /council-pics/* to routes.excludes
routes.exclude.push('/admin/*', '/council-pics/*');

// write to file
await fs.writeFile(routesPath, JSON.stringify(routes, null, 2));
console.log('Done editing routes.');