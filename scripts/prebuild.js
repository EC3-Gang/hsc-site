// log git log -1 --format=%H%n%ci into src/git-info.json

import { execSync } from 'child_process';
import { writeFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const gitInfo = {
	hash: execSync('git log -1 --format=%H').toString().trim(),
	date: execSync('git log -1 --format=%ci').toString().trim(),
};

await writeFile(join(__dirname, '../src/git-info.json'), JSON.stringify(gitInfo, null, 2));
