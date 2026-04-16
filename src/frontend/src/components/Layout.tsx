import { Link } from "@tanstack/react-router";
import { Wifi } from "lucide-react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const year = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "7even.app",
  )}`;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex-1">{children}</main>

      <footer className="bg-card border-t border-border/60 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Brand */}
            <div className="flex flex-col items-center md:items-start gap-2">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md bg-primary/20 border border-primary/40 flex items-center justify-center">
                  <Wifi className="w-3.5 h-3.5 text-primary" />
                </div>
                <span className="font-display font-bold text-lg tracking-tight">
                  7<span className="text-primary">EVEN</span>
                </span>
              </Link>
              <p className="text-xs text-muted-foreground text-center md:text-left max-w-xs">
                Premium NFC business cards that make every connection count.
              </p>
            </div>

            {/* Links */}
            <nav className="flex items-center gap-6">
              <Link
                to="/"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Home
              </Link>
              <Link
                to="/order"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Order
              </Link>
              <Link
                to="/dashboard"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Dashboard
              </Link>
            </nav>

            {/* Copyright */}
            <p className="text-xs text-muted-foreground text-center">
              © {year}. Built with love using{" "}
              <a
                href={utmLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
