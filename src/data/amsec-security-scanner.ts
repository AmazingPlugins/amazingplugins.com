export const amsecSecurityScanner = {
  name: 'AmSec Security Scanner',
  fullName: 'AmSec Security Scanner by AmazingPlugins',
  path: '/plugins/amsec-security-scanner/',
  version: '0.1.0',
  status: 'Version 0.1.0',
  availability: "It isn't on WordPress.org yet. The download link will appear here once the plugin is approved.",
  requirements: 'WordPress 6.6+ and PHP 8.1+. AI assistant access needs WordPress 6.9+ and the official MCP Adapter plugin.',
  capabilities: [
    { label: 'Scan and hardening checks', description: 'One button checks HTTPS, updates, the admin login, debug display, the file editor and more. Each finding says what to open next. A pass means that check found nothing, not that the site is clean.' },
    { label: 'Malware scan', description: '63 local rules look for web shells and injected code in plugins, themes, uploads, mu-plugins, unlisted folders and loose PHP files. A hit names the file, the line and the rule. Nothing is deleted, and files stay on your server.' },
    { label: 'File integrity and repair', description: 'Compares core and WordPress.org plugin files with the published checksums, and up to three themes with their release ZIP. You can repair a changed plugin file after reviewing both hashes, then roll it back.' },
    { label: 'Vulnerability lookups', description: 'Off until you turn it on. Checks core, plugin and theme versions against WPVulnerability and can email you about high-severity plugin issues.' },
    { label: 'Login and accounts', description: 'Sign-in attempt limits, emailed sign-in codes, a hidden bot field, a sum question, breached-password checks, idle sign-out, registration approval, password rules and session lists. For an authenticator app, it points you to the Two Factor plugin.' },
    { label: 'Traffic', description: 'Hostname, browser and referrer block lists, a live request log, hotlink protection, comment and registration limits, REST rate limits, network rules and a security headers check. Each one can be turned off from WP-CLI.' },
    { label: 'AI assistant access (MCP)', description: 'Off by default. An assistant can list findings, run the hardening checks and propose a sign-in limit change. Nothing changes until an administrator approves it in wp-admin.' },
  ],
} as const;
