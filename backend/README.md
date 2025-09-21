# SoleMate Backend API

A modern, accessible e-commerce backend built with NestJS, TypeScript, and PostgreSQL.

## Features

- 🔐 **Authentication & Authorization** - JWT-based auth with refresh tokens
- 🛍️ **Product Management** - Full CRUD operations with categories and variants
- 🛒 **Shopping Cart** - Persistent cart with guest and authenticated user support
- 📦 **Order Management** - Complete order lifecycle with status tracking
- 💳 **Payment Integration** - PayPal integration with webhook support
- ⭐ **Reviews & Ratings** - Product reviews with moderation
- 👨‍💼 **Admin Dashboard** - Comprehensive admin interface
- 🔒 **Security** - Rate limiting, input validation, and security headers
- 📚 **API Documentation** - Auto-generated Swagger/OpenAPI docs
- ♿ **Accessibility** - WCAG 2.1 AA compliant design

## Tech Stack

- **Framework**: NestJS with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with Passport.js
- **Documentation**: Swagger/OpenAPI
- **Validation**: class-validator & class-transformer
- **Security**: Helmet, CORS, Rate Limiting
- **Payments**: PayPal REST SDK
- **Caching**: Redis (optional)

## Prerequisites

- Node.js 18+ 
- PostgreSQL 13+
- Redis (optional)
- Docker & Docker Compose (for containerized setup)

## Quick Start

### Using Docker Compose (Recommended)

1. **Clone and setup**:
   ```bash
   cd backend
   cp env.example .env
   # Edit .env with your configuration
   ```

2. **Start services**:
   ```bash
   docker-compose up -d
   ```

3. **Run database migrations**:
   ```bash
   docker-compose exec backend npx prisma migrate dev
   ```

4. **Seed database** (optional):
   ```bash
   docker-compose exec backend npm run db:seed
   ```

5. **Access the API**:
   - API: http://localhost:3001/api
   - Documentation: http://localhost:3001/api/docs
   - Health Check: http://localhost:3001/health

### Manual Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Setup environment**:
   ```bash
   cp env.example .env
   # Edit .env with your database and other configurations
   ```

3. **Setup database**:
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run migrations
   npx prisma migrate dev
   
   # Seed database (optional)
   npm run db:seed
   ```

4. **Start development server**:
   ```bash
   npm run start:dev
   ```

## Environment Variables

Copy `env.example` to `.env` and configure:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/solemate_db"

# JWT Secrets (change in production!)
JWT_SECRET="your-super-secret-jwt-key"
JWT_REFRESH_SECRET="your-super-secret-refresh-key"

# PayPal (for payments)
PAYPAL_CLIENT_ID="your-paypal-client-id"
PAYPAL_CLIENT_SECRET="your-paypal-client-secret"

# Email (for notifications)
EMAIL_HOST="smtp.gmail.com"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"
```

## API Documentation

Once the server is running, visit:
- **Swagger UI**: http://localhost:3001/api/docs
- **Health Check**: http://localhost:3001/health

## Database Schema

The application uses Prisma ORM with the following main entities:

- **Users** - User accounts and authentication
- **Products** - Product catalog with variants
- **Categories** - Product categorization
- **Orders** - Order management and tracking
- **Cart Items** - Shopping cart functionality
- **Reviews** - Product reviews and ratings
- **Coupons** - Discount and promotion codes

## Development

### Available Scripts

```bash
# Development
npm run start:dev          # Start with hot reload
npm run start:debug        # Start with debugging

# Building
npm run build              # Build for production
npm run start:prod         # Start production build

# Database
npm run db:generate        # Generate Prisma client
npm run db:push           # Push schema to database
npm run db:migrate        # Run migrations
npm run db:studio         # Open Prisma Studio

# Testing
npm run test              # Run unit tests
npm run test:watch        # Run tests in watch mode
npm run test:cov          # Run tests with coverage
npm run test:e2e          # Run end-to-end tests

# Code Quality
npm run lint              # Run ESLint
npm run format            # Format code with Prettier
```

### Project Structure

```
src/
├── common/               # Shared utilities and services
│   └── prisma/          # Database service
├── config/              # Configuration files
├── modules/             # Feature modules
│   ├── auth/           # Authentication
│   ├── users/          # User management
│   ├── products/       # Product catalog
│   ├── cart/           # Shopping cart
│   ├── orders/         # Order management
│   ├── payments/       # Payment processing
│   ├── reviews/        # Product reviews
│   └── admin/          # Admin operations
└── main.ts             # Application entry point
```

## Security Features

- **JWT Authentication** with refresh token rotation
- **Password Hashing** using bcrypt
- **Input Validation** with class-validator
- **Rate Limiting** to prevent abuse
- **CORS Configuration** for cross-origin requests
- **Security Headers** with Helmet
- **SQL Injection Protection** with Prisma ORM

## Accessibility Features

- **WCAG 2.1 AA Compliance** in API responses
- **Semantic Error Messages** for screen readers
- **Structured Data** for better accessibility
- **Clear API Documentation** with examples

## Deployment

### Production Considerations

1. **Environment Variables**: Use secure, unique secrets
2. **Database**: Use managed PostgreSQL (AWS RDS, etc.)
3. **SSL/TLS**: Enable HTTPS in production
4. **Monitoring**: Set up logging and monitoring
5. **Backups**: Regular database backups
6. **Scaling**: Consider horizontal scaling for high traffic

### Docker Production Build

```bash
# Build production image
docker build -t solemate-backend .

# Run with production environment
docker run -p 3001:3001 --env-file .env solemate-backend
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For questions or support, please:
- Check the API documentation at `/api/docs`
- Review the health check at `/health`
- Open an issue in the repository
