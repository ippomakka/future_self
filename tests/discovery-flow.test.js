const assert = require('assert');
const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

assert(html.includes('id="discoveryScreen"'), 'Optional discovery screen exists');
assert(html.includes('I know what I want'), 'Manual setup choice is visible');
assert(html.includes('Help me figure it out'), 'Guided discovery choice is visible');
assert(html.includes('What feels heavy right now?'), 'Guided step 1 finds the signal without locking negative language into the identity');
assert(html.includes('What do you have instead?'), 'Guided step 2 asks desired present-state ownership');
assert(html.includes('What physical shift would change things?'), 'Guided step 3 asks physical direction');
assert(html.includes('Choose up to 3'), 'Guided steps stay short with a clear selection limit');
assert(html.includes('buildDiscoveryIdentity'), 'Discovery answers can generate a starting identity');
assert(html.includes('renderDiscoveryStep'), 'Discovery flow renders one short step at a time');
assert(html.includes('showDiscoveryChoice'), 'Setup starts with optional manual vs guided choice');
assert(html.includes('reviewDiscoveryIdentity'), 'SAVE_THIS opens a final editable review instead of locking immediately');
const saveDiscoveryBody = html.match(/function saveDiscoveryIdentity\(\) \{([\s\S]*?)\n  \}/)[1];
assert(saveDiscoveryBody.includes('reviewDiscoveryIdentity();'), 'SAVE_THIS routes to final edit form before lock-in');
assert(!saveDiscoveryBody.includes('showDashboard();'), 'SAVE_THIS does not skip directly to dashboard');
assert(html.includes('Review your generated direction'), 'Final review copy tells users they can edit before locking in');
assert(html.includes('identity?.discovery') && html.includes('discovery: identity.discovery'), 'Final lock preserves discovery metadata after review edits');
assert(!html.includes('I am no longer'), 'Generated identity never rehearses absence/deficit language');
assert(!html.includes('no longer ruled'), 'Generated identity does not focus on what the user no longer has');
assert(!html.includes('free from ${doneText}'), 'Generated feelings avoid reinforcing unwanted states');
assert(!html.includes('You are done feeling'), 'Discovery result summary avoids negative lock-in phrasing');
assert(html.includes('I have the inner state of ${desiredText}.'), 'Generated identity focuses on what the user has now');
assert(!/if \(!currentUser\) \{[\s\S]*?showAuth\(\);[\s\S]*?return;[\s\S]*?\}/.test(html), 'Feature branch does not show sign/login as the first unauthenticated screen');
assert(/if \(!currentUser\) \{[\s\S]*?renderBoot\(\);[\s\S]*?bootScreen[\s\S]*?return;[\s\S]*?\}/.test(html), 'Unauthenticated users start at the boot/setup flow');

console.log('Discovery flow static checks passed');
