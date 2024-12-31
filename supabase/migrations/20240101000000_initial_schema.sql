-- Create profiles table
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  avatar_url text,
  email text not null,
  unique(email)
);

-- Create couples table
create table couples (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  partner1_id uuid references profiles(id) not null,
  partner2_id uuid references profiles(id) not null,
  savings_goal numeric not null default 0,
  unique(partner1_id, partner2_id)
);

-- Create transactions table
create table transactions (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  description text not null,
  amount numeric not null,
  category text not null,
  type text not null check (type in ('personal', 'joint')),
  partner_id uuid references profiles(id) not null,
  couple_id uuid references couples(id) not null
);

-- Create savings table
create table savings (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  amount numeric not null,
  partner_id uuid references profiles(id) not null,
  couple_id uuid references couples(id) not null
);

-- Enable Row Level Security (RLS)
alter table profiles enable row level security;
alter table couples enable row level security;
alter table transactions enable row level security;
alter table savings enable row level security;

-- Create policies
create policy "Users can view own profile"
  on profiles for select
  using ( auth.uid() = id );

create policy "Users can update own profile"
  on profiles for update
  using ( auth.uid() = id );

create policy "Users can view couples they are part of"
  on couples for select
  using (
    auth.uid() = partner1_id or
    auth.uid() = partner2_id
  );

create policy "Users can update couples they are part of"
  on couples for update
  using (
    auth.uid() = partner1_id or
    auth.uid() = partner2_id
  );

create policy "Users can view transactions for their couples"
  on transactions for select
  using (
    exists (
      select 1 from couples
      where id = transactions.couple_id
      and (partner1_id = auth.uid() or partner2_id = auth.uid())
    )
  );

create policy "Users can insert their own transactions"
  on transactions for insert
  with check (
    partner_id = auth.uid() and
    exists (
      select 1 from couples
      where id = transactions.couple_id
      and (partner1_id = auth.uid() or partner2_id = auth.uid())
    )
  );

create policy "Users can view savings for their couples"
  on savings for select
  using (
    exists (
      select 1 from couples
      where id = savings.couple_id
      and (partner1_id = auth.uid() or partner2_id = auth.uid())
    )
  );

create policy "Users can insert their own savings"
  on savings for insert
  with check (
    partner_id = auth.uid() and
    exists (
      select 1 from couples
      where id = savings.couple_id
      and (partner1_id = auth.uid() or partner2_id = auth.uid())
    )
  );
