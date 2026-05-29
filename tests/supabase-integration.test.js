const assert = require('assert');
const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const schema = fs.readFileSync('supabase/schema.sql', 'utf8');

assert(html.includes('https://zschopwuyawdhavgmbhi.supabase.co'), 'Supabase project URL is configured');
assert(html.includes('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2'), 'Supabase browser SDK is loaded');
assert(html.includes('id="authScreen"'), 'Auth screen exists');
assert(html.includes('REGISTER') && html.includes('LOGIN'), 'Register and login buttons exist');
assert(html.includes('function signUp') || html.includes('async function signUp'), 'signUp function exists');
assert(html.includes('function signIn') || html.includes('async function signIn'), 'signIn function exists');
assert(html.includes('function signOut') || html.includes('async function signOut'), 'signOut function exists');
assert(html.includes('future_self_profiles'), 'App reads/writes future_self_profiles table');
assert(html.includes('persistRemoteState'), 'App persists state remotely');
assert(html.includes('loadRemoteState'), 'App loads state remotely');
assert(html.includes('migrateLocalState'), 'App migrates existing localStorage state');
assert(html.includes('id="monthLabel"'), 'Progress view has a visible month label');
assert(html.includes('PREV_MONTH') && html.includes('NEXT_MONTH'), 'Progress view has month navigation buttons');
assert(html.includes('changeHistoryMonth'), 'Progress view can navigate history months');
assert(html.includes('renderMonthCalendar'), 'Progress view renders full month calendars');
assert(html.includes('historyMonthOffset'), 'Progress view tracks selected history month');
assert(html.includes('read-dot morning'), 'Calendar day renders morning completion visual');
assert(html.includes('read-dot night'), 'Calendar day renders night completion visual');
assert(!html.includes('>M</span>') && !html.includes('>N</span>'), 'Calendar completion boxes are unlabeled');
assert(!html.includes('M = morning / N = night'), 'Calendar legend does not mention M/N labels');
assert(html.includes('.top-bar') && html.includes('position: static'), 'Mode toggle lives in normal top page flow, not fixed over content');
assert(!html.includes('position: fixed;\n    top: 12px;\n    right: 12px;'), 'Mode toggle is not fixed over the page');
assert(html.includes('grid-template-areas:') && html.includes('"title title"') && html.includes('"prev next"'), 'Month controls stack safely on mobile');
assert(html.includes('overflow-wrap: anywhere'), 'Mobile text can wrap instead of overflowing');
assert(html.includes('monthSummary'), 'Progress view shows selected month completion summary');

assert(schema.includes('create table if not exists public.future_self_profiles'), 'Schema creates profile table');
assert(schema.includes('alter table public.future_self_profiles enable row level security'), 'Schema enables RLS');
assert(schema.includes('auth.uid() = id'), 'RLS restricts rows to the logged-in user');
assert(schema.includes('identity jsonb') && schema.includes('checks jsonb'), 'Schema stores identity and checks JSON');

console.log('Supabase integration static checks passed');
