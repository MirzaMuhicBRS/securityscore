import { useEffect, useState, type ReactNode } from "react";
import {
  PublicClientApplication,
  type IPublicClientApplication,
  type AccountInfo,
  EventType,
  InteractionRequiredAuthError,
} from "@azure/msal-browser";
import { MsalProvider, useIsAuthenticated, useMsal } from "@azure/msal-react";
import { msalConfig, GRAPH_SCOPES } from "./authConfig";

/** Global MSAL-instans + init (krävs i v3/v4) */
export const msalInstance: IPublicClientApplication = new PublicClientApplication(msalConfig);
export const msalInitialized = msalInstance.initialize();

/** Hjälp: välj authority per tenant om du skickar med ett tenantId */
function resolveAuthority(tenantId?: string): string | undefined {
  return tenantId
    ? `https://login.microsoftonline.com/${tenantId}`
    : msalInstance.getConfiguration().auth.authority;
}

/** Registrera event så vi alltid sätter activeAccount */
msalInstance.addEventCallback((event) => {
  if (
    event.eventType === EventType.LOGIN_SUCCESS ||
    event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS
  ) {
    const acc = (event.payload as any)?.account as AccountInfo | undefined;
    if (acc) {
      msalInstance.setActiveAccount(acc);
      console.info("[MSAL] Active account set:", acc.username);
    }
  }
});

/** Säkerställ att användare är inloggad (popup) */
async function ensureLogin(authority?: string): Promise<AccountInfo> {
  await msalInitialized;

  let account = msalInstance.getActiveAccount() ?? msalInstance.getAllAccounts()[0];
  if (account) return account;

  // Endast popup – redirect kan ge loopar om redirect-svaret inte processas ännu
  const login = await msalInstance.loginPopup({
    scopes: GRAPH_SCOPES,
    prompt: "select_account",
    authority,
  });

  account = login.account ?? undefined;
  if (!account) throw new Error("Login failed: no account returned");
  msalInstance.setActiveAccount(account);
  return account;
}

/** Hämta Graph-token. Om tenantId anges används authority för den tenanten. */
export async function acquireGraphToken(tenantId?: string): Promise<string> {
  await msalInitialized;

  const authority = resolveAuthority(tenantId);
  const account = await ensureLogin(authority);

  try {
    const res = await msalInstance.acquireTokenSilent({
      scopes: GRAPH_SCOPES,
      account,
      authority,
    });
    return res.accessToken;
  } catch (err) {
    // Om silent kräver interaktion → popup
    if (err instanceof InteractionRequiredAuthError) {
      const res = await msalInstance.acquireTokenPopup({
        scopes: GRAPH_SCOPES,
        prompt: "select_account",
        authority,
        account,
      });
      if (res.account) msalInstance.setActiveAccount(res.account);
      return res.accessToken;
    }
    throw err;
  }
}

/** Provider som:
 *   1) väntar på initialize()
 *   2) processar redirect-svar EN gång (hindrar redirect-loopar)
 */
export default function AuthProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        await msalInitialized;

        // Viktigt: processa ev. redirect-svar (t.ex. om popup blockerades och MSAL föll tillbaka på redirect)
        const redirectResult = await msalInstance.handleRedirectPromise();
        if (redirectResult?.account) {
          msalInstance.setActiveAccount(redirectResult.account);
          console.info("[MSAL] Redirect result processed for:", redirectResult.account.username);
        }
      } catch (e) {
        console.error("MSAL initialize/redirect handling failed:", e);
      } finally {
        if (mounted) setReady(true);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  if (!ready) return null; // ev. byt till en loader
  return <MsalProvider instance={msalInstance}>{children}</MsalProvider>;
}

/** Små UI-knappar (frivilliga) */
export function LoginButton({ tenantId }: { tenantId?: string }) {
  const { instance } = useMsal();
  const isAuth = useIsAuthenticated();
  if (isAuth) return null;

  return (
    <button
      onClick={async () => {
        await msalInitialized;
        await instance.loginPopup({
          scopes: GRAPH_SCOPES,
          prompt: "select_account",
          authority: resolveAuthority(tenantId),
        });
      }}
      className="rounded-md bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
    >
      Sign in
    </button>
  );
}

export function LogoutButton() {
  const { instance } = useMsal();
  const isAuth = useIsAuthenticated();
  if (!isAuth) return null;

  return (
    <button
      onClick={async () => {
        await msalInitialized;
        await instance.logoutPopup().catch(() => instance.logoutRedirect());
      }}
      className="rounded-md bg-gray-200 px-3 py-2 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
    >
      Sign out
    </button>
  );
}
