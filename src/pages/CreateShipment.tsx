import React from 'react';
import { ShipmentForm } from '../shared/features/create-shipment/ui/ShipmentForm';

interface CreateShipmentProps {
  onAdd: (data: any) => void;
}

export const CreateShipment = ({ onAdd }: CreateShipmentProps) => {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Заголовок сторінки */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-black text-[#003366] uppercase tracking-tight">
          Нова заявка на перевезення
        </h1>
        <p className="text-gray-500 font-medium">
          Заповніть дані, щоб Buster підібрав оптимальний вагон
        </p>
      </div>

      <ShipmentForm onAdd={onAdd} />

      {/* Можна додати якийсь Shared елемент, наприклад, футер сторінки */}
      <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">
        Buster Logistic System • Ukrzaliznycia 2026
      </p>
    </div>
  );
};