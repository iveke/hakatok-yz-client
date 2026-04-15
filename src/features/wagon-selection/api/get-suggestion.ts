import type { WagonSuggestion } from "@/entities/shipment/types";

const BASE_URL = 'https://hakaton-yz-api.onrender.com';

// Описуємо структуру, яку реально присилає Іван (те, що ми бачили в JSON)
interface RawSuggestionResponse {
  wagon: {
    id: string;
    city: string | null;
    type: number;
    currentStationId: number;
  } | null;
  distanceKm: number;
  totalCost: number;
}

export async function getWagonSuggestion(shipmentId: string): Promise<WagonSuggestion[]> {
  try {
    const response = await fetch(`${BASE_URL}/suggestion/${shipmentId}`);

    if (!response.ok) return [];

    // Кажемо Тайпскрипту, що ми чекаємо саме таку структуру
    const data = (await response.json()) as RawSuggestionResponse[];
    
    return data.map((item): WagonSuggestion => {
      const w = item.wagon;
      
      return {
        wagonId: w?.id || "W-UNKNOWN",
        wagonType: w?.type === 0 ? "Універсальний" : `Тип ${w?.type}`,
        currentStationId: String(w?.currentStationId || "0"),
        currentStationName: w?.city || "Невідома станція",
        distanceKm: Math.round(item.distanceKm || 0),
        savingsUah: Math.floor(item.totalCost || 0)
      };
    });

  } catch (error) {
    console.error("❌ Помилка під час запиту:", error);
    return [];
  }
}