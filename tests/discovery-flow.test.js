const assert = require('assert');
const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

assert(html.includes('id="discoveryScreen"'), 'Optional discovery screen exists');
assert(html.includes('I know what I want'), 'Manual setup choice is visible');
assert(html.includes('Help me figure it out'), 'Guided discovery choice is visible');
assert(html.includes('What are you tired of feeling?'), 'Guided step 1 asks what users are done feeling');
assert(html.includes('What would feel better?'), 'Guided step 2 asks desired mental state');
assert(html.includes('What physical shift would change things?'), 'Guided step 3 asks physical direction');
assert(html.includes('Choose up to 3'), 'Guided steps stay short with a clear selection limit');
assert(html.includes('buildDiscoveryIdentity'), 'Discovery answers can generate a starting identity');
assert(html.includes('renderDiscoveryStep'), 'Discovery flow renders one short step at a time');
assert(html.includes('showDiscoveryChoice'), 'Setup starts with optional manual vs guided choice');
assert(!/if \(!currentUser\) \{[\s\S]*?showAuth\(\);[\s\S]*?return;[\s\S]*?\}/.test(html), 'Feature branch does not show sign/login as the first unauthenticated screen');
assert(/if \(!currentUser\) \{[\s\S]*?renderBoot\(\);[\s\S]*?bootScreen[\s\S]*?return;[\s\S]*?\}/.test(html), 'Unauthenticated users start at the boot/setup flow');

console.log('Discovery flow static checks passed');
