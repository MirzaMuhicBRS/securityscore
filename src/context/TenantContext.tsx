import { createContext, useState, useContext, type ReactNode } from "react";

export type Tenant = {
  id: string;
  name: string;
};

type TenantContextType = {
  selectedTenant: Tenant | null;
  setSelectedTenant: (tenant: Tenant | null) => void;
};

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export function TenantProvider({ children }: { children: ReactNode }) {
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);

  return (
    <TenantContext.Provider value={{ selectedTenant, setSelectedTenant }}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant(): TenantContextType {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error("useTenant must be used within a TenantProvider");
  }
  return context;
}
