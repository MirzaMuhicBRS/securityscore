import { Client } from "@microsoft/microsoft-graph-client";
import "isomorphic-fetch";
import { acquireGraphToken } from "../auth/AuthProvider";

// Init med bearer token
const getGraphClient = (accessToken: string) =>
  Client.init({
    authProvider: (done) => done(null, accessToken),
  });

// ---- Secure Score ----
export async function fetchSecureScoreMsal(tenantId?: string): Promise<any[]> {
  const token = await acquireGraphToken(tenantId);
  const client = getGraphClient(token);
  const res = await client.api("/security/secureScores").version("v1.0").get();
  return res.value ?? [];
}

// (valfritt) äldre signatur om du redan anropar med token
export async function fetchSecureScoreWithToken(accessToken: string): Promise<any[]> {
  const client = getGraphClient(accessToken);
  const res = await client.api("/security/secureScores").version("v1.0").get();
  return res.value ?? [];
}
