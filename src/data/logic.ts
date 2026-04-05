import { STATIONS } from "./constants";

export const getRailwayDistance = (id1: string, id2: string) => {
  const s1 = STATIONS.find(s => s.id === id1);
  const s2 = STATIONS.find(s => s.id === id2);

  if (!s1 || !s2) return 0;

  // Якщо обидві станції в Київському вузлі (dist < 20), просто віднімаємо
  if (s1.dist < 20 && s2.dist < 20) {
    return Math.abs(s1.dist - s2.dist);
  }

  // Якщо одна станція в Києві, а інша ні
  if (s1.dist === 0 || s2.dist === 0) {
    return Math.max(s1.dist, s2.dist);
  }

  // Логіка "зірки": щоб доїхати з Одеси у Львів, треба проїхати dist_одеса + dist_львів
  // (це найнадійніший метод для залізничного графа такого типу)
  return s1.dist + s2.dist;
};