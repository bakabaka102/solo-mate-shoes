# SoleMate - Accessible E-commerce Platform

A modern, full-stack e-commerce platform built with accessibility-first design principles. SoleMate provides a complete shopping experience for footwear with WCAG 2.1 AA compliance.

## 🚀 Features

### Frontend (Next.js + TypeScript)
- **Accessibility First** - WCAG 2.1 AA compliant design
- **Modern UI/UX** - Beautiful, responsive interface with TailwindCSS
- **Product Catalog** - Advanced filtering, search, and product details
- **Shopping Cart** - Persistent cart with guest and authenticated support
- **Checkout Flow** - Seamless PayPal integration
- **User Management** - Registration, login, and profile management
- **Admin Dashboard** - Complete admin interface for store management

### Backend (NestJS + TypeScript)
- **RESTful API** - Well-documented endpoints with Swagger
- **Authentication** - JWT-based auth with refresh tokens
- **Database** - PostgreSQL with Prisma ORM
- **Payments** - PayPal integration with webhook support
- **Security** - Rate limiting, input validation, and security headers
- **Scalability** - Microservice-ready architecture

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **State Management**: React Context + React Query
- **Forms**: React Hook Form with Zod validation
- **Testing**: Jest, React Testing Library, Playwright

### Backend
- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with Passport.js
- **Documentation**: Swagger/OpenAPI
- **Security**: Helmet, CORS, Rate Limiting

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **Database**: PostgreSQL
- **Caching**: Redis (optional)
- **Payments**: PayPal REST SDK
- **Storage**: AWS S3 (for images)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- Git

### 1. Clone the Repository
```bash
git clone <repository-url>
cd SoleMateShoeDetail
```

### 2. Start with Docker Compose
```bash
# Start all services
docker-compose up -d

# Run database migrations
docker-compose exec backend npx prisma migrate dev

# Seed database (optional)
docker-compose exec backend npm run db:seed
```

### 3. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/api
- **API Documentation**: http://localhost:3001/api/docs
- **Health Check**: http://localhost:3001/health

### 4. Manual Setup (Alternative)

#### Backend Setup
```bash
cd backend
npm install
cp env.example .env
# Edit .env with your configuration
npx prisma migrate dev
npm run start:dev
```

#### Frontend Setup
```bash
cd frontend
npm install
cp env.example .env.local
# Edit .env.local with your configuration
npm run dev
```

## 📁 Project Structure

```
SoleMateShoeDetail/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # Next.js App Router pages
│   │   ├── components/      # Reusable React components
│   │   ├── lib/             # Utility libraries
│   │   └── types/           # TypeScript definitions
│   ├── Dockerfile
│   └── README.md
├── backend/                  # NestJS backend API
│   ├── src/
│   │   ├── modules/         # Feature modules
│   │   ├── common/          # Shared utilities
│   │   └── config/          # Configuration
│   ├── prisma/              # Database schema and migrations
│   ├── Dockerfile
│   └── README.md
├── docs/                     # Project documentation
├── tasks/                    # Project requirements and tasks
└── README.md                 # This file
```

## ♿ Accessibility Features

### WCAG 2.1 AA Compliance
- **Semantic HTML** - Proper heading structure and landmarks
- **Keyboard Navigation** - Full keyboard accessibility
- **Screen Reader Support** - ARIA labels and descriptions
- **Color Contrast** - Meets 4.5:1 ratio requirements
- **Focus Management** - Visible focus indicators
- **Form Accessibility** - Proper labels and error handling

### Testing
- **Automated Testing** - axe-core integration
- **Manual Testing** - Keyboard and screen reader testing
- **CI/CD Integration** - Accessibility checks in pipeline

## 🔧 Development

### Available Scripts

#### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run test         # Run tests
npm run test:a11y    # Run accessibility tests
```

#### Backend
```bash
npm run start:dev    # Start with hot reload
npm run build        # Build for production
npm run test         # Run tests
npm run db:migrate   # Run database migrations
```

### Environment Configuration

#### Backend (.env)
```env
DATABASE_URL="postgresql://username:password@localhost:5432/solemate_db"
JWT_SECRET="your-super-secret-jwt-key"
PAYPAL_CLIENT_ID="your-paypal-client-id"
PAYPAL_CLIENT_SECRET="your-paypal-client-secret"
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your-paypal-client-id
```

## 🧪 Testing

### Frontend Testing
- **Unit Tests** - Component and hook testing
- **Integration Tests** - User workflow testing
- **E2E Tests** - Complete user journeys
- **Accessibility Tests** - WCAG compliance verification

### Backend Testing
- **Unit Tests** - Service and controller testing
- **Integration Tests** - API endpoint testing
- **E2E Tests** - Complete API workflow testing

## 🚀 Deployment

### Production Considerations
1. **Environment Variables** - Use secure, unique secrets
2. **Database** - Use managed PostgreSQL (AWS RDS, etc.)
3. **SSL/TLS** - Enable HTTPS in production
4. **Monitoring** - Set up logging and monitoring
5. **Backups** - Regular database backups
6. **Scaling** - Consider horizontal scaling for high traffic

### Docker Production
```bash
# Build and run with Docker Compose
docker-compose -f docker-compose.prod.yml up -d
```

## 📚 API Documentation

Once the backend is running, visit:
- **Swagger UI**: http://localhost:3001/api/docs
- **Health Check**: http://localhost:3001/health

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Follow accessibility guidelines
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

### Accessibility Guidelines
- Follow WCAG 2.1 AA standards
- Test with keyboard navigation
- Verify screen reader compatibility
- Ensure color contrast compliance
- Include proper ARIA attributes

## 📄 License

MIT License - see LICENSE file for details.

## 🆘 Support

For questions or support:
- Check the individual README files in frontend/ and backend/
- Review the API documentation
- Open an issue in the repository

## 🎯 Project Goals

- **Accessibility First** - Ensure WCAG 2.1 AA compliance
- **Modern Architecture** - Use latest technologies and best practices
- **Scalability** - Design for growth and high traffic
- **Maintainability** - Clean, documented, and testable code
- **User Experience** - Intuitive and accessible shopping experience

---

Built with ❤️ and accessibility in mind.
