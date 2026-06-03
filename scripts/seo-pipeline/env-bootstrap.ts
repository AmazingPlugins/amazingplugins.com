import fs from 'fs';
import os from 'os';
import path from 'path';

const ENV_FILES = [
  '/Users/ray/.openclaw/secrets/ap.env',
  path.join(os.homedir(), '.openclaw/secrets/ap.env'),
  '/Users/ray/.hermes/.env',
  path.join(os.homedir(), '.hermes/.env'),
];

function applyEnvLine(line: string): void {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) return;

  const withoutExport = trimmed.startsWith('export ') ? trimmed.slice(7).trim() : trimmed;
  const equalsIndex = withoutExport.indexOf('=');
  if (equalsIndex <= 0) return;

  const key = withoutExport.slice(0, equalsIndex).trim();
  if (!key || process.env[key] !== undefined) return;

  let value = withoutExport.slice(equalsIndex + 1).trim();
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1);
  }

  process.env[key] = value;
}

export function loadSeoPipelineEnv(): void {
  for (const envFile of ENV_FILES) {
    if (!fs.existsSync(envFile)) continue;

    const contents = fs.readFileSync(envFile, 'utf-8');
    for (const line of contents.split(/\r?\n/)) {
      applyEnvLine(line);
    }
  }
}