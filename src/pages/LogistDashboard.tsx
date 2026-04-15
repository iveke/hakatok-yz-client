import { useQuery } from "@tanstack/react-query";
import { getShipmentsApi } from "@/features/shipment-list/api/get-shipments";
import { getWagonSuggestion } from "@/features/wagon-selection/api/get-suggestion";
import { ShipmentCard } from "@/features/shipment-list/ui/ShipmentCard";
import { WagonSuggestionCard } from "@/features/wagon-selection/ui/WagonSuggestionCard";
import { mockStore } from "@/shared/lib/mock-store";
import { TrendingUp, Train, PackageCheck, Banknote } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AppLayout } from "@/app/layout/AppLayout";
import type { Shipment } from "@/entities/shipment/types";
import { updateShipmentStatusApi } from "@/features/shipment-list/api/get-shipments";


export default function LogistDashboard() {
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(
    null,
  );
  const [savings, setSavings] = useState(mockStore.confirmedSavings);

  const { data: shipments = [], isLoading } = useQuery({
    queryKey: ["shipments"],
    queryFn: getShipmentsApi,
  });

  const { data: suggestions = [] } = useQuery({
    queryKey: ["wagon-suggestion", selectedShipment?.id],
    queryFn: () => {
      if (!selectedShipment) return Promise.resolve([]);
      // Передаємо тільки ID заявки, як хоче бекенд
      return getWagonSuggestion(selectedShipment.id); 
    },
    enabled: !!selectedShipment,
  });

  const pendingCount = shipments.filter((s) => s.status === "Pending").length;
  const totalWagons = mockStore.wagons.length;
  const emptyWagons = mockStore.wagons.filter((w) => w.isEmpty).length;

  const handleConfirm = async (savingsUah: number) => {
    if (!selectedShipment) return;

    try {
      // Викликаємо ту саму функцію, яку ми щойно створили
      await updateShipmentStatusApi(selectedShipment.id, "Assigned");
      
      setSavings(prev => prev + savingsUah);
      toast.success("Статус оновлено на бекенді!");
      
      // Очищуємо вибір, щоб оновити список
      setSelectedShipment(null); 
      
      // Щоб список оновився сам, можна просто перезавантажити сторінку або використати queryClient.invalidateQueries
      window.location.reload(); 
    } catch (error) {
      toast.error("Помилка при зв'язку з бекендом");
      console.error(error);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="page-header">Дашборд логіста</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Огляд заявок та розумний підбір вагонів
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={<PackageCheck className="h-5 w-5 text-primary" />}
            label="Заявок очікує"
            value={pendingCount}
          />
          <StatCard
            icon={<Train className="h-5 w-5 text-info" />}
            label="Вагонів всього"
            value={totalWagons}
          />
          <StatCard
            icon={<TrendingUp className="h-5 w-5 text-success" />}
            label="Порожніх вагонів"
            value={emptyWagons}
          />
          <StatCard
            icon={<Banknote className="h-5 w-5 text-warning" />}
            label="Зекономлено"
            value={`${savings.toLocaleString("uk-UA")} ₴`}
            highlight
          />
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Shipment list */}
          <div className="lg:col-span-3 space-y-3">
            <h2 className="section-title">Заявки на перевезення</h2>
            {isLoading ? (
              <p className="text-sm text-muted-foreground">Завантаження...</p>
            ) : (
              <div className="space-y-3">
                {shipments.map((s) => (
                  <ShipmentCard
                    key={s.id}
                    shipment={s}
                    onClick={() => setSelectedShipment(s)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Smart suggestion panel */}
          <div className="lg:col-span-2 space-y-3">
            <h2 className="section-title">🧠 Розумна пропозиція</h2>
            {!selectedShipment ? (
              <div className="rounded-lg border bg-card p-6 text-center text-sm text-muted-foreground">
                Оберіть заявку зліва, щоб побачити рекомендовані вагони
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-muted-foreground">
                  Заявка <strong>{selectedShipment.id}</strong> — потрібно{" "}
                  {1} вагонів
                </p>
                {suggestions.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Немає доступних вагонів
                  </p>
                ) : (
                  suggestions.map((s) => (
                    <WagonSuggestionCard
                      key={s.wagonId}
                      suggestion={s}
                      onConfirm={() => handleConfirm(s.savingsUah)}
                    />
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function StatCard({
  icon,
  label,
  value,
  highlight,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  highlight?: boolean;
}) {
  return (
    <div className="stat-card">
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p
            className={`text-xl font-bold ${
              highlight ? "text-success" : "text-foreground"
            }`}
          >
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
