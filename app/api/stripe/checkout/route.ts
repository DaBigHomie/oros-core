import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-12-15.clover',
});

export async function POST(req: NextRequest) {
  try {
    const { priceId, userEmail } = await req.json();

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: userEmail,
      success_url: `${process.env.NEXTAUTH_URL}/creator?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/creator`,
      metadata: {
        userEmail,
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
