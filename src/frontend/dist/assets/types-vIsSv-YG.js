function quantityLabel(q) {
  if ("q100" in q) return "100 cards";
  if ("q500" in q) return "500 cards";
  if ("q1000" in q) return "1,000 cards";
  if ("q2000" in q) return "2,000 cards";
  return "Unknown";
}
function quantityPrice(q) {
  if ("q100" in q) return 4900;
  if ("q500" in q) return 19900;
  if ("q1000" in q) return 34900;
  if ("q2000" in q) return 59900;
  return 0;
}
function statusLabel(s) {
  if ("pending" in s) return "Pending";
  if ("processing" in s) return "Processing";
  if ("shipped" in s) return "Shipped";
  if ("delivered" in s) return "Delivered";
  return "Unknown";
}
function statusColor(s) {
  if ("pending" in s) return "text-muted-foreground";
  if ("processing" in s) return "text-accent";
  if ("shipped" in s) return "text-primary";
  if ("delivered" in s) return "text-chart-3";
  return "";
}
export {
  quantityLabel as a,
  statusColor as b,
  quantityPrice as q,
  statusLabel as s
};
