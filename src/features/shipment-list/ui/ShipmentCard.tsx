import { Shipment } from "@/entities/shipment/types";
import {
  CARGO_TYPE_LABELS,
  CARGO_TO_WAGON,
  WAGON_TYPE_LABELS,
  CargoType,
} from "@/entities/wagon/types";
import { ArrowRight, Calendar, Package, Train } from "lucide-react";

interface Props {
  shipment: Shipment;
  onClick?: () => void;
}

// Додаємо підтримку статусів з великої літери, які приходять від Івана
const STATUS_LABELS: Record<string, string> = {
  Pending: "Очікує",
  Assigned: "Підібрано",
  Completed: "Виконано",
  // про всяк випадок залишаємо старі
  pending: "Очікує",
  matched: "Підібрано",
};

const STATUS_STYLES: Record<string, string> = {
  Pending: "efficiency-badge-yellow",
  Assigned: "efficiency-badge-green",
  Completed: "efficiency-badge-green",
  pending: "efficiency-badge-yellow",
};

export function ShipmentCard({ shipment, onClick }: Props) {
  // Тепер беремо назви міст напряму з об'єкта, який прислав бекенд
  const originName = shipment.fromCity || `Станція ${shipment.fromStationId}`;
  const destinationName = shipment.toCity || "—";

  // Приводимо вантаж до типу, який розуміє наш словник (якщо це число)
  const cargoKey = String(shipment.cargo) as CargoType;

  return (
    <div
      onClick={onClick}
      className="rounded-lg border bg-card p-5 space-y-3 cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-muted-foreground">
          {shipment.id}
        </span>
        <span className={STATUS_STYLES[shipment.status] || "efficiency-badge-yellow"}>
          {STATUS_LABELS[shipment.status] || shipment.status}
        </span>
      </div>

      <div className="flex items-center gap-2 text-sm font-medium">
        <span>{originName}</span>
        <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
        <span>{destinationName}</span>
      </div>

      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Package className="h-3.5 w-3.5" />
          {CARGO_TYPE_LABELS[cargoKey] || `Вантаж #${shipment.cargo}`}
        </span>
        
        {/* Оскільки в бекенді поки немає кількості вагонів, показуємо заглушку або тип */}
        <span className="flex items-center gap-1">
          <Train className="h-3.5 w-3.5" />
          {WAGON_TYPE_LABELS[CARGO_TO_WAGON[cargoKey]] || "Універсальний вагон"}
        </span>

        <span className="flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5" />
          {new Date(shipment.deadline).toLocaleDateString("uk-UA")}
        </span>
      </div>
    </div>
  );
}