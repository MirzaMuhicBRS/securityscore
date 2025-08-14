import { useState } from "react";
import { useTenant } from "../../context/TenantContext";
import { buildAdminConsentUrl } from "../../services/consent";

type RegTenant = { id: string; name: string; mode: "delegated" | "appOnly"; consented?: boolean };

export default function ManageTenants() {
  const { selectedTenant, setSelectedTenant } = useTenant();
  const [tenants, setTenants] = useState<RegTenant[]>([
    // seed – din befintliga
    { id: "4f24ecea-ac0f-495e-8e65-477aaf0c1fe3", name: "Needefy AB", mode: "delegated", consented: false },
  ]);
  const [form, setForm] = useState<RegTenant>({ id: "", name: "", mode: "delegated" });

  const add = () => {
    if (!form.id || !form.name) return;
    setTenants((t) => (t.find(x => x.id === form.id) ? t : [...t, { ...form, consented: false }]));
    setForm({ id: "", name: "", mode: "delegated" });
  };

  const consentUrl = (t: RegTenant) => buildAdminConsentUrl(t.id);

  const verify = async (t: RegTenant) => {
    try {
      // mot backend senare (app-only) eller ett enkelt Graph-ping (delegated)
      // placeholder:
      setTenants((prev) => prev.map(x => x.id === t.id ? { ...x, consented: true } : x));
      alert(`Verifierad: ${t.name}`);
    } catch (e: any) {
      alert(`Kunde inte verifiera: ${e?.message ?? e}`);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Tenant-hantering</h1>

      {/* Add form */}
      <div className="rounded-lg border p-4 dark:border-gray-700">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
          <input
            placeholder="Tenant ID (GUID)"
            value={form.id}
            onChange={(e) => setForm({ ...form, id: e.target.value.trim() })}
            className="rounded-md border px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
          />
          <input
            placeholder="Visningsnamn"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="rounded-md border px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
          />
          <select
            value={form.mode}
            onChange={(e) => setForm({ ...form, mode: e.target.value as RegTenant["mode"] })}
            className="rounded-md border px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
          >
            <option value="delegated">Delegated (MSAL i browser)</option>
            <option value="appOnly">App-only (server)</option>
          </select>
          <button onClick={add} className="rounded-md bg-blue-600 text-white px-3 py-2 hover:bg-blue-700">
            Lägg till tenant
          </button>
        </div>
      </div>

      {/* List */}
      <div className="rounded-lg border p-4 dark:border-gray-700">
        <table className="w-full text-sm">
          <thead className="text-left text-gray-500 dark:text-gray-400">
            <tr>
              <th className="py-2">Tenant</th>
              <th className="py-2">Mode</th>
              <th className="py-2">Consent</th>
              <th className="py-2">Åtgärder</th>
            </tr>
          </thead>
          <tbody>
            {tenants.map((t) => (
              <tr key={t.id} className="border-t dark:border-gray-700">
                <td className="py-2">
                  <div className="font-medium">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.id}</div>
                </td>
                <td className="py-2">{t.mode}</td>
                <td className="py-2">
                  {t.consented ? (
                    <span className="text-green-600">OK</span>
                  ) : (
                    <span className="text-amber-600">Saknas</span>
                  )}
                </td>
                <td className="py-2 flex gap-2">
                  <button
                    className="rounded-md border px-2 py-1 dark:border-gray-700"
                    onClick={() => setSelectedTenant({ id: t.id, name: t.name })}
                  >
                    Välj
                  </button>

                  {/* Admin consent-länk – öppnas av kundens global admin */}
                  <a
                    href={consentUrl(t)}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-md border px-2 py-1 dark:border-gray-700"
                  >
                    Admin consent
                  </a>

                  <button className="rounded-md border px-2 py-1 dark:border-gray-700" onClick={() => verify(t)}>
                    Verifiera
                  </button>
                </td>
              </tr>
            ))}
            {!tenants.length && (
              <tr>
                <td className="py-6 text-gray-500" colSpan={4}>
                  Inga tenants ännu.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Statusrad */}
      <div className="text-xs text-gray-500">
        Vald: {selectedTenant ? `${selectedTenant.name} (${selectedTenant.id})` : "—"}
      </div>
    </div>
  );
}
