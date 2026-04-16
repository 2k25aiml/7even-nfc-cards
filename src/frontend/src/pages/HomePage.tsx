import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Shield, Smartphone, Wifi, Zap } from "lucide-react";
import { motion } from "motion/react";
import Layout from "../components/Layout";
import { useTemplates } from "../hooks/useTemplates";

const FEATURES = [
  {
    icon: Wifi,
    title: "One Tap Connection",
    desc: "Instantly share your contact info with any NFC-enabled smartphone — no app required.",
  },
  {
    icon: Zap,
    title: "Always Up-to-Date",
    desc: "Update your info anytime. Your card's content changes instantly without reprinting.",
  },
  {
    icon: Shield,
    title: "Premium Durability",
    desc: "Metal and PVC options built to last. Water-resistant, scratch-proof, card-sized.",
  },
  {
    icon: Smartphone,
    title: "Works Everywhere",
    desc: "Compatible with iOS and Android. No special apps or QR code scanning needed.",
  },
];

const PRICING = [
  { label: "100 cards", price: "$49", per: "$0.49/card", highlight: false },
  { label: "500 cards", price: "$199", per: "$0.40/card", highlight: true },
  { label: "1,000 cards", price: "$349", per: "$0.35/card", highlight: false },
  { label: "2,000 cards", price: "$599", per: "$0.30/card", highlight: false },
];

export default function HomePage() {
  const { data: templates, isLoading: templatesLoading } = useTemplates();

  return (
    <Layout>
      {/* Hero */}
      <section
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
        data-ocid="hero.section"
      >
        {/* Background image with overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('/assets/generated/nfc-hero.dim_1200x700.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-background/70 backdrop-blur-[2px]" />
        {/* Radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(var(--primary)/0.15)_0%,transparent_70%)]" />

        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Badge
              variant="outline"
              className="mb-6 border-accent/50 text-accent bg-accent/10 px-4 py-1.5 text-xs font-medium tracking-wider uppercase"
            >
              <Wifi className="w-3 h-3 mr-2" />
              Premium NFC Business Cards
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="font-display font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight text-foreground leading-[1.05] mb-6"
          >
            Your Network,{" "}
            <span className="text-primary text-accent-glow">One Tap</span> Away
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            7EVEN NFC cards let you share your full contact, portfolio, and
            social links instantly. No paper, no printing, no waste — just a
            single tap.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              asChild
              data-ocid="hero.order_cta_button"
              className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 text-base font-semibold gap-2 transition-smooth"
            >
              <Link to="/order">
                Order Your Card <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              data-ocid="hero.templates_cta_button"
              className="border-border/60 hover:border-accent/50 hover:text-accent h-12 px-8 text-base transition-smooth"
            >
              <a href="#templates">View Templates</a>
            </Button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-16 flex flex-wrap justify-center gap-8"
          >
            {[
              { value: "10,000+", label: "Cards Delivered" },
              { value: "6 Templates", label: "To Choose From" },
              { value: "Instant", label: "NFC Sharing" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="font-display font-bold text-2xl text-foreground">
                  {value}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-muted/30" data-ocid="features.section">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
              Why 7EVEN?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              The smartest way to network. Premium cards, backed by cutting-edge
              NFC technology.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="bg-card border-border/60 p-6 h-full hover:border-primary/40 hover:shadow-card-hover transition-smooth group">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-smooth">
                    <f.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-base text-foreground mb-2">
                    {f.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {f.desc}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Preview */}
      <section
        id="templates"
        className="py-24 bg-background"
        data-ocid="templates.section"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
              Choose Your Style
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              6 premium templates crafted for professionals who mean business.
              Pick your look, personalise your details.
            </p>
          </motion.div>

          {templatesLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {["s1", "s2", "s3", "s4", "s5", "s6"].map((k) => (
                <Skeleton key={k} className="aspect-[3/2] rounded-xl" />
              ))}
            </div>
          ) : (
            <div
              className="grid grid-cols-2 md:grid-cols-3 gap-5"
              data-ocid="templates.list"
            >
              {(templates ?? []).map((tpl, i) => (
                <motion.div
                  key={tpl.id.toString()}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  data-ocid={`templates.item.${i + 1}`}
                >
                  <Link to="/order" search={{ templateId: tpl.id.toString() }}>
                    <Card className="group overflow-hidden bg-card border-border/60 hover:border-accent/50 hover:shadow-card-hover transition-smooth cursor-pointer">
                      <div className="aspect-[3/2] overflow-hidden bg-muted/50">
                        <img
                          src={tpl.previewImageUrl}
                          alt={tpl.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "/assets/generated/nfc-hero.dim_1200x700.jpg";
                          }}
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-display font-semibold text-sm text-foreground mb-1">
                          {tpl.name}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {tpl.description}
                        </p>
                        <p className="text-xs text-accent mt-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-smooth">
                          Select template <ArrowRight className="w-3 h-3" />
                        </p>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Button
              size="lg"
              asChild
              data-ocid="templates.order_cta_button"
              className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
            >
              <Link to="/order">
                Customise & Order <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-muted/30" data-ocid="pricing.section">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Order as few or as many as you need. Volume discounts applied
              automatically.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-4xl mx-auto">
            {PRICING.map((tier, i) => (
              <motion.div
                key={tier.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                data-ocid={`pricing.item.${i + 1}`}
              >
                <Card
                  className={`p-6 h-full flex flex-col items-center text-center border transition-smooth ${
                    tier.highlight
                      ? "border-primary/60 bg-primary/10 shadow-card-hover"
                      : "border-border/60 bg-card hover:border-primary/30"
                  }`}
                >
                  {tier.highlight && (
                    <Badge className="mb-3 bg-primary/20 text-primary border-primary/30 text-xs">
                      Most Popular
                    </Badge>
                  )}
                  <p className="font-display font-bold text-3xl text-foreground">
                    {tier.price}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {tier.label}
                  </p>
                  <p className="text-xs text-accent mt-2">{tier.per}</p>
                  <ul className="mt-4 text-xs text-muted-foreground space-y-1.5 flex-1">
                    <li className="flex items-center gap-2">
                      <Check className="w-3 h-3 text-accent flex-shrink-0" />{" "}
                      Full customisation
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3 h-3 text-accent flex-shrink-0" />{" "}
                      All templates
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3 h-3 text-accent flex-shrink-0" />{" "}
                      NFC enabled
                    </li>
                  </ul>
                  <Button
                    size="sm"
                    asChild
                    className="mt-5 w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    data-ocid={`pricing.order_button.${i + 1}`}
                  >
                    <Link to="/order">Order Now</Link>
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-background" data-ocid="cta.section">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <div className="inline-flex w-14 h-14 rounded-xl bg-accent/10 border border-accent/30 items-center justify-center mb-6">
              <Wifi className="w-7 h-7 text-accent" />
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
              Ready to make every tap count?
            </h2>
            <p className="text-muted-foreground mb-8">
              Join thousands of professionals who've upgraded their networking
              with 7EVEN.
            </p>
            <Button
              size="lg"
              asChild
              data-ocid="cta.order_button"
              className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-10 text-base font-semibold gap-2"
            >
              <Link to="/order">
                Get Started Today <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
