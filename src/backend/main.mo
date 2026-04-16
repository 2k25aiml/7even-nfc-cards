import Types "types/orders-and-templates";
import OrdersMixin "mixins/orders-and-templates-api";
import List "mo:core/List";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let orders = List.empty<Types.Order>();

  include OrdersMixin(orders, accessControlState);
};
