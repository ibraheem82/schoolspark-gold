import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { getStoredUser } from "@/lib/auth";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: () => {
    // SSR-safe: only check on client. During SSR localStorage is null, so render shell;
    // client-side useEffect (or this same check on hydration) will redirect if missing.
    if (typeof window === "undefined") return;
    if (!getStoredUser()) {
      throw redirect({ to: "/login" });
    }
  },
  component: () => <Outlet />,
});