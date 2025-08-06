# Overview

This is a full-stack industrial machine management application called "Kartonowy Napełniacz Online" (Cardboard Filler Online). The application simulates and manages industrial packaging machines, providing real-time monitoring, control, and statistics for cardboard filling operations. It features a modern React frontend with an Express backend, designed to track machine performance, manage production cycles, and provide multilingual support for industrial environments.

## Recent Updates (Aug 06, 2025)

- **Prüfung System Enhancement**: Replaced fixed time options (1Min, 1H, 2H, 3H) with configurable slider range (5-45 minutes) with visual progress indicators
- **Machine-Specific Capsule Counts**: Implemented automatic capsule count assignment - MA59: 6000 (2x3000 Beutels), MA62: 2000, MA61: 3000
- **Format-Model-Article System**: Enhanced model selector to show Format-Model-Nr Art. with color coding (DASG-1 black on white, others on colored backgrounds)
- **Synchronized Machine Fields**: Machine number changes automatically update capsule counts and both machine identification fields
- **MA59 Beutel System**: Added specialized dual-bag visualization for MA59 with clickable silver Beutel containers (3000 pieces each)
- **Production Data Integration**: Real CSV production data from Sanner manufacturing system with VE numbers, operators, and quality metrics
- **Enhanced UI Contrast**: Improved visibility of "Ostatnie Rekordy Produkcyjne" dashboard with better color schemes
- **Auftrag Field Enhancement**: Larger, editable Nr Auftrag field with emphasized last 4 digits and monospace font

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
- **Database**: PostgreSQL with Neon serverless configuration, fully integrated and active
- **Storage**: Database storage implementation (DatabaseStorage) with comprehensive CRUD operations
- **Database ORM**: Drizzle ORM with PostgreSQL dialect for production database operations
- **Development**: Hot reload with Vite integration for development environment

## Data Models
- **User Schema**: Basic user management with username/password authentication using UUID primary keys
- **Machine Schema**: Persistent machine definitions with default configurations, settings, and active status
- **Machine Configurations**: Stored presets for machine limits, cycle times, and operational parameters
- **Production Sessions**: Complete session tracking with start/end times, status, and efficiency metrics
- **Box Production**: Individual box completion records with timestamps and target limits
- **Session Management**: PostgreSQL session store configuration for production deployment

## External Dependencies
- **Database**: PostgreSQL with Neon serverless configuration
- **Session Storage**: connect-pg-simple for PostgreSQL-backed sessions
- **Development Tools**: 
  - Replit integration with cartographer and runtime error overlay
  - ESBuild for production bundling
  - Drizzle Kit for database migrations and schema management
- **UI Components**: Comprehensive Radix UI component library for accessible, industrial-grade interfaces
- **Styling**: PostCSS with Tailwind CSS and autoprefixer for cross-browser compatibility