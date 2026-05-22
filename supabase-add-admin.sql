-- Run this in Supabase SQL Editor
-- Adds manidoro.official@gmail.com as admin

INSERT INTO admin_users (email, name, role)
VALUES ('manidoro.official@gmail.com', 'Mani DOro Admin', 'owner')
ON CONFLICT (email) DO NOTHING;
