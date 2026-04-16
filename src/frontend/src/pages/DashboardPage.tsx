import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Clock, Copy, LogIn, Package, Wifi } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import Layout from "../components/Layout";
import { useDuplicateOrder, useOrders } from "../hooks/useOrders";
import { quantityLabel, statusColor, statusLabel } from "../types";
import type { Order } from "../types";

function OrderCard({ order, index }: { order: Order; index: number }) {
  const duplicate = useDuplicateOrder();

  const handleDuplicate = () => {
    duplicate.mutate(order.id, {
      onSuccess: () => toast.success("Order duplicated!"),
      onError: () => toast.error("Failed to duplicate order"),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      data-ocid={`dashboard.order.item.${index + 1}`}
    >
      <Card className="bg-card border-border/60 p-5 hover:border-primary/30 transition-smooth">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="font-display font-semibold text-sm text-foreground truncate">
                {order.cardDetails.name}
              </span>
              <Badge
                variant="outline"
                className={`text-xs border-current ${statusColor(order.status)}`}
              >
                {statusLabel(order.status)}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mb-1">
              {order.cardDetails.company} · {order.cardDetails.jobTitle}
            </p>
            <p className="text-xs text-muted-foreground">
              {quantityLabel(order.quantity)} · $
              {(Number(order.paymentAmountCents) / 100).toFixed(2)}
            </p>
            {order.trackingNumber && (
              <p className="text-xs text-accent mt-1.5 flex items-center gap-1">
                Tracking: {order.trackingNumber}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              size="sm"
              variant="ghost"
              onClick={handleDuplicate}
              disabled={duplicate.isPending}
              data-ocid={`dashboard.duplicate_button.${index + 1}`}
              className="gap-1.5 text-xs"
            >
              <Copy className="w-3.5 h-3.5" />
              Reorder
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export default function DashboardPage() {
  const { isAuthenticated, isInitializing, login, isLoggingIn } =
    useInternetIdentity();
  const { data: orders, isLoading } = useOrders();

  if (isInitializing) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <Skeleton className="w-48 h-8 mb-4" />
          <Skeleton className="w-full h-32 rounded-xl" />
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated) {
    return (
      <Layout>
        <section
          className="min-h-[70vh] flex items-center justify-center py-16"
          data-ocid="dashboard.unauthenticated.section"
        >
          <div className="container mx-auto px-4 text-center max-w-md">
            <div className="inline-flex w-14 h-14 rounded-xl bg-primary/10 border border-primary/30 items-center justify-center mb-6">
              <LogIn className="w-7 h-7 text-primary" />
            </div>
            <h1 className="font-display font-bold text-2xl text-foreground mb-3">
              Sign in to view your orders
            </h1>
            <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
              Access your order history, track deliveries, and reorder with one
              click.
            </p>
            <Button
              onClick={login}
              disabled={isLoggingIn}
              data-ocid="dashboard.signin_button"
              className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
            >
              <LogIn className="w-4 h-4" />
              {isLoggingIn ? "Signing in…" : "Sign In with Internet Identity"}
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-12" data-ocid="dashboard.section">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
            <div>
              <h1 className="font-display font-bold text-2xl md:text-3xl text-foreground">
                My Orders
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Manage and track your NFC card orders
              </p>
            </div>
            <Button
              asChild
              data-ocid="dashboard.new_order_button"
              className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 self-start"
            >
              <Link to="/order">
                <Wifi className="w-4 h-4" /> New Order
              </Link>
            </Button>
          </div>

          {/* Orders list */}
          {isLoading ? (
            <div className="space-y-4">
              {["l1", "l2", "l3"].map((k) => (
                <Skeleton key={k} className="h-28 w-full rounded-xl" />
              ))}
            </div>
          ) : (orders ?? []).length === 0 ? (
            <div
              className="text-center py-20 border border-dashed border-border/60 rounded-xl bg-muted/20"
              data-ocid="dashboard.empty_state"
            >
              <div className="inline-flex w-12 h-12 rounded-full bg-muted items-center justify-center mb-4">
                <Package className="w-6 h-6 text-muted-foreground" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">
                No orders yet
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Your first 7EVEN NFC card order will appear here.
              </p>
              <Button
                asChild
                data-ocid="dashboard.first_order_button"
                className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
              >
                <Link to="/order">
                  Order Your Cards <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4" data-ocid="dashboard.orders_list">
              {(orders ?? []).map((order, i) => (
                <OrderCard key={order.id.toString()} order={order} index={i} />
              ))}
            </div>
          )}

          {/* Pending note */}
          {(orders ?? []).some(
            (o) => "pending" in o.status || "processing" in o.status,
          ) && (
            <div className="mt-6 flex items-start gap-3 p-4 rounded-lg bg-accent/10 border border-accent/20">
              <Clock className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                Orders typically ship within 3–5 business days. You'll receive
                tracking information via email.
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
