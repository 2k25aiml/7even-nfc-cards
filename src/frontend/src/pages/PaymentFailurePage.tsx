import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { RefreshCw, XCircle } from "lucide-react";
import Layout from "../components/Layout";

export default function PaymentFailurePage() {
  return (
    <Layout>
      <section
        className="min-h-[70vh] flex items-center justify-center py-16"
        data-ocid="payment_failure.section"
      >
        <div className="container mx-auto px-4 text-center max-w-lg">
          <div className="inline-flex w-16 h-16 rounded-full bg-destructive/15 border border-destructive/30 items-center justify-center mb-6">
            <XCircle className="w-8 h-8 text-destructive" />
          </div>
          <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
            Payment Failed
          </h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Your payment could not be processed. No charges were made. Please
            try again or contact support if the issue persists.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              asChild
              data-ocid="payment_failure.retry_button"
              className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
            >
              <Link to="/order">
                <RefreshCw className="w-4 h-4" /> Try Again
              </Link>
            </Button>
            <Button
              variant="outline"
              asChild
              data-ocid="payment_failure.home_button"
            >
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
