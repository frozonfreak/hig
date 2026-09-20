import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export async function runInit(argv) {
  if (argv.includes('--help')) {
    console.log('Usage: web-hig init [install options]\n\nDelegates to @web-hig/install.');
    return 0;
  }

  const packageRoot = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    '..',
    '..',
    '..',
    'install',
  );
  const installCli = path.join(packageRoot, 'bin', 'cli.mjs');
  const result = spawnSync(process.execPath, [installCli, ...argv], { stdio: 'inherit' });
  if (result.error) {
    const fallback = spawnSync('npx', ['@web-hig/install', ...argv], {
      stdio: 'inherit',
      shell: true,
    });
    return fallback.status ?? 1;
  }
  return result.status ?? 1;
}
