# Educational Course Matching System

## Overview

WorldWide EduConnect is an educational course matching platform that helps students find undergraduate and postgraduate programs that align with their academic qualifications. The system collects user qualification data through a multi-step form interface and matches them with relevant courses from institutions worldwide. The platform features an intelligent matching algorithm that considers academic grades, study levels, and specific requirements to provide personalized course recommendations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Library**: Radix UI components with shadcn/ui design system for consistent, accessible interface components
- **Styling**: Tailwind CSS with custom design tokens following educational platform patterns inspired by Coursera and Khan Academy
- **State Management**: React hooks for local state, React Query for server state and data fetching
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation for type-safe form processing

### Backend Architecture
- **Server Framework**: Express.js with TypeScript for API endpoints
- **Data Storage**: In-memory storage with interface abstraction for future database migration
- **Course Matching**: Custom algorithm that evaluates qualifications against course requirements, supporting both undergraduate (grade-based) and postgraduate (degree-based) matching
- **API Design**: RESTful endpoints for course matching and qualification submission

### Component Structure
- **Multi-step Flow**: Hero → Study Level Selection → Qualification Form → Course Results
- **Reusable Components**: Modular UI components with consistent styling and behavior
- **Form Components**: Dynamic qualification input with grade selection and subject management
- **Results Display**: Filterable course cards with detailed information and search functionality

### Data Models
- **User Qualifications**: Subject-grade pairs with support for different educational systems
- **Course Schema**: Comprehensive course information including requirements, costs, and institutional details
- **Matching Algorithm**: Score-based system that evaluates grade compatibility and subject relevance

### Design System
- **Color Palette**: Purple-based brand colors (270° hue variations) with supporting success, warning, and neutral colors
- **Typography**: Inter font family with structured weight and size hierarchy
- **Spacing**: Tailwind-based spacing system with consistent component padding and margins
- **Responsive Design**: Mobile-first approach with adaptive layouts

## External Dependencies

### UI and Styling
- **Radix UI**: Comprehensive headless component library for accessible interface elements
- **Tailwind CSS**: Utility-first CSS framework for rapid styling and consistent design
- **Lucide React**: Icon library for UI iconography
- **Class Variance Authority**: Utility for managing component variants

### Form and Validation
- **React Hook Form**: Form state management and validation
- **Zod**: TypeScript-first schema validation for form data and API responses
- **@hookform/resolvers**: Integration layer between React Hook Form and Zod

### Data Management
- **React Query**: Server state management for API calls and caching
- **Drizzle ORM**: Type-safe ORM with PostgreSQL configuration (ready for database integration)

### Development Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Type safety across the entire application
- **ESBuild**: Fast JavaScript bundler for production builds

### Database Ready
- **Neon Database**: Serverless PostgreSQL integration configured
- **Drizzle Kit**: Database migration and schema management tools
- **Connect PG Simple**: Session store for PostgreSQL (authentication ready)