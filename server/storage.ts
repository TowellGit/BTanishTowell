import { 
  users, services, stylists, bookings, products, memberships, gallery,
  type User, type InsertUser, type Service, type InsertService,
  type Stylist, type InsertStylist, type Booking, type InsertBooking,
  type Product, type InsertProduct, type Membership, type InsertMembership,
  type Gallery, type InsertGallery
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Services
  getAllServices(): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: number, service: Partial<InsertService>): Promise<Service | undefined>;
  deleteService(id: number): Promise<boolean>;
  
  // Stylists
  getAllStylists(): Promise<Stylist[]>;
  getStylist(id: number): Promise<Stylist | undefined>;
  createStylist(stylist: InsertStylist): Promise<Stylist>;
  updateStylist(id: number, stylist: Partial<InsertStylist>): Promise<Stylist | undefined>;
  
  // Bookings
  getAllBookings(): Promise<Booking[]>;
  getBooking(id: number): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBooking(id: number, booking: Partial<InsertBooking>): Promise<Booking | undefined>;
  getBookingsByDate(date: string): Promise<Booking[]>;
  
  // Products
  getAllProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined>;
  
  // Memberships
  getAllMemberships(): Promise<Membership[]>;
  getMembership(id: number): Promise<Membership | undefined>;
  createMembership(membership: InsertMembership): Promise<Membership>;
  
  // Gallery
  getAllGallery(): Promise<Gallery[]>;
  getGalleryItem(id: number): Promise<Gallery | undefined>;
  createGalleryItem(gallery: InsertGallery): Promise<Gallery>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private services: Map<number, Service>;
  private stylists: Map<number, Stylist>;
  private bookings: Map<number, Booking>;
  private products: Map<number, Product>;
  private memberships: Map<number, Membership>;
  private gallery: Map<number, Gallery>;
  private currentUserId: number;
  private currentServiceId: number;
  private currentStylistId: number;
  private currentBookingId: number;
  private currentProductId: number;
  private currentMembershipId: number;
  private currentGalleryId: number;

  constructor() {
    this.users = new Map();
    this.services = new Map();
    this.stylists = new Map();
    this.bookings = new Map();
    this.products = new Map();
    this.memberships = new Map();
    this.gallery = new Map();
    this.currentUserId = 1;
    this.currentServiceId = 1;
    this.currentStylistId = 1;
    this.currentBookingId = 1;
    this.currentProductId = 1;
    this.currentMembershipId = 1;
    this.currentGalleryId = 1;
    
    this.seedData();
  }

  private seedData() {
    // Seed services
    const sampleServices: InsertService[] = [
      {
        name: "Hair Styling & Cut",
        description: "Premium cuts, coloring, and treatments by master stylists",
        price: "2500",
        duration: 120,
        category: "Hair",
        image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
        isActive: true
      },
      {
        name: "Spa Treatment",
        description: "Rejuvenating facials and therapeutic body treatments",
        price: "1800",
        duration: 90,
        category: "Spa",
        image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
        isActive: true
      },
      {
        name: "Bridal Makeup",
        description: "Complete bridal packages for your special day",
        price: "15000",
        duration: 180,
        category: "Bridal",
        image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
        isActive: true
      },
      {
        name: "Nail Care",
        description: "Artistic nail designs and premium care treatments",
        price: "800",
        duration: 60,
        category: "Nails",
        image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
        isActive: true
      }
    ];

    sampleServices.forEach(service => this.createService(service));

    // Seed stylists
    const sampleStylists: InsertStylist[] = [
      {
        name: "Tanish Kumar",
        specialization: "Master Stylist",
        experience: 15,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
        isAvailable: true
      },
      {
        name: "Priya Sharma",
        specialization: "Hair Specialist",
        experience: 8,
        image: "https://images.unsplash.com/photo-1494790108755-2616c2d5b2a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
        isAvailable: true
      },
      {
        name: "Meera Patel",
        specialization: "Bridal Expert",
        experience: 12,
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
        isAvailable: true
      },
      {
        name: "Rahul Singh",
        specialization: "Color Specialist",
        experience: 10,
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
        isAvailable: true
      }
    ];

    sampleStylists.forEach(stylist => this.createStylist(stylist));

    // Seed products
    const sampleProducts: InsertProduct[] = [
      {
        name: "Premium Hair Care Set",
        description: "Professional-grade shampoo, conditioner & serum",
        price: "2400",
        originalPrice: "3000",
        category: "Hair Care",
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
        inStock: true,
        rating: "5.0",
        isNew: false,
        isBestSeller: true
      },
      {
        name: "Radiance Skincare Kit",
        description: "Anti-aging serum, moisturizer & face mask",
        price: "3200",
        category: "Skincare",
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
        inStock: true,
        rating: "5.0",
        isNew: true,
        isBestSeller: false
      },
      {
        name: "Pro Makeup Brush Set",
        description: "12-piece professional brush collection",
        price: "1800",
        category: "Makeup",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
        inStock: true,
        rating: "5.0",
        isNew: false,
        isBestSeller: false
      },
      {
        name: "Nail Care Essentials",
        description: "Base coat, top coat & strengthening treatment",
        price: "1200",
        category: "Nail Care",
        image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
        inStock: true,
        rating: "5.0",
        isNew: false,
        isBestSeller: true
      }
    ];

    sampleProducts.forEach(product => this.createProduct(product));

    // Seed memberships
    const sampleMemberships: InsertMembership[] = [
      {
        name: "Basic",
        price: "2999",
        benefits: ["10% discount on services", "Priority booking", "Birthday special offer"],
        discount: 10,
        isPopular: false
      },
      {
        name: "Gold",
        price: "5999",
        benefits: ["20% discount on services", "Free monthly consultation", "Exclusive event invites"],
        discount: 20,
        isPopular: true
      },
      {
        name: "Platinum",
        price: "9999",
        benefits: ["30% discount on services", "VIP lounge access", "Personal beauty advisor"],
        discount: 30,
        isPopular: false
      }
    ];

    sampleMemberships.forEach(membership => this.createMembership(membership));

    // Seed gallery
    const sampleGallery: InsertGallery[] = [
      {
        title: "Complete Hair Makeover",
        description: "Absolutely stunning results! The team transformed my look completely.",
        image: "https://pixabay.com/get/g40ada6228493e17bc5c8044ac407e78e3e54dd21e19720f8d6cc07dab4f555f1ce7f5a54a5e559bdf7c3d92956e7f345055940d2bc9ff6fc64c1ba45b963f72e_1280.jpg",
        category: "Hair Styling",
        clientName: "Sarah M.",
        rating: "5.0"
      },
      {
        title: "Bridal Perfection",
        description: "My dream wedding look came to life. Flawless execution!",
        image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Bridal",
        clientName: "Priya K.",
        rating: "5.0"
      },
      {
        title: "Radiant Skin Treatment",
        description: "My skin has never looked better. The glow is incredible!",
        image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Skincare",
        clientName: "Meera S.",
        rating: "5.0"
      }
    ];

    sampleGallery.forEach(gallery => this.createGalleryItem(gallery));
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: new Date() 
    };
    this.users.set(id, user);
    return user;
  }

  // Services
  async getAllServices(): Promise<Service[]> {
    return Array.from(this.services.values()).filter(service => service.isActive);
  }

  async getService(id: number): Promise<Service | undefined> {
    return this.services.get(id);
  }

  async createService(insertService: InsertService): Promise<Service> {
    const id = this.currentServiceId++;
    const service: Service = { ...insertService, id };
    this.services.set(id, service);
    return service;
  }

  async updateService(id: number, updateData: Partial<InsertService>): Promise<Service | undefined> {
    const service = this.services.get(id);
    if (!service) return undefined;
    
    const updatedService = { ...service, ...updateData };
    this.services.set(id, updatedService);
    return updatedService;
  }

  async deleteService(id: number): Promise<boolean> {
    return this.services.delete(id);
  }

  // Stylists
  async getAllStylists(): Promise<Stylist[]> {
    return Array.from(this.stylists.values()).filter(stylist => stylist.isAvailable);
  }

  async getStylist(id: number): Promise<Stylist | undefined> {
    return this.stylists.get(id);
  }

  async createStylist(insertStylist: InsertStylist): Promise<Stylist> {
    const id = this.currentStylistId++;
    const stylist: Stylist = { ...insertStylist, id };
    this.stylists.set(id, stylist);
    return stylist;
  }

  async updateStylist(id: number, updateData: Partial<InsertStylist>): Promise<Stylist | undefined> {
    const stylist = this.stylists.get(id);
    if (!stylist) return undefined;
    
    const updatedStylist = { ...stylist, ...updateData };
    this.stylists.set(id, updatedStylist);
    return updatedStylist;
  }

  // Bookings
  async getAllBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async getBooking(id: number): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = this.currentBookingId++;
    const booking: Booking = { 
      ...insertBooking, 
      id, 
      createdAt: new Date() 
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async updateBooking(id: number, updateData: Partial<InsertBooking>): Promise<Booking | undefined> {
    const booking = this.bookings.get(id);
    if (!booking) return undefined;
    
    const updatedBooking = { ...booking, ...updateData };
    this.bookings.set(id, updatedBooking);
    return updatedBooking;
  }

  async getBookingsByDate(date: string): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(booking => {
      const bookingDate = booking.appointmentDate.toISOString().split('T')[0];
      return bookingDate === date;
    });
  }

  // Products
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.inStock);
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }

  async updateProduct(id: number, updateData: Partial<InsertProduct>): Promise<Product | undefined> {
    const product = this.products.get(id);
    if (!product) return undefined;
    
    const updatedProduct = { ...product, ...updateData };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }

  // Memberships
  async getAllMemberships(): Promise<Membership[]> {
    return Array.from(this.memberships.values());
  }

  async getMembership(id: number): Promise<Membership | undefined> {
    return this.memberships.get(id);
  }

  async createMembership(insertMembership: InsertMembership): Promise<Membership> {
    const id = this.currentMembershipId++;
    const membership: Membership = { ...insertMembership, id };
    this.memberships.set(id, membership);
    return membership;
  }

  // Gallery
  async getAllGallery(): Promise<Gallery[]> {
    return Array.from(this.gallery.values());
  }

  async getGalleryItem(id: number): Promise<Gallery | undefined> {
    return this.gallery.get(id);
  }

  async createGalleryItem(insertGallery: InsertGallery): Promise<Gallery> {
    const id = this.currentGalleryId++;
    const gallery: Gallery = { ...insertGallery, id };
    this.gallery.set(id, gallery);
    return gallery;
  }
}

export const storage = new MemStorage();
