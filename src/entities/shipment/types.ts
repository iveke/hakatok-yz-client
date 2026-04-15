import type { CargoType } from "@/entities/wagon/types";

export type ShipmentStatus =
  | "pending"
  | "matched"
  | "confirmed"
  | "in_transit"
  | "delivered";

export interface Shipment {
  id: string;
  fromStationId: number;
  cargo: number;
  fromLat: number;
  fromLon: number;
  toLat: number;
  toLon: number;
  fromCity: string;
  toCity: string;
  deadline: string;
  isAssigned: boolean;
  status: "Pending" | "Assigned" | "Completed"; // У Івана з великої!
}

export interface WagonSuggestion {
  wagonId: string;
  wagonType: string;
  currentStationId: string;
  currentStationName: string;
  distanceKm: number;
  savingsUah: number;
}
