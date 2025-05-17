import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { AdminPaymentController } from './admin/admin-payment.controller';
import { UserPaymentController } from './user/user-payment.controller';
import { StripeService } from './stripe/stripe.service';
import { PayStackService } from './paystack/paystack.service';
import { RazorpayPaymentService } from './razorpay/razorpay.service';
import { BraintreePaymentService } from './braintree/braintree.service';
import { SslCommerceService } from './sslcommerz/sslcommerz.service';
import { SslCommerceController } from './sslcommerz/sslcommerz.controller';
import { Prisma } from '@prisma/client';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [AdminPaymentController, UserPaymentController, SslCommerceController],
  imports: [
    PrismaModule,
  ],
  providers: [
    PaymentService,
    StripeService,
    PayStackService,
    RazorpayPaymentService,
    BraintreePaymentService,
    SslCommerceService,
  ],
})
export class PaymentModule {}
