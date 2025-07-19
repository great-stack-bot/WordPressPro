# WordPress Development Blog

## Overview

This is a modern WordPress-focused blog platform built with a full-stack TypeScript architecture. The application serves as a content hub for WordPress development tutorials, tips, and insights, featuring a clean, responsive design with comprehensive functionality for reading and engaging with content.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Framework**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state
- **Build Tool**: Vite with React plugin and development optimizations

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Design**: RESTful endpoints following Express patterns
- **Development**: Hot module replacement via Vite integration

### Data Storage Solutions
- **Primary Database**: PostgreSQL hosted on Neon Database
- **ORM**: Drizzle ORM with type-safe schema definitions
- **Migrations**: Drizzle Kit for database schema management
- **Storage Implementation**: Dual approach with MemStorage for development and PostgreSQL for production
- **Session Storage**: PostgreSQL-based sessions using connect-pg-simple

## Key Components

### Database Schema
- **Posts Table**: Main content storage with title, excerpt, content, category, author info, and metadata
- **Comments Table**: User comments linked to posts with author details and engagement metrics
- **Subscribers Table**: Email newsletter subscription management

### API Endpoints
- `GET /api/posts` - Retrieve all posts
- `GET /api/posts/featured` - Get featured posts
- `GET /api/posts/category/:category` - Filter posts by category
- `GET /api/posts/search?q=query` - Search posts
- `GET /api/posts/:id` - Get specific post
- `GET /api/posts/:id/comments` - Get comments for a post
- `POST /api/comments` - Create new comment
- `POST /api/subscribe` - Newsletter subscription

### Frontend Components
- **Layout Components**: Header with navigation, Hero section, Footer
- **Content Components**: Featured posts, category filtering, search functionality
- **Interactive Components**: Comments system, newsletter signup, back-to-top button
- **UI Components**: Complete shadcn/ui component library

## Data Flow

1. **Client Requests**: React components use TanStack Query to fetch data
2. **API Layer**: Express routes handle requests and validate input with Zod schemas
3. **Data Layer**: Storage abstraction layer supports both in-memory and PostgreSQL backends
4. **Response**: JSON data returned to client with appropriate error handling
5. **UI Updates**: TanStack Query manages caching, loading states, and optimistic updates

## External Dependencies

### Core Framework Dependencies
- React ecosystem (React, React DOM, React Query)
- Express.js with TypeScript support
- Drizzle ORM with PostgreSQL adapter

### UI and Styling
- Radix UI primitive components for accessibility
- Tailwind CSS for utility-first styling
- Lucide React for consistent iconography
- Class Variance Authority for component variants

### Development Tools
- Vite for fast development and building
- TypeScript for type safety
- ESBuild for production bundling
- Replit-specific development plugins

### Database and Storage
- Neon Database serverless PostgreSQL
- Drizzle Kit for migrations
- Connect-pg-simple for session management

## Deployment Strategy

### Development Environment
- Vite dev server with HMR for frontend
- Express server with tsx for backend hot reload
- Shared TypeScript configuration for full-stack type safety
- Replit-optimized development with cartographer plugin

### Production Build
- Frontend: Vite build outputting static assets to dist/public
- Backend: ESBuild bundling server code to dist/index.js
- Single process deployment serving both API and static files
- Environment-based configuration for database connections

### Database Management
- Schema defined in shared/schema.ts for type safety
- Migrations managed through Drizzle Kit
- Environment variable configuration for database URL
- Automatic database provisioning check on startup

The application follows a modern full-stack architecture with strong type safety, efficient development workflow, and production-ready deployment strategy. The design emphasizes developer experience with hot reloading, comprehensive UI components, and robust data management.