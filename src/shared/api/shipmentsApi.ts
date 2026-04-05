import { Shipment } from "../lib/shipmentSchema";

let mockDb: Shipment[] = JSON.parse(localStorage.getItem('buster_shipments') || '[]');

export const shipmentsApi = {
  getShipments: async (): Promise<Shipment[]> => {
    await new Promise(resolve => setTimeout(resolve, 800)); 
    return mockDb;
  },
  
  updateStatus: async ({ id, status }: { id: number, status: Shipment['status'] }) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    mockDb = mockDb.map(s => s.id === id ? { ...s, status } : s);
    localStorage.setItem('buster_shipments', JSON.stringify(mockDb));
    return { success: true };
  }
};