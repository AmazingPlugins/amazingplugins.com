export {};

type Turnstile = {
  render: (element: HTMLElement, options: Record<string, unknown>) => string;
  reset: (id: string) => void;
};
const form = document.querySelector<HTMLFormElement>('#contact-form')!;
const topic = document.querySelector<HTMLSelectElement>('#contact-topic')!;
const submit = document.querySelector<HTMLButtonElement>('#contact-submit')!;
const retry = document.querySelector<HTMLButtonElement>('#contact-retry')!;
const status = document.querySelector<HTMLElement>('#contact-status')!;
const result = document.querySelector<HTMLElement>('#contact-result')!;
const emailLink = document.querySelector<HTMLAnchorElement>('#contact-email')!;
const challenge = document.querySelector<HTMLElement>('#contact-challenge')!;
let token = '';
let widget: string | undefined;
let turnstile: Turnstile;
let busy = false;

function setTopicFromHash() {
  const choice = location.hash.slice(1);
  if (['support', 'general', 'accessibility'].includes(choice)) topic.value = choice;
  clearResult();
}
function clearResult() {
  result.hidden = true;
  emailLink.removeAttribute('href');
  emailLink.textContent = '';
}
function invalidate(message: string) {
  token = '';
  submit.disabled = true;
  status.textContent = message;
  retry.hidden = false;
}
retry.addEventListener('click', () => {
  if (widget === undefined) { location.reload(); return; }
  retry.hidden = true;
  invalidate('Please complete verification again.');
  turnstile.reset(widget);
});
topic.addEventListener('change', clearResult);
window.addEventListener('hashchange', setTopicFromHash);
setTopicFromHash();

async function initialize() {
  try {
    const response = await fetch('/api/contact/config/', { cache: 'no-store', signal: AbortSignal.timeout(10000) });
    const config = await response.json();
    if (!response.ok || !config.siteKey) throw new Error(config.error || 'Email contact is temporarily unavailable. Please try again later.');
    await new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      const timeout = setTimeout(() => reject(new Error('Verification did not load. Check your connection and try again.')), 15000);
      script.onload = () => { clearTimeout(timeout); resolve(); };
      script.onerror = () => { clearTimeout(timeout); reject(new Error('Verification could not load. Check your connection and try again.')); };
      document.head.append(script);
    });
    turnstile = (window as unknown as { turnstile: Turnstile }).turnstile;
    widget = turnstile.render(challenge, {
      sitekey: config.siteKey, action: 'contact_email', size: 'flexible', theme: 'auto',
      callback: (value: string) => {
        token = value;
        submit.disabled = busy;
        retry.hidden = true;
        status.textContent = 'Verification complete. You can reveal the email address.';
      },
      'expired-callback': () => invalidate('Verification expired. Please verify again.'),
      'error-callback': () => { invalidate('Verification failed. Please try again, or use the public support forum linked on this page.'); return true; },
      'timeout-callback': () => invalidate('Verification timed out. Please try again.'),
    });
    status.textContent = 'Complete verification, then select Reveal email.';
  } catch (error) {
    invalidate(error instanceof Error ? error.message : 'Verification could not load. Please try again.');
  }
}
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!token || busy) return;
  busy = true;
  submit.disabled = true;
  topic.disabled = true;
  clearResult();
  status.textContent = 'Checking verification…';
  const selectedTopic = topic.value;
  try {
    const response = await fetch('/api/contact/', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, cache: 'no-store',
      body: JSON.stringify({ token, topic: selectedTopic }), signal: AbortSignal.timeout(12000),
    });
    const data = await response.json();
    if (!response.ok || typeof data.email !== 'string') throw new Error(data.error || 'Could not reveal the email. Please try again.');
    emailLink.textContent = data.email;
    emailLink.href = `mailto:${data.email}`;
    document.querySelector('#contact-result-topic')!.textContent = topic.selectedOptions[0].text;
    result.hidden = false;
    status.textContent = 'Email address revealed.';
    emailLink.focus();
  } catch (error) {
    status.textContent = error instanceof Error ? error.message : 'Could not reveal the email. Please try again.';
  } finally {
    busy = false;
    token = '';
    topic.disabled = false;
    retry.hidden = false;
    // Tokens are single use. A new reveal always needs a fresh challenge.
  }
});
initialize();
