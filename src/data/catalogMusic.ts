/** Обложки из `public/covers/` */
export const COVERS = {
  bezSvideteley: '/covers/bez-svideteley.jpg',
  vesnaMezhduStrok: '/covers/vesna-mezhdu-strok.jpg',
  budniT2: '/covers/budni-t2.png',
  vseNormalno: '/covers/vse-normalno.png',
  biznesPartner: '/covers/biznes-partner.png',
  vypusknoy: '/covers/vypusknoy.png',
} as const;

export interface CatalogPlayableTrack {
  id: string;
  title: string;
  audioSrc: string;
  coverSrc: string;
}

/** MELANØ — треки альбома «Без свидетелей» */
export const melanoAlbumTracks: CatalogPlayableTrack[] = [
  {
    id: 'melano-bez-svideteley',
    title: 'Без свидетелей',
    audioSrc: '/audio/albums/bez-svideteley/bez-svideteley.mp3',
    coverSrc: COVERS.bezSvideteley,
  },
  {
    id: 'melano-na-krasnyy',
    title: 'На красный',
    audioSrc: '/audio/albums/bez-svideteley/na-krasnyy.mp3',
    coverSrc: COVERS.bezSvideteley,
  },
  {
    id: 'melano-nochnaya-polosa',
    title: 'Ночная полоса',
    audioSrc: '/audio/albums/bez-svideteley/nochnaya-polosa.mp3',
    coverSrc: COVERS.bezSvideteley,
  },
  {
    id: 'melano-slishkom-vzroslaya',
    title: 'Слишком взрослая',
    audioSrc: '/audio/albums/bez-svideteley/slishkom-vzroslaya.mp3',
    coverSrc: COVERS.bezSvideteley,
  },
];

/** Блок 1 — MELANØ, новый проект */
export const catalogMelanoNew = {
  heading: 'MELANØ',
  subtitle: 'Новый проект',
  album: {
    title: 'Без свидетелей',
    status: 'Скоро',
    coverSrc: COVERS.bezSvideteley,
  },
} as const;

/** «Весна между строк» — треки альбома */
export const vesnaAlbumTracks: CatalogPlayableTrack[] = [
  { id: 'vesna-8-marta', title: '8 марта', audioSrc: '/audio/albums/vesna-mezhdu-strok/8-marta.mp3', coverSrc: COVERS.vesnaMezhduStrok },
  {
    id: 'vesna-bez-gromkih-slov',
    title: 'Без громких слов',
    audioSrc: '/audio/albums/vesna-mezhdu-strok/bez-gromkih-slov.wav',
    coverSrc: COVERS.vesnaMezhduStrok,
  },
  {
    id: 'vesna-title',
    title: 'Весна между строк',
    audioSrc: '/audio/albums/vesna-mezhdu-strok/vesna-mezhdu-strok.mp3',
    coverSrc: COVERS.vesnaMezhduStrok,
  },
  { id: 'vesna-vyhoda-net', title: 'Выхода нет', audioSrc: '/audio/albums/vesna-mezhdu-strok/vyhoda-net.mp3', coverSrc: COVERS.vesnaMezhduStrok },
  { id: 'vesna-imeyu-pravo', title: 'Имею право', audioSrc: '/audio/albums/vesna-mezhdu-strok/imeyu-pravo.mp3', coverSrc: COVERS.vesnaMezhduStrok },
  { id: 'vesna-otcy-i-deti', title: 'Отцы и дети', audioSrc: '/audio/albums/vesna-mezhdu-strok/otcy-i-deti.mp3', coverSrc: COVERS.vesnaMezhduStrok },
  { id: 'vesna-takzhe-kak-ya', title: 'Также как я', audioSrc: '/audio/albums/vesna-mezhdu-strok/takzhe-kak-ya.mp3', coverSrc: COVERS.vesnaMezhduStrok },
  { id: 'vesna-tishina-posle', title: 'Тишина после', audioSrc: '/audio/albums/vesna-mezhdu-strok/tishina-posle.mp3', coverSrc: COVERS.vesnaMezhduStrok },
  {
    id: 'vesna-hochu-yasnosti',
    title: 'Хочу ясности',
    audioSrc: '/audio/albums/vesna-mezhdu-strok/hochu-yasnosti.mp3',
    coverSrc: COVERS.vesnaMezhduStrok,
  },
];

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
  id: string;
  title: string;
  description: string;
  coverSrc: string;
  audioSrc: string;
}

export const catalogPreviousSingles: CatalogSingleRelease[] = [
  {
    id: 'single-budni-t2',
    title: 'Будни T2',
    description: 'Сингл в дискографии Анастасии Мельниковой — городской ритм и лирическая интонация.',
    coverSrc: COVERS.budniT2,
    audioSrc: '/audio/client/budni-t2.mp3',
  },
  {
    id: 'single-vse-normalno',
    title: 'Все нормально',
    description: 'Отдельный релиз: спокойная подача и честный текст в аранжировке под голос.',
    coverSrc: COVERS.vseNormalno,
    audioSrc: '/audio/singles/vse-normalno.mp3',
  },
];

/** Блок 3 — клиентские работы */
export interface CatalogClientWork {
  id: string;
  title: string;
  description: string;
  coverSrc: string;
  audioSrc: string;
}

export const catalogClientWorks: CatalogClientWork[] = [
  {
    id: 'client-biznes-partner',
    title: 'Бизнес партнёр',
    description: 'Корпоративный гимн и подача под бренд — энергия и уверенность без штампа.',
    coverSrc: COVERS.biznesPartner,
    audioSrc: '/audio/singles/biznes-partner.mp3',
  },
  {
    id: 'client-vypusknoy',
    title: 'Выпускной',
    description: 'Тёплая выпускная песня о школе, друзьях и дороге вперёд.',
    coverSrc: COVERS.vypusknoy,
    audioSrc: '/audio/client/vypusknoy.mp3',
  },
];
