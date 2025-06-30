import { z } from "zod";

// User Schema (for Admin)
export const userSchema = z.object({
  id: z.number(),
  username: z.string(),
  password: z.string(),
  role: z.enum(['admin']).default('admin'),
  createdAt: z.date().default(() => new Date())
});

export const insertUserSchema = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(6),
  role: z.enum(['admin']).default('admin')
});

// Product Schema
export const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  category: z.enum(['Calibration Systems', 'Testing Systems', 'Measuring Instruments']),
  shortDescription: z.string(),
  fullTechnicalInfo: z.string(),
  specifications: z.array(z.object({
    key: z.string(),
    value: z.string()
  })),
  featuresBenefits: z.array(z.string()),
  applications: z.array(z.string()),
  certifications: z.array(z.string()),
  imageUrl: z.string(),
  imageGallery: z.array(z.string()).default([]),
  catalogPdfUrl: z.string().optional(),
  datasheetPdfUrl: z.string().optional(),
  technicalDetails: z.object({
    dimensions: z.string().optional(),
    weight: z.string().optional(),
    powerRequirements: z.string().optional(),
    operatingConditions: z.string().optional(),
    warranty: z.string().optional(),
    compliance: z.array(z.string()).default([])
  }).optional(),
  views: z.number().default(0),
  createdAt: z.date().default(() => new Date())
});

export const insertProductSchema = z.object({
  name: z.string().min(1).max(200),
  category: z.enum(['Calibration Systems', 'Testing Systems', 'Measuring Instruments']),
  shortDescription: z.string().min(10).max(500),
  fullTechnicalInfo: z.string().min(50),
  specifications: z.array(z.object({
    key: z.string(),
    value: z.string()
  })),
  featuresBenefits: z.array(z.string()),
  applications: z.array(z.string()),
  certifications: z.array(z.string()),
  imageUrl: z.string().url(),
  imageGallery: z.array(z.string()).default([]),
  catalogPdfUrl: z.string().url().optional(),
  datasheetPdfUrl: z.string().url().optional(),
  technicalDetails: z.object({
    dimensions: z.string().optional(),
    weight: z.string().optional(),
    powerRequirements: z.string().optional(),
    operatingConditions: z.string().optional(),
    warranty: z.string().optional(),
    compliance: z.array(z.string()).default([])
  }).optional()
});

// Quote Request Schema
export const quoteRequestSchema = z.object({
  id: z.number(),
  customerName: z.string(),
  customerEmail: z.string().email(),
  customerPhone: z.string(),
  customerLocation: z.string().optional(),
  products: z.array(z.object({
    productId: z.number(),
    name: z.string(),
    quantity: z.number().positive()
  })),
  message: z.string().optional(),
  status: z.enum(['New', 'Contacted', 'Closed']).default('New'),
  createdAt: z.date().default(() => new Date())
});

export const insertQuoteRequestSchema = z.object({
  customerName: z.string().min(2).max(100),
  customerEmail: z.string().email(),
  customerPhone: z.string().min(5).max(20),
  customerLocation: z.string().optional(),
  products: z.array(z.object({
    productId: z.number(),
    name: z.string(),
    quantity: z.number().positive()
  })).min(1),
  message: z.string().optional()
});

// Contact Message Schema
export const contactMessageSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string(),
  replied: z.boolean().default(false),
  createdAt: z.date().default(() => new Date())
});

export const insertContactMessageSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10).max(2000)
});

// View Data Schema
export const viewDataSchema = z.object({
  id: z.number(),
  date: z.string(), // Date in YYYY-MM-DD format
  count: z.number().default(0),
  lastViewedIPs: z.array(z.string()).default([])
});

// Auth Schema
export const loginSchema = z.object({
  username: z.string(),
  password: z.string()
});

// Export types
export type User = z.infer<typeof userSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Product = z.infer<typeof productSchema>;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type QuoteRequest = z.infer<typeof quoteRequestSchema>;
export type InsertQuoteRequest = z.infer<typeof insertQuoteRequestSchema>;
export type ContactMessage = z.infer<typeof contactMessageSchema>;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ViewData = z.infer<typeof viewDataSchema>;
export type LoginRequest = z.infer<typeof loginSchema>;
