import { Configuration, LogLevel } from "@azure/msal-browser";

/**
 * Miljövariabler:
 *  - VITE_AAD_CLIENT_ID   =  fc28ad0c-a03c-4433-a65e-e8165f08d066
 *  - VITE_AAD_TENANT_ID   =  4f24ecea-ac0f-495e-8e65-477aaf0c1fe3   (din tenant)
 *  - VITE_AUTH_REDIRECT_URI (valfri) = http://localhost:5173
 */
const CLIENT_ID = import.meta.env.VITE_AAD_CLIENT_ID as string;
const TENANT_ID = (import.meta.env.VITE_AAD_TENANT_ID as string) || "organizations";
const REDIRECT_URI = (import.meta.env.VITE_AUTH_REDIRECT_URI as string) || window.location.origin;

if (!CLIENT_ID) {
  console.warn("VITE_AAD_CLIENT_ID saknas i .env.local");
}

export const msalConfig: Configuration = {
  auth: {
    clientId: CLIENT_ID,
    authority: `https://login.microsoftonline.com/${TENANT_ID}`,
    redirectUri: REDIRECT_URI,
    postLogoutRedirectUri: REDIRECT_URI,
    // Undvik extra navigering som annars kan se ut som en loop
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      logLevel: LogLevel.Info,
      loggerCallback: (_level, message, containsPii) => {
        if (containsPii) return;
        // Lite lagom loggning i konsolen
        if (message.includes("acquireTokenSilent")) return; // filtrera brus
        console.info("[MSAL]", message);
      },
    },
  },
};

/**
 * Håll dessa i synk med de delegerade Graph-API-behörigheter du faktiskt
 * har gett admin-consent för i appregistreringen.
 * (Du har idag User.Read + SecurityEvents.Read.All. Om du senare lägger till
 * Security.Read.All – lägg till den här också.)
 */
export const GRAPH_SCOPES = [
  "openid",
  "profile",
  "offline_access",
  "User.Read",
  "SecurityEvents.Read.All",
  // "Security.Read.All",
];
