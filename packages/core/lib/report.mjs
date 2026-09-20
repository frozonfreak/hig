const SEVERITY_TO_BUCKET = {
  error: 'blocking',
  warning: 'warnings',
  info: 'observations',
};

export function severityBucketForRule(severity) {
  return SEVERITY_TO_BUCKET[severity] ?? 'warnings';
}

export function createReport({
  higVersion,
  profile,
  archetype,
  framework,
  findings = [],
}) {
  const counts = { blocking: 0, warnings: 0, observations: 0 };
  for (const finding of findings) {
    counts[finding.severity_bucket] = (counts[finding.severity_bucket] ?? 0) + 1;
  }

  return {
    hig_version: higVersion,
    profile,
    archetype,
    framework: framework ?? null,
    severity_counts: counts,
    findings,
  };
}

export function printTerminalReport(report) {
  const lines = [
    `Web HIG v${report.hig_version}`,
    '',
    `Profile: ${capitalize(report.profile)}`,
    `Archetype: ${capitalize(report.archetype)}`,
  ];
  if (report.framework) lines.push(`Framework: ${capitalize(report.framework)}`);
  lines.push(
    '',
    `BLOCKING        ${report.severity_counts.blocking}`,
    `WARNINGS        ${report.severity_counts.warnings}`,
    `OBSERVATIONS    ${report.severity_counts.observations}`,
  );

  if (report.findings.length) {
    lines.push('', 'Findings:');
    for (const f of report.findings) {
      const loc = f.location ? ` (${f.location})` : '';
      lines.push(`  [${f.rule_id}] ${f.message}${loc}`);
    }
  }

  return lines.join('\n');
}

function capitalize(value) {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}
