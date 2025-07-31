# Overview

This is a full-stack industrial machine management application called "Kartonowy Napełniacz Online" (Cardboard Filler Online). The application simulates and manages industrial packaging machines, providing real-time monitoring, control, and statistics for cardboard filling operations. It features a modern React frontend with an Express backend, designed to track machine performance, manage production cycles, and provide multilingual support for industrial environments.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Library**: Shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling
- **State Management**: TanStack Query for server state management and React hooks for local state
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom industrial theme colors and CSS variables for theming

## Component Structure
- **Machine Management**: Custom hooks (`useMachineState`) for managing individual machine states including running status, progress tracking, and production cycles
- **Internationalization**: Multi-language support (Polish, English, German) with a custom translation system
- **Real-time Updates**: Interval-based state updates to simulate machine operations and progress tracking
- **Industrial UI**: Specialized components for machine panels, statistics displays, and notification toasts with industrial color schemes

## Backend Architecture
- **Framework**: Express.js with TypeScript running on Node.js
- **Storage**: Configurable storage interface with in-memory implementation (MemStorage) and PostgreSQL schema ready for production
- **Database ORM**: Drizzle ORM with PostgreSQL dialect configured for future database integration
- **Development**: Hot reload with Vite integration for development environment

## Data Models
- **User Schema**: Basic user management with username/password authentication using UUID primary keys
- **Machine State**: Local state management for machine operations including progress tracking, production limits, and cycle times
- **Session Management**: PostgreSQL session store configuration ready for production deployment

## External Dependencies
- **Database**: PostgreSQL with Neon serverless configuration
- **Session Storage**: connect-pg-simple for PostgreSQL-backed sessions
- **Development Tools**: 
  - Replit integration with cartographer and runtime error overlay
  - ESBuild for production bundling
  - Drizzle Kit for database migrations and schema management
- **UI Components**: Comprehensive Radix UI component library for accessible, industrial-grade interfaces
- **Styling**: PostCSS with Tailwind CSS and autoprefixer for cross-browser compatibility