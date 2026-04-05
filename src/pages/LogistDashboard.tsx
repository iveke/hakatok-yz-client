import React from 'react';
import { STATIONS } from '../data/constants';
import { CARGO_TYPES } from '../data/constants';
import { calculateBusterLogic } from '../shared/lib/logic';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { shipmentsApi } from '../shared/api/shipmentsApi'; 
import { Shipment } from '../shared/lib/shipmentSchema';

export const LogistDashboard = () => {
  const queryClient = useQueryClient();

  const { data: shipments, isLoading } = useQuery({
    queryKey: ['shipments'],
    queryFn: shipmentsApi.getShipments,
  });

  const mutation = useMutation({
    mutationFn: shipmentsApi.updateStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shipments'] });
    },
  });

  const handleStatus = (id: number, newStatus: Shipment['status']) => {
    mutation.mutate({ id, status: newStatus });
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="h-10 w-64 bg-gray-200 animate-pulse rounded-lg"></div>
        {[1, 2].map(i => (
          <div key={i} className="h-48 bg-white rounded-2xl animate-pulse border-l-8 border-gray-200"></div>
        ))}
        <p className="text-center text-gray-400 font-bold uppercase animate-bounce">
          Аналізуємо залізничну мережу...
        </p>
      </div>
    );
  }
    return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-black text-[#003366] uppercase">Панель управління Buster</h1>
      
      {!shipments || shipments.length === 0 ? (
        <div className="bg-white p-10 rounded-2xl shadow text-center text-gray-400 font-bold">
          Заявок поки немає. Створіть першу як "Клієнт".
        </div>
      ) : (
        shipments.map((s) => {
          const stats = calculateBusterLogic(s.fromStation, s.toStation, s.id);

          return (
            <div key={s.id} className="bg-white rounded-2xl shadow-xl overflow-hidden border-l-8 border-[#FFD700] flex flex-col md:flex-row">
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-gray-100 px-3 py-1 rounded text-xs font-bold text-gray-500 uppercase">№{s.id}</span>
                  <span className="bg-blue-100 text-[#003366] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider px-3">В обробці</span>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Тип вантажу</p>
                    <p className="font-black text-[#003366] text-sm">{CARGO_TYPES.find(c => c.id === s.cargoType)?.label || s.cargoType}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Кількість</p>
                    <p className="font-black text-[#003366] text-sm">{s.count} ваг.</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Маршрут замовника</p>
                    <p className="font-bold text-gray-700">
                      {STATIONS.find(st => st.id === s.fromStation)?.name} 
                      <span className="mx-2 text-gray-300">→</span> 
                      {STATIONS.find(st => st.id === s.toStation)?.name}
                    </p>
                  </div>
                </div>
              </div>

              {/* ПРАВА ЧАСТИНА: БЛОК АЛГОРИТМУ (BUSTER) */}
                <div className="bg-[#003366] p-6 text-white w-full md:w-72 flex flex-col justify-between border-t-2 md:border-t-0 md:border-l-2 border-white/10">
                <div>
                    <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-[#FFD700] rounded-full animate-pulse"></div>
                    <p className="text-[10px] text-[#FFD700] font-black uppercase tracking-widest">Оптимізація Buster</p>
                    </div>

                    <div className="mb-4 p-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                    <p className="text-[9px] uppercase font-bold text-[#FFD700]">Перехоплення рейсу:</p>
                    <p className="text-[11px] leading-tight mt-1">
                        Вагон №{5000 + (s.id % 1000)} мав іти порожнім: <br/>
                        <span className="opacity-60 text-[9px]">Львів → Дніпро (800 км)</span>
                    </p>
                    <p className="text-[10px] mt-1 text-green-400 font-bold">
                        Рішення: Перенаправлено (+{stats.distance} км)
                    </p>
                    </div>
                    
                    <p className="text-[10px] opacity-60 uppercase font-bold">Додаткова подача:</p>
                    <p className="text-3xl font-black">{stats.distance} <span className="text-sm font-normal">км</span></p>
                    
                    <p className="text-[10px] text-[#FFD700] font-bold uppercase mt-1">
                    Витрати на маневр: {stats.cost.toLocaleString()} грн
                    </p>

                    <div className="mt-4 pt-4 border-t border-white/10 space-y-1">
                    <div className="flex justify-between text-[10px] opacity-70">
                        <span>Маршрут клієнта:</span>
                        <span>{stats.totalRoute} км</span>
                    </div>
                    <div className="flex justify-between text-[10px] opacity-70">
                        <span>Очікуване прибуття:</span>
                        <span className="font-bold text-white">{stats.arrival}</span>
                    </div>
                    <div className="flex justify-between text-[10px] font-bold text-green-400">
                        <span>Прибуток замовлення:</span>
                        <span>+{(stats.totalRoute * 30).toLocaleString()} грн</span>
                    </div>
                    </div>

                    <div className="mt-3 p-2 bg-green-500/10 rounded border border-green-500/20">
                    <p className="text-[9px] text-green-400 font-black uppercase">Ефект Buster:</p>
                    <p className="text-sm font-black text-white">Заощаджено: 15 200 грн</p>
                    <p className="text-[8px] opacity-50 uppercase leading-none mt-1">завдяки скасуванню холостого рейсу</p>
                    </div>
                </div>
                
                {s.status === 'pending' || !s.status ? (
                <div className="flex flex-col gap-2 mt-4">
                    <button 
                    onClick={() => handleStatus(s.id, 'confirmed')}
                    className="bg-[#FFD700] text-[#003366] w-full py-3 rounded-xl font-black text-[10px] uppercase shadow-lg hover:bg-white transition-all active:scale-95 border-2 border-[#FFD700]"
                    >
                    ПІДТВЕРДИТИ ВАРІАНТ
                    </button>
                    <button 
                    onClick={() => handleStatus(s.id, 'rejected')}
                    className="bg-transparent border-2 border-white/30 text-white w-full py-3 rounded-xl font-black text-[10px] uppercase hover:bg-red-500/20 hover:border-red-500 transition-all active:scale-95"
                    >
                    ВІДХИЛИТИ ЗАЯВКУ
                    </button>
                </div>
                ) : (
                <div className={`mt-4 p-4 rounded-xl text-center font-black uppercase text-[10px] tracking-widest shadow-inner ${
                    s.status === 'confirmed' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                }`}>
                    {s.status === 'confirmed' ? 'ПІДТВЕРДЖЕНО' : 'ВІДХИЛЕНО'}
                </div>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};