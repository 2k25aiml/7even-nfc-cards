// Core domain types for 7EVEN NFC Cards

export type TemplateId = bigint;
export type OrderId = bigint;

export interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  instagram?: string;
}

export interface CardDetails {
  name: string;
  jobTitle: string;
  company: string;
  phone: string;
  email: string;
  website?: string;
  socialLinks: SocialLinks;
  customMessage?: string;
}

export interface Template {
  id: TemplateId;
  name: string;
  description: string;
  previewImageUrl: string;
}

export type OrderQuantity =
  | { q100: null }
  | { q500: null }
  | { q1000: null }
  | { q2000: null };

export type OrderStatus =
  | { pending: null }
  | { processing: null }
  | { shipped: null }
  | { delivered: null };

export interface Order {
  id: OrderId;
  cardDetails: CardDetails;
  templateId: TemplateId;
  quantity: OrderQuantity;
  status: OrderStatus;
  paymentAmountCents: bigint;
  stripePaymentIntentId?: string;
  trackingNumber?: string;
  createdAt: bigint;
  updatedAt: bigint;
}

export interface CreateOrderRequest {
  cardDetails: CardDetails;
  templateId: TemplateId;
  quantity: OrderQuantity;
}

// Display helpers
export function quantityLabel(q: OrderQuantity): string {
  if ("q100" in q) return "100 cards";
  if ("q500" in q) return "500 cards";
  if ("q1000" in q) return "1,000 cards";
  if ("q2000" in q) return "2,000 cards";
  return "Unknown";
}

export function quantityPrice(q: OrderQuantity): number {
  if ("q100" in q) return 4900;
  if ("q500" in q) return 19900;
  if ("q1000" in q) return 34900;
  if ("q2000" in q) return 59900;
  return 0;
}

export function statusLabel(s: OrderStatus): string {
  if ("pending" in s) return "Pending";
  if ("processing" in s) return "Processing";
  if ("shipped" in s) return "Shipped";
  if ("delivered" in s) return "Delivered";
  return "Unknown";
}

export function statusColor(s: OrderStatus): string {
  if ("pending" in s) return "text-muted-foreground";
  if ("processing" in s) return "text-accent";
  if ("shipped" in s) return "text-primary";
  if ("delivered" in s) return "text-chart-3";
  return "";
}
