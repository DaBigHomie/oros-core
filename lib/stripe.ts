import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-12-15.clover',
});

/**
 * Create a checkout session for subscriptions
 */
export async function createCheckoutSession(
  priceId: string,
  userEmail: string,
  successUrl: string,
  cancelUrl: string
) {
  return await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    customer_email: userEmail,
    success_url: successUrl,
    cancel_url: cancelUrl,
  });
}

/**
 * Create a payment with 3% platform fee
 */
export async function createPaymentWithFee(
  amount: number,
  metadata: Record<string, string>
) {
  const platformFee = Math.round(amount * 0.03);
  
  return await stripe.paymentIntents.create({
    amount,
    currency: 'usd',
    application_fee_amount: platformFee,
    metadata: {
      ...metadata,
      platformFee: platformFee.toString(),
    },
  });
}

/**
 * Get customer subscriptions
 */
export async function getCustomerSubscriptions(customerId: string) {
  return await stripe.subscriptions.list({
    customer: customerId,
  });
}

/**
 * Cancel subscription
 */
export async function cancelSubscription(subscriptionId: string) {
  return await stripe.subscriptions.cancel(subscriptionId);
}

export default stripe;
