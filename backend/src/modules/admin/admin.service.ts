import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboard() {
    // TODO: Implement admin dashboard data
    return { message: 'Admin dashboard service not implemented yet' };
  }

  async getAnalytics() {
    // TODO: Implement analytics data
    return { message: 'Analytics service not implemented yet' };
  }
}
