import React, { startTransition, useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

export const handleAction = (e: React.FormEvent<HTMLFormElement>, action: (data: FormData) => void) => {
  e.preventDefault();
  startTransition(() => action(new FormData(e.currentTarget))); // use onSubmit instead of action to retain the form state
};

// https://github.com/nextauthjs/next-auth/issues/9504 - WTF is this?
export const useCurrentSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  // Changed the default status to loading
  const [status, setStatus] = useState<"loading" | "authenticated" | "unauthenticated">("loading");
  const pathName = usePathname();

  const retrieveSession = useCallback(async () => {
    try {
      const sessionData = await getSession();
      if (sessionData) {
        setSession(sessionData);
        setStatus("authenticated");
        return;
      }

      setStatus("unauthenticated");
    } catch (error) {
      setStatus("unauthenticated");
      setSession(null);
    }
  }, []);

  useEffect(() => {
    // We only want to retrieve the session when there is no session
    if (!session) retrieveSession();

    // use the pathname to force a re-render when the user navigates to a new page
  }, [retrieveSession, session, pathName]);

  return { session, status };
};
