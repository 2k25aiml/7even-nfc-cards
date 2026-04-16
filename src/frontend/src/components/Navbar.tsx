import { Button } from "@/components/ui/button";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useRouter } from "@tanstack/react-router";
import {
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  ShoppingCart,
  Wifi,
  X,
} from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { login, clear, isAuthenticated, isInitializing, isLoggingIn } =
    useInternetIdentity();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleAuth = () => {
    if (isAuthenticated) {
      clear();
      queryClient.clear();
      router.navigate({ to: "/" });
    } else {
      login();
    }
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border/60 shadow-elevated backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group"
          data-ocid="nav.logo_link"
        >
          <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center">
            <Wifi className="w-4 h-4 text-primary" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-foreground">
            7<span className="text-primary">EVEN</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
            data-ocid="nav.home_link"
          >
            Home
          </Link>
          {isAuthenticated && (
            <Link
              to="/dashboard"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1.5"
              data-ocid="nav.dashboard_link"
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
          )}
          <Link
            to="/order"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1.5"
            data-ocid="nav.order_link"
          >
            <ShoppingCart className="w-4 h-4" />
            Order Now
          </Link>
        </nav>

        {/* Desktop Auth + CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleAuth}
            disabled={isInitializing || isLoggingIn}
            data-ocid="nav.auth_button"
            className="gap-2"
          >
            {isAuthenticated ? (
              <>
                <LogOut className="w-4 h-4" />
                Sign Out
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                {isInitializing
                  ? "Loading…"
                  : isLoggingIn
                    ? "Signing in…"
                    : "Sign In"}
              </>
            )}
          </Button>
          {!isAuthenticated && (
            <Button
              size="sm"
              asChild
              data-ocid="nav.order_cta_button"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Link to="/order">Get Your Card</Link>
            </Button>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          data-ocid="nav.mobile_menu_toggle"
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-card border-t border-border/60 px-4 py-4 flex flex-col gap-3 animate-slide-up">
          <Link
            to="/"
            className="text-sm font-medium text-foreground py-2"
            onClick={() => setMobileOpen(false)}
            data-ocid="nav.mobile_home_link"
          >
            Home
          </Link>
          {isAuthenticated && (
            <Link
              to="/dashboard"
              className="text-sm font-medium text-foreground py-2 flex items-center gap-2"
              onClick={() => setMobileOpen(false)}
              data-ocid="nav.mobile_dashboard_link"
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
          )}
          <Link
            to="/order"
            className="text-sm font-medium text-foreground py-2 flex items-center gap-2"
            onClick={() => setMobileOpen(false)}
            data-ocid="nav.mobile_order_link"
          >
            <ShoppingCart className="w-4 h-4" />
            Order Now
          </Link>
          <div className="pt-2 border-t border-border/40 flex flex-col gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleAuth}
              disabled={isInitializing || isLoggingIn}
              data-ocid="nav.mobile_auth_button"
              className="justify-start gap-2"
            >
              {isAuthenticated ? (
                <>
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  {isInitializing ? "Loading…" : "Sign In"}
                </>
              )}
            </Button>
            {!isAuthenticated && (
              <Button
                size="sm"
                asChild
                data-ocid="nav.mobile_order_cta_button"
                className="bg-primary text-primary-foreground"
              >
                <Link to="/order" onClick={() => setMobileOpen(false)}>
                  Get Your Card
                </Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
