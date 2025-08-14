import PageMeta from "../../components/common/PageMeta";
import TenantSelector from "../../components/common/TenantSelector";
import ActivitiesCard from "../../components/saas/ActivitiesCard";
import FunnelChart from "../../components/saas/FunnelChart";
import GrowthChart from "../../components/saas/GrowthChart";
import ProductPerformanceTab from "../../components/saas/ProductPerformanceTab";
import SaasInvoiceTable from "../../components/saas/SaasInvoiceTable";
import { useTenant } from "../../context/TenantContext";
import SecureScoreCard from "../../components/secure/SecureScoreCard";
import { LoginButton, LogoutButton } from "../../auth/AuthProvider";


export default function Securityscore() {
  const { selectedTenant } = useTenant();

  return (
    <>
      <PageMeta
        title="Secure Score Dashboard | BRS Networks"
        description="Centraliserad vy för Microsoft Secure Score-data per tenant."
      />
      
<div className="p-3 flex gap-3">
  <LoginButton />
  <LogoutButton />
</div>
      {/* Tenant Dropdown */}
      <TenantSelector />

      {/* Liten badge så selectedTenant används och TS inte klagar */}
      <div className="mb-4 text-sm text-gray-600 dark:text-gray-300">
        {selectedTenant
          ? <>Selected tenant: <span className="font-medium">{selectedTenant.name}</span></>
          : "No tenant selected"}
      </div>

      <div className="space-y-5 sm:space-y-6">
        <div className="gap-6 space-y-5 sm:space-y-6 xl:grid xl:grid-cols-12 xl:space-y-0">
          <div className="xl:col-span-7 2xl:col-span-8">
            <div className="sm:space-y-6 space-y-5">
              <div className="grid gap-5 sm:gap-6 lg:grid-cols-2">
                <SecureScoreCard />
                <GrowthChart />
              </div>
              <FunnelChart />
              <SaasInvoiceTable />
            </div>
          </div>
          <div className="space-y-5 sm:space-y-6 xl:col-span-5 2xl:col-span-4">
            <ProductPerformanceTab />
            <ActivitiesCard />
          </div>
        </div>
      </div>
    </>
  );
}
