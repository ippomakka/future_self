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

assert(schema.includes('create table if not exists public.future_self_profiles'), 'Schema creates profile table');
assert(schema.includes('alter table public.future_self_profiles enable row level security'), 'Schema enables RLS');
assert(schema.includes('auth.uid() = id'), 'RLS restricts rows to the logged-in user');
assert(schema.includes('identity jsonb') && schema.includes('checks jsonb'), 'Schema stores identity and checks JSON');

console.log('Supabase integration static checks passed');
