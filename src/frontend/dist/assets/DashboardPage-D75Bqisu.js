import { u as useInternetIdentity, j as jsxRuntimeExports, S as Skeleton, L as Link } from "./index-BCepy_kX.js";
import { m as motion, C as Card, B as Badge } from "./proxy-B6FKFCq1.js";
import { c as createLucideIcon, L as Layout, b as LogIn, B as Button, W as Wifi } from "./Layout-CES_Nuqd.js";
import { c as useOrders, d as useDuplicateOrder, b as ue } from "./useOrders-CTSNl2XT.js";
import { s as statusLabel, b as statusColor, a as quantityLabel } from "./types-vIsSv-YG.js";
import { P as Package } from "./package-CnqBesIe.js";
import { A as ArrowRight } from "./arrow-right-CGSDeE97.js";
import "./backend-DHItWJrm.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
];
const Copy = createLucideIcon("copy", __iconNode);
function OrderCard({ order, index }) {
  const duplicate = useDuplicateOrder();
  const handleDuplicate = () => {
    duplicate.mutate(order.id, {
      onSuccess: () => ue.success("Order duplicated!"),
      onError: () => ue.error("Failed to duplicate order")
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, delay: index * 0.07 },
      "data-ocid": `dashboard.order.item.${index + 1}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border/60 p-5 hover:border-primary/30 transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-sm text-foreground truncate", children: order.cardDetails.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: `text-xs border-current ${statusColor(order.status)}`,
                children: statusLabel(order.status)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mb-1", children: [
            order.cardDetails.company,
            " · ",
            order.cardDetails.jobTitle
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            quantityLabel(order.quantity),
            " · $",
            (Number(order.paymentAmountCents) / 100).toFixed(2)
          ] }),
          order.trackingNumber && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-accent mt-1.5 flex items-center gap-1", children: [
            "Tracking: ",
            order.trackingNumber
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "ghost",
            onClick: handleDuplicate,
            disabled: duplicate.isPending,
            "data-ocid": `dashboard.duplicate_button.${index + 1}`,
            className: "gap-1.5 text-xs",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3.5 h-3.5" }),
              "Reorder"
            ]
          }
        ) })
      ] }) })
    }
  );
}
function DashboardPage() {
  const { isAuthenticated, isInitializing, login, isLoggingIn } = useInternetIdentity();
  const { data: orders, isLoading } = useOrders();
  if (isInitializing) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-48 h-8 mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-full h-32 rounded-xl" })
    ] }) });
  }
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "min-h-[70vh] flex items-center justify-center py-16",
        "data-ocid": "dashboard.unauthenticated.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 text-center max-w-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex w-14 h-14 rounded-xl bg-primary/10 border border-primary/30 items-center justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-7 h-7 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground mb-3", children: "Sign in to view your orders" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8 text-sm leading-relaxed", children: "Access your order history, track deliveries, and reorder with one click." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: login,
              disabled: isLoggingIn,
              "data-ocid": "dashboard.signin_button",
              className: "bg-primary text-primary-foreground hover:bg-primary/90 gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-4 h-4" }),
                isLoggingIn ? "Signing in…" : "Sign In with Internet Identity"
              ]
            }
          )
        ] })
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-12", "data-ocid": "dashboard.section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl md:text-3xl text-foreground", children: "My Orders" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Manage and track your NFC card orders" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          asChild: true,
          "data-ocid": "dashboard.new_order_button",
          className: "bg-primary text-primary-foreground hover:bg-primary/90 gap-2 self-start",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/order", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { className: "w-4 h-4" }),
            " New Order"
          ] })
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: ["l1", "l2", "l3"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 w-full rounded-xl" }, k)) }) : (orders ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-20 border border-dashed border-border/60 rounded-xl bg-muted/20",
        "data-ocid": "dashboard.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex w-12 h-12 rounded-full bg-muted items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-6 h-6 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground mb-2", children: "No orders yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "Your first 7EVEN NFC card order will appear here." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              "data-ocid": "dashboard.first_order_button",
              className: "bg-primary text-primary-foreground hover:bg-primary/90 gap-2",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/order", children: [
                "Order Your Cards ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
              ] })
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", "data-ocid": "dashboard.orders_list", children: (orders ?? []).map((order, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(OrderCard, { order, index: i }, order.id.toString())) }),
    (orders ?? []).some(
      (o) => "pending" in o.status || "processing" in o.status
    ) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-start gap-3 p-4 rounded-lg bg-accent/10 border border-accent/20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-accent flex-shrink-0 mt-0.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: "Orders typically ship within 3–5 business days. You'll receive tracking information via email." })
    ] })
  ] }) }) });
}
export {
  DashboardPage as default
};
