/** Обложки из `public/covers/` (пути от корня сайта) */
export const COVERS = {
  bezSvideteley: '/covers/bez-svideteley.jpg',
  vesnaMezhduStrok: '/covers/vesna-mezhdu-strok.png',
  budniT2: '/covers/budni-t2.png',
  vseNormalno: '/covers/vse-normalno.png',
  biznesPartner: '/covers/biznes-partner.png',
  vypusknoy: '/covers/vypusknoy.png',
} as const;

/** Блок 1 — MELANØ, новый проект */
export const catalogMelanoNew = {
  heading: 'MELANØ',
  subtitle: 'Новый проект',
  album: {
    title: 'Без свидетелей',
    status: 'Скоро',
    coverSrc: COVERS.bezSvideteley,
    tracks: ['Без свидетелей', 'На красный', 'Слишком взрослая', 'Ночная полоса'],
  },
} as const;

/** Блок 2 — ранее выпущено */
export const catalogPrevious = {
  heading: 'Ранее выпущено',
  subtitle: 'Релизы, выпущенные под именем Анастасия Мельникова',
  album: {
    title: 'Весна между строк',
    coverSrc: COVERS.vesnaMezhduStrok,
  },
} as const;

export interface CatalogSingleRelease {
  title: string;
  description: string;
  coverSrc: string;
}

export const catalogPreviousSingles: CatalogSingleRelease[] = [
  {
    title: 'Будни T2',
    description: 'Сингл в дискографии Анастасии Мельниковой — городской ритм и лирическая интонация.',
    coverSrc: COVERS.budniT2,
  },
  {
    title: 'Все нормально',
    description: 'Отдельный релиз: спокойная подача и честный текст в аранжировке под голос.',
    coverSrc: COVERS.vseNormalno,
  },
];

/** Блок 3 — клиентские работы */
export interface CatalogClientWork {
  title: string;
  description: string;
  coverSrc: string;
}

export const catalogClientWorks: CatalogClientWork[] = [
  {
    title: 'Бизнес партнёр',
    description: 'Корпоративный гимн и подача под бренд — энергия и уверенность без штампа.',
    coverSrc: COVERS.biznesPartner,
  },
  {
    title: 'Выпускной',
    description: 'Тёплая выпускная песня о школе, друзьях и дороге вперёд.',
    coverSrc: COVERS.vypusknoy,
  },
];
