import { z } from 'zod';

export const shipmentSchema = z.object({
  cargoType: z.string().min(1, "Оберіть тип вантажу"),
  count: z.number().min(1, "Мінімум 1 вагон").max(100, "Максимум 100 вагонів за раз"),
  fromStation: z.string().min(1, "Оберіть станцію відправлення"),
  toStation: z.string().min(1, "Оберіть станцію призначення"),
  
  // ВАЛІДАЦІЯ ДАТИ
  deadline: z.string()
    .min(1, "Вкажіть дату доставки")
    .refine((date) => {
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Обнуляємо час, щоб порівнювати лише дні
      return selectedDate >= today;
    }, {
      message: "Дедлайн не може бути в минулому"
    }),
}).refine((data) => data.fromStation !== data.toStation, {
  message: "Станції не можуть збігатися",
  path: ["toStation"],
});

export type ShipmentFormData = z.infer<typeof shipmentSchema>;

export interface Shipment extends ShipmentFormData {
  id: number;
  status: 'pending' | 'confirmed' | 'rejected';
}