# Reckonix - Calibration, Testing & Measuring Systems

## Overview

Reckonix is a full-stack web application for a manufacturing company specializing in precision calibration systems, testing equipment, and measuring instruments. The application features a modern React frontend with a Node.js/Express backend, showcasing company products, handling customer inquiries, and providing administrative capabilities.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: React Context API for auth and cart state
- **Data Fetching**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for client-side routing
- **Animations**: Framer Motion for smooth transitions and interactive elements
- **Design System**: Custom maroon brand colors (#800000) with Cinzel Decorative font for headings

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: In-memory storage for development (production-ready interfaces defined)
- **Development**: Vite integration for HMR and development server

### Build System
- **Frontend Build**: Vite with React plugin
- **Backend Build**: esbuild for production bundling
- **Development**: Concurrent development server with Vite middleware integration
- **TypeScript**: Shared types between frontend and backend via `shared/` directory

## Key Components

### Product Management
- Three main product categories: Calibration Systems, Testing Systems, Measuring Instruments
- Rich product data including specifications, features, applications, and certifications
- Product view tracking and analytics
- Image and PDF catalog support

### User Interface
- Responsive design with mobile-first approach
- Component-based architecture using shadcn/ui
- Animated counters and interactive elements
- Professional business presentation with company branding

### Authentication & Authorization
- Simple admin authentication system
- JWT-based token management (mock implementation for development)
- Protected admin routes and functionality

### Quote System
- Shopping cart functionality for quote requests
- Product inquiry and contact message handling
- Customer communication tracking

## Data Flow

1. **Client Requests**: Frontend makes API calls using TanStack Query
2. **Server Processing**: Express routes handle business logic and data validation
3. **Data Validation**: Zod schemas ensure type safety across the stack
4. **Storage Layer**: Drizzle ORM manages database operations
5. **Response**: JSON responses with proper error handling

### API Endpoints
- `/api/products` - Product CRUD operations
- `/api/auth/login` - Admin authentication
- `/api/quotes` - Quote request management
- `/api/messages` - Contact message handling
- `/api/analytics` - Website and product view tracking

## External Dependencies

### Frontend Dependencies
- React ecosystem (React, React DOM, React Query)
- UI components (@radix-ui primitives, shadcn/ui)
- Animation library (Framer Motion)
- Form handling (React Hook Form with Zod validation)
- Utility libraries (clsx, date-fns, class-variance-authority)

### Backend Dependencies
- Express.js framework
- Drizzle ORM with PostgreSQL support
- Neon Database serverless driver
- Development tools (tsx, esbuild, Vite)

### Development Tools
- TypeScript for type safety
- Tailwind CSS for styling
- Vite for development and build tooling
- PostCSS for CSS processing

## Deployment Strategy

### Development
- Local development with Vite dev server
- Express server runs on Node.js with tsx for TypeScript execution
- Database migrations handled via Drizzle Kit
- Environment variables for database connection

### Production Build
1. Frontend assets built with Vite to `dist/public`
2. Backend bundled with esbuild to `dist/index.js`
3. Single deployment artifact with static file serving
4. Database migrations applied via `npm run db:push`

### Environment Configuration
- `DATABASE_URL` required for PostgreSQL connection
- Development and production environment detection
- Replit-specific plugins for development environment

## Changelog
- June 30, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.