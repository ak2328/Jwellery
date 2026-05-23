import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { NavbarSection } from "./sections/NavbarSection";
import { FooterSection } from "./sections/FooterSection";
import { useCart } from "@/lib/CartContext";
import { useWishlist } from "@/lib/WishlistContext";

interface Product {
  id: string;
  category: string;
  name: string;
  description: string;
  long_description?: string;
  price: string;
  image: string;
  isNew: boolean;
  gallery?: string[];
  details_bullets?: string[];
  materials_bullets?: string[];

  shipping_note?: string;

  whatsapp_number?: string;
}

const getGalleryImages = (prod: any) => {
  if (prod.gallery && Array.isArray(prod.gallery) && prod.gallery.length > 0) {
    return prod.gallery;
  }
  
  const nameLower = prod.name ? prod.name.toLowerCase() : "";

  if (prod.id === "unisex-gold-bracelet" || nameLower === "unisex gold bracelet") {
    return [
      "/products/new-bracelet.png",
      "/products/bracelet-unisex-1.jpg",
      "/products/bracelet-unisex-3.jpg",
      "/products/bracelet-unisex-4.jpg",
    ];
  }
  if (prod.id === "pendant-set" || nameLower === "pendant set") {
    return [
      "/products/pendant-pendant-set-1.jpg",
      "/products/pendant-pendant-set-2.jpg",
      "/products/pendant-pendant-set-3.jpg",
      "/products/pendant-pendant-set-4.jpg"
    ];
  }
  if ((prod.id && prod.id.endsWith("-pendant")) || nameLower.endsWith(" pendant")) {
    let base = "";
    if (prod.id && prod.id.endsWith("-pendant")) {
      base = prod.id.replace("-pendant", "");
    } else {
      base = nameLower.replace(" pendant", "").replace(/\s+/g, "-");
    }
    if (base === "bar") {
      return [
        `/products/new-bar-pendant.jpg`,
        `/products/pendant-bar-2.jpg`,
        `/products/pendant-bar-3.jpg`,
        `/products/pendant-bar-4.jpg`,
      ];
    }
    
    if (base === "fish") {
      return [
        `/products/new-fish-pendant.png`,
        `/products/pendant-fish-2.jpg`,
        `/products/pendant-fish-3.jpg`,
        `/products/pendant-fish-4.jpg`,
      ];
    }
    
    return [
      `/products/pendant-${base}-pendant-1.jpg`,
      `/products/pendant-${base}-pendant-2.jpg`,
      `/products/pendant-${base}-pendant-3.jpg`,
      `/products/pendant-${base}-pendant-4.jpg`,
    ];
  }
  return [
    prod.image,
    "/bespoke/sketch-design.png",
    "/figmaAssets/jeweler-working-on-a-custom-piece.png",
  ];
};

export const ProductPage = ({ params }: { params: { id: string } }): JSX.Element => {
  const [, setLocation] = useLocation();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"heritage" | "materials">("heritage");
  const [inquiryForm, setInquiryForm] = useState({ name: "", email: "", note: "" });
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const { addItem } = useCart();
  const { toggle: wishToggle, isWishlisted } = useWishlist();

  useEffect(() => {
    if (product) {
      const gallery = getGalleryImages(product);
      setSelectedImage(gallery[0] || product.image);
      setSelectedImageIndex(0);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  // Load product from Supabase, with static client fallback
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { supabase } = await import("../lib/supabase");
        const { data, error } = await supabase
          .from("products")
          .select("*, product_images(image_url)")
          .eq("id", params.id)
          .single();

        if (!error && data) {
          const nameLC = (data.name || "").toLowerCase();
          let customImage = data.image;
          if (data.id === 'bar-pendant' || nameLC.includes('bar pendant')) customImage = '/products/new-bar-pendant.jpg';
          if (data.id === 'fish-pendant' || nameLC.includes('fish pendant')) customImage = '/products/new-fish-pendant.png';
          if (data.id === 'unisex-gold-bracelet' || nameLC.includes('unisex') || nameLC.includes('bracelet')) customImage = '/products/new-bracelet.png';

          // Build gallery: prepend new thumbnail if it's one of the 3 updated products
          let gallery = data.product_images?.map((pi: any) => pi.image_url) || [];
          if (nameLC.includes('bar pendant')) gallery = ['/products/new-bar-pendant.jpg', '/products/pendant-bar-2.jpg', '/products/pendant-bar-3.jpg', '/products/pendant-bar-4.jpg'];
          if (nameLC.includes('fish pendant')) gallery = ['/products/new-fish-pendant.png', '/products/pendant-fish-2.jpg', '/products/pendant-fish-3.jpg', '/products/pendant-fish-4.jpg'];
          if (nameLC.includes('unisex') || nameLC.includes('bracelet')) gallery = ['/products/new-bracelet.png', '/products/bracelet-unisex-1.jpg', '/products/bracelet-unisex-3.jpg', '/products/bracelet-unisex-4.jpg'];

          setProduct({
            id: data.id,
            category: data.categories?.name || data.category || "Pendants",
            name: data.name,
            description: data.description,
            long_description: data.long_description || "",
            price: `₹${Number(data.price).toLocaleString("en-IN")}`,
            image: customImage,
            isNew: data.is_new,
            gallery,
            details_bullets: data.details_bullets || [],
            materials_bullets: data.materials_bullets || [],
            shipping_note: data.shipping_note || "",
            whatsapp_number: data.whatsapp_number || "",
          });
          setLoading(false);
          return;
        }
        throw new Error("Product not found in Supabase");
      } catch (err) {
        console.warn("Failed fetching product from Supabase, loading static fallback...", err);
        // Fallback static products
        const staticProducts: any[] = [
          {
            id: "aurelius-band",
            category: "Rings",
            name: "Aurelius Band",
            description: "Hand-hammered 22k gold with a whispered patina of antiquity.",
            price: "$980",
            image: "/figmaAssets2/product-aurelius-band.png",
            isNew: true,
      },
          {
            id: "mani-link-chain",
            category: "Pendants",
            name: "Mani Link Chain",
            description: "Each link forged individually, carrying the mark of its maker.",
            price: "$1,240",
            image: "/figmaAssets2/product-mani-link-chain.png",
            isNew: true,
      },
          {
            id: "gilded-drift-cuff",
            category: "Bracelets",
            name: "Gilded Drift Cuff",
            description: "Molten gold shaped by hand � no two are exactly alike.",
            price: "$740",
            image: "/figmaAssets2/product-gilded-drift-cuff.png",
            isNew: true,
      },
          {
            id: "unisex-gold-bracelet",
            category: "Bracelets",
            name: "Unisex Gold Bracelet",
            description: "A timeless unisex statement, meticulously balanced with heavy solid gold links.",
            price: "$1,420",
            image: "/products/new-bracelet.png",
            isNew: true,
            gallery: [
          "/products/bracelet-unisex-1.jpg",
          "/products/bracelet-unisex-2.jpg",
          "/products/bracelet-unisex-3.jpg",
          "/products/bracelet-unisex-4.jpg"
        ]
      },
          {
            id: "bar-pendant",
            category: "Pendants",
            name: "Bar Pendant",
            description: "A sleek, architectural vertical gold bar with subtle hand-struck facets.",
            price: "$850",
            image: "/products/new-bar-pendant.jpg",
            isNew: true,
            gallery: [
          "/products/new-bar-pendant.jpg",
          "/products/pendant-bar-2.jpg",
          "/products/pendant-bar-3.jpg",
          "/products/pendant-bar-4.jpg"
        ]
      },
          {
            id: "bird-pendant",
            category: "Pendants",
            name: "Bird Pendant",
            description: "A delicate avian silhouette poised in solid gold, capturing the grace of flight.",
            price: "$890",
            image: "/products/pendant-bird-pendant-cover.png",
            isNew: true,
            gallery: [
          "/products/pendant-bird-pendant-1.jpg",
          "/products/pendant-bird-pendant-2.jpg",
          "/products/pendant-bird-pendant-3.jpg",
          "/products/pendant-bird-pendant-4.jpg"
        ]
      },
          {
            id: "boat-pendant",
            category: "Pendants",
            name: "Boat Pendant",
            description: "A maritime heritage motif sculpted with flowing curves and satin reflections.",
            price: "$940",
            image: "/products/pendant-boat-pendant-cover.png",
            isNew: true,
            gallery: [
          "/products/pendant-boat-pendant-1.jpg",
          "/products/pendant-boat-pendant-2.jpg",
          "/products/pendant-boat-pendant-3.jpg",
          "/products/pendant-boat-pendant-4.jpg"
        ]
      },
          {
            id: "butterfly-pendant",
            category: "Pendants",
            name: "Butterfly Pendant",
            description: "Intricately openworked butterfly wings reflecting pure light with every movement.",
            price: "$920",
            image: "/products/pendant-butterfly-pendant-cover.png",
            isNew: true,
            gallery: [
          "/products/pendant-butterfly-pendant-1.jpg",
          "/products/pendant-butterfly-pendant-2.jpg",
          "/products/pendant-butterfly-pendant-3.jpg",
          "/products/pendant-butterfly-pendant-4.jpg"
        ]
      },
          {
            id: "fish-pendant",
            category: "Pendants",
            name: "Fish Pendant",
            description: "A symbolic heritage fish motif, intricately carved with exquisite attention to detail.",
            price: "$920",
            image: "/products/new-fish-pendant.png",
            isNew: true,
            gallery: [
          "/products/new-fish-pendant.png",
          "/products/pendant-fish-2.jpg",
          "/products/pendant-fish-3.jpg",
          "/products/pendant-fish-4.jpg"
        ]
      },
          {
            id: "flower-pendant",
            category: "Pendants",
            name: "Flower Pendant",
            description: "A blooming floral medallion detailed with hand-engraved petals in high-carat gold.",
            price: "$860",
            image: "/products/pendant-flower-pendant-cover.png",
            isNew: true,
            gallery: [
          "/products/pendant-flower-pendant-1.jpg",
          "/products/pendant-flower-pendant-2.jpg",
          "/products/pendant-flower-pendant-3.jpg",
          "/products/pendant-flower-pendant-4.jpg"
        ]
      },
          {
            id: "leaf-pendant",
            category: "Pendants",
            name: "Leaf Pendant",
            description: "Natural botanical elegance preserved in solid gold with lifelike vein texturing.",
            price: "$840",
            image: "/products/pendant-leaf-pendant-cover.png",
            isNew: true,
            gallery: [
          "/products/pendant-leaf-pendant-1.jpg",
          "/products/pendant-leaf-pendant-2.jpg",
          "/products/pendant-leaf-pendant-3.jpg",
          "/products/pendant-leaf-pendant-4.jpg"
        ]
      },
          {
            id: "moon-pendant",
            category: "Pendants",
            name: "Moon Pendant",
            description: "A celestial crescent cast with a gentle, dreamlike hammered patina.",
            price: "$960",
            image: "/products/pendant-moon-pendant-cover.png",
            isNew: true,
            gallery: [
          "/products/pendant-moon-pendant-1.jpg",
          "/products/pendant-moon-pendant-2.jpg",
          "/products/pendant-moon-pendant-3.jpg",
          "/products/pendant-moon-pendant-4.jpg"
        ]
      },
          {
            id: "pendant-set",
            category: "Pendants",
            name: "Pendant Set",
            description: "A magnificent matching ensemble of handcrafted pendants for layered elegance.",
            price: "$1,450",
            image: "/products/pendant-pendant-set-cover.jpg",
            isNew: true,
            gallery: [
          "/products/pendant-pendant-set-1.jpg",
          "/products/pendant-pendant-set-2.jpg",
          "/products/pendant-pendant-set-3.jpg",
          "/products/pendant-pendant-set-4.jpg"
        ]
      },
          {
            id: "plus-pendant",
            category: "Pendants",
            name: "Plus Pendant",
            description: "A modern geometric cross accent radiating bold symmetry and timeless style.",
            price: "$780",
            image: "/products/pendant-plus-pendant-cover.png",
            isNew: true,
            gallery: [
          "/products/pendant-plus-pendant-1.jpg",
          "/products/pendant-plus-pendant-2.jpg",
          "/products/pendant-plus-pendant-3.jpg",
          "/products/pendant-plus-pendant-4.jpg"
        ]
      },
          {
            id: "snake-pendant",
            category: "Pendants",
            name: "Snake Pendant",
            description: "A serpentine masterpiece coiling with mesmerizing texture and serpentine allure.",
            price: "$1,120",
            image: "/products/pendant-snake-pendant-cover.png",
            isNew: true,
            gallery: [
          "/products/pendant-snake-pendant-1.jpg",
          "/products/pendant-snake-pendant-2.jpg",
          "/products/pendant-snake-pendant-3.jpg",
          "/products/pendant-snake-pendant-4.jpg"
        ]
      },
          {
            id: "spiral-pendant",
            category: "Pendants",
            name: "Spiral Pendant",
            description: "An infinite golden spiral symbolizing continuous motion and artisanal harmony.",
            price: "$880",
            image: "/products/pendant-spiral-pendant-cover.png",
            isNew: true,
            gallery: [
          "/products/pendant-spiral-pendant-1.jpg",
          "/products/pendant-spiral-pendant-2.jpg",
          "/products/pendant-spiral-pendant-3.jpg",
          "/products/pendant-spiral-pendant-4.jpg"
        ]
      },
          {
            id: "star-pendant",
            category: "Pendants",
            name: "Star Pendant",
            description: "A brilliant celestial starburst capturing warm internal glows from every angle.",
            price: "$910",
            image: "/products/pendant-star-pendant-cover.png",
            isNew: true,
            gallery: [
          "/products/pendant-star-pendant-1.jpg",
          "/products/pendant-star-pendant-2.jpg",
          "/products/pendant-star-pendant-3.jpg",
          "/products/pendant-star-pendant-4.jpg"
        ]
      },
          {
            id: "tiger-pendant",
            category: "Pendants",
            name: "Tiger Pendant",
            description: "A fierce and majestic tiger crest, masterfully struck with bold Milanese heritage.",
            price: "$1,280",
            image: "/products/pendant-tiger-pendant-cover.png",
            isNew: true,
            gallery: [
          "/products/pendant-tiger-pendant-1.jpg",
          "/products/pendant-tiger-pendant-2.jpg",
          "/products/pendant-tiger-pendant-3.jpg",
          "/products/pendant-tiger-pendant-4.jpg"
        ]
      },
          {
            id: "aurelius-chain",
            category: "Pendants",
            name: "The Aurelius Chain",
            description: "A heritage link necklace cast in 18k gold-plated silver alloy.",
            price: "$1,240",
            image: "/figmaAssets/the-aurelius-chain---detailed-gold-link-necklace.png",
            isNew: false,
      },
          {
            id: "molten-hoops",
            category: "Rings",
            name: "Molten Hoops",
            description: "Textured gold earrings sculpted to capture light in motion.",
            price: "$890",
            image: "/figmaAssets/molten-hoops---textured-gold-earrings.png",
            isNew: false,
      },
          {
            id: "oro-signet",
            category: "Rings",
            name: "Oro Signet Ring",
            description: "A bold signet with hand-engraved heritage motifs in solid gold.",
            price: "$1,080",
            image: "/figmaAssets/close-up-of-artisanal-gold-jewelry-on-a-person.png",
            isNew: false,
      },
        ];
        const found = staticProducts.find(p => p.id === params.id);
        if (found) {
          setProduct(found);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [params.id]);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryForm.name || !inquiryForm.email) return;
    setInquirySubmitted(true);
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-[#fef9e9]">
        <div className="text-center flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-t border-[#c9a84c] rounded-full animate-spin" />
          <p className="text-xs font-bold tracking-[0.2em] text-[#1d1c12]/40 uppercase font-['Manrope',sans-serif]">Loading Piece...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-[#fef9e9]">
        <div className="text-center flex flex-col items-center gap-4">
          <h2 className="text-3xl font-normal italic text-[#1d1c12]" style={{ fontFamily: "'Noto Serif', Georgia, serif" }}>Artifact Missing</h2>
          <p className="text-sm text-[#1d1c12]/60">The requested creation cannot be located in our catalog.</p>
          <button onClick={() => setLocation("/collection")} className="luxury-btn-gold" style={{ background: "#9c7a2b" }}>Return to Collection</button>
        </div>
      </div>
    );
  }

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEndHandler = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    const galleryImages = getGalleryImages(product);

    if (isLeftSwipe && selectedImageIndex < galleryImages.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
      setSelectedImage(galleryImages[selectedImageIndex + 1]);
    } else if (isRightSwipe && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
      setSelectedImage(galleryImages[selectedImageIndex - 1]);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: selectedImage || product.image,
      category: product.category,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="w-full min-h-screen bg-[#fef9e9]">
      <NavbarSection />

      {/* Spacing for navbar */}
      <div className="pt-20" />

      {/* Breadcrumbs */}
      <div className="w-full py-6 bg-[#f8f3e4] border-b border-[#1d1c12]/5">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-8 flex justify-between items-center text-[10px] font-bold tracking-widest uppercase font-['Manrope',sans-serif] text-[#1d1c12]/50">
          <div className="flex items-center gap-2">
            <span className="hover:text-[#c9a84c] cursor-pointer" onClick={() => setLocation("/")}>Home</span>
            <span>/</span>
            <span className="hover:text-[#c9a84c] cursor-pointer" onClick={() => setLocation("/collection")}>Collection</span>
            <span>/</span>
            <span className="text-[#1d1c12]/80">{product.name}</span>
          </div>
          <span className="text-[#795900]">Catalog // MT-AR-{product.id.slice(0, 4).toUpperCase()}</span>
        </div>
      </div>

      {/* Main product display section */}
      <section className="mx-auto max-w-[1280px] px-4 sm:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* LEFT COLUMN: VISUAL GALLERY (col-span-6) */}
          <div className="col-span-1 lg:col-span-6 flex flex-col gap-6">
            
            {/* Primary Large Image Frame + Arrow Navigation */}
            {(() => {
              const galleryImages = getGalleryImages(product);
              const canPrev = selectedImageIndex > 0;
              const canNext = selectedImageIndex < galleryImages.length - 1;
              const navBtn = (dir: "prev" | "next") => ({
                position: "absolute" as const,
                top: "50%",
                transform: "translateY(-50%)",
                [dir === "prev" ? "left" : "right"]: "12px",
                zIndex: 10,
                background: "rgba(254,249,233,0.88)",
                border: "1px solid rgba(29,28,18,0.12)",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: dir === "prev" ? (canPrev ? "pointer" : "default") : (canNext ? "pointer" : "default"),
                opacity: dir === "prev" ? (canPrev ? 1 : 0.3) : (canNext ? 1 : 0.3),
                transition: "all 0.2s",
                backdropFilter: "blur(4px)",
              });
              return (
                <>
                  <div 
                    className="relative border border-[#1d1c12]/10 bg-[#f8f3e4] aspect-[4/5] overflow-hidden group cursor-pointer select-none"
                    onClick={() => {
                      setZoomLevel(1);
                      setIsLightboxOpen(true);
                    }}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEndHandler}
                    onCopy={(e) => e.preventDefault()}
                  >
                    <img
                      src={selectedImage || product.image}
                      alt={product.name}
                      onContextMenu={(e) => e.preventDefault()}
                      onDragStart={(e) => e.preventDefault()}
                      className="w-full h-full object-contain transition-all duration-700 select-none pointer-events-none"
                      style={{ 
                        filter: "brightness(0.97) contrast(1.01)",
                        WebkitTouchCallout: "none",
                        imageOrientation: "from-image"
                      }}
                    />
                    {/* Transparent Overlay for Copy Protection */}
                    <div className="absolute inset-0 z-0 select-none pointer-events-auto" onContextMenu={(e) => e.preventDefault()} />
                    
                    {/* Watermark Logo */}
                    <div className="absolute bottom-6 right-6 w-16 opacity-30 pointer-events-none z-10 mix-blend-overlay sm:mix-blend-normal">
                      <img src="/logo.png" alt="Mani D'Oro" className="w-full h-auto drop-shadow-md" />
                    </div>

                    {/* Corner accent lines */}
                    <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#c9a84c]/50" />
                    <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[#c9a84c]/50" />
                    <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-[#c9a84c]/50" />
                    <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[#c9a84c]/50" />

                    {/* Image counter */}
                    {galleryImages.length > 1 && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: "16px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          display: "flex",
                          gap: "6px",
                          alignItems: "center",
                        }}
                      >
                        {galleryImages.map((_: string, di: number) => (
                          <button
                            key={di}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedImageIndex(di);
                              setSelectedImage(galleryImages[di]);
                            }}
                            style={{
                              width: di === selectedImageIndex ? "20px" : "6px",
                              height: "6px",
                              background: di === selectedImageIndex ? "#c9a84c" : "rgba(201,168,76,0.4)",
                              border: "none",
                              cursor: "pointer",
                              padding: 0,
                              borderRadius: "3px",
                              transition: "all 0.3s",
                            }}
                          />
                        ))}
                      </div>
                    )}

                    {/* Prev arrow */}
                    {galleryImages.length > 1 && (
                      <button
                        aria-label="Previous image"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!canPrev) return;
                          const ni = selectedImageIndex - 1;
                          setSelectedImageIndex(ni);
                          setSelectedImage(galleryImages[ni]);
                        }}
                        style={navBtn("prev")}
                        onMouseEnter={(e) => { if (canPrev) { e.currentTarget.style.background = "rgba(254,249,233,1)"; e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)"; } }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(254,249,233,0.88)"; e.currentTarget.style.borderColor = "rgba(29,28,18,0.12)"; }}
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#1d1c12" strokeWidth="1.5">
                          <polyline points="9,2 4,7 9,12" />
                        </svg>
                      </button>
                    )}

                    {/* Next arrow */}
                    {galleryImages.length > 1 && (
                      <button
                        aria-label="Next image"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!canNext) return;
                          const ni = selectedImageIndex + 1;
                          setSelectedImageIndex(ni);
                          setSelectedImage(galleryImages[ni]);
                        }}
                        style={navBtn("next")}
                        onMouseEnter={(e) => { if (canNext) { e.currentTarget.style.background = "rgba(254,249,233,1)"; e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)"; } }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(254,249,233,0.88)"; e.currentTarget.style.borderColor = "rgba(29,28,18,0.12)"; }}
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#1d1c12" strokeWidth="1.5">
                          <polyline points="5,2 10,7 5,12" />
                        </svg>
                      </button>
                    )}
                  </div>

                  {/* Interactive Thumbnail Gallery Grid */}
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-4" onCopy={(e) => e.preventDefault()}>
                    {galleryImages.map((img: string, idx: number) => (
                      <div
                        key={idx}
                        onClick={() => {
                          setSelectedImage(img);
                          setSelectedImageIndex(idx);
                        }}
                        className={`aspect-square bg-[#f8f3e4] border overflow-hidden cursor-pointer group relative transition-all select-none ${
                          selectedImageIndex === idx
                            ? 'border-[#c9a84c] ring-2 ring-[#c9a84c]/30'
                            : 'border-[#1d1c12]/10 opacity-75 hover:opacity-100'
                        }`}
                      >
                        <img 
                          src={img} 
                          onContextMenu={(e) => e.preventDefault()}
                          onDragStart={(e) => e.preventDefault()}
                          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 select-none"
                          style={{ WebkitTouchCallout: "none", imageOrientation: "from-image" }}
                          alt={`${product.name} view ${idx + 1}`} 
                        />
                        <div className="absolute inset-0 bg-[#c9a84c]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        {/* Transparent Overlay for Copy Protection */}
                        <div className="absolute inset-0 z-0 select-none pointer-events-auto" onContextMenu={(e) => e.preventDefault()} />
                      </div>
                    ))}
                  </div>
                </>
              );
            })()}

          </div>

          {/* RIGHT COLUMN: REFINED EDITORIAL METADATA (col-span-6) */}
          <div className="col-span-1 lg:col-span-6 flex flex-col gap-8">
            
            {/* Title block */}
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#795900] font-['Manrope',sans-serif]">
                Handcrafted // Gold Plated
              </span>
              <h1 
                className="text-[clamp(36px,4.5vw,56px)] font-normal text-[#1d1c12] tracking-[-0.01em] leading-tight"
                style={{ fontFamily: "'Noto Serif', Georgia, serif" }}
              >
                {product.name}
              </h1>
              <div className="flex justify-between items-baseline border-b border-[#1d1c12]/10 pb-4">
                <span className="text-2xl text-[#795900] font-light font-['Noto_Serif',serif]">{product.price}</span>

              </div>
            </div>

            {/* Core Description */}
            <div className="flex flex-col gap-4">
              <p className="text-sm text-[#1d1c12]/80 leading-relaxed font-['Manrope',sans-serif]">
                {product.description}
              </p>
              <p className="text-xs text-[#1d1c12]/50 leading-relaxed font-['Manrope',sans-serif]">
                {product.long_description || "Crafted entirely by hand under the direct oversight of Creative Director Alessandra Oro. Imprinted with the signature hammered patina of Mani D'Oro, each piece holds microscopic, unique variations that record its slow creation."}
              </p>
            </div>

            {/* Editorial Specifications Tabs */}
            <div className="flex flex-col gap-4 border-t border-[#1d1c12]/10 pt-6">
              <div className="flex gap-6 border-b border-[#1d1c12]/5 pb-2">
                {[
                  { value: "heritage", label: "Fine Details" },
                  { value: "materials", label: "Spec Materials" }
                ].map((tab) => (
                  <button
                    key={tab.value}
                    onClick={() => setActiveTab(tab.value as any)}
                    className="text-[10px] font-bold tracking-widest uppercase transition-all pb-1.5 font-['Manrope',sans-serif]"
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: activeTab === tab.value ? "#795900" : "#1d1c12]/40",
                      borderBottom: activeTab === tab.value ? "2px solid #c9a84c" : "2px solid transparent",
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Contents */}
              <div className="text-xs text-[#1d1c12]/70 leading-relaxed font-['Manrope',sans-serif] min-h-[120px]">
                {activeTab === "heritage" && (
                  <ul className="list-disc pl-4 flex flex-col gap-2">
                    {(product.details_bullets && product.details_bullets.length > 0
                      ? product.details_bullets
                      : [
                          "Individually hammered at temperatures exceeding 1,000°C in our Kishangarh foundry.",
                          "Slight structural variations ensure zero duplicates exist worldwide.",
                          "Officially registered in the Mani D'Oro historical archives.",
                          "Accompanied by original hand-drawn gouache sketching prints."
                        ]
                    ).map((b: string, i: number) => <li key={i}>{b}</li>)}
                  </ul>
                )}
                {activeTab === "materials" && (
                  <ul className="list-disc pl-4 flex flex-col gap-2">
                    {(product.materials_bullets && product.materials_bullets.length > 0
                      ? product.materials_bullets
                      : [
                          "Solid high-carat Yellow Gold or custom blended 18k Red-Gold.",
                          "Signature low-reflective satin patina.",
                          "Gemstones cut with antique step-cut facets for warm internal glows.",
                          "Stamped with the official atelier hallmark of Milanese excellence."
                        ]
                    ).map((b: string, i: number) => <li key={i}>{b}</li>)}
                  </ul>
                )}

              </div>
            </div>

            {/* ── ADD TO CART PANEL ─────────────────────────── */}
            <div
              style={{
                border: "1px solid rgba(201,168,76,0.3)",
                background: "linear-gradient(135deg, #fef9e9, #f8f3e4)",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(29,28,18,0.5)",
                  }}
                >
                  Add to Cart
                </span>
                <span
                  style={{
                    fontFamily: "'Noto Serif', Georgia, serif",
                    fontSize: "20px",
                    color: "#795900",
                  }}
                >
                  {product.price}
                </span>
              </div>



              {/* Button row: Reserve + WhatsApp */}
              <div style={{ display: "flex", gap: "10px" }}>
                {/* Add to cart button */}
                <button
                  onClick={handleAddToCart}
                  style={{
                    flex: 1,
                    background: addedToCart ? "#4a7c59" : "#795900",
                    color: "#fef9e9",
                    border: "none",
                    padding: "16px 12px",
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "background 0.4s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                  onMouseEnter={(e) => {
                    if (!addedToCart) e.currentTarget.style.background = "#634900";
                  }}
                  onMouseLeave={(e) => {
                    if (!addedToCart) e.currentTarget.style.background = addedToCart ? "#4a7c59" : "#795900";
                  }}
                >
                  {addedToCart ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Added
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <path d="M16 10a4 4 0 01-8 0" />
                      </svg>
                      Add to Cart
                    </>
                  )}
                </button>

                {/* WhatsApp button */}
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    `Hi! I'm interested in the *${product.name}* (${product.category}) — ${product.price}\n\nCould you please share more details?\n\n🔗 ${window.location.href}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Enquire on WhatsApp"
                  title="Enquire on WhatsApp"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    padding: "16px 18px",
                    background: "#25D366",
                    color: "#fff",
                    border: "none",
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    cursor: "pointer",
                    transition: "background 0.2s, transform 0.15s",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#1ebe57";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#25D366";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {/* WhatsApp logo SVG */}
                  <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor">
                    <path d="M16 0C7.163 0 0 7.163 0 16c0 2.825.736 5.476 2.027 7.782L0 32l8.418-2.004A15.93 15.93 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.28 13.28 0 01-6.777-1.854l-.487-.29-5.003 1.192 1.212-4.878-.317-.5A13.26 13.26 0 012.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.878c-.398-.2-2.358-1.163-2.723-1.295-.365-.133-.63-.2-.896.2-.265.397-1.03 1.295-1.262 1.56-.232.265-.465.298-.863.1-.398-.2-1.68-.619-3.2-1.974-1.183-1.054-1.98-2.355-2.213-2.752-.232-.398-.025-.613.175-.81.18-.178.398-.465.597-.697.2-.232.265-.398.398-.664.133-.265.066-.497-.033-.697-.1-.2-.896-2.16-1.228-2.958-.323-.778-.65-.673-.896-.685-.232-.01-.497-.013-.763-.013s-.697.1-1.062.497c-.365.398-1.394 1.362-1.394 3.322s1.427 3.853 1.626 4.118c.2.265 2.808 4.285 6.803 6.01.952.41 1.694.655 2.273.838.954.304 1.823.261 2.51.158.766-.115 2.358-.963 2.69-1.893.332-.93.332-1.727.232-1.893-.1-.166-.365-.265-.763-.465z"/>
                  </svg>
                  WhatsApp
                </a>
              </div>

              {/* Wishlist save button */}
              <button
                onClick={() => product && wishToggle({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                  category: product.category,
                })}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  width: "100%",
                  padding: "12px",
                  background: "none",
                  border: `1px solid ${product && isWishlisted(product.id) ? "rgba(201,168,76,0.6)" : "rgba(29,28,18,0.15)"}`,
                  color: product && isWishlisted(product.id) ? "#795900" : "rgba(29,28,18,0.55)",
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.25s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "rgba(201,168,76,0.6)";
                  e.currentTarget.style.color = "#795900";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = product && isWishlisted(product.id) ? "rgba(201,168,76,0.6)" : "rgba(29,28,18,0.15)";
                  e.currentTarget.style.color = product && isWishlisted(product.id) ? "#795900" : "rgba(29,28,18,0.55)";
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24"
                  fill={product && isWishlisted(product.id) ? "#c9a84c" : "none"}
                  stroke={product && isWishlisted(product.id) ? "#c9a84c" : "currentColor"}
                  strokeWidth="1.5"
                  style={{ transition: "fill 0.25s, stroke 0.25s", flexShrink: 0 }}
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {product && isWishlisted(product.id) ? "Saved to Wishlist" : "Save to Wishlist"}
              </button>

              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "9px",
                  color: "rgba(29,28,18,0.4)",
                  textAlign: "center",
                  letterSpacing: "0.1em",
                }}
              >
                {product.shipping_note || "Handcrafted to order · 4–6 weeks · Free worldwide shipping"}
              </p>
            </div>

            {/* ATELIER COMMISSION / INQUIRY FORM (Tied to Bespoke Concept) */}
            <div className="bg-[#f8f3e4] border border-[#1d1c12]/10 p-6 md:p-8 flex flex-col gap-5 mt-4">
              
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-normal text-[#1d1c12]" style={{ fontFamily: "'Noto Serif', Georgia, serif" }}>
                  Inquire About This Piece
                </h3>
                <p className="text-[10px] text-[#1d1c12]/50 font-['Manrope',sans-serif]">
                  Request custom sizing, gemstone alterations, or initial consult bookings.
                </p>
              </div>

              {inquirySubmitted ? (
                <div className="py-8 text-center flex flex-col items-center gap-4 animate-fade-in">
                  <div className="w-12 h-12 border border-[#795900]/50 bg-[#795900]/5 rounded-full flex items-center justify-center text-[#795900]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-sm font-bold text-[#1d1c12]">Inquiry Logged</h4>
                    <p className="text-xs text-[#1d1c12]/60">Our liaison will email or message you shortly with sizing quotes.</p>
                  </div>
                  <button 
                    onClick={() => setInquirySubmitted(false)}
                    className="font-['Manrope',sans-serif] text-[9px] font-bold tracking-widest uppercase border border-[#795900]/30 text-[#795900] py-2 px-4 hover:border-[#795900] transition-colors"
                  >
                    Submit New Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="inq-name" className="text-[9px] font-bold tracking-widest text-[#1d1c12]/60 uppercase font-['Manrope',sans-serif]">Your Name</label>
                      <input
                        id="inq-name"
                        type="text"
                        required
                        placeholder="e.g. Jean"
                        value={inquiryForm.name}
                        onChange={e => setInquiryForm(f => ({ ...f, name: e.target.value }))}
                        className="w-full bg-[#fef9e9]/70 border border-[#1d1c12]/10 py-2.5 px-3 font-['Manrope',sans-serif] text-xs outline-none focus:border-[#795900]"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="inq-email" className="text-[9px] font-bold tracking-widest text-[#1d1c12]/60 uppercase font-['Manrope',sans-serif]">Your Email</label>
                      <input
                        id="inq-email"
                        type="email"
                        required
                        placeholder="e.g. user@domain.com"
                        value={inquiryForm.email}
                        onChange={e => setInquiryForm(f => ({ ...f, email: e.target.value }))}
                        className="w-full bg-[#fef9e9]/70 border border-[#1d1c12]/10 py-2.5 px-3 font-['Manrope',sans-serif] text-xs outline-none focus:border-[#795900]"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="inq-note" className="text-[9px] font-bold tracking-widest text-[#1d1c12]/60 uppercase font-['Manrope',sans-serif]">Notes / Customisation</label>
                    <textarea
                      id="inq-note"
                      placeholder="e.g. Questions about materials, alterations, or anything else..."
                      rows={3}
                      value={inquiryForm.note}
                      onChange={e => setInquiryForm(f => ({ ...f, note: e.target.value }))}
                      className="w-full bg-[#fef9e9]/70 border border-[#1d1c12]/10 py-2.5 px-3 font-['Manrope',sans-serif] text-xs outline-none resize-none focus:border-[#795900]"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-[#795900] hover:bg-[#634900] text-[#fef9e9] font-['Manrope',sans-serif] text-[10px] font-bold tracking-widest uppercase py-3 transition-colors border-0 cursor-pointer"
                  >
                    Send Inquiry
                  </button>
                </form>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-[#1d1c12]/95 backdrop-blur-sm"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Close Button */}
          <button 
            className="absolute top-6 right-6 text-[#fef9e9] opacity-70 hover:opacity-100 transition-opacity z-[1010]"
            onClick={() => setIsLightboxOpen(false)}
            aria-label="Close lightbox"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="4" y1="4" x2="20" y2="20" />
              <line x1="20" y1="4" x2="4" y2="20" />
            </svg>
          </button>
          
          {/* Image Container */}
          <div 
            className="relative w-full h-full flex items-center justify-center overflow-hidden select-none"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEndHandler}
            onCopy={(e) => e.preventDefault()}
          >
            <img
              src={selectedImage || product?.image}
              alt="Zoomed view"
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              className="max-w-full max-h-[80vh] object-contain transition-transform duration-200 select-none pointer-events-none"
              style={{ transform: `scale(${zoomLevel})`, imageOrientation: "from-image" }}
            />
            {/* Transparent Overlay for Copy Protection */}
            <div className="absolute inset-0 z-0 select-none pointer-events-auto" onContextMenu={(e) => e.preventDefault()} />
            
            {/* Watermark Logo */}
            <div className="absolute bottom-10 right-10 w-24 opacity-20 pointer-events-none z-[1010]">
              <img src="/logo.png" alt="Mani D'Oro" className="w-full h-auto drop-shadow-2xl" />
            </div>
          </div>

          {/* Zoom Slider */}
          <div 
            className="absolute bottom-8 left-1/2 -translate-x-1/2 w-64 flex items-center gap-4 bg-[#1d1c12]/50 px-6 py-3 rounded-full border border-[#fef9e9]/10"
            onClick={(e) => e.stopPropagation()}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fef9e9" strokeWidth="2" className="opacity-70"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
            <input 
              type="range" 
              min="1" 
              max="3" 
              step="0.1" 
              value={zoomLevel}
              onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
              className="flex-1 cursor-pointer accent-[#c9a84c]"
            />
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fef9e9" strokeWidth="2" className="opacity-70"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
          </div>
        </div>
      )}

      {/* Footer */}
      <FooterSection />
    </div>
  );
};
