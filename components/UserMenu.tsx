"use client";

import { useSession, signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function UserMenu() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="w-full max-w-md">
        <div className="h-16 bg-card/50 dark:bg-card/30 rounded-xl border border-border/30 animate-pulse" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="w-full max-w-md bg-card/50 dark:bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-4">
      <div className="flex items-center gap-4">
        {session.user?.image && (
          <img
            src={session.user.image}
            alt="Avatar"
            className="w-12 h-12 rounded-full ring-2 ring-border/50"
          />
        )}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-foreground truncate">{session.user?.name}</p>
          <p className="text-sm text-muted-foreground truncate">{session.user?.email}</p>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 hover:bg-secondary dark:bg-secondary/30 dark:hover:bg-secondary/50 text-sm font-medium text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-ring"
          title="Sign out"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Sign out</span>
        </button>
      </div>
    </div>
  );
}
