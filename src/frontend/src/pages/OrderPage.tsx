import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Check, ChevronLeft, ChevronRight, LogIn, Wifi } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import Layout from "../components/Layout";
import { useCreateCheckoutSession, useCreateOrder } from "../hooks/useOrders";
import { useTemplates } from "../hooks/useTemplates";
import type { CardDetails, OrderQuantity, SocialLinks } from "../types";
import { quantityLabel, quantityPrice } from "../types";

const STEPS = ["Template", "Your Details", "Review & Pay"] as const;

const QUANTITIES: { key: string; qty: OrderQuantity }[] = [
  { key: "q100", qty: { q100: null } },
  { key: "q500", qty: { q500: null } },
  { key: "q1000", qty: { q1000: null } },
  { key: "q2000", qty: { q2000: null } },
];

const emptyCardDetails = (): CardDetails => ({
  name: "",
  jobTitle: "",
  company: "",
  phone: "",
  email: "",
  website: "",
  socialLinks: { linkedin: "", twitter: "", instagram: "" },
  customMessage: "",
});

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {STEPS.map((label, i) => (
        <div key={label} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border-2 transition-smooth ${
                i < current
                  ? "bg-primary border-primary text-primary-foreground"
                  : i === current
                    ? "border-primary text-primary bg-primary/10"
                    : "border-border/60 text-muted-foreground"
              }`}
            >
              {i < current ? <Check className="w-4 h-4" /> : i + 1}
            </div>
            <span
              className={`text-xs mt-1.5 font-medium hidden sm:block ${
                i === current ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={`w-16 md:w-24 h-0.5 mx-2 mb-4 sm:mb-0 transition-smooth ${
                i < current ? "bg-primary" : "bg-border/60"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// Step 1: Template & Quantity
function StepTemplate({
  selectedId,
  onSelect,
  selectedQty,
  onQtySelect,
  onNext,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
  selectedQty: OrderQuantity;
  onQtySelect: (q: OrderQuantity) => void;
  onNext: () => void;
}) {
  const { data: templates, isLoading } = useTemplates();

  return (
    <div>
      <h2 className="font-display font-bold text-xl text-foreground mb-1">
        Choose a Template
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        Pick the design that best represents your brand.
      </p>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {["t1", "t2", "t3", "t4", "t5", "t6"].map((k) => (
            <Skeleton key={k} className="aspect-[3/2] rounded-xl" />
          ))}
        </div>
      ) : (
        <div
          className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8"
          data-ocid="order.template_grid"
        >
          {(templates ?? []).map((tpl, i) => (
            <button
              key={tpl.id.toString()}
              type="button"
              onClick={() => onSelect(tpl.id.toString())}
              data-ocid={`order.template_item.${i + 1}`}
              className={`group rounded-xl border-2 overflow-hidden text-left transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                selectedId === tpl.id.toString()
                  ? "border-primary shadow-card-hover"
                  : "border-border/50 hover:border-accent/50"
              }`}
            >
              <div className="aspect-[3/2] overflow-hidden bg-muted/50 relative">
                <img
                  src={tpl.previewImageUrl}
                  alt={tpl.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/assets/generated/nfc-hero.dim_1200x700.jpg";
                  }}
                />
                {selectedId === tpl.id.toString() && (
                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-primary-foreground" />
                  </div>
                )}
              </div>
              <div className="p-3 bg-card">
                <p className="font-display font-semibold text-xs text-foreground">
                  {tpl.name}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Quantity */}
      <h3 className="font-display font-semibold text-base text-foreground mb-3">
        Select Quantity
      </h3>
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8"
        data-ocid="order.quantity_grid"
      >
        {QUANTITIES.map(({ key, qty }) => {
          const isSelected =
            JSON.stringify(qty) === JSON.stringify(selectedQty);
          const price = quantityPrice(qty);
          const qtyIndex = QUANTITIES.findIndex((q) => q.key === key) + 1;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onQtySelect(qty)}
              data-ocid={`order.quantity_item.${qtyIndex}`}
              className={`p-4 rounded-xl border-2 text-center transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                isSelected
                  ? "border-primary bg-primary/10"
                  : "border-border/50 hover:border-accent/40 bg-card"
              }`}
            >
              <p className="font-display font-bold text-lg text-foreground">
                ${(price / 100).toFixed(0)}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {quantityLabel(qty)}
              </p>
            </button>
          );
        })}
      </div>

      <Button
        onClick={onNext}
        disabled={!selectedId}
        data-ocid="order.template_next_button"
        className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
      >
        Continue <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}

// Step 2: Card Details
function StepDetails({
  details,
  onChange,
  onNext,
  onBack,
}: {
  details: CardDetails;
  onChange: (d: CardDetails) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const update = (field: keyof CardDetails, value: string) =>
    onChange({ ...details, [field]: value });
  const updateSocial = (field: keyof SocialLinks, value: string) =>
    onChange({
      ...details,
      socialLinks: { ...details.socialLinks, [field]: value },
    });

  const isValid =
    details.name.trim() &&
    details.jobTitle.trim() &&
    details.company.trim() &&
    details.phone.trim() &&
    details.email.trim();

  return (
    <div>
      <h2 className="font-display font-bold text-xl text-foreground mb-1">
        Your Card Details
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        This information will be programmed onto your NFC card.
      </p>

      <div className="space-y-6">
        {/* Personal Info */}
        <div className="p-5 rounded-xl bg-muted/30 border border-border/50 space-y-4">
          <h3 className="font-display font-semibold text-sm text-foreground">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-xs mb-1.5 block">
                Full Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Alex Johnson"
                value={details.name}
                onChange={(e) => update("name", e.target.value)}
                data-ocid="order.name_input"
                className="bg-background border-border/60"
              />
            </div>
            <div>
              <Label htmlFor="jobTitle" className="text-xs mb-1.5 block">
                Job Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="jobTitle"
                placeholder="Product Designer"
                value={details.jobTitle}
                onChange={(e) => update("jobTitle", e.target.value)}
                data-ocid="order.jobtitle_input"
                className="bg-background border-border/60"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="company" className="text-xs mb-1.5 block">
              Company <span className="text-destructive">*</span>
            </Label>
            <Input
              id="company"
              placeholder="Acme Corp"
              value={details.company}
              onChange={(e) => update("company", e.target.value)}
              data-ocid="order.company_input"
              className="bg-background border-border/60"
            />
          </div>
        </div>

        {/* Contact Info */}
        <div className="p-5 rounded-xl bg-muted/30 border border-border/50 space-y-4">
          <h3 className="font-display font-semibold text-sm text-foreground">
            Contact Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone" className="text-xs mb-1.5 block">
                Phone <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 555 000 0000"
                value={details.phone}
                onChange={(e) => update("phone", e.target.value)}
                data-ocid="order.phone_input"
                className="bg-background border-border/60"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-xs mb-1.5 block">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="alex@acme.com"
                value={details.email}
                onChange={(e) => update("email", e.target.value)}
                data-ocid="order.email_input"
                className="bg-background border-border/60"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="website" className="text-xs mb-1.5 block">
              Website <span className="text-muted-foreground">(optional)</span>
            </Label>
            <Input
              id="website"
              type="url"
              placeholder="https://alexjohnson.com"
              value={details.website ?? ""}
              onChange={(e) => update("website", e.target.value)}
              data-ocid="order.website_input"
              className="bg-background border-border/60"
            />
          </div>
        </div>

        {/* Social Links */}
        <div className="p-5 rounded-xl bg-muted/30 border border-border/50 space-y-4">
          <h3 className="font-display font-semibold text-sm text-foreground">
            Social Links{" "}
            <span className="text-muted-foreground font-normal text-xs">
              (optional)
            </span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="linkedin" className="text-xs mb-1.5 block">
                LinkedIn
              </Label>
              <Input
                id="linkedin"
                placeholder="linkedin.com/in/alex"
                value={details.socialLinks.linkedin ?? ""}
                onChange={(e) => updateSocial("linkedin", e.target.value)}
                data-ocid="order.linkedin_input"
                className="bg-background border-border/60"
              />
            </div>
            <div>
              <Label htmlFor="twitter" className="text-xs mb-1.5 block">
                Twitter / X
              </Label>
              <Input
                id="twitter"
                placeholder="@alexjohnson"
                value={details.socialLinks.twitter ?? ""}
                onChange={(e) => updateSocial("twitter", e.target.value)}
                data-ocid="order.twitter_input"
                className="bg-background border-border/60"
              />
            </div>
            <div>
              <Label htmlFor="instagram" className="text-xs mb-1.5 block">
                Instagram
              </Label>
              <Input
                id="instagram"
                placeholder="@alexjohnson"
                value={details.socialLinks.instagram ?? ""}
                onChange={(e) => updateSocial("instagram", e.target.value)}
                data-ocid="order.instagram_input"
                className="bg-background border-border/60"
              />
            </div>
          </div>
        </div>

        {/* Custom Message */}
        <div className="p-5 rounded-xl bg-muted/30 border border-border/50 space-y-3">
          <h3 className="font-display font-semibold text-sm text-foreground">
            Custom Message{" "}
            <span className="text-muted-foreground font-normal text-xs">
              (optional)
            </span>
          </h3>
          <Textarea
            placeholder="A short tagline or message shown when your card is tapped…"
            value={details.customMessage ?? ""}
            onChange={(e) => update("customMessage", e.target.value)}
            rows={3}
            maxLength={160}
            data-ocid="order.custom_message_textarea"
            className="bg-background border-border/60 resize-none"
          />
          <p className="text-xs text-muted-foreground text-right">
            {(details.customMessage ?? "").length}/160
          </p>
        </div>
      </div>

      <div className="flex gap-3 mt-8">
        <Button
          variant="outline"
          onClick={onBack}
          data-ocid="order.details_back_button"
          className="gap-2"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </Button>
        <Button
          onClick={onNext}
          disabled={!isValid}
          data-ocid="order.details_next_button"
          className="flex-1 sm:flex-none bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
        >
          Review Order <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

// Step 3: Review & Submit
function StepReview({
  details,
  selectedId,
  selectedQty,
  onBack,
  onSubmit,
  isSubmitting,
}: {
  details: CardDetails;
  selectedId: string;
  selectedQty: OrderQuantity;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}) {
  const { data: templates } = useTemplates();
  const template = (templates ?? []).find(
    (t) => t.id.toString() === selectedId,
  );
  const price = quantityPrice(selectedQty);

  const rows: { label: string; value: string }[] = [
    { label: "Name", value: details.name },
    { label: "Job Title", value: details.jobTitle },
    { label: "Company", value: details.company },
    { label: "Phone", value: details.phone },
    { label: "Email", value: details.email },
    ...(details.website ? [{ label: "Website", value: details.website }] : []),
    ...(details.socialLinks.linkedin
      ? [{ label: "LinkedIn", value: details.socialLinks.linkedin }]
      : []),
    ...(details.socialLinks.twitter
      ? [{ label: "Twitter", value: details.socialLinks.twitter }]
      : []),
    ...(details.socialLinks.instagram
      ? [{ label: "Instagram", value: details.socialLinks.instagram }]
      : []),
    ...(details.customMessage
      ? [{ label: "Message", value: details.customMessage }]
      : []),
  ];

  return (
    <div>
      <h2 className="font-display font-bold text-xl text-foreground mb-1">
        Review Your Order
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        Please confirm your details before proceeding to payment.
      </p>

      <div className="space-y-5">
        {/* Template + Qty summary */}
        <Card className="bg-card border-border/60 p-5">
          <div className="flex items-start gap-4">
            {template && (
              <img
                src={template.previewImageUrl}
                alt={template.name}
                className="w-20 h-14 object-cover rounded-lg flex-shrink-0"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "/assets/generated/nfc-hero.dim_1200x700.jpg";
                }}
              />
            )}
            <div className="flex-1 min-w-0">
              <p className="font-display font-semibold text-sm text-foreground">
                {template?.name ?? "Template"}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {quantityLabel(selectedQty)}
              </p>
              <p className="font-bold text-primary mt-2">
                ${(price / 100).toFixed(2)}
              </p>
            </div>
            <Badge
              variant="outline"
              className="border-accent/40 text-accent text-xs flex-shrink-0"
            >
              <Wifi className="w-3 h-3 mr-1" /> NFC
            </Badge>
          </div>
        </Card>

        {/* Card details */}
        <Card className="bg-card border-border/60 p-5">
          <h3 className="font-display font-semibold text-sm text-foreground mb-3">
            Card Details
          </h3>
          <div className="space-y-2.5">
            {rows.map(({ label, value }) => (
              <div key={label} className="flex gap-3 text-sm">
                <span className="text-muted-foreground w-24 flex-shrink-0 text-xs mt-0.5">
                  {label}
                </span>
                <span className="text-foreground text-xs break-words min-w-0">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="flex gap-3 mt-8">
        <Button
          variant="outline"
          onClick={onBack}
          disabled={isSubmitting}
          data-ocid="order.review_back_button"
          className="gap-2"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </Button>
        <Button
          onClick={onSubmit}
          disabled={isSubmitting}
          data-ocid="order.submit_button"
          className="flex-1 sm:flex-none bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
        >
          {isSubmitting ? "Processing…" : `Pay $${(price / 100).toFixed(2)}`}
          {!isSubmitting && <ChevronRight className="w-4 h-4" />}
        </Button>
      </div>
    </div>
  );
}

export default function OrderPage() {
  const { isAuthenticated, login, isLoggingIn, isInitializing } =
    useInternetIdentity();
  const searchParams = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : "",
  );
  const initialTemplateId = searchParams.get("templateId") ?? "";

  const [step, setStep] = useState(0);
  const [selectedTemplateId, setSelectedTemplateId] =
    useState<string>(initialTemplateId);
  const [selectedQty, setSelectedQty] = useState<OrderQuantity>({ q100: null });
  const [cardDetails, setCardDetails] = useState<CardDetails>(
    emptyCardDetails(),
  );

  const createOrder = useCreateOrder();
  const createCheckoutSession = useCreateCheckoutSession();

  const handleSubmit = async () => {
    if (!selectedTemplateId) return;
    try {
      // Step 1: create the order in the backend
      const order = await createOrder.mutateAsync({
        cardDetails,
        templateId: BigInt(selectedTemplateId),
        quantity: selectedQty,
      });

      const price = quantityPrice(selectedQty);
      const shoppingItems = [
        {
          currency: "usd",
          productName: "7EVEN NFC Card",
          productDescription: `${quantityLabel(selectedQty)} — ${cardDetails.name}`,
          priceInCents: BigInt(price),
          quantity: BigInt(1),
        },
      ];

      // Step 2: create a Stripe checkout session and redirect
      const session = await createCheckoutSession.mutateAsync({
        items: shoppingItems,
        orderId: order.id,
      });

      // Redirect to Stripe-hosted checkout (never use router.navigate for external URLs)
      window.location.href = session.url;
    } catch (_err) {
      toast.error("Failed to initiate payment. Please try again.");
    }
  };

  const isSubmitting = createOrder.isPending || createCheckoutSession.isPending;

  if (isInitializing) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 max-w-2xl">
          <Skeleton className="w-48 h-8 mb-6" />
          <Skeleton className="w-full h-64 rounded-xl" />
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated) {
    return (
      <Layout>
        <section
          className="min-h-[70vh] flex items-center justify-center py-16"
          data-ocid="order.unauthenticated.section"
        >
          <div className="container mx-auto px-4 text-center max-w-md">
            <div className="inline-flex w-14 h-14 rounded-xl bg-primary/10 border border-primary/30 items-center justify-center mb-6">
              <LogIn className="w-7 h-7 text-primary" />
            </div>
            <h1 className="font-display font-bold text-2xl text-foreground mb-3">
              Sign in to order
            </h1>
            <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
              Create your account to design and order your personalised 7EVEN
              NFC card.
            </p>
            <Button
              onClick={login}
              disabled={isLoggingIn}
              data-ocid="order.signin_button"
              className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
            >
              <LogIn className="w-4 h-4" />
              {isLoggingIn ? "Signing in…" : "Sign In / Sign Up"}
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-12" data-ocid="order.section">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="mb-8">
            <h1 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-1">
              Order NFC Cards
            </h1>
            <p className="text-muted-foreground text-sm">
              Complete the steps below to customise and order your cards.
            </p>
          </div>

          <StepIndicator current={step} />

          <Card className="bg-card border-border/60 p-6 md:p-8">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="step0"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <StepTemplate
                    selectedId={selectedTemplateId}
                    onSelect={setSelectedTemplateId}
                    selectedQty={selectedQty}
                    onQtySelect={setSelectedQty}
                    onNext={() => setStep(1)}
                  />
                </motion.div>
              )}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <StepDetails
                    details={cardDetails}
                    onChange={setCardDetails}
                    onNext={() => setStep(2)}
                    onBack={() => setStep(0)}
                  />
                </motion.div>
              )}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <StepReview
                    details={cardDetails}
                    selectedId={selectedTemplateId}
                    selectedQty={selectedQty}
                    onBack={() => setStep(1)}
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
