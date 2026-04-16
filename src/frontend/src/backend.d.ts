import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type OrderId = bigint;
export type Time = bigint;
export interface CardDetails {
    customMessage?: string;
    socialLinks: SocialLinks;
    name: string;
    email: string;
    website?: string;
    company: string;
    jobTitle: string;
    phone: string;
}
export type TemplateId = bigint;
export interface SocialLinks {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
}
export interface CreateOrderRequest {
    templateId: TemplateId;
    cardDetails: CardDetails;
    quantity: OrderQuantity;
}
export interface Order {
    id: OrderId;
    status: OrderStatus;
    trackingNumber?: string;
    paymentAmountCents: bigint;
    owner: Principal;
    templateId: TemplateId;
    createdAt: Time;
    cardDetails: CardDetails;
    updatedAt: Time;
    quantity: OrderQuantity;
    stripePaymentIntentId?: string;
}
export interface Template {
    id: TemplateId;
    name: string;
    description: string;
    previewImageUrl: string;
}
export interface UpdateOrderStatusRequest {
    status: OrderStatus;
    trackingNumber?: string;
    orderId: OrderId;
}
export enum OrderQuantity {
    q1000 = "q1000",
    q2000 = "q2000",
    q100 = "q100",
    q500 = "q500"
}
export enum OrderStatus {
    shipped = "shipped",
    pending = "pending",
    delivered = "delivered",
    processing = "processing"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    adminUpdateOrderStatus(req: UpdateOrderStatusRequest): Promise<boolean>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    confirmOrderPayment(orderId: OrderId, stripePaymentIntentId: string): Promise<boolean>;
    createOrder(req: CreateOrderRequest): Promise<Order>;
    duplicateOrder(sourceOrderId: OrderId): Promise<Order | null>;
    getCallerUserRole(): Promise<UserRole>;
    getMyOrder(orderId: OrderId): Promise<Order | null>;
    getTemplate(id: TemplateId): Promise<Template | null>;
    isCallerAdmin(): Promise<boolean>;
    listMyOrders(): Promise<Array<Order>>;
    listTemplates(): Promise<Array<Template>>;
}
