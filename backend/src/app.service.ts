import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getApiInfo() {
    return {
      name: 'SoleMate API',
      version: '1.0.0',
      description: 'E-commerce API for SoleMate footwear store with accessibility-first design',
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString(),
      features: [
        'User authentication and authorization',
        'Product catalog with advanced filtering',
        'Shopping cart management',
        'Order processing and tracking',
        'Payment integration (PayPal)',
        'Product reviews and ratings',
        'Admin dashboard',
        'Accessibility compliance (WCAG 2.1)',
      ],
      documentation: '/api/docs',
      health: '/health',
    };
  }
}
