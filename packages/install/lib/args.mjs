import path from 'node:path';

export const EDITORS = ['cursor', 'claude', 'copilot', 'windsurf', 'agents'];
export const PROFILES = ['quick', 'practical', 'full'];

const HELP = `Usage: npx @web-hig/install [options]

Install The Web HIG Quick Reference, agent rules, and editor skills into a project.

Options:
  --dir <path>          Target project (default: current directory)
  --editors <list>      Comma-separated: cursor, claude, copilot, windsurf, agents
                        Default: all
  --profile <name>      quick | practical | full (default: quick)
  --docs-dir <path>     Pin directory relative to target (default: docs/hig)
  --force               Overwrite existing dedicated HIG files
  --dry-run             Print actions without writing
  --no-scope            Skip docs/hig-scope.md
  --help                Show this help
  --version             Print the HIG version that would be installed
`;

export function helpText() {
  return HELP.trim();
}

export function parseArgs(argv, { cwd = process.cwd() } = {}) {
  const opts = {
    dir: cwd,
    editors: [...EDITORS],
    profile: 'quick',
    docsDir: 'docs/hig',
    force: false,
    dryRun: false,
    scope: true,
    help: false,
    version: false,
  };

  const takeValue = (flag, index) => {
    const value = argv[index + 1];
    if (value === undefined || value.startsWith('--')) {
      throw new Error(`${flag} requires a value`);
    }
    return value;
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--help' || arg === '-h') {
      opts.help = true;
    } else if (arg === '--version' || arg === '-v') {
      opts.version = true;
    } else if (arg === '--force') {
      opts.force = true;
    } else if (arg === '--dry-run') {
      opts.dryRun = true;
    } else if (arg === '--no-scope') {
      opts.scope = false;
    } else if (arg === '--dir') {
      const value = takeValue(arg, i);
      opts.dir = path.isAbsolute(value) ? value : path.resolve(cwd, value);
      i += 1;
    } else if (arg === '--docs-dir') {
      opts.docsDir = takeValue(arg, i);
      i += 1;
    } else if (arg === '--profile') {
      opts.profile = takeValue(arg, i);
      i += 1;
    } else if (arg === '--editors') {
      opts.editors = parseEditors(takeValue(arg, i));
      i += 1;
    } else if (arg.startsWith('--')) {
      throw new Error(`Unknown option: ${arg}`);
    } else {
      throw new Error(`Unexpected argument: ${arg}`);
    }
  }

  if (!PROFILES.includes(opts.profile)) {
    throw new Error(`Unknown profile: ${opts.profile} (expected ${PROFILES.join(', ')})`);
  }

  return opts;
}

function parseEditors(value) {
  const editors = value
    .split(',')
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
  if (!editors.length) {
    throw new Error('--editors requires at least one editor');
  }
  for (const editor of editors) {
    if (!EDITORS.includes(editor)) {
      throw new Error(`Unknown editor: ${editor} (expected ${EDITORS.join(', ')})`);
    }
  }
  return [...new Set(editors)];
}
