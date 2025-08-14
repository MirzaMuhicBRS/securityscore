// src/components/common/TenantSelector.tsx
import type { ChangeEvent } from "react";
import { useTenant, type Tenant } from "../../context/TenantContext";

const TENANTS: Tenant[] = [
  { id: "4f24ecea-ac0f-495e-8e65-477aaf0c1fe3", name: "Needefy AB" },
  { id: "demo-tenant-2", name: "Fabrikam IT" },
  { id: "demo-tenant-3", name: "WideWorld MSP" },
];

export default function TenantSelector() {
  const { selectedTenant, setSelectedTenant } = useTenant();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    if (!id) {
      setSelectedTenant(null);
      return;
    }
    const tenant = TENANTS.find((t) => t.id === id) ?? null;
    setSelectedTenant(tenant);
  };

  return (
    <div className="mb-4">
      <label
        htmlFor="tenant"
        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
      >
        Select Tenant
      </label>

      <select
        id="tenant"
        value={selectedTenant?.id ?? ""}
        onChange={handleChange}
        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm
                   focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100
                   dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-blue-500 dark:focus:ring-blue-900"
        aria-label="Tenant selector"
      >
        <option value="">— Choose tenant —</option>
        {TENANTS.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>
    </div>
  );
}
