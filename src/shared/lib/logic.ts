import { STATIONS } from "../../data/constants";

export const calculateBusterLogic = (fromId: string, toId: string, shipmentId: number) => {
  const from = STATIONS.find(s => s.id === fromId);
  const to = STATIONS.find(s => s.id === toId);

  if (!from || !to) return { distance: 0, cost: 0, totalRoute: 0 };

  // Логіка маршруту (вона стабільна)
  let totalRoute = (from.id.includes('odesa') && to.id.includes('odesa')) || (from.dist < 20 && to.dist < 20)
    ? Math.abs(from.dist - to.dist)
    : from.dist + to.dist;
  
  if (totalRoute === 0 && fromId !== toId) totalRoute = 20;

  // Розрахунок дати (200 км на добу + 1 день)
  const daysInTransit = Math.ceil(totalRoute / 200) + 1;
  const arrival = new Date();
  arrival.setDate(arrival.getDate() + daysInTransit);
  
  const formattedDate = arrival.toLocaleDateString('uk-UA', { 
    day: 'numeric', month: 'long' 
  });

  // ФІКСАЦІЯ ВИПАДКОВОСТІ:
  // Використовуємо shipmentId як "зерно", щоб Math.random не стрибав
  const pseudoRandom = (shipmentId % 100) + 20; 
  const distanceToEmptyWagon = pseudoRandom; 
  const cost = distanceToEmptyWagon * 20;

  return {
    distance: distanceToEmptyWagon,
    cost: cost,
    totalRoute: totalRoute,
    arrival: formattedDate
  };
};