import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service';
const SSLCommerzPayment = require('sslcommerz-lts')
const store_id = process.env.SSL_STORE_ID
const store_passwd = process.env.SSL_STORE_PASSWORD
const is_live = false //true for live, false for sandbox

@Injectable()
export class SslCommerceService {
  // private sslCommerz;

  // constructor() {
  //   // this.sslCommerz = new SSLCommerz(
  //   //   process.env.SSL_STORE_ID || 'your_store_id',
  //   //   process.env.SSL_STORE_PASSWORD || 'your_store_password',
  //   //   false, // true for sandbox mode
  //   // );
  // }

  async initiatePayment(payload: any) {
    const data = {
      total_amount: 100,
      currency: 'BDT',
      tran_id: 'REF123', // use unique tran_id for each api call
      success_url: 'http://localhost:3030/success',
      fail_url: 'http://localhost:3030/fail',
      cancel_url: 'http://localhost:3030/cancel',
      ipn_url: 'http://localhost:3030/ipn',
      shipping_method: 'Courier',
      product_name: 'Computer.',
      product_category: 'Electronic',
      product_profile: 'general',
      cus_name: 'Customer Name',
      cus_email: 'customer@example.com',
      cus_add1: 'Dhaka',
      cus_add2: 'Dhaka',
      cus_city: 'Dhaka',
      cus_state: 'Dhaka',
      cus_postcode: '1000',
      cus_country: 'Bangladesh',
      cus_phone: '01711111111',
      cus_fax: '01711111111',
      ship_name: 'Customer Name',
      ship_add1: 'Dhaka',
      ship_add2: 'Dhaka',
      ship_city: 'Dhaka',
      ship_state: 'Dhaka',
      ship_postcode: 1000,
      ship_country: 'Bangladesh',
    };
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    try {
      const apiResponse = await sslcz.init(data);
      console.log('API Response:', apiResponse);
    
      if (apiResponse && apiResponse.GatewayPageURL) {
        return apiResponse.GatewayPageURL;
      } else {
        throw new Error('Invalid API response from SSLCommerz');
      }
    } catch (error) {
      console.error('Payment initialization error:', error);
      throw new Error('Payment initialization failed');
    }
    // const transactionId = `tx_${Date.now()}`;
    // const data = {
    //   total_amount: payload.amount,
    //   currency: payload.currency || 'BDT',
    //   tran_id: transactionId,
    //   success_url: `${process.env.BASE_URL}/payment/sslcommerce/success`,
    //   fail_url: `${process.env.BASE_URL}/payment/sslcommerce/fail`,
    //   cancel_url: `${process.env.BASE_URL}/payment/sslcommerce/cancel`,
    //   ipn_url: `${process.env.BASE_URL}/payment/sslcommerce/ipn`,
    //   product_name: payload.product_name || 'Your Product',
    //   cus_name: payload.customerName || 'John Doe',
    //   cus_email: payload.customerEmail || 'johndoe@example.com',
    //   cus_add1: payload.customerAddress || 'Dhaka, Bangladesh',
    //   cus_city: 'Dhaka',
    //   cus_country: 'Bangladesh',
    //   cus_phone: payload.customerPhone || '017xxxxxxxx',
    // };

    // const response = await this.sslCommerz.init(data);

    // // Save payment details to the database
    // await this.prisma.payment.create({
    //   data: {
    //     transactionId,
    //     amount: payload.amount,
    //     currency: payload.currency || 'BDT',
    //     status: 'Pending',
    //   },
    // });

    // return response;
  }

  // async handleIPN(data: any) {
  //   const payment = await this.prisma.payment.findUnique({
  //     where: { transactionId: data.tran_id },
  //   });

  //   if (!payment) {
  //     throw new Error('Payment not found');
  //   }

  //   await this.prisma.payment.update({
  //     where: { transactionId: data.tran_id },
  //     data: { status: data.status === 'VALID' ? 'Completed' : 'Failed' },
  //   });

  //   return payment;
  // }
}
