import { j as jsxRuntimeExports, L as Link, S as Skeleton } from "./index-BCepy_kX.js";
import { m as motion, B as Badge, C as Card } from "./proxy-B6FKFCq1.js";
import { c as createLucideIcon, L as Layout, W as Wifi, B as Button } from "./Layout-CES_Nuqd.js";
import { u as useTemplates, C as Check } from "./useTemplates--d8b-E5b.js";
import { A as ArrowRight } from "./arrow-right-CGSDeE97.js";
import "./backend-DHItWJrm.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "14", height: "20", x: "5", y: "2", rx: "2", ry: "2", key: "1yt0o3" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }]
];
const Smartphone = createLucideIcon("smartphone", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
const FEATURES = [
  {
    icon: Wifi,
    title: "One Tap Connection",
    desc: "Instantly share your contact info with any NFC-enabled smartphone — no app required."
  },
  {
    icon: Zap,
    title: "Always Up-to-Date",
    desc: "Update your info anytime. Your card's content changes instantly without reprinting."
  },
  {
    icon: Shield,
    title: "Premium Durability",
    desc: "Metal and PVC options built to last. Water-resistant, scratch-proof, card-sized."
  },
  {
    icon: Smartphone,
    title: "Works Everywhere",
    desc: "Compatible with iOS and Android. No special apps or QR code scanning needed."
  }
];
const PRICING = [
  { label: "100 cards", price: "$49", per: "$0.49/card", highlight: false },
  { label: "500 cards", price: "$199", per: "$0.40/card", highlight: true },
  { label: "1,000 cards", price: "$349", per: "$0.35/card", highlight: false },
  { label: "2,000 cards", price: "$599", per: "$0.30/card", highlight: false }
];
function HomePage() {
  const { data: templates, isLoading: templatesLoading } = useTemplates();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative min-h-[90vh] flex items-center justify-center overflow-hidden",
        "data-ocid": "hero.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 bg-cover bg-center bg-no-repeat",
              style: {
                backgroundImage: "url('/assets/generated/nfc-hero.dim_1200x700.jpg')"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-background/70 backdrop-blur-[2px]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(var(--primary)/0.15)_0%,transparent_70%)]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative container mx-auto px-4 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 24 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.6, ease: "easeOut" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Badge,
                  {
                    variant: "outline",
                    className: "mb-6 border-accent/50 text-accent bg-accent/10 px-4 py-1.5 text-xs font-medium tracking-wider uppercase",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { className: "w-3 h-3 mr-2" }),
                      "Premium NFC Business Cards"
                    ]
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.h1,
              {
                initial: { opacity: 0, y: 32 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.7, delay: 0.1, ease: "easeOut" },
                className: "font-display font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight text-foreground leading-[1.05] mb-6",
                children: [
                  "Your Network,",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary text-accent-glow", children: "One Tap" }),
                  " Away"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.p,
              {
                initial: { opacity: 0, y: 24 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.6, delay: 0.2, ease: "easeOut" },
                className: "text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed",
                children: "7EVEN NFC cards let you share your full contact, portfolio, and social links instantly. No paper, no printing, no waste — just a single tap."
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5, delay: 0.35, ease: "easeOut" },
                className: "flex flex-col sm:flex-row gap-4 justify-center items-center",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "lg",
                      asChild: true,
                      "data-ocid": "hero.order_cta_button",
                      className: "bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 text-base font-semibold gap-2 transition-smooth",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/order", children: [
                        "Order Your Card ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
                      ] })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "lg",
                      variant: "outline",
                      asChild: true,
                      "data-ocid": "hero.templates_cta_button",
                      className: "border-border/60 hover:border-accent/50 hover:text-accent h-12 px-8 text-base transition-smooth",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#templates", children: "View Templates" })
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { duration: 0.6, delay: 0.55 },
                className: "mt-16 flex flex-wrap justify-center gap-8",
                children: [
                  { value: "10,000+", label: "Cards Delivered" },
                  { value: "6 Templates", label: "To Choose From" },
                  { value: "Instant", label: "NFC Sharing" }
                ].map(({ value, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-2xl text-foreground", children: value }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: label })
                ] }, label))
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 bg-muted/30", "data-ocid": "features.section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5 },
          className: "text-center mb-14",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl md:text-4xl text-foreground mb-4", children: "Why 7EVEN?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-xl mx-auto", children: "The smartest way to network. Premium cards, backed by cutting-edge NFC technology." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: FEATURES.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5, delay: i * 0.1 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border/60 p-6 h-full hover:border-primary/40 hover:shadow-card-hover transition-smooth group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(f.icon, { className: "w-5 h-5 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-base text-foreground mb-2", children: f.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: f.desc })
          ] })
        },
        f.title
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        id: "templates",
        className: "py-24 bg-background",
        "data-ocid": "templates.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.5 },
              className: "text-center mb-14",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl md:text-4xl text-foreground mb-4", children: "Choose Your Style" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-xl mx-auto", children: "6 premium templates crafted for professionals who mean business. Pick your look, personalise your details." })
              ]
            }
          ),
          templatesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-5", children: ["s1", "s2", "s3", "s4", "s5", "s6"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-[3/2] rounded-xl" }, k)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-2 md:grid-cols-3 gap-5",
              "data-ocid": "templates.list",
              children: (templates ?? []).map((tpl, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.96 },
                  whileInView: { opacity: 1, scale: 1 },
                  viewport: { once: true },
                  transition: { duration: 0.4, delay: i * 0.07 },
                  "data-ocid": `templates.item.${i + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/order", search: { templateId: tpl.id.toString() }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "group overflow-hidden bg-card border-border/60 hover:border-accent/50 hover:shadow-card-hover transition-smooth cursor-pointer", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[3/2] overflow-hidden bg-muted/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: tpl.previewImageUrl,
                        alt: tpl.name,
                        className: "w-full h-full object-cover group-hover:scale-105 transition-smooth",
                        onError: (e) => {
                          e.target.src = "/assets/generated/nfc-hero.dim_1200x700.jpg";
                        }
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground mb-1", children: tpl.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2", children: tpl.description }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-accent mt-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-smooth", children: [
                        "Select template ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
                      ] })
                    ] })
                  ] }) })
                },
                tpl.id.toString()
              ))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mt-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "lg",
              asChild: true,
              "data-ocid": "templates.order_cta_button",
              className: "bg-primary text-primary-foreground hover:bg-primary/90 gap-2",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/order", children: [
                "Customise & Order ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
              ] })
            }
          ) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 bg-muted/30", "data-ocid": "pricing.section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5 },
          className: "text-center mb-14",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl md:text-4xl text-foreground mb-4", children: "Simple, Transparent Pricing" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-xl mx-auto", children: "Order as few or as many as you need. Volume discounts applied automatically." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-4xl mx-auto", children: PRICING.map((tier, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.45, delay: i * 0.08 },
          "data-ocid": `pricing.item.${i + 1}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Card,
            {
              className: `p-6 h-full flex flex-col items-center text-center border transition-smooth ${tier.highlight ? "border-primary/60 bg-primary/10 shadow-card-hover" : "border-border/60 bg-card hover:border-primary/30"}`,
              children: [
                tier.highlight && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "mb-3 bg-primary/20 text-primary border-primary/30 text-xs", children: "Most Popular" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-3xl text-foreground", children: tier.price }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: tier.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-accent mt-2", children: tier.per }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-4 text-xs text-muted-foreground space-y-1.5 flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3 h-3 text-accent flex-shrink-0" }),
                    " ",
                    "Full customisation"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3 h-3 text-accent flex-shrink-0" }),
                    " ",
                    "All templates"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3 h-3 text-accent flex-shrink-0" }),
                    " ",
                    "NFC enabled"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    asChild: true,
                    className: "mt-5 w-full bg-primary text-primary-foreground hover:bg-primary/90",
                    "data-ocid": `pricing.order_button.${i + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/order", children: "Order Now" })
                  }
                )
              ]
            }
          )
        },
        tier.label
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 bg-background", "data-ocid": "cta.section", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 },
        className: "max-w-2xl mx-auto",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex w-14 h-14 rounded-xl bg-accent/10 border border-accent/30 items-center justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { className: "w-7 h-7 text-accent" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl md:text-4xl text-foreground mb-4", children: "Ready to make every tap count?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8", children: "Join thousands of professionals who've upgraded their networking with 7EVEN." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "lg",
              asChild: true,
              "data-ocid": "cta.order_button",
              className: "bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-10 text-base font-semibold gap-2",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/order", children: [
                "Get Started Today ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
              ] })
            }
          )
        ]
      }
    ) }) })
  ] });
}
export {
  HomePage as default
};
