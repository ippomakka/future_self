-- FUTURE_SELF Supabase schema
-- Run this in Supabase Dashboard → SQL Editor for project zschopwuyawdhavgmbhi.

create table if not exists public.future_self_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  identity jsonb,
  checks jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.future_self_profiles enable row level security;

drop policy if exists "Users can read own future self profile" on public.future_self_profiles;
create policy "Users can read own future self profile"
  on public.future_self_profiles
  for select
  using (auth.uid() = id);

drop policy if exists "Users can insert own future self profile" on public.future_self_profiles;
create policy "Users can insert own future self profile"
  on public.future_self_profiles
  for insert
  with check (auth.uid() = id);

drop policy if exists "Users can update own future self profile" on public.future_self_profiles;
create policy "Users can update own future self profile"
  on public.future_self_profiles
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

drop policy if exists "Users can delete own future self profile" on public.future_self_profiles;
create policy "Users can delete own future self profile"
  on public.future_self_profiles
  for delete
  using (auth.uid() = id);

create or replace function public.set_future_self_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_future_self_profiles_updated_at on public.future_self_profiles;
create trigger set_future_self_profiles_updated_at
  before update on public.future_self_profiles
  for each row
  execute function public.set_future_self_updated_at();
