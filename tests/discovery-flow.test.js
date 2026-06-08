const assert = require('assert');
const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

assert(html.includes('id="discoveryScreen"'), 'Optional discovery screen exists');
assert(html.includes('I know what I want'), 'Manual setup choice is visible');
assert(html.includes('Help me figure it out'), 'Guided discovery choice is visible');
assert(html.includes('You are not here to be handed an identity'), 'Guide frames the user as responsible for knowing their own future state');
assert(html.includes('What is the greatest expression of myself I can imagine being?'), 'Guide anchors on the greatest-expression framing question');
assert(html.includes('What is the greatest ideal of myself I can be today?'), 'Guide includes the today ideal supporting question');
assert(html.includes('What thoughts would this future version of me think?'), 'Guide asks the thoughts dimension');
assert(html.includes('What thoughts would I have to stop thinking'), 'Guide asks which old thoughts must stop');
assert(html.includes('How would this person act?'), 'Guide asks the behaviours/choices dimension');
assert(html.includes('What routines would become normal for them?'), 'Guide asks about ordinary routines');
assert(html.includes('What would this person feel before the result arrives?'), 'Guide asks the emotions dimension');
assert(html.includes('What emotions would I have to start memorising?'), 'Guide asks about memorising emotions ahead of the result');
assert(html.includes('What would it be like to be'), 'Guide uses the open exploration phrasing');
assert(html.includes('Who do I admire, and what qualities do they embody?'), 'Guide asks the admiration/latent qualities prompt');
assert(html.includes('What would I have to change about myself, or let go of'), 'Guide asks what must change or be let go');
assert(html.includes('Mental_Rehearsal'), 'Guide ends with mental rehearsal rather than generated answers');
assert(html.includes('Think the thoughts of that future self'), 'Mental rehearsal copy asks the user to rehearse thoughts');
assert(html.includes('Feel the emotions before the outer proof arrives'), 'Mental rehearsal copy asks the user to feel emotions before results');
assert(html.includes('WRITE_MY_IDENTITY'), 'Guide ultimately sends the user to write their own identity');
assert(html.includes('GUIDED_PROCESS'), 'Config includes a guided process option for users who already locked an identity');
assert(html.includes('The guide will not change anything until you write and lock a new identity yourself.'), 'Config explains rerunning the guide is safe until the user locks a new identity');
assert(/function startDiscoveryFlow\(\) \{[\s\S]*?hideAllScreens\(\);[\s\S]*?discoveryScreen'\)\.classList\.remove\('hidden'\)/.test(html), 'Guided process can launch directly from config, not only from the onboarding choice screen');
assert(!html.includes('textarea class="input discovery-input"'), 'Guided onboarding does not collect written answers inside the guide');
assert(!html.includes('updateDiscoveryAnswer'), 'Guide does not store question answers');
assert(!html.includes('addDiscoverySuggestion'), 'Guide does not offer answer chips or suggestions');
assert(!html.includes('buildDiscoveryIdentity'), 'Guide does not generate an identity for the user');
assert(!html.includes('Review your generated direction'), 'Guide does not produce a generated draft to review');
assert(!html.includes('SAVE_THIS'), 'Guide cannot save a generated identity');
assert(/if \(!currentUser\) \{[\s\S]*?showAuth\(\);[\s\S]*?return;[\s\S]*?\}/.test(html), 'Unauthenticated users keep Supabase login as the first screen on production');
assert(/async function afterAuth\(user\) \{[\s\S]*?if \(!identity\) \{[\s\S]*?renderBoot\(\);[\s\S]*?bootScreen[\s\S]*?\}/.test(html), 'Logged-in users without an identity continue into boot/discovery setup');

console.log('Discovery flow static checks passed');
