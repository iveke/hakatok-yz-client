import type { Shipment } from "@/entities/shipment/types";
import { mockStore } from "@/shared/lib/mock-store";

const BASE_URL = 'https://hakaton-yz-api.onrender.com';

export async function getShipmentsApi(): Promise<Shipment[]> {
  const response = await fetch(`${BASE_URL}/shipments`);
  if (!response.ok) throw new Error('Помилка завантаження');
  
  const data = await response.json();
  // Повертаємо дані як є, бо ми вже підправили інтерфейс Shipment під Івана
  return data;
}

export async function updateShipmentStatusApi(id: string, status: string) {
  const response = await fetch(`${BASE_URL}/shipments/${id}`, {
    method: 'PATCH', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) throw new Error('Не вдалося оновити статус');
  return response.json();
}