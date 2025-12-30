import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-12-15.clover',
});

/**
 * Create a payment intent with 3% platform fee
 */
export async function POST(req: NextRequest) {
  try {
    const { amount, creatorId, businessId } = await req.json();

    // Calculate 3% platform fee
    const platformFee = Math.round(amount * 0.03);
    const creatorAmount = amount - platformFee;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in cents
      currency: 'usd',
      application_fee_amount: platformFee,
      metadata: {
        creatorId,
        businessId,
        platformFee: platformFee.toString(),
        creatorAmount: creatorAmount.toString(),
      },
    });

    return NextResponse.json({ 
      clientSecret: paymentIntent.client_secret,
      platformFee,
      creatorAmount,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
