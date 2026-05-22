-- ============================================
-- Additional tables used by AdminPage
-- Run this in Supabase SQL Editor
-- ============================================

-- Site settings (key-value store for admin config)
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Archive items (for homepage archive section)
CREATE TABLE IF NOT EXISTS archive_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  image TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Contact inquiries (from Contact Us page)
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  interest TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE archive_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a contact inquiry
CREATE POLICY "Public insert contact_inquiries" ON contact_inquiries FOR INSERT WITH CHECK (true);
-- Only admin can read them
CREATE POLICY "Admin read contact_inquiries" ON contact_inquiries FOR SELECT USING (is_admin());
CREATE POLICY "Admin update contact_inquiries" ON contact_inquiries FOR UPDATE USING (is_admin());

-- ============================================
-- Admin RLS Policies (full CRUD for admin users)
-- ============================================

-- Helper function to check if current user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM admin_users WHERE email = auth.jwt()->>'email'
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- Products: admin full access
CREATE POLICY "Admin full access products" ON products FOR ALL USING (is_admin()) WITH CHECK (is_admin());

-- Categories: admin full access
CREATE POLICY "Admin full access categories" ON categories FOR ALL USING (is_admin()) WITH CHECK (is_admin());

-- Product images: admin full access
CREATE POLICY "Admin full access product_images" ON product_images FOR ALL USING (is_admin()) WITH CHECK (is_admin());

-- Orders: admin can read and update all
CREATE POLICY "Admin read all orders" ON orders FOR SELECT USING (is_admin());
CREATE POLICY "Admin update orders" ON orders FOR UPDATE USING (is_admin());

-- Order items: admin can read all
CREATE POLICY "Admin read all order_items" ON order_items FOR SELECT USING (is_admin());

-- Inventory: admin full access
CREATE POLICY "Admin full access inventory" ON inventory FOR ALL USING (is_admin()) WITH CHECK (is_admin());

-- Reviews: admin can manage all
CREATE POLICY "Admin full access reviews" ON reviews FOR ALL USING (is_admin()) WITH CHECK (is_admin());

-- Coupons: admin full access
CREATE POLICY "Admin full access coupons" ON coupons FOR ALL USING (is_admin()) WITH CHECK (is_admin());

-- Site settings: admin full access, public read
CREATE POLICY "Public read site_settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Admin full access site_settings" ON site_settings FOR ALL USING (is_admin()) WITH CHECK (is_admin());

-- Archive items: public read, admin full access
CREATE POLICY "Public read archive_items" ON archive_items FOR SELECT USING (true);
CREATE POLICY "Admin full access archive_items" ON archive_items FOR ALL USING (is_admin()) WITH CHECK (is_admin());

-- Admin users: only admins can read
CREATE POLICY "Admin read admin_users" ON admin_users FOR SELECT USING (is_admin());

-- Customers: admin can read all
CREATE POLICY "Admin read all customers" ON customers FOR SELECT USING (is_admin());

-- ============================================
-- Insert yourself as admin (replace with your email)
-- ============================================
-- INSERT INTO admin_users (email, name, role) VALUES ('your-email@example.com', 'Admin', 'owner');
