import Stripe from 'stripe';

export type StripeModuleOptions = {
  apiKey: string;
  options: Stripe.StripeConfig;
}