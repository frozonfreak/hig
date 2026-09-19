import fs from 'node:fs';
import path from 'node:path';

export function resolvePayload(packageRoot) {
  const vendorRoot = path.join(packageRoot, 'vendor');
  if (fs.existsSync(path.join(vendorRoot, 'VERSION'))) {
    return layout(vendorRoot, {
      scope: path.join(vendorRoot, 'hig-scope.example.md'),
      agentRules: path.join(vendorRoot, 'agent-rules'),
    });
  }

  const repoRoot = findRepoRoot(packageRoot);
  if (!repoRoot) {
    throw new Error(
      'Cannot find The Web HIG payload. Reinstall @web-hig/install or run from the hig git repository.',
    );
  }

  return layout(repoRoot, {
    scope: path.join(repoRoot, 'examples', 'hig-scope.example.md'),
    agentRules: path.join(repoRoot, 'examples', 'agent-rules'),
  });
}

function findRepoRoot(start) {
  let dir = start;
  for (let i = 0; i < 8; i += 1) {
    if (
      fs.existsSync(path.join(dir, 'VERSION')) &&
      fs.existsSync(path.join(dir, 'HIG-QUICK.md')) &&
      fs.existsSync(path.join(dir, 'skills', 'web-hig', 'SKILL.md'))
    ) {
      return dir;
    }
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return null;
}

function layout(root, { scope, agentRules }) {
  const required = {
    VERSION: path.join(root, 'VERSION'),
    'HIG-QUICK.md': path.join(root, 'HIG-QUICK.md'),
    'HIG-CORE.md': path.join(root, 'HIG-CORE.md'),
    'HIG-LITE.md': path.join(root, 'HIG-LITE.md'),
    'HIG.md': path.join(root, 'HIG.md'),
    skill: path.join(root, 'skills', 'web-hig', 'SKILL.md'),
    scope,
    rules: path.join(root, 'rules'),
    framework: path.join(root, 'framework'),
    cursorRule: path.join(agentRules, 'cursor-hig.mdc'),
    claudeRule: path.join(agentRules, 'CLAUDE-hig.md'),
    copilotRule: path.join(agentRules, 'copilot-instructions-hig.md'),
    copilotPathRule: path.join(agentRules, 'copilot-hig.instructions.md'),
    agentsRule: path.join(agentRules, 'AGENTS-hig.md'),
    windsurfRule: path.join(agentRules, 'windsurf-hig.md'),
  };

  for (const [label, filePath] of Object.entries(required)) {
    if (!fs.existsSync(filePath)) {
      throw new Error(`HIG payload missing ${label}: ${filePath}`);
    }
  }

  return {
    root,
    version: fs.readFileSync(required.VERSION, 'utf8').trim(),
    files: required,
  };
}
