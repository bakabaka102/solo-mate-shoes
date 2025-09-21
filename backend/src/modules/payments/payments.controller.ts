import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('payments')
@Controller('payments')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('paypal/create')
  @ApiOperation({ summary: 'Create PayPal payment' })
  @ApiResponse({ status: 201, description: 'PayPal payment created successfully' })
  async createPayPalPayment(@Request() req, @Body() createPaymentDto: any) {
    return this.paymentsService.createPayPalPayment(req.user.id, createPaymentDto);
  }

  @Post('paypal/capture')
  @ApiOperation({ summary: 'Capture PayPal payment' })
  @ApiResponse({ status: 200, description: 'PayPal payment captured successfully' })
  async capturePayPalPayment(@Body() capturePaymentDto: any) {
    return this.paymentsService.capturePayPalPayment(capturePaymentDto);
  }

  @Post('webhooks/paypal')
  @ApiOperation({ summary: 'PayPal webhook handler' })
  @ApiResponse({ status: 200, description: 'Webhook processed successfully' })
  async handlePayPalWebhook(@Body() webhookData: any) {
    return this.paymentsService.handlePayPalWebhook(webhookData);
  }
}
