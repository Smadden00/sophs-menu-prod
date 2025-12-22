# Soph's Menu

A modern full-stack web application for discovering, sharing, and rating restaurant reviews and recipes. Built with React, TypeScript, Vite, and PostgreSQL, featuring real-time filtering, user authentication, and a responsive design.

## Overview

Soph's Menu is a community-driven platform where users can:
- Browse and submit restaurant reviews with detailed ratings
- Discover and share recipes with step-by-step instructions
- Rate recipes and engage with the community through comments
- Filter and sort content by various criteria
- Manage personal profiles with their contributions

## Features

### 🍽️ Restaurant Reviews
- **Multi-dimensional Rating System**: Rate restaurants on taste, experience, and overall quality (0-10 scale)
- **Price Point Indicators**: 1-4 scale ($-$$$$) for budget transparency
- **Location Filtering**: Browse reviews by city and state
- **Restaurant Categorization**: 20+ restaurant types including American, Italian, Mexican, Sushi, BBQ, and more
- **Advanced Filtering**: Filter by rating range, price range, location, and submitter
- **Flexible Sorting**: Sort by rating or price, ascending or descending

### 🍳 Recipe Sharing
- **Comprehensive Recipe Details**: Name, ingredients, instructions, prep time, and meal type
- **Recipe Rating System**: 1-5 star rating with aggregate scores
- **Interactive Comments**: Community discussion on each recipe
- **Image Upload**: Visual representation of finished dishes via AWS S3
- **Allergen & Cuisine Tagging**: Mark allergens and categorize by cuisine type
- **Prep Time Filtering**: Filter recipes by preparation time (0-1500 minutes)
- **Meal Type Filtering**: Breakfast, Brunch, Lunch, Dinner, Snack, Dessert

### 👤 User Features
- **Auth0 Authentication**: Secure OAuth 2.0 authentication with social login support
- **Encrypted User Data**: User identifiers are encrypted for privacy
- **Personal Profile Pages**: 
  - View all submitted recipes and reviews
  - Track recipes you've rated
  - Manage your contributions
- **Protected Routes**: Authentication required for adding content
- **Persistent Sessions**: Refresh tokens with localStorage caching

## Tech Stack

### Frontend
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 5.0 (fast dev server with HMR)
- **Routing**: React Router DOM 6.20
- **Styling**: CSS Modules for scoped component styles
- **Charts**: Recharts for data visualization
- **Authentication**: Auth0 React SDK 2.11

### Backend (Separate Repository)
- **API Server**: External API at `https://sophsdatabasedomain.duckdns.org`
- **Database**: PostgreSQL with Knex.js query builder
- **File Storage**: AWS S3 via AWS SDK
- **Image Processing**: Sharp for optimization and resizing
- **Form Handling**: Formidable for multipart/form-data
- **Security**: Cryptography package for data encryption
- **Environment**: dotenv for configuration management

### DevOps & Deployment
- **Process Manager**: PM2 for production process management
- **Node Version**: 18.18+
- **Type Checking**: TypeScript 5.0 with strict mode
- **Development**: Hot Module Replacement (HMR) via Vite

## Architecture

**Note**: This repository contains only the frontend React application. The backend API is hosted separately at `https://sophsdatabasedomain.duckdns.org`.

### Frontend Structure
```
src/
├── App.tsx                 # Main app with React Router configuration
├── main.tsx               # Entry point with Auth0Provider wrapper
├── types/                 # TypeScript type definitions
│   └── index.ts          # Shared interfaces (Recipe, Review, Comment, User)
├── components/
│   ├── header.tsx        # Navigation header with profile link
│   ├── footer.tsx        # Footer with social links
│   ├── layout.tsx        # Page layout wrapper
│   ├── filters/          # Filter components for recipes/reviews
│   ├── rating/           # Recipe rating components (logged in/out states)
│   ├── requests/         # API call functions
│   │   ├── fetchAllRecipes.tsx
│   │   ├── fetchAllReviews.tsx
│   │   ├── sendRecipe.tsx
│   │   └── sendReview.tsx
│   ├── functions/        # Utility functions (sorting, encryption, formatting)
│   ├── safetyChecks/     # Input validation before API calls
│   └── adding/           # Form input components
└── pages/
    ├── index.tsx         # Home page with sections
    ├── recipes/          # Recipe list, detail, and add pages
    ├── reviews/          # Review list, detail, and add pages
    ├── profile/          # User profile with tabs
    ├── privacyPolicy/    # Privacy policy page
    └── TermsOfService/   # Terms of service page
```

### Database Schema (Backend Reference)

The backend PostgreSQL database uses the following schema (see `description_of_database.txt` for full SQL):

**Reviews Table**
- `review_id` (PRIMARY KEY): Unique identifier
- `rest_name`: Restaurant name
- `o_rating`: Overall rating (0-10)
- `taste`: Taste rating (0-10)
- `experience`: Experience rating (0-10)
- `price`: Price level (1-4)
- `description`: Detailed review text
- `city`, `state_code`: Location data
- `user_encrypted`: Encrypted user identifier
- `soph_submitted`: Boolean flag for admin submissions

**Recipes Table**
- `recipe_id` (PRIMARY KEY): Unique identifier
- `recipe_name`: Recipe title
- `prep_time`: Preparation time in minutes
- `rating`: Average rating (0-10)
- `meal`: Meal type (Breakfast, Lunch, Dinner, etc.)
- `rec_img_url`: S3 URL for recipe image
- `user_encrypted`: Encrypted user identifier
- `soph_submitted`: Boolean flag for admin submissions

**Related Tables**
- `recipe_instructions`: Ordered step-by-step instructions
- `recipe_ingredients`: List of ingredients per recipe
- `recipesComments`: User comments with foreign key to recipes
- `recipe_ratings`: Individual user ratings (1-5 stars)
- `allergens` & `allergen_recipe_ref`: Allergen tagging
- `cuisines` & `cuisine_recipe_ref`: Cuisine type categorization
- `rest_types` & `rest_type_review_ref`: Restaurant type categorization

### Key Features Implementation

**Authentication Flow**
1. Auth0Provider wraps entire app in `main.tsx`
2. Protected routes check `isAuthenticated` before rendering
3. API requests include access tokens via `getAccessTokenSilently()`
4. User data encrypted before storage in database

**Data Flow**
1. Components fetch data on mount via `useEffect` hooks
2. API endpoints return JSON with nested data (e.g., recipes with instructions, ingredients)
3. Data stored in component state with TypeScript interfaces
4. Filtering and sorting happen client-side for responsiveness
5. Forms validate input before sending to API

**Image Upload Process**
1. User selects image file in form
2. FormData constructed with recipe/review data + image
3. Backend receives multipart/form-data
4. Sharp processes and optimizes image
5. AWS SDK uploads to S3 bucket
6. S3 URL stored in database
7. Images served from S3 in components

## Getting Started

### Prerequisites
- **Node.js**: 18.18 or higher
- **Auth0 Account**: For user authentication (domain, client ID, and audience)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd sophs-menu-prod
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create a `.env.local` file in the root directory:

```env
# Auth0 Configuration
VITE_AUTH0_DOMAIN=your-auth0-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id
VITE_AUTH0_AUDIENCE=your-api-audience
```

4. **Run the development server**
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

**Note**: The application connects to the backend API at `https://sophsdatabasedomain.duckdns.org`. For local development with a different backend, update the API URLs in the `/src/components/requests/` files.

### Available Scripts

- `npm run dev` - Start development server with HMR on port 3000
- `npm run build` - Build for production (TypeScript compilation + Vite build)
- `npm run preview` - Preview production build locally
- `npm run type-check` - Run TypeScript type checking without emitting files
- `npm start` - Start production server (requires built files)

## Project Structure

```
sophs-menu-prod/
├── public/
│   └── images/          # Static images (logos, sample photos)
│       ├── bigImgs/
│       ├── smallImgs/
│       └── newimgs/
├── src/
│   ├── App.tsx          # Router configuration
│   ├── main.tsx         # Entry point with Auth0
│   ├── vite-env.d.ts    # Vite type definitions
│   ├── components/      # Reusable UI components
│   │   ├── filters/     # Filter dropdowns and buttons
│   │   ├── rating/      # Recipe rating components
│   │   ├── requests/    # API interaction functions
│   │   ├── functions/   # Utility functions
│   │   ├── safetyChecks/ # Input validation
│   │   ├── adding/      # Form input components
│   │   ├── reviewComponents/ # Profile tables
│   │   └── svgs/        # SVG icon components
│   ├── pages/           # Page components
│   │   ├── recipes/     # Recipe pages
│   │   ├── reviews/     # Review pages
│   │   ├── profile/     # User profile
│   │   ├── privacyPolicy/
│   │   └── TermsOfService/
│   ├── styles/
│   │   └── globals.css  # Global styles
│   └── types/
│       └── index.ts     # TypeScript interfaces
├── description_of_database.txt  # Database schema SQL
├── package.json
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
└── README.md

```

## API Endpoints

The application makes requests to `https://sophsdatabasedomain.duckdns.org/api/`:

### Recipes
- `GET /api/recipes/` - Fetch all recipes
- `GET /api/recipes/:id` - Fetch single recipe with details
- `PUT /api/recipes` - Create new recipe (authenticated, multipart/form-data)
- `POST /api/recipes/:id/rating` - Submit or update recipe rating (authenticated)
- `GET /api/recipes/:id/rating` - Fetch user's rating for a recipe (authenticated)
- `POST /api/recipes/:id` - Add comment to recipe (authenticated)
- `GET /api/recipes/profile-recipes` - Fetch authenticated user's submitted recipes
- `GET /api/recipes/rated-recipes` - Fetch recipes rated by authenticated user

### Reviews
- `GET /api/reviews/` - Fetch all reviews
- `GET /api/reviews/:id` - Fetch single review with details
- `PUT /api/reviews` - Create new review (authenticated)
- `GET /api/reviews/profile-reviews` - Fetch authenticated user's submitted reviews

### Restaurant Types
- `GET /api/restaurant-types/` - Fetch list of all restaurant types

## Security Features

### Frontend
- **OAuth 2.0 Authentication**: Auth0 integration with social login support
- **Refresh Tokens**: Persistent sessions with automatic token refresh stored in localStorage
- **Input Validation**: Client-side validation for all forms before submission
- **XSS Protection**: React's built-in escaping prevents cross-site scripting attacks

### Backend (External API)
- **Encrypted User Identifiers**: All user data stored with encrypted identifiers (SHA-256)
- **CORS Configuration**: Restricted API access from allowed origins
- **Bearer Token Authentication**: Auth0 JWT validation for protected endpoints

## Contact

For inquiries, visit [Instagram: @sophsmenu](https://www.instagram.com/sophsmenu/)
