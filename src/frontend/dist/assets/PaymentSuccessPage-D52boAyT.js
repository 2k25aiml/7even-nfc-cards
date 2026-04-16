import { r as reactExports, j as jsxRuntimeExports, S as Skeleton, L as Link } from "./index-BCepy_kX.js";
import { c as createLucideIcon, L as Layout, B as Button, W as Wifi } from "./Layout-CES_Nuqd.js";
import { e as useConfirmOrderPayment, b as ue } from "./useOrders-CTSNl2XT.js";
import { C as CircleX } from "./circle-x-BQvEFdqz.js";
import { P as Package } from "./package-CnqBesIe.js";
import "./backend-DHItWJrm.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode);
function PaymentSuccessPage() {
  const searchParams = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  );
  const orderIdParam = searchParams.get("orderId");
  const sessionId = searchParams.get("session_id") ?? "";
  const confirmPayment = useConfirmOrderPayment();
  const confirmed = reactExports.useRef(false);
  const { mutate: confirmMutate } = confirmPayment;
  reactExports.useEffect(() => {
    if (!orderIdParam || confirmed.current) return;
    confirmed.current = true;
    const orderId = BigInt(orderIdParam);
    confirmMutate(
      { orderId, intentId: sessionId },
      {
        onError: () => {
          ue.error("Could not confirm payment. Please contact support.");
        }
      }
    );
  }, [orderIdParam, sessionId, confirmMutate]);
  const isPending = confirmPayment.isPending;
  const isError = confirmPayment.isError;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      className: "min-h-[70vh] flex items-center justify-center py-16",
      "data-ocid": "payment_success.section",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 text-center max-w-lg", children: isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-16 h-16 rounded-full mx-auto mb-6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-48 h-8 mx-auto mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-72 h-5 mx-auto mb-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-56 h-5 mx-auto" })
      ] }) : isError ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex w-16 h-16 rounded-full bg-destructive/15 border border-destructive/30 items-center justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-8 h-8 text-destructive" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl md:text-4xl text-foreground mb-4", children: "Confirmation Failed" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8 leading-relaxed", children: "Your payment was received but we couldn't confirm your order. Please contact support with your order reference." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            asChild: true,
            "data-ocid": "payment_success.dashboard_button",
            className: "bg-primary text-primary-foreground hover:bg-primary/90 gap-2",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4" }),
              " View My Orders"
            ] })
          }
        )
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex w-16 h-16 rounded-full bg-chart-3/15 border border-chart-3/30 items-center justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-8 h-8 text-chart-3" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl md:text-4xl text-foreground mb-4", children: "Order Confirmed!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8 leading-relaxed", children: "Your 7EVEN NFC cards are being prepared. You'll receive an email confirmation with your order details and tracking information once shipped." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              "data-ocid": "payment_success.dashboard_button",
              className: "bg-primary text-primary-foreground hover:bg-primary/90 gap-2",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4" }),
                " View My Orders"
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              asChild: true,
              "data-ocid": "payment_success.home_button",
              className: "gap-2",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { className: "w-4 h-4" }),
                " Back to Home"
              ] })
            }
          )
        ] })
      ] }) })
    }
  ) });
}
export {
  PaymentSuccessPage as default
};
