-- ============================================
-- Jewellery Seller App — Supabase Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- Categories
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  image TEXT,
  sort_order INTEGER DEFAULT 0
);

-- Products
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES categories(id),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL NOT NULL,
  compare_price DECIMAL,
  weight_grams DECIMAL,
  material TEXT,
  image TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  is_new BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Product Images
CREATE TABLE product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0
);

-- Customers (extends Supabase Auth)
CREATE TABLE customers (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  name TEXT,
  phone TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Addresses
CREATE TABLE addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  label TEXT DEFAULT 'Home',
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address_line TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  pincode TEXT NOT NULL,
  is_default BOOLEAN DEFAULT false
);

-- Orders
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,
  customer_id UUID REFERENCES customers(id),
  address_id UUID REFERENCES addresses(id),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','confirmed','shipped','delivered','cancelled')),
  subtotal DECIMAL NOT NULL,
  discount DECIMAL DEFAULT 0,
  shipping_fee DECIMAL DEFAULT 0,
  total DECIMAL NOT NULL,
  payment_method TEXT DEFAULT 'COD',
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending','paid','failed','refunded')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Order Items
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price DECIMAL NOT NULL,
  size TEXT
);

-- Inventory
CREATE TABLE inventory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID UNIQUE REFERENCES products(id) ON DELETE CASCADE,
  stock_count INTEGER NOT NULL DEFAULT 0,
  reserved_count INTEGER DEFAULT 0,
  low_stock_threshold INTEGER DEFAULT 3
);

-- Wishlists
CREATE TABLE wishlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(customer_id, product_id)
);

-- Reviews
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES customers(id),
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Coupons
CREATE TABLE coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  discount_type TEXT CHECK (discount_type IN ('percent','fixed')),
  discount_value DECIMAL NOT NULL,
  min_order_amount DECIMAL DEFAULT 0,
  max_uses INTEGER,
  used_count INTEGER DEFAULT 0,
  valid_from TIMESTAMPTZ DEFAULT now(),
  valid_until TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true
);

-- Admin users (for seller dashboard)
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'owner' CHECK (role IN ('owner','manager','staff')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- Row Level Security (RLS)
-- ============================================

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS Policies: Public read access
-- ============================================

CREATE POLICY "Public read products" ON products FOR SELECT USING (is_active = true);
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read product_images" ON product_images FOR SELECT USING (true);
CREATE POLICY "Public read approved reviews" ON reviews FOR SELECT USING (is_approved = true);
CREATE POLICY "Public read inventory" ON inventory FOR SELECT USING (true);

-- ============================================
-- RLS Policies: Authenticated customer access
-- ============================================

CREATE POLICY "Customer read own data" ON customers FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Customer update own data" ON customers FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Customer manage addresses" ON addresses FOR ALL USING (auth.uid() = customer_id);
CREATE POLICY "Customer read own orders" ON orders FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "Customer create orders" ON orders FOR INSERT WITH CHECK (auth.uid() = customer_id);
CREATE POLICY "Customer read own order items" ON order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.customer_id = auth.uid())
);
CREATE POLICY "Customer manage wishlist" ON wishlists FOR ALL USING (auth.uid() = customer_id);
CREATE POLICY "Customer create reviews" ON reviews FOR INSERT WITH CHECK (auth.uid() = customer_id);

-- ============================================
-- Sample Data
-- ============================================

INSERT INTO categories (name, slug, image, sort_order) VALUES
('Pendants', 'pendants', '/products/pendant-category.jpg', 1),
('Bracelets', 'bracelets', '/products/bracelet-category.jpg', 2),
('Rings', 'rings', '/products/ring-category.jpg', 3),
('Necklaces', 'necklaces', '/products/necklace-category.jpg', 4);

INSERT INTO products (category_id, name, description, price, material, image, is_new) VALUES
((SELECT id FROM categories WHERE slug='pendants'), 'Moon Pendant', 'A celestial crescent moon pendant in polished gold.', 4500, '22K Gold', '/products/moon-pendant.jpg', true),
((SELECT id FROM categories WHERE slug='pendants'), 'Star Pendant', 'A radiant star motif pendant with intricate detailing.', 3800, '22K Gold', '/products/star-pendant.jpg', true),
((SELECT id FROM categories WHERE slug='pendants'), 'Leaf Pendant', 'Nature-inspired leaf pendant with delicate veining.', 3200, '22K Gold', '/products/leaf-pendant.jpg', true),
((SELECT id FROM categories WHERE slug='bracelets'), 'Classic Chain Bracelet', 'A timeless chain bracelet in gold-plated silver.', 2800, '18K Gold Plated', '/products/chain-bracelet.jpg', false),
((SELECT id FROM categories WHERE slug='necklaces'), 'Heritage Link Necklace', 'A heritage link necklace in 18k gold-plated silver alloy.', 6500, '18K Gold Plated', '/products/link-necklace.jpg', true);

INSERT INTO inventory (product_id, stock_count)
SELECT id, 10 FROM products;
