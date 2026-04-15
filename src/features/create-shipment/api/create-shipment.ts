import type { Shipment } from "@/entities/shipment/types";
import type { CreateShipmentValues } from "../types";

const BASE_URL = 'https://hakaton-yz-api.onrender.com';

export async function createShipmentApi(
  values: CreateShipmentValues,
): Promise<Shipment> {
  // 1. Дістаємо дані
  const v = values as Record<string, unknown>;

  // 2. Формуємо об'єкт точно за структурою Івана
  const payload = {
    shipment: {
      fromStationId: Number(v.originStationId),
      toStationId: Number(v.destinationStationId),
      fromCity: String(v.fromCity || ""),
      toCity: String(v.toCity || ""),
      cargo: Number(v.cargoType),
      deadline: new Date(v.deadline as string).toISOString(),
      status: "Pending"
    }
  };

  // 3. Відправляємо
  const response = await fetch(`${BASE_URL}/shipments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload), // Тепер об'єкт загорнутий у "shipment"
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('Backend error:', errorData);
    throw new Error('Помилка створення заявки');
  }
  
  return response.json();
}