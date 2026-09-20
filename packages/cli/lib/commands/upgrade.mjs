export async function runUpgrade(argv) {
  if (argv.includes('--help')) {
    console.log('Usage: web-hig upgrade\n\nPlanned: bump pinned HIG version and report rule deltas.');
    return 0;
  }
  console.error('web-hig upgrade is not implemented yet. See NPM-TOOLING.md §22.');
  return 1;
}
