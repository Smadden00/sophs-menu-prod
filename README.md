# Soph's Menu

A full-stack web application for restaurant reviews and recipe sharing built with Next.js, TypeScript, and PostgreSQL.

## Features

### Restaurant Reviews
- Submit and browse restaurant reviews with ratings for taste, experience, and overall quality
- Price point indicators (1-4 scale)
- Location-based filtering by city and state
- Restaurant type categorization (American, Italian, Mexican, etc.)
- User authentication and personalized review management

### Recipe Sharing
- Create and share recipes with ingredients, instructions, and prep time
- Recipe rating system (1-5 stars)
- Comment system for recipe discussions
- Allergen and cuisine type tagging
- Recipe image uploads
- Personal recipe collections and profiles

### User Features
- Secure user authentication with encrypted user data
- Personal profiles with submitted recipes and reviews
- Rating and commenting system
- Photo upload capabilities

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend**: Node.js, Express-like API routes
- **Database**: PostgreSQL server running on an EC2 instance
- **Authentication**: NextAuth.js
- **File Upload**: AWS SDK integration
- **Image Processing**: Sharp
- **Charts**: Recharts for data visualization
- **Deployment**: AWS CodeDeploy with PM2 process management

## Getting Started

### Prerequisites
- Node.js 18.18 or higher
- PostgreSQL database
- AWS account (for file uploads)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sophs-menu-prod
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file with the required environment variables for database connection, AWS configuration, and authentication secrets.

4. Set up the database:
Use the SQL commands in `description_of_database.txt` to create the required tables and initial data.

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Production Deployment

The application includes AWS CodeDeploy configuration:

```bash
# Build for production
npm run build

# Start production server
npm start

# Or use PM2 for process management
npm run start:pm2
```

## Project Structure

- `/components` - Reusable React components
- `/pages` - Next.js pages and API routes
- `/types` - TypeScript type definitions
- `/public` - Static assets
- `/scripts` - Deployment and maintenance scripts
- `/nginx` - Nginx configuration for production

## Database Schema

The application uses a PostgreSQL database with the following main tables:
- `reviews` - Restaurant review data
- `recipes` - Recipe information and metadata
- `recipe_ratings` - User ratings for recipes
- `recipe_comments` - Comments on recipes
- `recipe_ingredients` - Recipe ingredients
- `recipe_instructions` - Step-by-step recipe instructions

## Contributing

This is a production application. For development setup and contribution guidelines, please contact the maintainers.

## License

Private repository - All rights reserved.
