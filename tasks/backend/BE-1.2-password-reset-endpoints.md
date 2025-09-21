# PRD: Password Reset Endpoints (BE-1.2)

## Component/Feature Overview

**Component Name**: Password Reset Endpoints  
**Problem Solved**: Provides secure password reset functionality for users who have forgotten their passwords  
**Main Goal**: Implement secure password reset flow with email-based token generation and validation  
**Component Hierarchy**: `/src/modules/auth/` - Authentication module endpoints

## Technical Specifications

**Component Type**: NestJS Controller Endpoints with Services  
**Framework**: NestJS with TypeScript  
**Database**: PostgreSQL with Prisma ORM  
**Email Service**: Nodemailer with SMTP  
**Required Dependencies**: 
- `nodemailer` for email sending
- `handlebars` for email templates
- `crypto` for secure token generation
- `class-validator` for input validation
- `class-transformer` for data transformation

## User Stories

**US-1**: As a user who forgot my password, I want to request a password reset so I can regain access to my account  
**US-2**: As a user, I want to receive a secure reset link via email so I can create a new password  
**US-3**: As a user, I want to set a new strong password using the reset link so I can secure my account  
**US-4**: As a user, I want the reset link to expire after a reasonable time so my account stays secure  
**US-5**: As a user, I want to be automatically logged in after successful password reset so I can continue using the platform

## Functional Requirements

### FR-1: Password Reset Request
- **FR-1.1**: Create password reset request endpoint `POST /api/auth/forgot-password`
- **FR-1.2**: Validate email address format and existence
- **FR-1.3**: Generate secure reset token with crypto.randomBytes
- **FR-1.4**: Store reset token in database with expiration time
- **FR-1.5**: Send password reset email with secure link
- **FR-1.6**: Return success message regardless of email existence (security)

### FR-2: Password Reset Confirmation
- **FR-2.1**: Create password reset confirmation endpoint `POST /api/auth/reset-password`
- **FR-2.2**: Validate reset token from request
- **FR-2.3**: Check token expiration and validity
- **FR-2.4**: Validate new password strength requirements
- **FR-2.5**: Hash new password with bcrypt
- **FR-2.6**: Update user password in database
- **FR-2.7**: Invalidate used reset token
- **FR-2.8**: Generate new JWT tokens for automatic login

### FR-3: Token Management
- **FR-3.1**: Generate cryptographically secure reset tokens
- **FR-3.2**: Set token expiration to 1 hour
- **FR-3.3**: Store tokens in database with user association
- **FR-3.4**: Implement token cleanup for expired tokens
- **FR-3.5**: Prevent token reuse after successful reset
- **FR-3.6**: Handle token validation errors gracefully

### FR-4: Email Service Integration
- **FR-4.1**: Configure SMTP email service
- **FR-4.2**: Create password reset email template
- **FR-4.3**: Include secure reset link in email
- **FR-4.4**: Handle email sending errors gracefully
- **FR-4.5**: Implement email rate limiting
- **FR-4.6**: Support HTML and text email formats

### FR-5: Security Features
- **FR-5.1**: Implement rate limiting for reset requests
- **FR-5.2**: Prevent email enumeration attacks
- **FR-5.3**: Use secure token generation methods
- **FR-5.4**: Implement proper error handling without information leakage
- **FR-5.5**: Log security events for monitoring
- **FR-5.6**: Implement CSRF protection

### FR-6: Database Schema
- **FR-6.1**: Create password reset tokens table
- **FR-6.2**: Store token, user ID, expiration, and usage status
- **FR-6.3**: Implement proper indexing for performance
- **FR-6.4**: Add foreign key constraints
- **FR-6.5**: Implement cleanup procedures for expired tokens

## Component API Design

### Controller Endpoints
```typescript
@Controller('auth')
export class AuthController {
  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto): Promise<ForgotPasswordResponse>

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<ResetPasswordResponse>
}
```

### DTOs
```typescript
export class ForgotPasswordDto {
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;
}

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message: 'Password must contain uppercase, lowercase, number, and special character'
  })
  password: string;
}
```

### Response Types
```typescript
interface ForgotPasswordResponse {
  message: string;
  success: boolean;
}

interface ResetPasswordResponse {
  message: string;
  success: boolean;
  user?: User;
  accessToken?: string;
  refreshToken?: string;
}
```

### Database Schema
```prisma
model PasswordResetToken {
  id        String   @id @default(cuid())
  token     String   @unique
  userId    String
  expiresAt DateTime
  used      Boolean  @default(false)
  createdAt DateTime @default(now())

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("password_reset_tokens")
}
```

## UI/UX Requirements

### API Response Format
- **Consistent Structure**: All responses follow consistent format
- **Error Handling**: Clear error messages with appropriate HTTP status codes
- **Success Responses**: Include relevant data and success indicators
- **Security**: Don't reveal whether email exists in system

### Email Template Requirements
- **Branding**: Follow SoleMate brand guidelines
- **Security**: Include security warnings and instructions
- **Accessibility**: Ensure email is accessible to screen readers
- **Responsive**: Work on both desktop and mobile email clients
- **Clear CTA**: Prominent reset button with clear instructions

## Integration Requirements

### Database Integration
- **User Entity**: Integrate with existing User model
- **Token Storage**: Store reset tokens with proper relationships
- **Cleanup**: Implement automatic cleanup of expired tokens
- **Indexing**: Optimize queries with proper database indexes

### Email Service Integration
- **SMTP Configuration**: Configure SMTP settings from environment
- **Template Engine**: Use Handlebars for email templates
- **Error Handling**: Handle email service failures gracefully
- **Rate Limiting**: Implement email sending rate limits

### Frontend Integration
- **API Endpoints**: Provide RESTful endpoints for frontend
- **Error Responses**: Consistent error format for frontend handling
- **Token Format**: Secure tokens compatible with frontend validation
- **CORS**: Enable CORS for frontend domain

## Non-Goals (Out of Scope)

- SMS-based password reset
- Security questions for password reset
- Password reset via phone call
- Multiple reset attempts tracking
- Account lockout after failed attempts
- Password history validation
- Two-factor authentication integration

## Testing Requirements

### Unit Testing
- **Service Methods**: Test all password reset service methods
- **Token Generation**: Test secure token generation
- **Email Service**: Test email sending functionality
- **Validation**: Test input validation rules
- **Error Handling**: Test error scenarios

### Integration Testing
- **API Endpoints**: Test all password reset endpoints
- **Database Integration**: Test token storage and retrieval
- **Email Integration**: Test email sending (with mock)
- **Token Flow**: Test complete token generation and validation flow

### E2E Testing
- **Complete Flow**: Test full password reset process
- **Email Delivery**: Test email delivery (in staging)
- **Token Expiration**: Test token expiration handling
- **Security**: Test rate limiting and security measures

## Performance Considerations

- **Token Generation**: Use efficient crypto methods
- **Database Queries**: Optimize token lookup queries
- **Email Sending**: Implement async email sending
- **Rate Limiting**: Implement rate limiting to prevent abuse
- **Cleanup**: Implement efficient token cleanup procedures

## Success Metrics

- **Security**: Tokens are cryptographically secure
- **Performance**: Reset requests processed under 2 seconds
- **Reliability**: 99.9% uptime for reset endpoints
- **Code Quality**: 90%+ test coverage
- **Email Delivery**: 95%+ email delivery rate

## Implementation Notes

### File Structure
```
src/modules/auth/
├── auth.controller.ts       # Authentication controller
├── auth.service.ts          # Authentication service
├── password-reset.service.ts # Password reset service
├── email.service.ts         # Email service
├── dto/
│   ├── forgot-password.dto.ts # Forgot password DTO
│   └── reset-password.dto.ts  # Reset password DTO
├── templates/
│   └── password-reset.hbs   # Email template
└── auth.module.spec.ts      # Unit tests
```

### Security Implementation
```typescript
// Token generation
const generateResetToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

// Token validation
const validateResetToken = async (token: string): Promise<PasswordResetToken | null> => {
  const resetToken = await this.prisma.passwordResetToken.findUnique({
    where: { token },
    include: { user: true }
  });

  if (!resetToken || resetToken.used || resetToken.expiresAt < new Date()) {
    return null;
  }

  return resetToken;
};

// Email sending
const sendPasswordResetEmail = async (email: string, token: string): Promise<void> => {
  const resetUrl = `${this.configService.get('FRONTEND_URL')}/reset-password?token=${token}`;
  
  await this.emailService.sendEmail({
    to: email,
    subject: 'Reset Your SoleMate Password',
    template: 'password-reset',
    context: { resetUrl, expirationTime: '1 hour' }
  });
};
```

### Environment Configuration
```env
# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@solemate.com

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

## Open Questions

1. **Token Expiration**: Should reset tokens expire after 1 hour or longer?
2. **Email Template**: What should the password reset email look like?
3. **Rate Limiting**: How many reset requests should be allowed per hour?
4. **Token Storage**: Should we store tokens in database or use JWT?
5. **Email Service**: Should we use a third-party email service like SendGrid?

## Acceptance Criteria

- [ ] Password reset request endpoint works with email validation
- [ ] Secure reset tokens are generated and stored correctly
- [ ] Password reset emails are sent successfully
- [ ] Password reset confirmation endpoint works with token validation
- [ ] New passwords are properly hashed and stored
- [ ] Used tokens are invalidated after successful reset
- [ ] Rate limiting prevents abuse of reset endpoints
- [ ] All endpoints return appropriate HTTP status codes
- [ ] Unit tests achieve 90%+ coverage
- [ ] Integration tests pass for complete password reset flow
- [ ] Performance meets specified benchmarks
- [ ] Security requirements are enforced
