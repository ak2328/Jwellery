import { type User, type InsertUser, type Product, type InsertProduct } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Product Operations
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private products: Map<string, Product>;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    
    // Pre-populate default luxury products
    const defaultProducts: any[] = [
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
        category: "Necklaces",
        name: "Mani Link Chain",
        description: "Each link forged individually, carrying the mark of its maker.",
        price: "$1,240",
        image: "/figmaAssets2/product-mani-link-chain.png",
        isNew: true,
      },
      {
        id: "gilded-drift-cuff",
        category: "Cuffs & Bangles",
        name: "Gilded Drift Cuff",
        description: "Molten gold shaped by hand — no two are exactly alike.",
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
        image: "/products/bracelet-unisex-1.jpg",
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
        image: "/products/pendant-bar-pendant-cover.jpg",
        isNew: true,
        gallery: [
          "/products/pendant-bar-pendant-1.jpg",
          "/products/pendant-bar-pendant-2.jpg",
          "/products/pendant-bar-pendant-3.jpg",
          "/products/pendant-bar-pendant-4.jpg"
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
        image: "/products/pendant-fish-pendant-cover.jpg",
        isNew: true,
        gallery: [
          "/products/pendant-fish-pendant-1.jpg",
          "/products/pendant-fish-pendant-2.jpg",
          "/products/pendant-fish-pendant-3.jpg",
          "/products/pendant-fish-pendant-4.jpg"
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
        category: "Necklaces",
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

    for (const prod of defaultProducts) {
      this.products.set(prod.id, prod);
    }
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Product Operations
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProd: InsertProduct): Promise<Product> {
    const id = insertProd.id || randomUUID();
    const product: Product = {
      id,
      category: insertProd.category,
      name: insertProd.name,
      description: insertProd.description,
      price: insertProd.price,
      image: insertProd.image,
      isNew: insertProd.isNew ?? true,
    };
    this.products.set(id, product);
    return product;
  }
}

export const storage = new MemStorage();
