-- ============================================
-- Run this in Supabase SQL Editor
-- Clears sample data and inserts real products
-- with correct image paths
-- ============================================

-- Clear existing sample data
DELETE FROM inventory;
DELETE FROM product_images;
DELETE FROM products;
DELETE FROM categories;

-- Categories
INSERT INTO categories (name, slug, image, sort_order) VALUES
('Rings', 'rings', '/figmaAssets2/product-aurelius-band.png', 1),
('Necklaces', 'necklaces', '/figmaAssets2/product-mani-link-chain.png', 2),
('Cuffs & Bangles', 'cuffs-bangles', '/figmaAssets2/product-gilded-drift-cuff.png', 3),
('Bracelets', 'bracelets', '/products/bracelet-unisex-1.jpg', 4),
('Pendants', 'pendants', '/products/pendant-moon-pendant-cover.png', 5);

-- Products
INSERT INTO products (id, category_id, name, description, price, material, image, is_active, is_new) VALUES
-- Rings
(gen_random_uuid(), (SELECT id FROM categories WHERE slug='rings'), 'Aurelius Band', 'Hand-hammered 22k gold with a whispered patina of antiquity.', 72000, '22K Gold', '/figmaAssets2/product-aurelius-band.png', true, true),

-- Necklaces
(gen_random_uuid(), (SELECT id FROM categories WHERE slug='necklaces'), 'Mani Link Chain', 'Each link forged individually, carrying the mark of its maker.', 95000, '22K Gold', '/figmaAssets2/product-mani-link-chain.png', true, true),
(gen_random_uuid(), (SELECT id FROM categories WHERE slug='necklaces'), 'Heritage Link Necklace', 'A heritage link necklace cast in 18k gold-plated silver alloy.', 48000, '18K Gold Plated', '/figmaAssets2/product-mani-link-chain.png', true, false),

-- Cuffs & Bangles
(gen_random_uuid(), (SELECT id FROM categories WHERE slug='cuffs-bangles'), 'Gilded Drift Cuff', 'Molten gold shaped by hand — no two are exactly alike.', 55000, '22K Gold', '/figmaAssets2/product-gilded-drift-cuff.png', true, true),

-- Bracelets
(gen_random_uuid(), (SELECT id FROM categories WHERE slug='bracelets'), 'Unisex Gold Bracelet', 'A timeless unisex statement, meticulously balanced with heavy solid gold links.', 110000, '22K Gold', '/products/bracelet-unisex-1.jpg', true, true),

-- Pendants
(gen_random_uuid(), (SELECT id FROM categories WHERE slug='pendants'), 'Bar Pendant', 'A sleek, architectural vertical gold bar with subtle hand-struck facets.', 6500, '22K Gold', '/products/pendant-bar-pendant-cover.jpg', true, true),
(gen_random_uuid(), (SELECT id FROM categories WHERE slug='pendants'), 'Bird Pendant', 'A delicate avian silhouette poised in solid gold, capturing the grace of flight.', 6800, '22K Gold', '/products/pendant-bird-pendant-cover.png', true, true),
(gen_random_uuid(), (SELECT id FROM categories WHERE slug='pendants'), 'Boat Pendant', 'A maritime motif sculpted with flowing curves and satin reflections.', 7200, '22K Gold', '/products/pendant-boat-pendant-cover.png', true, true),
(gen_random_uuid(), (SELECT id FROM categories WHERE slug='pendants'), 'Butterfly Pendant', 'Intricately openworked butterfly wings reflecting pure light with every movement.', 7000, '22K Gold', '/products/pendant-butterfly-pendant-cover.png', true, true),
(gen_random_uuid(), (SELECT id FROM categories WHERE slug='pendants'), 'Fish Pendant', 'A symbolic fish motif, intricately carved with exquisite attention to detail.', 7000, '22K Gold', '/products/pendant-fish-pendant-cover.jpg', true, true),
(gen_random_uuid(), (SELECT id FROM categories WHERE slug='pendants'), 'Flower Pendant', 'A blooming floral medallion detailed with hand-engraved petals in high-carat gold.', 6600, '22K Gold', '/products/pendant-flower-pendant-cover.png', true, true),
(gen_random_uuid(), (SELECT id FROM categories WHERE slug='pendants'), 'Leaf Pendant', 'Natural botanical elegance preserved in solid gold with lifelike vein texturing.', 6400, '22K Gold', '/products/pendant-leaf-pendant-cover.png', true, true),
(gen_random_uuid(), (SELECT id FROM categories WHERE slug='pendants'), 'Moon Pendant', 'A celestial crescent cast with a gentle, dreamlike hammered patina.', 7500, '22K Gold', '/products/pendant-moon-pendant-cover.png', true, true),
(gen_random_uuid(), (SELECT id FROM categories WHERE slug='pendants'), 'Pendant Set', 'A magnificent matching ensemble of handcrafted pendants for layered elegance.', 12000, '22K Gold', '/products/pendant-pendant-set-cover.jpg', true, true),
(gen_random_uuid(), (SELECT id FROM categories WHERE slug='pendants'), 'Plus Pendant', 'A modern geometric cross accent radiating bold symmetry and timeless style.', 5800, '22K Gold', '/products/pendant-plus-pendant-cover.png', true, true),
(gen_random_uuid(), (SELECT id FROM categories WHERE slug='pendants'), 'Snake Pendant', 'A serpentine form coiled in gold, symbolizing transformation and eternal renewal.', 8200, '22K Gold', '/products/pendant-snake-pendant-cover.png', true, true),
(gen_random_uuid(), (SELECT id FROM categories WHERE slug='pendants'), 'Spiral Pendant', 'An infinite golden spiral symbolizing continuous motion and harmony.', 6900, '22K Gold', '/products/pendant-spiral-pendant-cover.png', true, true),
(gen_random_uuid(), (SELECT id FROM categories WHERE slug='pendants'), 'Star Pendant', 'A radiant star motif pendant with intricate detailing.', 7800, '22K Gold', '/products/pendant-star-pendant-cover.png', true, true),
(gen_random_uuid(), (SELECT id FROM categories WHERE slug='pendants'), 'Tiger Pendant', 'A fierce and majestic tiger crest, masterfully struck with bold detailing.', 9500, '22K Gold', '/products/pendant-tiger-pendant-cover.png', true, true);

-- Set inventory for all products
INSERT INTO inventory (product_id, stock_count)
SELECT id, 10 FROM products;

-- Add gallery images for products with multiple photos
INSERT INTO product_images (product_id, image_url, is_primary, sort_order)
SELECT id, '/products/bracelet-unisex-1.jpg', true, 1 FROM products WHERE name = 'Unisex Gold Bracelet'
UNION ALL SELECT id, '/products/bracelet-unisex-2.jpg', false, 2 FROM products WHERE name = 'Unisex Gold Bracelet'
UNION ALL SELECT id, '/products/bracelet-unisex-3.jpg', false, 3 FROM products WHERE name = 'Unisex Gold Bracelet'
UNION ALL SELECT id, '/products/bracelet-unisex-4.jpg', false, 4 FROM products WHERE name = 'Unisex Gold Bracelet'
UNION ALL SELECT id, '/products/pendant-bar-pendant-cover.jpg', true, 1 FROM products WHERE name = 'Bar Pendant'
UNION ALL SELECT id, '/products/pendant-bar-pendant-1.jpg', false, 2 FROM products WHERE name = 'Bar Pendant'
UNION ALL SELECT id, '/products/pendant-bar-pendant-2.jpg', false, 3 FROM products WHERE name = 'Bar Pendant'
UNION ALL SELECT id, '/products/pendant-bar-pendant-3.jpg', false, 4 FROM products WHERE name = 'Bar Pendant'
UNION ALL SELECT id, '/products/pendant-moon-pendant-cover.png', true, 1 FROM products WHERE name = 'Moon Pendant'
UNION ALL SELECT id, '/products/pendant-moon-pendant-1.jpg', false, 2 FROM products WHERE name = 'Moon Pendant'
UNION ALL SELECT id, '/products/pendant-moon-pendant-2.jpg', false, 3 FROM products WHERE name = 'Moon Pendant'
UNION ALL SELECT id, '/products/pendant-moon-pendant-3.jpg', false, 4 FROM products WHERE name = 'Moon Pendant'
UNION ALL SELECT id, '/products/pendant-star-pendant-cover.png', true, 1 FROM products WHERE name = 'Star Pendant'
UNION ALL SELECT id, '/products/pendant-star-pendant-1.jpg', false, 2 FROM products WHERE name = 'Star Pendant'
UNION ALL SELECT id, '/products/pendant-star-pendant-2.jpg', false, 3 FROM products WHERE name = 'Star Pendant'
UNION ALL SELECT id, '/products/pendant-star-pendant-3.jpg', false, 4 FROM products WHERE name = 'Star Pendant'
UNION ALL SELECT id, '/products/pendant-tiger-pendant-cover.png', true, 1 FROM products WHERE name = 'Tiger Pendant'
UNION ALL SELECT id, '/products/pendant-tiger-pendant-1.jpg', false, 2 FROM products WHERE name = 'Tiger Pendant'
UNION ALL SELECT id, '/products/pendant-tiger-pendant-2.jpg', false, 3 FROM products WHERE name = 'Tiger Pendant'
UNION ALL SELECT id, '/products/pendant-tiger-pendant-3.jpg', false, 4 FROM products WHERE name = 'Tiger Pendant';
