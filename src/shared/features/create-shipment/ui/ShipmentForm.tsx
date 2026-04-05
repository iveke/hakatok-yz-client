import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { shipmentSchema, ShipmentFormData } from '../../../lib/shipmentSchema';// Шлях до твоєї схеми
import { STATIONS, CARGO_TYPES } from '../../../../data/constants';

interface Props {
  onAdd: (data: any) => void;
}

export const ShipmentForm = ({ onAdd }: Props) => {
  // Ініціалізація React Hook Form з підключеним Zod
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset
  } = useForm<ShipmentFormData>({
    resolver: zodResolver(shipmentSchema),
    mode: 'onChange' // Валідація буде спрацьовувати при кожній зміні
  });

  const onSubmit = (data: ShipmentFormData) => {
    onAdd(data);
    reset(); // Очищуємо форму після успішного додавання
  };


  const todayStr = new Date().toISOString().split('T')[0];
  <input 
  type="date"
  min={todayStr} // ЦЕ ЗАБОРОНИТЬ ВИБІР МИНУЛОГО В КАЛЕНДАРІ
  {...register('deadline')}
  className={`w-full p-4 bg-gray-50 border-2 rounded-2xl font-bold ${
    errors.deadline ? 'border-red-500' : 'border-transparent'
  }`} />


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-3xl shadow-2xl space-y-6 border border-gray-100">
      <h2 className="text-2xl font-black text-[#003366] mb-6">Нова заявка</h2>

      {/* ПОЛЕ: ТИП ВАНТАЖУ */}
      <div>
        <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 font-black">Тип вантажу</label>
        <select 
          {...register('cargoType')}
          className={`w-full p-4 bg-gray-50 border-2 rounded-2xl font-bold transition-all ${errors.cargoType ? 'border-red-500' : 'border-transparent focus:border-[#003366]'}`}
        >
          <option value="">Оберіть тип...</option>
          {CARGO_TYPES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
        </select>
        {errors.cargoType && <p className="text-red-500 text-[9px] mt-1 font-bold uppercase">{errors.cargoType.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* ПОЛЕ: ЗВІДКИ */}
        <div>
          <label className="block text-[10px] font-black uppercase text-gray-400 mb-2">Звідки</label>
          <select 
            {...register('fromStation')}
            className={`w-full p-4 bg-gray-50 border-2 rounded-2xl font-bold transition-all ${errors.fromStation ? 'border-red-500' : 'border-transparent focus:border-[#003366]'}`}
          >
            <option value="">Оберіть станцію...</option>
            {STATIONS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          {errors.fromStation && <p className="text-red-500 text-[9px] mt-1 font-bold uppercase">{errors.fromStation.message}</p>}
        </div>

        {/* ПОЛЕ: КУДИ */}
        <div>
          <label className="block text-[10px] font-black uppercase text-gray-400 mb-2">Куди</label>
          <select 
            {...register('toStation')}
            className={`w-full p-4 bg-gray-50 border-2 rounded-2xl font-bold transition-all ${errors.toStation ? 'border-red-500' : 'border-transparent focus:border-[#003366]'}`}
          >
            <option value="">Оберіть станцію...</option>
            {STATIONS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          {errors.toStation && <p className="text-red-500 text-[9px] mt-1 font-bold uppercase">{errors.toStation.message}</p>}
        </div>
      </div>

      {/* ТВОЄ ПОЛЕ: КІЛЬКІСТЬ ВАГОНІВ */}
      <div>
        <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 font-black">Кількість вагонів</label>
        <input 
          type="number"
          {...register('count', { valueAsNumber: true })}
          className={`w-full p-4 bg-gray-50 border-2 rounded-2xl font-bold transition-all ${errors.count ? 'border-red-500' : 'border-transparent focus:border-[#003366]'}`}
        />
        {errors.count && <p className="text-red-500 text-[9px] mt-1 font-bold uppercase italic">⚠️ {errors.count.message}</p>}
      </div>

      {/* ПОЛЕ: ДЕДЛАЙН */}
      <div>
        <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 font-black">Дедлайн доставки</label>
        <input 
          type="date"
          {...register('deadline')}
          className={`w-full p-4 bg-gray-50 border-2 rounded-2xl font-bold transition-all ${errors.deadline ? 'border-red-500' : 'border-transparent focus:border-[#003366]'}`}
        />
        {errors.deadline && <p className="text-red-500 text-[9px] mt-1 font-bold uppercase">{errors.deadline.message}</p>}
      </div>

      {/* КНОПКА СТВОРЕННЯ */}
      <button
        type="submit"
        disabled={!isValid}
        className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest transition-all ${
          isValid 
            ? 'bg-[#003366] text-[#FFD700] hover:bg-[#002244] shadow-lg active:scale-95 cursor-pointer' 
            : 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-50'
        }`}
      >
        Створити заявку на Buster
      </button>
    </form>
  );
};