const assert = require('assert');
const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

assert(html.includes('id="discoveryScreen"'), 'Optional discovery screen exists');
assert(html.includes('I know what I want'), 'Manual setup choice is visible');
assert(html.includes('Help me figure it out'), 'Guided discovery choice is visible');
assert(html.includes('textarea class="input discovery-input"'), 'Guided onboarding uses open-ended writing, not only preset chips');
assert(html.includes('If your future self was already real'), 'Guided step 1 asks for present-tense identity');
assert(html.includes('Walk through one normal day as that person'), 'Guided flow asks for a lived daily routine');
assert(html.includes('How does your future self feel in their body?'), 'Guided flow asks about embodied state');
assert(html.includes('How do they relate to people?'), 'Guided flow includes relationships and boundaries');
assert(html.includes('What kind of work and money reality'), 'Guided flow includes work and money reality');
assert(html.includes('What does their physical world look and feel like?'), 'Guided flow includes environment and material reality');
assert(html.includes('suggestions:') && html.includes('addDiscoverySuggestion'), 'Guided flow offers optional suggestion chips without replacing text answers');
assert(html.includes('updateDiscoveryAnswer'), 'Typed discovery answers are stored as the user writes');
assert(html.includes("'Step ' + (discoveryStep + 1) + '/' + discoverySteps.length"), 'Progress reflects the full dynamic question count');
assert(/document\.getElementById\('discoveryNext'\)\.disabled = answer\.trim\(\)\.length < 8/.test(html), 'Next stays disabled until the user writes a meaningful answer');
assert(html.includes('buildDiscoveryIdentity'), 'Discovery answers can generate a starting identity');
assert(html.includes('asPresentFact'), 'Generated identity normalizes answers into present-tense facts');
assert(html.includes('asMaterialFact'), 'Generated material realities avoid awkward identity phrasing for body/environment answers');
assert(html.includes('renderDiscoveryStep'), 'Discovery flow renders one short step at a time');
assert(html.includes('showDiscoveryChoice'), 'Setup starts with optional manual vs guided choice');
assert(/if \(!currentUser\) \{[\s\S]*?showAuth\(\);[\s\S]*?return;[\s\S]*?\}/.test(html), 'Unauthenticated users keep Supabase login as the first screen on production');
assert(/async function afterAuth\(user\) \{[\s\S]*?if \(!identity\) \{[\s\S]*?renderBoot\(\);[\s\S]*?bootScreen[\s\S]*?\}/.test(html), 'Logged-in users without an identity continue into boot/discovery setup');
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

console.log('Discovery flow static checks passed');
