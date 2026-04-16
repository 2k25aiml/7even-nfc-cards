import { r as reactExports, j as jsxRuntimeExports, c as cn, u as useInternetIdentity, S as Skeleton } from "./index-BCepy_kX.js";
import { M as MotionConfigContext, i as isHTMLElement, u as useConstant, P as PresenceContext, a as usePresence, b as useIsomorphicLayoutEffect, L as LayoutGroupContext, C as Card, m as motion, B as Badge } from "./proxy-B6FKFCq1.js";
import { c as createLucideIcon, a as createSlot, L as Layout, b as LogIn, B as Button, W as Wifi } from "./Layout-CES_Nuqd.js";
import { u as useCreateOrder, a as useCreateCheckoutSession, b as ue } from "./useOrders-CTSNl2XT.js";
import { C as Check, u as useTemplates } from "./useTemplates--d8b-E5b.js";
import { q as quantityPrice, a as quantityLabel } from "./types-vIsSv-YG.js";
import "./backend-DHItWJrm.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode);
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup === "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup === "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}
function useComposedRefs(...refs) {
  return reactExports.useCallback(composeRefs(...refs), refs);
}
class PopChildMeasure extends reactExports.Component {
  getSnapshotBeforeUpdate(prevProps) {
    const element = this.props.childRef.current;
    if (isHTMLElement(element) && prevProps.isPresent && !this.props.isPresent && this.props.pop !== false) {
      const parent = element.offsetParent;
      const parentWidth = isHTMLElement(parent) ? parent.offsetWidth || 0 : 0;
      const parentHeight = isHTMLElement(parent) ? parent.offsetHeight || 0 : 0;
      const computedStyle = getComputedStyle(element);
      const size = this.props.sizeRef.current;
      size.height = parseFloat(computedStyle.height);
      size.width = parseFloat(computedStyle.width);
      size.top = element.offsetTop;
      size.left = element.offsetLeft;
      size.right = parentWidth - size.width - size.left;
      size.bottom = parentHeight - size.height - size.top;
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
}
function PopChild({ children, isPresent, anchorX, anchorY, root, pop }) {
  var _a;
  const id = reactExports.useId();
  const ref = reactExports.useRef(null);
  const size = reactExports.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  });
  const { nonce } = reactExports.useContext(MotionConfigContext);
  const childRef = ((_a = children.props) == null ? void 0 : _a.ref) ?? (children == null ? void 0 : children.ref);
  const composedRef = useComposedRefs(ref, childRef);
  reactExports.useInsertionEffect(() => {
    const { width, height, top, left, right, bottom } = size.current;
    if (isPresent || pop === false || !ref.current || !width || !height)
      return;
    const x = anchorX === "left" ? `left: ${left}` : `right: ${right}`;
    const y = anchorY === "bottom" ? `bottom: ${bottom}` : `top: ${top}`;
    ref.current.dataset.motionPopId = id;
    const style = document.createElement("style");
    if (nonce)
      style.nonce = nonce;
    const parent = root ?? document.head;
    parent.appendChild(style);
    if (style.sheet) {
      style.sheet.insertRule(`
          [data-motion-pop-id="${id}"] {
            position: absolute !important;
            width: ${width}px !important;
            height: ${height}px !important;
            ${x}px !important;
            ${y}px !important;
          }
        `);
    }
    return () => {
      var _a2;
      (_a2 = ref.current) == null ? void 0 : _a2.removeAttribute("data-motion-pop-id");
      if (parent.contains(style)) {
        parent.removeChild(style);
      }
    };
  }, [isPresent]);
  return jsxRuntimeExports.jsx(PopChildMeasure, { isPresent, childRef: ref, sizeRef: size, pop, children: pop === false ? children : reactExports.cloneElement(children, { ref: composedRef }) });
}
const PresenceChild = ({ children, initial, isPresent, onExitComplete, custom, presenceAffectsLayout, mode, anchorX, anchorY, root }) => {
  const presenceChildren = useConstant(newChildrenMap);
  const id = reactExports.useId();
  let isReusedContext = true;
  let context = reactExports.useMemo(() => {
    isReusedContext = false;
    return {
      id,
      initial,
      isPresent,
      custom,
      onExitComplete: (childId) => {
        presenceChildren.set(childId, true);
        for (const isComplete of presenceChildren.values()) {
          if (!isComplete)
            return;
        }
        onExitComplete && onExitComplete();
      },
      register: (childId) => {
        presenceChildren.set(childId, false);
        return () => presenceChildren.delete(childId);
      }
    };
  }, [isPresent, presenceChildren, onExitComplete]);
  if (presenceAffectsLayout && isReusedContext) {
    context = { ...context };
  }
  reactExports.useMemo(() => {
    presenceChildren.forEach((_, key) => presenceChildren.set(key, false));
  }, [isPresent]);
  reactExports.useEffect(() => {
    !isPresent && !presenceChildren.size && onExitComplete && onExitComplete();
  }, [isPresent]);
  children = jsxRuntimeExports.jsx(PopChild, { pop: mode === "popLayout", isPresent, anchorX, anchorY, root, children });
  return jsxRuntimeExports.jsx(PresenceContext.Provider, { value: context, children });
};
function newChildrenMap() {
  return /* @__PURE__ */ new Map();
}
const getChildKey = (child) => child.key || "";
function onlyElements(children) {
  const filtered = [];
  reactExports.Children.forEach(children, (child) => {
    if (reactExports.isValidElement(child))
      filtered.push(child);
  });
  return filtered;
}
const AnimatePresence = ({ children, custom, initial = true, onExitComplete, presenceAffectsLayout = true, mode = "sync", propagate = false, anchorX = "left", anchorY = "top", root }) => {
  const [isParentPresent, safeToRemove] = usePresence(propagate);
  const presentChildren = reactExports.useMemo(() => onlyElements(children), [children]);
  const presentKeys = propagate && !isParentPresent ? [] : presentChildren.map(getChildKey);
  const isInitialRender = reactExports.useRef(true);
  const pendingPresentChildren = reactExports.useRef(presentChildren);
  const exitComplete = useConstant(() => /* @__PURE__ */ new Map());
  const exitingComponents = reactExports.useRef(/* @__PURE__ */ new Set());
  const [diffedChildren, setDiffedChildren] = reactExports.useState(presentChildren);
  const [renderedChildren, setRenderedChildren] = reactExports.useState(presentChildren);
  useIsomorphicLayoutEffect(() => {
    isInitialRender.current = false;
    pendingPresentChildren.current = presentChildren;
    for (let i = 0; i < renderedChildren.length; i++) {
      const key = getChildKey(renderedChildren[i]);
      if (!presentKeys.includes(key)) {
        if (exitComplete.get(key) !== true) {
          exitComplete.set(key, false);
        }
      } else {
        exitComplete.delete(key);
        exitingComponents.current.delete(key);
      }
    }
  }, [renderedChildren, presentKeys.length, presentKeys.join("-")]);
  const exitingChildren = [];
  if (presentChildren !== diffedChildren) {
    let nextChildren = [...presentChildren];
    for (let i = 0; i < renderedChildren.length; i++) {
      const child = renderedChildren[i];
      const key = getChildKey(child);
      if (!presentKeys.includes(key)) {
        nextChildren.splice(i, 0, child);
        exitingChildren.push(child);
      }
    }
    if (mode === "wait" && exitingChildren.length) {
      nextChildren = exitingChildren;
    }
    setRenderedChildren(onlyElements(nextChildren));
    setDiffedChildren(presentChildren);
    return null;
  }
  const { forceRender } = reactExports.useContext(LayoutGroupContext);
  return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: renderedChildren.map((child) => {
    const key = getChildKey(child);
    const isPresent = propagate && !isParentPresent ? false : presentChildren === renderedChildren || presentKeys.includes(key);
    const onExit = () => {
      if (exitingComponents.current.has(key)) {
        return;
      }
      if (exitComplete.has(key)) {
        exitingComponents.current.add(key);
        exitComplete.set(key, true);
      } else {
        return;
      }
      let isEveryExitComplete = true;
      exitComplete.forEach((isExitComplete) => {
        if (!isExitComplete)
          isEveryExitComplete = false;
      });
      if (isEveryExitComplete) {
        forceRender == null ? void 0 : forceRender();
        setRenderedChildren(pendingPresentChildren.current);
        propagate && (safeToRemove == null ? void 0 : safeToRemove());
        onExitComplete && onExitComplete();
      }
    };
    return jsxRuntimeExports.jsx(PresenceChild, { isPresent, initial: !isInitialRender.current || initial ? void 0 : false, custom, presenceAffectsLayout, mode, root, onExitComplete: isPresent ? void 0 : onExit, anchorX, anchorY, children: child }, key);
  }) });
};
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...props
    }
  );
}
var NODES = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
];
var Primitive = NODES.reduce((primitive, node) => {
  const Slot = createSlot(`Primitive.${node}`);
  const Node = reactExports.forwardRef((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props;
    const Comp = asChild ? Slot : node;
    if (typeof window !== "undefined") {
      window[Symbol.for("radix-ui")] = true;
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { ...primitiveProps, ref: forwardedRef });
  });
  Node.displayName = `Primitive.${node}`;
  return { ...primitive, [node]: Node };
}, {});
var NAME = "Label";
var Label$1 = reactExports.forwardRef((props, forwardedRef) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.label,
    {
      ...props,
      ref: forwardedRef,
      onMouseDown: (event) => {
        var _a;
        const target = event.target;
        if (target.closest("button, input, select, textarea")) return;
        (_a = props.onMouseDown) == null ? void 0 : _a.call(props, event);
        if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
      }
    }
  );
});
Label$1.displayName = NAME;
var Root = Label$1;
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
const STEPS = ["Template", "Your Details", "Review & Pay"];
const QUANTITIES = [
  { key: "q100", qty: { q100: null } },
  { key: "q500", qty: { q500: null } },
  { key: "q1000", qty: { q1000: null } },
  { key: "q2000", qty: { q2000: null } }
];
const emptyCardDetails = () => ({
  name: "",
  jobTitle: "",
  company: "",
  phone: "",
  email: "",
  website: "",
  socialLinks: { linkedin: "", twitter: "", instagram: "" },
  customMessage: ""
});
function StepIndicator({ current }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-0 mb-10", children: STEPS.map((label, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border-2 transition-smooth ${i < current ? "bg-primary border-primary text-primary-foreground" : i === current ? "border-primary text-primary bg-primary/10" : "border-border/60 text-muted-foreground"}`,
          children: i < current ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4" }) : i + 1
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: `text-xs mt-1.5 font-medium hidden sm:block ${i === current ? "text-foreground" : "text-muted-foreground"}`,
          children: label
        }
      )
    ] }),
    i < STEPS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `w-16 md:w-24 h-0.5 mx-2 mb-4 sm:mb-0 transition-smooth ${i < current ? "bg-primary" : "bg-border/60"}`
      }
    )
  ] }, label)) });
}
function StepTemplate({
  selectedId,
  onSelect,
  selectedQty,
  onQtySelect,
  onNext
}) {
  const { data: templates, isLoading } = useTemplates();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground mb-1", children: "Choose a Template" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "Pick the design that best represents your brand." }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4 mb-8", children: ["t1", "t2", "t3", "t4", "t5", "t6"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-[3/2] rounded-xl" }, k)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-2 md:grid-cols-3 gap-4 mb-8",
        "data-ocid": "order.template_grid",
        children: (templates ?? []).map((tpl, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => onSelect(tpl.id.toString()),
            "data-ocid": `order.template_item.${i + 1}`,
            className: `group rounded-xl border-2 overflow-hidden text-left transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${selectedId === tpl.id.toString() ? "border-primary shadow-card-hover" : "border-border/50 hover:border-accent/50"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-[3/2] overflow-hidden bg-muted/50 relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: tpl.previewImageUrl,
                    alt: tpl.name,
                    className: "w-full h-full object-cover group-hover:scale-105 transition-smooth",
                    onError: (e) => {
                      e.target.src = "/assets/generated/nfc-hero.dim_1200x700.jpg";
                    }
                  }
                ),
                selectedId === tpl.id.toString() && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5 text-primary-foreground" }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-xs text-foreground", children: tpl.name }) })
            ]
          },
          tpl.id.toString()
        ))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-base text-foreground mb-3", children: "Select Quantity" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-2 md:grid-cols-4 gap-3 mb-8",
        "data-ocid": "order.quantity_grid",
        children: QUANTITIES.map(({ key, qty }) => {
          const isSelected = JSON.stringify(qty) === JSON.stringify(selectedQty);
          const price = quantityPrice(qty);
          const qtyIndex = QUANTITIES.findIndex((q) => q.key === key) + 1;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => onQtySelect(qty),
              "data-ocid": `order.quantity_item.${qtyIndex}`,
              className: `p-4 rounded-xl border-2 text-center transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${isSelected ? "border-primary bg-primary/10" : "border-border/50 hover:border-accent/40 bg-card"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-bold text-lg text-foreground", children: [
                  "$",
                  (price / 100).toFixed(0)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: quantityLabel(qty) })
              ]
            },
            key
          );
        })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        onClick: onNext,
        disabled: !selectedId,
        "data-ocid": "order.template_next_button",
        className: "w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 gap-2",
        children: [
          "Continue ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
        ]
      }
    )
  ] });
}
function StepDetails({
  details,
  onChange,
  onNext,
  onBack
}) {
  const update = (field, value) => onChange({ ...details, [field]: value });
  const updateSocial = (field, value) => onChange({
    ...details,
    socialLinks: { ...details.socialLinks, [field]: value }
  });
  const isValid = details.name.trim() && details.jobTitle.trim() && details.company.trim() && details.phone.trim() && details.email.trim();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground mb-1", children: "Your Card Details" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "This information will be programmed onto your NFC card." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 rounded-xl bg-muted/30 border border-border/50 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground", children: "Personal Information" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "name", className: "text-xs mb-1.5 block", children: [
              "Full Name ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "name",
                placeholder: "Alex Johnson",
                value: details.name,
                onChange: (e) => update("name", e.target.value),
                "data-ocid": "order.name_input",
                className: "bg-background border-border/60"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "jobTitle", className: "text-xs mb-1.5 block", children: [
              "Job Title ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "jobTitle",
                placeholder: "Product Designer",
                value: details.jobTitle,
                onChange: (e) => update("jobTitle", e.target.value),
                "data-ocid": "order.jobtitle_input",
                className: "bg-background border-border/60"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "company", className: "text-xs mb-1.5 block", children: [
            "Company ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "company",
              placeholder: "Acme Corp",
              value: details.company,
              onChange: (e) => update("company", e.target.value),
              "data-ocid": "order.company_input",
              className: "bg-background border-border/60"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 rounded-xl bg-muted/30 border border-border/50 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground", children: "Contact Information" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "phone", className: "text-xs mb-1.5 block", children: [
              "Phone ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "phone",
                type: "tel",
                placeholder: "+1 555 000 0000",
                value: details.phone,
                onChange: (e) => update("phone", e.target.value),
                "data-ocid": "order.phone_input",
                className: "bg-background border-border/60"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "email", className: "text-xs mb-1.5 block", children: [
              "Email ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "email",
                type: "email",
                placeholder: "alex@acme.com",
                value: details.email,
                onChange: (e) => update("email", e.target.value),
                "data-ocid": "order.email_input",
                className: "bg-background border-border/60"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "website", className: "text-xs mb-1.5 block", children: [
            "Website ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "(optional)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "website",
              type: "url",
              placeholder: "https://alexjohnson.com",
              value: details.website ?? "",
              onChange: (e) => update("website", e.target.value),
              "data-ocid": "order.website_input",
              className: "bg-background border-border/60"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 rounded-xl bg-muted/30 border border-border/50 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-semibold text-sm text-foreground", children: [
          "Social Links",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal text-xs", children: "(optional)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "linkedin", className: "text-xs mb-1.5 block", children: "LinkedIn" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "linkedin",
                placeholder: "linkedin.com/in/alex",
                value: details.socialLinks.linkedin ?? "",
                onChange: (e) => updateSocial("linkedin", e.target.value),
                "data-ocid": "order.linkedin_input",
                className: "bg-background border-border/60"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "twitter", className: "text-xs mb-1.5 block", children: "Twitter / X" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "twitter",
                placeholder: "@alexjohnson",
                value: details.socialLinks.twitter ?? "",
                onChange: (e) => updateSocial("twitter", e.target.value),
                "data-ocid": "order.twitter_input",
                className: "bg-background border-border/60"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "instagram", className: "text-xs mb-1.5 block", children: "Instagram" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "instagram",
                placeholder: "@alexjohnson",
                value: details.socialLinks.instagram ?? "",
                onChange: (e) => updateSocial("instagram", e.target.value),
                "data-ocid": "order.instagram_input",
                className: "bg-background border-border/60"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 rounded-xl bg-muted/30 border border-border/50 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-semibold text-sm text-foreground", children: [
          "Custom Message",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal text-xs", children: "(optional)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            placeholder: "A short tagline or message shown when your card is tapped…",
            value: details.customMessage ?? "",
            onChange: (e) => update("customMessage", e.target.value),
            rows: 3,
            maxLength: 160,
            "data-ocid": "order.custom_message_textarea",
            className: "bg-background border-border/60 resize-none"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-right", children: [
          (details.customMessage ?? "").length,
          "/160"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          onClick: onBack,
          "data-ocid": "order.details_back_button",
          className: "gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" }),
            " Back"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: onNext,
          disabled: !isValid,
          "data-ocid": "order.details_next_button",
          className: "flex-1 sm:flex-none bg-primary text-primary-foreground hover:bg-primary/90 gap-2",
          children: [
            "Review Order ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
          ]
        }
      )
    ] })
  ] });
}
function StepReview({
  details,
  selectedId,
  selectedQty,
  onBack,
  onSubmit,
  isSubmitting
}) {
  const { data: templates } = useTemplates();
  const template = (templates ?? []).find(
    (t) => t.id.toString() === selectedId
  );
  const price = quantityPrice(selectedQty);
  const rows = [
    { label: "Name", value: details.name },
    { label: "Job Title", value: details.jobTitle },
    { label: "Company", value: details.company },
    { label: "Phone", value: details.phone },
    { label: "Email", value: details.email },
    ...details.website ? [{ label: "Website", value: details.website }] : [],
    ...details.socialLinks.linkedin ? [{ label: "LinkedIn", value: details.socialLinks.linkedin }] : [],
    ...details.socialLinks.twitter ? [{ label: "Twitter", value: details.socialLinks.twitter }] : [],
    ...details.socialLinks.instagram ? [{ label: "Instagram", value: details.socialLinks.instagram }] : [],
    ...details.customMessage ? [{ label: "Message", value: details.customMessage }] : []
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground mb-1", children: "Review Your Order" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "Please confirm your details before proceeding to payment." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border/60 p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
        template && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: template.previewImageUrl,
            alt: template.name,
            className: "w-20 h-14 object-cover rounded-lg flex-shrink-0",
            onError: (e) => {
              e.target.src = "/assets/generated/nfc-hero.dim_1200x700.jpg";
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-sm text-foreground", children: (template == null ? void 0 : template.name) ?? "Template" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: quantityLabel(selectedQty) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-primary mt-2", children: [
            "$",
            (price / 100).toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Badge,
          {
            variant: "outline",
            className: "border-accent/40 text-accent text-xs flex-shrink-0",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { className: "w-3 h-3 mr-1" }),
              " NFC"
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border/60 p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground mb-3", children: "Card Details" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: rows.map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground w-24 flex-shrink-0 text-xs mt-0.5", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground text-xs break-words min-w-0", children: value })
        ] }, label)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          onClick: onBack,
          disabled: isSubmitting,
          "data-ocid": "order.review_back_button",
          className: "gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" }),
            " Back"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: onSubmit,
          disabled: isSubmitting,
          "data-ocid": "order.submit_button",
          className: "flex-1 sm:flex-none bg-primary text-primary-foreground hover:bg-primary/90 gap-2",
          children: [
            isSubmitting ? "Processing…" : `Pay $${(price / 100).toFixed(2)}`,
            !isSubmitting && /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
          ]
        }
      )
    ] })
  ] });
}
function OrderPage() {
  const { isAuthenticated, login, isLoggingIn, isInitializing } = useInternetIdentity();
  const searchParams = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  );
  const initialTemplateId = searchParams.get("templateId") ?? "";
  const [step, setStep] = reactExports.useState(0);
  const [selectedTemplateId, setSelectedTemplateId] = reactExports.useState(initialTemplateId);
  const [selectedQty, setSelectedQty] = reactExports.useState({ q100: null });
  const [cardDetails, setCardDetails] = reactExports.useState(
    emptyCardDetails()
  );
  const createOrder = useCreateOrder();
  const createCheckoutSession = useCreateCheckoutSession();
  const handleSubmit = async () => {
    if (!selectedTemplateId) return;
    try {
      const order = await createOrder.mutateAsync({
        cardDetails,
        templateId: BigInt(selectedTemplateId),
        quantity: selectedQty
      });
      const price = quantityPrice(selectedQty);
      const shoppingItems = [
        {
          currency: "usd",
          productName: "7EVEN NFC Card",
          productDescription: `${quantityLabel(selectedQty)} — ${cardDetails.name}`,
          priceInCents: BigInt(price),
          quantity: BigInt(1)
        }
      ];
      const session = await createCheckoutSession.mutateAsync({
        items: shoppingItems,
        orderId: order.id
      });
      window.location.href = session.url;
    } catch (_err) {
      ue.error("Failed to initiate payment. Please try again.");
    }
  };
  const isSubmitting = createOrder.isPending || createCheckoutSession.isPending;
  if (isInitializing) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-16 max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-48 h-8 mb-6" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-full h-64 rounded-xl" })
    ] }) });
  }
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "min-h-[70vh] flex items-center justify-center py-16",
        "data-ocid": "order.unauthenticated.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 text-center max-w-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex w-14 h-14 rounded-xl bg-primary/10 border border-primary/30 items-center justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-7 h-7 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground mb-3", children: "Sign in to order" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8 text-sm leading-relaxed", children: "Create your account to design and order your personalised 7EVEN NFC card." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: login,
              disabled: isLoggingIn,
              "data-ocid": "order.signin_button",
              className: "bg-primary text-primary-foreground hover:bg-primary/90 gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-4 h-4" }),
                isLoggingIn ? "Signing in…" : "Sign In / Sign Up"
              ]
            }
          )
        ] })
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-12", "data-ocid": "order.section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl md:text-3xl text-foreground mb-1", children: "Order NFC Cards" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Complete the steps below to customise and order your cards." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StepIndicator, { current: step }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border/60 p-6 md:p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
      step === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, x: 20 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -20 },
          transition: { duration: 0.25 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            StepTemplate,
            {
              selectedId: selectedTemplateId,
              onSelect: setSelectedTemplateId,
              selectedQty,
              onQtySelect: setSelectedQty,
              onNext: () => setStep(1)
            }
          )
        },
        "step0"
      ),
      step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, x: 20 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -20 },
          transition: { duration: 0.25 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            StepDetails,
            {
              details: cardDetails,
              onChange: setCardDetails,
              onNext: () => setStep(2),
              onBack: () => setStep(0)
            }
          )
        },
        "step1"
      ),
      step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, x: 20 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -20 },
          transition: { duration: 0.25 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            StepReview,
            {
              details: cardDetails,
              selectedId: selectedTemplateId,
              selectedQty,
              onBack: () => setStep(1),
              onSubmit: handleSubmit,
              isSubmitting
            }
          )
        },
        "step2"
      )
    ] }) })
  ] }) }) });
}
export {
  OrderPage as default
};
