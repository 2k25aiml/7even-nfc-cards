import Time "mo:core/Time";

module {
  public type TemplateId = Nat;
  public type OrderId = Nat;

  public type SocialLinks = {
    linkedin : ?Text;
    twitter : ?Text;
    instagram : ?Text;
  };

  public type CardDetails = {
    name : Text;
    jobTitle : Text;
    company : Text;
    phone : Text;
    email : Text;
    website : ?Text;
    socialLinks : SocialLinks;
    customMessage : ?Text;
  };

  public type Template = {
    id : TemplateId;
    name : Text;
    description : Text;
    previewImageUrl : Text;
  };

  public type OrderQuantity = { #q100; #q500; #q1000; #q2000 };

  public type OrderStatus = {
    #pending;
    #processing;
    #shipped;
    #delivered;
  };

  public type Order = {
    id : OrderId;
    owner : Principal;
    cardDetails : CardDetails;
    templateId : TemplateId;
    quantity : OrderQuantity;
    status : OrderStatus;
    paymentAmountCents : Nat;
    stripePaymentIntentId : ?Text;
    trackingNumber : ?Text;
    createdAt : Time.Time;
    updatedAt : Time.Time;
  };

  // Shared (API-boundary) types — no mutable fields
  public type OrderSummary = {
    id : OrderId;
    templateId : TemplateId;
    quantity : OrderQuantity;
    status : OrderStatus;
    paymentAmountCents : Nat;
    createdAt : Time.Time;
  };

  public type CreateOrderRequest = {
    cardDetails : CardDetails;
    templateId : TemplateId;
    quantity : OrderQuantity;
  };

  public type UpdateOrderStatusRequest = {
    orderId : OrderId;
    status : OrderStatus;
    trackingNumber : ?Text;
  };
};
