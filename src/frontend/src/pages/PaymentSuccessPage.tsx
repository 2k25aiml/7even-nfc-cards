import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, Package, Wifi, XCircle } from "lucide-react";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import Layout from "../components/Layout";
import { useConfirmOrderPayment } from "../hooks/useOrders";

export default function PaymentSuccessPage() {
  const searchParams = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : "",
  );
  const orderIdParam = searchParams.get("orderId");
  const sessionId = searchParams.get("session_id") ?? "";

  const confirmPayment = useConfirmOrderPayment();
  const confirmed = useRef(false);

  const { mutate: confirmMutate } = confirmPayment;

  useEffect(() => {
    if (!orderIdParam || confirmed.current) return;
    confirmed.current = true;

    const orderId = BigInt(orderIdParam);
    confirmMutate(
      { orderId, intentId: sessionId },
      {
        onError: () => {
          toast.error("Could not confirm payment. Please contact support.");
        },
      },
    );
  }, [orderIdParam, sessionId, confirmMutate]);

  const isPending = confirmPayment.isPending;
  const isError = confirmPayment.isError;

  return (
    <Layout>
      <section
        className="min-h-[70vh] flex items-center justify-center py-16"
        data-ocid="payment_success.section"
      >
        <div className="container mx-auto px-4 text-center max-w-lg">
          {isPending ? (
            <>
              <Skeleton className="w-16 h-16 rounded-full mx-auto mb-6" />
              <Skeleton className="w-48 h-8 mx-auto mb-4" />
              <Skeleton className="w-72 h-5 mx-auto mb-2" />
              <Skeleton className="w-56 h-5 mx-auto" />
            </>
          ) : isError ? (
            <>
              <div className="inline-flex w-16 h-16 rounded-full bg-destructive/15 border border-destructive/30 items-center justify-center mb-6">
                <XCircle className="w-8 h-8 text-destructive" />
              </div>
              <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
                Confirmation Failed
              </h1>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Your payment was received but we couldn't confirm your order.
                Please contact support with your order reference.
              </p>
              <Button
                asChild
                data-ocid="payment_success.dashboard_button"
                className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
              >
                <Link to="/dashboard">
                  <Package className="w-4 h-4" /> View My Orders
                </Link>
              </Button>
            </>
          ) : (
            <>
              <div className="inline-flex w-16 h-16 rounded-full bg-chart-3/15 border border-chart-3/30 items-center justify-center mb-6">
                <CheckCircle2 className="w-8 h-8 text-chart-3" />
              </div>
              <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
                Order Confirmed!
              </h1>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Your 7EVEN NFC cards are being prepared. You'll receive an email
                confirmation with your order details and tracking information
                once shipped.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  asChild
                  data-ocid="payment_success.dashboard_button"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
                >
                  <Link to="/dashboard">
                    <Package className="w-4 h-4" /> View My Orders
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  data-ocid="payment_success.home_button"
                  className="gap-2"
                >
                  <Link to="/">
                    <Wifi className="w-4 h-4" /> Back to Home
                  </Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}
