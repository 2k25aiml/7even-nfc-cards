import Types "../types/orders-and-templates";
import OrderLib "../lib/orders-and-templates";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";

mixin (
  orders : List.List<Types.Order>,
  accessControlState : AccessControl.AccessControlState,
) {
  var nextOrderId : Nat = 1;

  // --- Templates ---

  public query func listTemplates() : async [Types.Template] {
    OrderLib.listTemplates();
  };

  public query func getTemplate(id : Types.TemplateId) : async ?Types.Template {
    OrderLib.getTemplate(id);
  };

  // --- Orders ---

  public shared ({ caller }) func createOrder(req : Types.CreateOrderRequest) : async Types.Order {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to create an order");
    };
    let order = OrderLib.createOrder(orders, nextOrderId, caller, req);
    nextOrderId += 1;
    order;
  };

  public query ({ caller }) func getMyOrder(orderId : Types.OrderId) : async ?Types.Order {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to view orders");
    };
    OrderLib.getOrder(orders, caller, orderId);
  };

  public query ({ caller }) func listMyOrders() : async [Types.Order] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to view orders");
    };
    OrderLib.listOrdersForUser(orders, caller);
  };

  public shared ({ caller }) func duplicateOrder(sourceOrderId : Types.OrderId) : async ?Types.Order {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to duplicate an order");
    };
    let result = OrderLib.duplicateOrder(orders, nextOrderId, caller, sourceOrderId);
    switch (result) {
      case (?_) { nextOrderId += 1 };
      case null {};
    };
    result;
  };

  // --- Payment ---

  public shared ({ caller }) func confirmOrderPayment(orderId : Types.OrderId, stripePaymentIntentId : Text) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to confirm payment");
    };
    // Ensure caller owns the order before confirming
    switch (OrderLib.getOrder(orders, caller, orderId)) {
      case null Runtime.trap("Order not found or not owned by caller");
      case (?_) {};
    };
    OrderLib.setStripePaymentIntent(orders, orderId, stripePaymentIntentId);
  };

  // --- Admin ---

  public shared ({ caller }) func adminUpdateOrderStatus(req : Types.UpdateOrderStatusRequest) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update order status");
    };
    OrderLib.updateOrderStatus(orders, req);
  };
};
