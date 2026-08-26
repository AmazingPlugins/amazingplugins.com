import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

function walkSecretsCandidates(startDir: string): string[] {
  const files: string[] = [];
  let dir = path.resolve(startDir);
  for (let i = 0; i < 8; i++) {
    files.push(path.join(dir, '.secrets', 'ap.env'));
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return files;
}

const scriptDir = path.dirname(fileURLToPath(import.meta.url));

const ENV_FILES = [
  ...walkSecretsCandidates(process.cwd()),
  ...walkSecretsCandidates(scriptDir),
  path.join(os.homedir(), '.hermes/secrets/ap.env'),
  path.join(os.homedir(), '.hermes/.env'),
  path.join(os.homedir(), '.openclaw/secrets/ap.env'),
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
  const seen = new Set<string>();
  for (const envFile of ENV_FILES) {
    const resolved = path.resolve(envFile);
    if (seen.has(resolved) || !fs.existsSync(resolved)) continue;
    seen.add(resolved);

    const contents = fs.readFileSync(resolved, 'utf-8');
    for (const line of contents.split(/\r?\n/)) {
      applyEnvLine(line);
    }
  }
}
