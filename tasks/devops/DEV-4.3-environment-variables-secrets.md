# PRD: Environment Variables & Secrets (DEV-4.3)

## Component/Feature Overview

**Component Name**: Environment Variables & Secrets Management  
**Problem Solved**: Provides secure and centralized management of environment variables and secrets for the SoleMate e-commerce platform  
**Main Goal**: Implement comprehensive environment variable and secrets management with proper security, access control, and deployment automation  
**Component Hierarchy**: `/config/` - Environment configuration and secrets management

## Technical Specifications

**Component Type**: Environment Configuration Management  
**Framework**: AWS Secrets Manager, AWS Parameter Store, GitHub Secrets  
**Security**: Encrypted secrets storage and secure access  
**Required Dependencies**: 
- `@aws-sdk/client-secrets-manager` for AWS Secrets Manager
- `@aws-sdk/client-ssm` for AWS Parameter Store
- `dotenv` for environment variable management
- `@nestjs/config` for NestJS configuration

## User Stories

**US-1**: As a developer, I want secure environment variables so I can configure the application safely  
**US-2**: As a DevOps engineer, I want centralized secrets management so I can manage credentials efficiently  
**US-3**: As a security engineer, I want encrypted secrets storage so sensitive data is protected  
**US-4**: As a system administrator, I want automated secrets rotation so security is maintained  
**US-5**: As a developer, I want environment-specific configurations so I can deploy to different environments  
**US-6**: As a team, I want secure secrets access so only authorized personnel can access sensitive data

## Functional Requirements

### FR-1: Environment Configuration Management
- **FR-1.1**: Implement environment-specific configuration files
- **FR-1.2**: Add environment variable validation and type checking
- **FR-1.3**: Implement configuration inheritance and overrides
- **FR-1.4**: Add configuration documentation and examples
- **FR-1.5**: Implement configuration versioning and change tracking
- **FR-1.6**: Add configuration testing and validation

### FR-2: Secrets Management
- **FR-2.1**: Implement AWS Secrets Manager integration
- **FR-2.2**: Add AWS Parameter Store integration
- **FR-2.3**: Implement GitHub Secrets integration
- **FR-2.4**: Add secrets encryption and decryption
- **FR-2.5**: Implement secrets rotation and lifecycle management
- **FR-2.6**: Add secrets access logging and auditing

### FR-3: Security and Access Control
- **FR-3.1**: Implement IAM roles and policies for secrets access
- **FR-3.2**: Add least privilege access principles
- **FR-3.3**: Implement secrets access monitoring and alerting
- **FR-3.4**: Add secrets access audit trails
- **FR-3.5**: Implement secrets backup and recovery
- **FR-3.6**: Add secrets compliance and governance

### FR-4: Deployment Integration
- **FR-4.1**: Implement automated secrets injection during deployment
- **FR-4.2**: Add environment-specific secrets configuration
- **FR-4.3**: Implement secrets validation during deployment
- **FR-4.4**: Add secrets rollback and recovery procedures
- **FR-4.5**: Implement secrets synchronization across environments
- **FR-4.6**: Add secrets deployment monitoring and alerting

### FR-5: Development and Testing
- **FR-5.1**: Implement local development secrets management
- **FR-5.2**: Add testing environment secrets configuration
- **FR-5.3**: Implement secrets mocking and stubbing
- **FR-5.4**: Add secrets validation in CI/CD pipeline
- **FR-5.5**: Implement secrets testing and validation
- **FR-5.6**: Add secrets documentation and examples

### FR-6: Monitoring and Compliance
- **FR-6.1**: Implement secrets access monitoring
- **FR-6.2**: Add secrets usage analytics and reporting
- **FR-6.3**: Implement secrets compliance checking
- **FR-6.4**: Add secrets security scanning and vulnerability assessment
- **FR-6.5**: Implement secrets incident response procedures
- **FR-6.6**: Add secrets governance and policy enforcement

## Component API Design

### Configuration Interface
```typescript
// config/interfaces/config.interface.ts
export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  ssl: boolean;
}

export interface RedisConfig {
  host: string;
  port: number;
  password: string;
  db: number;
}

export interface JWTConfig {
  secret: string;
  expiresIn: string;
  refreshSecret: string;
  refreshExpiresIn: string;
}

export interface PayPalConfig {
  clientId: string;
  clientSecret: string;
  mode: 'sandbox' | 'live';
}

export interface AppConfig {
  port: number;
  environment: string;
  database: DatabaseConfig;
  redis: RedisConfig;
  jwt: JWTConfig;
  paypal: PayPalConfig;
  cors: {
    origin: string[];
    credentials: boolean;
  };
}
```

### Secrets Manager Interface
```typescript
// config/interfaces/secrets.interface.ts
export interface SecretsManager {
  getSecret(secretName: string): Promise<string>;
  getSecretWithKey(secretName: string, key: string): Promise<string>;
  createSecret(secretName: string, secretValue: string): Promise<void>;
  updateSecret(secretName: string, secretValue: string): Promise<void>;
  deleteSecret(secretName: string): Promise<void>;
  listSecrets(): Promise<string[]>;
}

export interface ParameterStore {
  getParameter(parameterName: string): Promise<string>;
  getParameterWithDecryption(parameterName: string): Promise<string>;
  putParameter(parameterName: string, value: string, secure: boolean): Promise<void>;
  deleteParameter(parameterName: string): Promise<void>;
  listParameters(): Promise<string[]>;
}
```

## UI/UX Requirements

### Configuration Management
- **Environment Files**: Clear environment configuration files
- **Validation**: Comprehensive configuration validation
- **Documentation**: Clear configuration documentation
- **Examples**: Configuration examples and templates

### Secrets Management
- **Secure Storage**: Encrypted secrets storage
- **Access Control**: Proper access control and permissions
- **Audit Trail**: Comprehensive audit trail for secrets access
- **Monitoring**: Real-time monitoring of secrets usage

## Integration Requirements

### AWS Integration
- **Secrets Manager**: Integration with AWS Secrets Manager
- **Parameter Store**: Integration with AWS Parameter Store
- **IAM**: Integration with AWS IAM for access control
- **CloudTrail**: Integration with AWS CloudTrail for auditing

### Application Integration
- **NestJS**: Integration with NestJS configuration system
- **Database**: Integration with database configuration
- **External Services**: Integration with external service configurations
- **CI/CD**: Integration with CI/CD pipeline

## Non-Goals (Out of Scope)

- Custom secrets management solutions
- Advanced secrets rotation automation
- Custom encryption algorithms
- Advanced compliance frameworks
- Custom monitoring solutions

## Testing Requirements

### Configuration Testing
- **Validation Testing**: Test configuration validation
- **Environment Testing**: Test environment-specific configurations
- **Integration Testing**: Test configuration integration
- **Security Testing**: Test configuration security

### Secrets Testing
- **Access Testing**: Test secrets access and permissions
- **Encryption Testing**: Test secrets encryption and decryption
- **Rotation Testing**: Test secrets rotation
- **Audit Testing**: Test secrets audit trails

## Performance Considerations

- **Caching**: Implement secrets caching for performance
- **Lazy Loading**: Implement lazy loading of secrets
- **Connection Pooling**: Implement connection pooling for secrets access
- **Error Handling**: Implement proper error handling and retry logic

## Success Metrics

- **Security**: Zero secrets exposure incidents
- **Availability**: 99.9% secrets access availability
- **Performance**: Secrets access under 100ms
- **Compliance**: 100% compliance with security policies
- **Audit**: Complete audit trail for all secrets access

## Implementation Notes

### File Structure
```
config/
├── environments/
│   ├── development.env          # Development environment
│   ├── staging.env              # Staging environment
│   ├── production.env           # Production environment
│   └── testing.env              # Testing environment
├── secrets/
│   ├── secrets-manager.ts       # AWS Secrets Manager integration
│   ├── parameter-store.ts       # AWS Parameter Store integration
│   └── github-secrets.ts        # GitHub Secrets integration
├── validation/
│   ├── config.validation.ts     # Configuration validation
│   └── secrets.validation.ts    # Secrets validation
├── interfaces/
│   ├── config.interface.ts      # Configuration interfaces
│   └── secrets.interface.ts     # Secrets interfaces
├── utils/
│   ├── config-loader.ts         # Configuration loader
│   └── secrets-loader.ts        # Secrets loader
└── docs/
    ├── configuration.md         # Configuration documentation
    └── secrets.md               # Secrets documentation
```

### Configuration Implementation
```typescript
// config/config-loader.ts
import { readFileSync } from 'fs';
import { join } from 'path';
import { config } from 'dotenv';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

export class ConfigLoader {
  private static instance: ConfigLoader;
  private config: AppConfig;

  private constructor() {
    this.loadConfiguration();
  }

  public static getInstance(): ConfigLoader {
    if (!ConfigLoader.instance) {
      ConfigLoader.instance = new ConfigLoader();
    }
    return ConfigLoader.instance;
  }

  private loadConfiguration(): void {
    const environment = process.env.NODE_ENV || 'development';
    const envFile = join(process.cwd(), 'config', 'environments', `${environment}.env`);
    
    // Load environment variables
    config({ path: envFile });
    
    // Load configuration
    this.config = {
      port: parseInt(process.env.PORT || '3000', 10),
      environment: process.env.NODE_ENV || 'development',
      database: {
        host: process.env.DATABASE_HOST || 'localhost',
        port: parseInt(process.env.DATABASE_PORT || '5432', 10),
        username: process.env.DATABASE_USERNAME || 'postgres',
        password: process.env.DATABASE_PASSWORD || 'password',
        database: process.env.DATABASE_NAME || 'solemate',
        ssl: process.env.DATABASE_SSL === 'true',
      },
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379', 10),
        password: process.env.REDIS_PASSWORD || '',
        db: parseInt(process.env.REDIS_DB || '0', 10),
      },
      jwt: {
        secret: process.env.JWT_SECRET || 'secret',
        expiresIn: process.env.JWT_EXPIRES_IN || '15m',
        refreshSecret: process.env.JWT_REFRESH_SECRET || 'refresh-secret',
        refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
      },
      paypal: {
        clientId: process.env.PAYPAL_CLIENT_ID || '',
        clientSecret: process.env.PAYPAL_CLIENT_SECRET || '',
        mode: (process.env.PAYPAL_MODE as 'sandbox' | 'live') || 'sandbox',
      },
      cors: {
        origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
        credentials: process.env.CORS_CREDENTIALS === 'true',
      },
    };

    // Validate configuration
    this.validateConfiguration();
  }

  private async validateConfiguration(): Promise<void> {
    const configClass = plainToClass(AppConfig, this.config);
    const errors = await validate(configClass);
    
    if (errors.length > 0) {
      throw new Error(`Configuration validation failed: ${errors.map(e => e.toString()).join(', ')}`);
    }
  }

  public getConfig(): AppConfig {
    return this.config;
  }

  public getDatabaseConfig(): DatabaseConfig {
    return this.config.database;
  }

  public getRedisConfig(): RedisConfig {
    return this.config.redis;
  }

  public getJWTConfig(): JWTConfig {
    return this.config.jwt;
  }

  public getPayPalConfig(): PayPalConfig {
    return this.config.paypal;
  }
}
```

### Secrets Manager Implementation
```typescript
// config/secrets/secrets-manager.ts
import { SecretsManagerClient, GetSecretValueCommand, CreateSecretCommand, UpdateSecretCommand, DeleteSecretCommand, ListSecretsCommand } from '@aws-sdk/client-secrets-manager';

export class AWSSecretsManager implements SecretsManager {
  private client: SecretsManagerClient;

  constructor() {
    this.client = new SecretsManagerClient({
      region: process.env.AWS_REGION || 'us-east-1',
    });
  }

  async getSecret(secretName: string): Promise<string> {
    try {
      const command = new GetSecretValueCommand({
        SecretId: secretName,
      });
      
      const response = await this.client.send(command);
      
      if (response.SecretString) {
        return response.SecretString;
      }
      
      throw new Error(`Secret ${secretName} not found or not a string`);
    } catch (error) {
      throw new Error(`Failed to get secret ${secretName}: ${error.message}`);
    }
  }

  async getSecretWithKey(secretName: string, key: string): Promise<string> {
    try {
      const secretValue = await this.getSecret(secretName);
      const secretObject = JSON.parse(secretValue);
      
      if (!secretObject[key]) {
        throw new Error(`Key ${key} not found in secret ${secretName}`);
      }
      
      return secretObject[key];
    } catch (error) {
      throw new Error(`Failed to get secret key ${key} from ${secretName}: ${error.message}`);
    }
  }

  async createSecret(secretName: string, secretValue: string): Promise<void> {
    try {
      const command = new CreateSecretCommand({
        Name: secretName,
        SecretString: secretValue,
        Description: `Secret for ${secretName}`,
      });
      
      await this.client.send(command);
    } catch (error) {
      throw new Error(`Failed to create secret ${secretName}: ${error.message}`);
    }
  }

  async updateSecret(secretName: string, secretValue: string): Promise<void> {
    try {
      const command = new UpdateSecretCommand({
        SecretId: secretName,
        SecretString: secretValue,
      });
      
      await this.client.send(command);
    } catch (error) {
      throw new Error(`Failed to update secret ${secretName}: ${error.message}`);
    }
  }

  async deleteSecret(secretName: string): Promise<void> {
    try {
      const command = new DeleteSecretCommand({
        SecretId: secretName,
        ForceDeleteWithoutRecovery: true,
      });
      
      await this.client.send(command);
    } catch (error) {
      throw new Error(`Failed to delete secret ${secretName}: ${error.message}`);
    }
  }

  async listSecrets(): Promise<string[]> {
    try {
      const command = new ListSecretsCommand({});
      const response = await this.client.send(command);
      
      return response.SecretList?.map(secret => secret.Name || '') || [];
    } catch (error) {
      throw new Error(`Failed to list secrets: ${error.message}`);
    }
  }
}
```

### Parameter Store Implementation
```typescript
// config/secrets/parameter-store.ts
import { SSMClient, GetParameterCommand, PutParameterCommand, DeleteParameterCommand, DescribeParametersCommand } from '@aws-sdk/client-ssm';

export class AWSParameterStore implements ParameterStore {
  private client: SSMClient;

  constructor() {
    this.client = new SSMClient({
      region: process.env.AWS_REGION || 'us-east-1',
    });
  }

  async getParameter(parameterName: string): Promise<string> {
    try {
      const command = new GetParameterCommand({
        Name: parameterName,
      });
      
      const response = await this.client.send(command);
      
      if (response.Parameter?.Value) {
        return response.Parameter.Value;
      }
      
      throw new Error(`Parameter ${parameterName} not found`);
    } catch (error) {
      throw new Error(`Failed to get parameter ${parameterName}: ${error.message}`);
    }
  }

  async getParameterWithDecryption(parameterName: string): Promise<string> {
    try {
      const command = new GetParameterCommand({
        Name: parameterName,
        WithDecryption: true,
      });
      
      const response = await this.client.send(command);
      
      if (response.Parameter?.Value) {
        return response.Parameter.Value;
      }
      
      throw new Error(`Parameter ${parameterName} not found`);
    } catch (error) {
      throw new Error(`Failed to get parameter ${parameterName}: ${error.message}`);
    }
  }

  async putParameter(parameterName: string, value: string, secure: boolean = false): Promise<void> {
    try {
      const command = new PutParameterCommand({
        Name: parameterName,
        Value: value,
        Type: secure ? 'SecureString' : 'String',
        Overwrite: true,
      });
      
      await this.client.send(command);
    } catch (error) {
      throw new Error(`Failed to put parameter ${parameterName}: ${error.message}`);
    }
  }

  async deleteParameter(parameterName: string): Promise<void> {
    try {
      const command = new DeleteParameterCommand({
        Name: parameterName,
      });
      
      await this.client.send(command);
    } catch (error) {
      throw new Error(`Failed to delete parameter ${parameterName}: ${error.message}`);
    }
  }

  async listParameters(): Promise<string[]> {
    try {
      const command = new DescribeParametersCommand({});
      const response = await this.client.send(command);
      
      return response.Parameters?.map(param => param.Name || '') || [];
    } catch (error) {
      throw new Error(`Failed to list parameters: ${error.message}`);
    }
  }
}
```

## Open Questions

1. **Secrets Rotation**: How often should we rotate secrets?
2. **Access Control**: What level of access control should we implement?
3. **Monitoring**: What level of monitoring should we implement?
4. **Compliance**: What compliance requirements should we meet?
5. **Backup**: What backup strategy should we implement for secrets?

## Acceptance Criteria

- [ ] Environment variables are properly configured
- [ ] Secrets are securely stored and accessed
- [ ] AWS Secrets Manager integration is working
- [ ] AWS Parameter Store integration is working
- [ ] GitHub Secrets integration is working
- [ ] Configuration validation is implemented
- [ ] Secrets access control is implemented
- [ ] Audit trails are implemented
- [ ] Monitoring and alerting are configured
- [ ] Documentation is provided
- [ ] Performance meets specified benchmarks
- [ ] All environment and secrets requirements are validated
