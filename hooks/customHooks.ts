// https://github.com/nextauthjs/next-auth/issues/9504 - WTF is this?
import { useActionState, useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

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

export function useResettableActionState<State, Payload>(
  action: (state: Awaited<State>, payload: Payload) => State | Promise<State>,
  initialState: Awaited<State>,
  permalink?: string,
): [state: Awaited<State>, dispatch: (payload: Payload | null) => void, reset: () => void, isPending: boolean] {
  const [state, submit, isPending] = useActionState(
    async (state: Awaited<State>, payload: Payload | null) => {
      if (payload === null) {
        return initialState;
      }

      return action(state, payload);
    },
    initialState,
    permalink,
  );

  const reset = () => {
    submit(null);
  };

  return [state, submit, reset, isPending];
}
