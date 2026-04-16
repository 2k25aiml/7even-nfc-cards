import Types "../types/orders-and-templates";
import List "mo:core/List";
import Time "mo:core/Time";
import Int "mo:core/Int";

module {
  // --- Templates ---

  let predefinedTemplates : [Types.Template] = [
    {
      id = 1;
      name = "Classic Black";
      description = "A sleek, minimalist black card with clean white typography. Perfect for professionals who want to make a bold impression.";
      previewImageUrl = "https://images.unsplash.com/photo-1591703823773-d1af64f1c92b?w=400";
    },
    {
      id = 2;
      name = "Modern White";
      description = "A crisp white card with subtle gold accents. Conveys professionalism and elegance in any industry.";
      previewImageUrl = "https://images.unsplash.com/photo-1599658880436-c61792e70672?w=400";
    },
    {
      id = 3;
      name = "Executive Gold";
      description = "A luxurious gold-finish card that commands attention. Ideal for executives, entrepreneurs, and premium brand positioning.";
      previewImageUrl = "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=400";
    },
    {
      id = 4;
      name = "Tech Blue";
      description = "A vibrant blue gradient card with a modern tech aesthetic. Great for software engineers, designers, and tech professionals.";
      previewImageUrl = "https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?w=400";
    },
    {
      id = 5;
      name = "Creative Dark";
      description = "A deep charcoal card with neon accent highlights. Perfect for creatives, artists, and anyone who wants to stand out.";
      previewImageUrl = "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=400";
    },
  ];

  public func listTemplates() : [Types.Template] {
    predefinedTemplates;
  };

  public func getTemplate(id : Types.TemplateId) : ?Types.Template {
    predefinedTemplates.find(func(t) { t.id == id });
  };

  // --- Pricing ---

  public func quantityToNat(q : Types.OrderQuantity) : Nat {
    switch (q) {
      case (#q100) 100;
      case (#q500) 500;
      case (#q1000) 1000;
      case (#q2000) 2000;
    };
  };

  public func priceForQuantity(q : Types.OrderQuantity) : Nat {
    switch (q) {
      case (#q100) 2900;
      case (#q500) 9900;
      case (#q1000) 17900;
      case (#q2000) 29900;
    };
  };

  // --- Orders ---

  public func createOrder(
    orders : List.List<Types.Order>,
    nextId : Nat,
    caller : Principal,
    req : Types.CreateOrderRequest,
  ) : Types.Order {
    let now = Time.now();
    let order : Types.Order = {
      id = nextId;
      owner = caller;
      cardDetails = req.cardDetails;
      templateId = req.templateId;
      quantity = req.quantity;
      status = #pending;
      paymentAmountCents = priceForQuantity(req.quantity);
      stripePaymentIntentId = null;
      trackingNumber = null;
      createdAt = now;
      updatedAt = now;
    };
    orders.add(order);
    order;
  };

  public func getOrder(
    orders : List.List<Types.Order>,
    caller : Principal,
    orderId : Types.OrderId,
  ) : ?Types.Order {
    orders.find(func(o) { o.id == orderId and o.owner == caller });
  };

  public func listOrdersForUser(
    orders : List.List<Types.Order>,
    caller : Principal,
  ) : [Types.Order] {
    let userOrders = orders.filter(func(o) { o.owner == caller });
    let arr = userOrders.toArray();
    arr.sort(func(a, b) { Int.compare(b.createdAt, a.createdAt) });
  };

  public func updateOrderStatus(
    orders : List.List<Types.Order>,
    req : Types.UpdateOrderStatusRequest,
  ) : Bool {
    var found = false;
    orders.mapInPlace(func(o) {
      if (o.id == req.orderId) {
        found := true;
        { o with status = req.status; trackingNumber = req.trackingNumber; updatedAt = Time.now() };
      } else {
        o;
      };
    });
    found;
  };

  public func setStripePaymentIntent(
    orders : List.List<Types.Order>,
    orderId : Types.OrderId,
    intentId : Text,
  ) : Bool {
    var found = false;
    orders.mapInPlace(func(o) {
      if (o.id == orderId) {
        found := true;
        { o with stripePaymentIntentId = ?intentId; status = #processing; updatedAt = Time.now() };
      } else {
        o;
      };
    });
    found;
  };

  public func duplicateOrder(
    orders : List.List<Types.Order>,
    nextId : Nat,
    caller : Principal,
    sourceOrderId : Types.OrderId,
  ) : ?Types.Order {
    switch (orders.find(func(o) { o.id == sourceOrderId and o.owner == caller })) {
      case null null;
      case (?source) {
        let now = Time.now();
        let newOrder : Types.Order = {
          id = nextId;
          owner = caller;
          cardDetails = source.cardDetails;
          templateId = source.templateId;
          quantity = source.quantity;
          status = #pending;
          paymentAmountCents = source.paymentAmountCents;
          stripePaymentIntentId = null;
          trackingNumber = null;
          createdAt = now;
          updatedAt = now;
        };
        orders.add(newOrder);
        ?newOrder;
      };
    };
  };
};
