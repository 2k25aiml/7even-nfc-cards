import { j as jsxRuntimeExports, L as Link } from "./index-BCepy_kX.js";
import { c as createLucideIcon, L as Layout, B as Button } from "./Layout-CES_Nuqd.js";
import { C as CircleX } from "./circle-x-BQvEFdqz.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode);
function PaymentFailurePage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      className: "min-h-[70vh] flex items-center justify-center py-16",
      "data-ocid": "payment_failure.section",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 text-center max-w-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex w-16 h-16 rounded-full bg-destructive/15 border border-destructive/30 items-center justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-8 h-8 text-destructive" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl md:text-4xl text-foreground mb-4", children: "Payment Failed" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8 leading-relaxed", children: "Your payment could not be processed. No charges were made. Please try again or contact support if the issue persists." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              "data-ocid": "payment_failure.retry_button",
              className: "bg-primary text-primary-foreground hover:bg-primary/90 gap-2",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/order", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
                " Try Again"
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              asChild: true,
              "data-ocid": "payment_failure.home_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: "Back to Home" })
            }
          )
        ] })
      ] })
    }
  ) });
}
export {
  PaymentFailurePage as default
};
