import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { CreateOrderRequest, Order } from "../types";

// Stripe checkout session shape returned by backend
export type CheckoutSession = {
  id: string;
  url: string;
};

// ShoppingItem matches backend Stripe.ShoppingItem
export type ShoppingItem = {
  currency: string;
  productName: string;
  productDescription: string;
  priceInCents: bigint;
  quantity: bigint;
};

// Minimal backend interface for orders (backend.d.ts will be populated after bindgen)
interface OrdersActor {
  listMyOrders: () => Promise<Order[]>;
  createOrder: (req: CreateOrderRequest) => Promise<Order>;
  getMyOrder: (id: bigint) => Promise<Order | null>;
  duplicateOrder: (sourceOrderId: bigint) => Promise<Order | null>;
  confirmOrderPayment: (orderId: bigint, intentId: string) => Promise<boolean>;
}

export function useOrders() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<Order[]>({
    queryKey: ["myOrders"],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as unknown as OrdersActor).listMyOrders();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useOrder(id: bigint) {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<Order | null>({
    queryKey: ["myOrder", id.toString()],
    queryFn: async () => {
      if (!actor) return null;
      return (actor as unknown as OrdersActor).getMyOrder(id);
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useCreateOrder() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (req: CreateOrderRequest): Promise<Order> => {
      if (!actor) throw new Error("Actor not available");
      return (actor as unknown as OrdersActor).createOrder(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myOrders"] });
    },
  });
}

export function useDuplicateOrder() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (sourceOrderId: bigint): Promise<Order | null> => {
      if (!actor) throw new Error("Actor not available");
      return (actor as unknown as OrdersActor).duplicateOrder(sourceOrderId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myOrders"] });
    },
  });
}

export function useConfirmOrderPayment() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      orderId,
      intentId,
    }: {
      orderId: bigint;
      intentId: string;
    }): Promise<boolean> => {
      if (!actor) throw new Error("Actor not available");
      return (actor as unknown as OrdersActor).confirmOrderPayment(
        orderId,
        intentId,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myOrders"] });
    },
  });
}

interface StripeActor {
  createCheckoutSession: (
    items: ShoppingItem[],
    successUrl: string,
    cancelUrl: string,
  ) => Promise<string>;
}

export function useCreateCheckoutSession() {
  const { actor } = useActor(createActor);

  return useMutation({
    mutationFn: async ({
      items,
      orderId,
    }: {
      items: ShoppingItem[];
      orderId: bigint;
    }): Promise<CheckoutSession> => {
      if (!actor) throw new Error("Actor not available");
      const baseUrl = `${window.location.protocol}//${window.location.host}`;
      const successUrl = `${baseUrl}/payment-success?orderId=${orderId.toString()}`;
      const cancelUrl = `${baseUrl}/payment-failure`;
      const result = await (
        actor as unknown as StripeActor
      ).createCheckoutSession(items, successUrl, cancelUrl);
      const session = JSON.parse(result) as CheckoutSession;
      if (!session?.url) {
        throw new Error("Stripe session missing url");
      }
      return session;
    },
  });
}
