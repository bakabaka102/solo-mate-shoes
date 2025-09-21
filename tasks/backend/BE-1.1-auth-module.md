# PRD: Auth Module (BE-1.1)

## Component/Feature Overview

**Component Name**: Authentication Module  
**Problem Solved**: Provides secure user authentication and authorization for the SoleMate e-commerce platform  
**Main Goal**: Implement JWT-based authentication with access and refresh tokens, secure password hashing, and comprehensive auth endpoints  
**Component Hierarchy**: `/src/modules/auth/` - Core authentication module

## Technical Specifications

**Component Type**: NestJS Module with Controllers, Services, and Guards  
**Framework**: NestJS with TypeScript  
**Database**: PostgreSQL with Prisma ORM  
**Authentication**: JWT with Passport.js  
**Required Dependencies**: 
- `@nestjs/jwt` for JWT handling
- `@nestjs/passport` for authentication strategies
- `passport-jwt` for JWT strategy
- `passport-local` for local strategy
- `bcrypt` for password hashing
- `class-validator` for input validation
- `class-transformer` for data transformation

## User Stories

**US-1**: As a user, I want to register with email and password so I can create an account  
**US-2**: As a user, I want to log in with my credentials so I can access my account  
**US-3**: As a user, I want my password to be securely hashed so my account is protected  
**US-4**: As a user, I want to receive JWT tokens so I can access protected resources  
**US-5**: As a user, I want my session to be refreshed automatically so I don't get logged out unexpectedly  
**US-6**: As a user, I want to log out securely so my session is properly terminated

## Functional Requirements

### FR-1: User Registration
- **FR-1.1**: Create user registration endpoint `POST /api/auth/register`
- **FR-1.2**: Validate email format and uniqueness
- **FR-1.3**: Implement strong password requirements validation
- **FR-1.4**: Hash passwords using bcrypt with salt rounds of 12
- **FR-1.5**: Generate JWT access and refresh tokens on successful registration
- **FR-1.6**: Return user data (excluding password) and tokens

### FR-2: User Login
- **FR-2.1**: Create user login endpoint `POST /api/auth/login`
- **FR-2.2**: Validate email and password credentials
- **FR-2.3**: Compare hashed password with provided password
- **FR-2.4**: Generate JWT access and refresh tokens on successful login
- **FR-2.5**: Return user data and tokens
- **FR-2.6**: Handle invalid credentials with appropriate error messages

### FR-3: Token Management
- **FR-3.1**: Implement JWT access tokens with 15-minute expiration
- **FR-3.2**: Implement JWT refresh tokens with 7-day expiration
- **FR-3.3**: Create token refresh endpoint `POST /api/auth/refresh`
- **FR-3.4**: Validate refresh tokens and issue new access tokens
- **FR-3.5**: Implement token rotation for enhanced security
- **FR-3.6**: Handle token expiration and invalidation

### FR-4: Password Security
- **FR-4.1**: Implement bcrypt password hashing with salt rounds of 12
- **FR-4.2**: Validate password strength requirements
- **FR-4.3**: Prevent password exposure in API responses
- **FR-4.4**: Implement secure password comparison
- **FR-4.5**: Handle password hashing errors gracefully

### FR-5: Authentication Guards
- **FR-5.1**: Create JWT authentication guard for protected routes
- **FR-5.2**: Create local authentication strategy for login
- **FR-5.3**: Implement role-based authorization guards
- **FR-5.4**: Handle authentication failures with proper HTTP status codes
- **FR-5.5**: Provide user context in protected routes

### FR-6: User Profile Management
- **FR-6.1**: Create user profile endpoint `GET /api/auth/me`
- **FR-6.2**: Return current user information
- **FR-6.3**: Handle user not found scenarios
- **FR-6.4**: Implement user profile update functionality
- **FR-6.5**: Validate user data updates

## Component API Design

### Controller Endpoints
```typescript
@Controller('auth')
export class AuthController {
  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<AuthResponse>

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<AuthResponse>

  @Post('refresh')
  async refresh(@Body() refreshTokenDto: RefreshTokenDto): Promise<TokenResponse>

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Request() req): Promise<LogoutResponse>

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req): Promise<UserResponse>
}
```

### DTOs
```typescript
export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
  password: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class RefreshTokenDto {
  @IsString()
  refreshToken: string;
}
```

### Response Types
```typescript
interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

interface UserResponse {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}
```

## UI/UX Requirements

### API Response Format
- **Consistent Structure**: All responses follow consistent format
- **Error Handling**: Clear error messages with appropriate HTTP status codes
- **Success Responses**: Include relevant data and success indicators
- **Loading States**: Support for client-side loading indicators

### Security Considerations
- **Input Validation**: Comprehensive validation of all inputs
- **Rate Limiting**: Implement rate limiting for authentication endpoints
- **CORS Configuration**: Proper CORS setup for frontend integration
- **Security Headers**: Include security headers in responses

## Integration Requirements

### Database Integration
- **User Entity**: Integrate with Prisma User model
- **Password Hashing**: Store hashed passwords in database
- **User Roles**: Support user and admin roles
- **Timestamps**: Track user creation and update times

### External Dependencies
- **JWT Library**: Use @nestjs/jwt for token generation
- **Passport**: Use Passport.js for authentication strategies
- **Bcrypt**: Use bcrypt for password hashing
- **Validation**: Use class-validator for input validation

### Frontend Integration
- **API Endpoints**: Provide RESTful endpoints for frontend
- **Error Responses**: Consistent error format for frontend handling
- **Token Format**: JWT tokens compatible with frontend storage
- **CORS**: Enable CORS for frontend domain

## Non-Goals (Out of Scope)

- Social authentication (Google, Facebook)
- Two-factor authentication
- Biometric authentication
- Password reset functionality (handled in separate task)
- Email verification
- Account lockout mechanisms

## Testing Requirements

### Unit Testing
- **Service Methods**: Test all authentication service methods
- **Password Hashing**: Test bcrypt password hashing
- **Token Generation**: Test JWT token creation and validation
- **Validation**: Test input validation rules
- **Error Handling**: Test error scenarios

### Integration Testing
- **API Endpoints**: Test all authentication endpoints
- **Database Integration**: Test user creation and retrieval
- **Token Flow**: Test complete token generation and validation flow
- **Authentication Guards**: Test protected route access

### E2E Testing
- **Registration Flow**: Test complete user registration
- **Login Flow**: Test complete user login
- **Token Refresh**: Test token refresh functionality
- **Protected Routes**: Test access to protected endpoints

## Performance Considerations

- **Password Hashing**: Use appropriate bcrypt salt rounds for performance
- **Token Validation**: Implement efficient JWT validation
- **Database Queries**: Optimize user lookup queries
- **Rate Limiting**: Implement rate limiting to prevent abuse
- **Caching**: Consider caching user data for frequently accessed users

## Success Metrics

- **Security**: Passwords properly hashed with bcrypt
- **Performance**: Authentication requests under 500ms
- **Reliability**: 99.9% uptime for authentication endpoints
- **Code Quality**: 90%+ test coverage
- **API Compliance**: RESTful API design standards

## Implementation Notes

### File Structure
```
src/modules/auth/
├── auth.module.ts           # Main auth module
├── auth.controller.ts       # Authentication controller
├── auth.service.ts          # Authentication service
├── dto/
│   ├── register.dto.ts      # Registration DTO
│   ├── login.dto.ts         # Login DTO
│   └── refresh-token.dto.ts # Refresh token DTO
├── strategies/
│   ├── jwt.strategy.ts      # JWT strategy
│   └── local.strategy.ts    # Local strategy
├── guards/
│   ├── jwt-auth.guard.ts    # JWT guard
│   └── local-auth.guard.ts  # Local guard
└── auth.module.spec.ts      # Unit tests
```

### Security Implementation
```typescript
// Password hashing
const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
};

// Token generation
const generateTokens = async (userId: string) => {
  const payload = { sub: userId };
  
  const [accessToken, refreshToken] = await Promise.all([
    this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: '15m',
    }),
    this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: '7d',
    }),
  ]);

  return { accessToken, refreshToken };
};
```

### Database Schema
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String
  role      UserRole @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum UserRole {
  USER
  ADMIN
}
```

## Open Questions

1. **Token Storage**: Should refresh tokens be stored in database for revocation?
2. **Password Requirements**: Are the current password requirements appropriate?
3. **Session Management**: Should we implement session tracking?
4. **Rate Limiting**: What rate limits should be applied to auth endpoints?
5. **Audit Logging**: Should we log authentication events for security?

## Acceptance Criteria

- [ ] User registration endpoint works with proper validation
- [ ] User login endpoint works with credential validation
- [ ] JWT tokens are generated and validated correctly
- [ ] Password hashing uses bcrypt with appropriate salt rounds
- [ ] Authentication guards protect routes properly
- [ ] Token refresh functionality works correctly
- [ ] User profile endpoint returns correct user data
- [ ] All endpoints return appropriate HTTP status codes
- [ ] Unit tests achieve 90%+ coverage
- [ ] Integration tests pass for all authentication flows
- [ ] Performance meets specified benchmarks
- [ ] Security requirements are enforced
