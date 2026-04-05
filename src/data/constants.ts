export const STATIONS = [
  // ПІВДЕННО-ЗАХІДНА (Центр)
  { id: 'kyiv-pas', name: 'Київ-Пасажирський', dist: 0 },
  { id: 'darn', name: 'Дарниця', dist: 15 },
  { id: 'kyiv-vol', name: 'Київ-Волинський', dist: 10 },
  { id: 'kyiv-dem', name: 'Київ-Деміївський', dist: 7 },
  { id: 'kyiv-tov', name: 'Київ-Товарний', dist: 5 },

  // ЛЬВІВСЬКА (Захід)
  { id: 'lviv-gol', name: 'Львів-Головний', dist: 572 },
  { id: 'stryi', name: 'Стрий', dist: 645 },
  { id: 'chop', name: 'Чоп', dist: 810 },
  { id: 'most-2', name: 'Мостиська 2', dist: 650 },
  { id: 'kovel', name: 'Ковель', dist: 450 },

  // ОДЕСЬКА (Південь)
  { id: 'odesa-gol', name: 'Одеса-Головна', dist: 650 },
  { id: 'chornomorsk', name: 'Чорноморськ-Порт', dist: 680 },
  { id: 'izmail', name: 'Ізмаїл', dist: 930 },
  { id: 'rozdilna', name: 'Роздільна', dist: 580 },
  { id: 'pomichna', name: 'Помічна', dist: 330 },

  // ПІВДЕННА (Схід)
  { id: 'kharkiv-pas', name: 'Харків-Пасажирський', dist: 490 },
  { id: 'kharkiv-sort', name: 'Харків-Сортувальний', dist: 495 },
  { id: 'lozova', name: 'Лозова', dist: 640 },
  { id: 'poltava-kyiv', name: 'Полтава-Київська', dist: 330 },
  { id: 'kremenchuk', name: 'Кременчук', dist: 350 },

  // ПРИДНІПРОВСЬКА
  { id: 'dnipro-gol', name: 'Дніпро-Головний', dist: 530 },
  { id: 'nyzhniodnipr', name: 'Нижньодніпровськ', dist: 535 },
  { id: 'kamianske', name: 'Кам’янське', dist: 495 },
  { id: 'nikopol', name: 'Нікополь', dist: 620 },
  { id: 'apostolove', name: 'Апостолове', dist: 580 }
];

export const ECONOMICS = {
  EMPTY_COST_PER_KM: 20,
  LOADED_PROFIT_PER_KM: 30,
};

export const CARGO_TYPES = [
  { id: 'ore', label: 'Руда (Піввагон)', wagonType: 'піввагон' },
  { id: 'grain', label: 'Зерно (Зерновоз)', wagonType: 'зерновоз' },
  { id: 'rubble', label: 'Щебінь (Піввагон)', wagonType: 'піввагон' },
  { id: 'cement', label: 'Цемент (Цементовоз)', wagonType: 'цементовіз' },
];