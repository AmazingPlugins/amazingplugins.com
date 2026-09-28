export const amazingSecurity = {
  name: 'Amazing Security',
  fullName: 'Amazing Security by AmazingPlugins',
  path: '/plugins/amazing-security/',
  status: 'In development',
  availability: 'The plugin is being built. There is no download yet.',
  requirements: 'Target: WordPress 6.6+ and PHP 8.1+. MCP will require WordPress 6.9+ and the official MCP Adapter.',
  capabilities: [
    { label: 'WordPress hardening checks', state: 'Planned', description: 'Review update posture, debug settings, file editing, account access, and other checks tied to WordPress guidance.' },
    { label: 'Public file verification', state: 'Planned', description: 'Check likely exposed logs and backups from an independent public vantage, then recheck after a fix.' },
    { label: 'Vulnerability and file findings', state: 'Planned', description: 'Surface known vulnerable versions, file-integrity changes, and suspected malware with source and scan limits.' },
    { label: 'Login and firewall controls', state: 'Planned', description: 'Add two-factor login, rate limits, and tested request rules with a recovery route.' },
    { label: 'AI assistant access through MCP', state: 'Planned', description: 'Let an authorized assistant read findings and request scans. Fixes will need approval inside WordPress.' },
  ],
} as const;
