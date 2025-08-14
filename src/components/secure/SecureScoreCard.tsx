import { useEffect, useState } from "react";
import { useTenant } from "../../context/TenantContext";
import { fetchSecureScoreMsal } from "../../services/graphClient";

type SecureScore = {
  id: string;
  createdDateTime: string;
  currentScore: number;
  maxScore: number;
  enabledServices?: string[];
  averageComparativeScores?: Array<{ basis: string; averageScore: number }>;
};

export default function SecureScoreCard() {
  const { selectedTenant } = useTenant();
  const [data, setData] = useState<SecureScore[] | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const scores = await fetchSecureScoreMsal(selectedTenant?.id);
        if (!active) return;
        setData(scores);
      } catch (e: any) {
        setErr(e?.message ?? "Kunde inte hämta Secure Score");
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [selectedTenant?.id]);

  const latest = data?.[0];

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">Secure Score</h3>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {selectedTenant?.name ?? "— ingen tenant vald —"}
        </span>
      </div>

      {loading && <div className="text-sm text-gray-500">Laddar…</div>}
      {err && <div className="text-sm text-red-600">{err}</div>}

      {!loading && !err && latest && (
        <div className="mt-2">
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {Math.round((latest.currentScore / latest.maxScore) * 100)}%
          </div>
          <div className="mt-1 text-sm text-gray-500 dark:text-gray-300">
            {latest.currentScore} av {latest.maxScore}
          </div>
          {latest.enabledServices?.length ? (
            <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
              Aktiverade tjänster: {latest.enabledServices.join(", ")}
            </div>
          ) : null}
        </div>
      )}

      {!loading && !err && !latest && (
        <div className="text-sm text-gray-500 dark:text-gray-400">Ingen data kunde hämtas.</div>
      )}
    </div>
  );
}
