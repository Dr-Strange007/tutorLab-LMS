import { Body, Controller, Post } from '@nestjs/common';
import { SslCommerceService } from './sslcommerz.service';

@Controller('payment/sslcommerce')
export class SslCommerceController {
  constructor(private readonly sslCommerceService: SslCommerceService) {}

  @Post('initiate')
  async initiatePayment(@Body() payload: any) {
    return this.sslCommerceService.initiatePayment(payload);
  }

  // @Post('ipn')
  // async handleIPN(@Body() data: any) {
  //   return this.sslCommerceService.handleIPN(data);
  // }
  
}
