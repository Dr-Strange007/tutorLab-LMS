// payment/sslcommerce/dto/initiate-payment.dto.ts
import { IsNumber, IsString } from 'class-validator';

export class InitiatePaymentDto {
  @IsNumber()
  amount: number;

  @IsString()
  currency: string;
}
