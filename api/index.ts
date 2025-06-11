import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from "express";
import { storage } from "../server/storage.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Services routes
app.get("/api/services", async (req, res) => {
  try {
    const services = await storage.getAllServices();
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch services" });
  }
});

app.get("/api/services/:id", async (req, res) => {
  try {
    const service = await storage.getService(parseInt(req.params.id));
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch service" });
  }
});

// Stylists routes
app.get("/api/stylists", async (req, res) => {
  try {
    const stylists = await storage.getAllStylists();
    res.json(stylists);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stylists" });
  }
});

// Bookings routes
app.get("/api/bookings", async (req, res) => {
  try {
    const { date } = req.query;
    const bookings = date 
      ? await storage.getBookingsByDate(date as string)
      : await storage.getAllBookings();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

app.post("/api/bookings", async (req, res) => {
  try {
    const booking = await storage.createBooking(req.body);
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: "Failed to create booking" });
  }
});

// Products routes
app.get("/api/products", async (req, res) => {
  try {
    const products = await storage.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Memberships routes
app.get("/api/memberships", async (req, res) => {
  try {
    const memberships = await storage.getAllMemberships();
    res.json(memberships);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch memberships" });
  }
});

// Gallery routes
app.get("/api/gallery", async (req, res) => {
  try {
    const gallery = await storage.getAllGallery();
    res.json(gallery);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch gallery" });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default function handler(req: VercelRequest, res: VercelResponse) {
  return app(req, res);
}