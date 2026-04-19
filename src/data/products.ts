export type ProductCategory = 'romantic' | 'rock' | 'dedication' | 'custom' | 'text' | 'music' | 'jingle';
export type ProductMood = 'romantic' | 'energetic' | 'melancholic' | 'inspiring' | 'dramatic';

export interface Product {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  price: number;
  category: ProductCategory;
  mood: ProductMood;
  coverGradient: string;
  /** Обложка (релизы, услуги с визуалом) */
  coverImage?: string;
  includes: string[];
  timeline: string;
  format: string;
  targetAudience: string;
  type: 'song' | 'service';
}

export const categoryLabels: Record<ProductCategory, string> = {
  romantic: 'Романтичные песни',
  rock: 'Рок-баллады',
  dedication: 'Песни-посвящения',
  custom: 'Песни на заказ',
  text: 'Тексты песен',
  music: 'Музыка для проектов',
  jingle: 'Джинглы и заставки',
};

export const moodLabels: Record<ProductMood, string> = {
  romantic: 'Романтика',
  energetic: 'Энергия',
  melancholic: 'Меланхолия',
  inspiring: 'Вдохновение',
  dramatic: 'Драма',
};

export const products: Product[] = [
  {
    id: 'personal-song',
    title: 'Персональная песня',
    description: 'Уникальная песня, созданная специально для вашей истории. Текст + музыка + вокал.',
    fullDescription: 'Я создам для вас полноценную персональную песню — от идеи до финального звучания. Мы вместе обсудим вашу историю, настроение, ключевые слова и образы. Результат — уникальный трек с профессиональным вокалом, который станет вашим личным музыкальным посланием.',
    price: 15000,
    category: 'custom',
    mood: 'romantic',
    coverGradient: 'from-rose/20 to-burgundy/30',
    coverImage:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=900&q=80&auto=format&fit=crop',
    includes: ['Текст песни', 'Музыка и аранжировка', 'AI-вокал', 'Мастеринг', '2 правки'],
    timeline: '5–7 дней',
    format: 'MP3 + WAV + текст',
    targetAudience: 'Для тех, кто хочет подарить уникальную песню любимому человеку или сохранить важный момент в музыке.',
    type: 'service',
  },
  {
    id: 'song-text',
    title: 'Текст песни на заказ',
    description: 'Авторский текст под ваше настроение, историю или проект.',
    fullDescription: 'Напишу для вас авторский текст песни, который точно передаст вашу эмоцию, историю или идею. Работаю в разных жанрах — от нежной лирики до мощного рока. Текст будет ритмически выверен и готов к записи.',
    price: 3000,
    category: 'text',
    mood: 'inspiring',
    coverGradient: 'from-plum/20 to-primary/30',
    includes: ['Текст песни (куплеты + припевы)', 'Концепция и настроение', '2 правки'],
    timeline: '3–5 дней',
    format: 'Текстовый документ',
    targetAudience: 'Для музыкантов, продюсеров, блогеров и всех, кому нужен качественный авторский текст.',
    type: 'service',
  },
  {
    id: 'music-arrangement',
    title: 'Музыка и аранжировка',
    description: 'Создание музыкальной композиции или аранжировки для вашего проекта.',
    fullDescription: 'Создам музыкальную композицию или аранжировку с помощью нейросетей и профессиональных инструментов. Подберу стиль, темп, настроение — от минималистичного фортепиано до полноценной рок-аранжировки.',
    price: 5000,
    category: 'music',
    mood: 'dramatic',
    coverGradient: 'from-graphite/40 to-secondary/60',
    includes: ['Инструментальная композиция', 'Подбор стиля и настроения', 'Мастеринг', '1 правка'],
    timeline: '4–6 дней',
    format: 'MP3 + WAV',
    targetAudience: 'Для видеографов, подкастеров, брендов и творческих проектов.',
    type: 'service',
  },
  {
    id: 'ai-song-full',
    title: 'AI-песня под ключ',
    description: 'Полный цикл: концепция → текст → музыка → вокал → мастеринг.',
    fullDescription: 'Комплексная услуга создания песни полного цикла. Я возьму на себя всё — от разработки концепции до финального мастеринга. Идеально для подарков, событий, контента и личных проектов.',
    price: 20000,
    category: 'custom',
    mood: 'energetic',
    coverGradient: 'from-primary/30 to-rose-glow/20',
    includes: ['Концепция и сценарий', 'Текст песни', 'Музыка и аранжировка', 'AI-вокал', 'Сведение и мастеринг', '3 правки', 'Обложка для трека'],
    timeline: '7–10 дней',
    format: 'MP3 + WAV + текст + обложка',
    targetAudience: 'Для тех, кто хочет получить готовую песню без погружения в процесс.',
    type: 'service',
  },
  {
    id: 'jingle',
    title: 'Джингл / Музыкальная заставка',
    description: 'Короткий запоминающийся аудиофрагмент для подкаста, канала или бренда.',
    fullDescription: 'Создам уникальный джингл или музыкальную заставку, которая станет звуковой визитной карточкой вашего проекта. Короткий, яркий, запоминающийся.',
    price: 7000,
    category: 'jingle',
    mood: 'energetic',
    coverGradient: 'from-burgundy/30 to-plum/20',
    includes: ['Джингл 10–30 секунд', 'Подбор стиля', '2 варианта', '1 правка'],
    timeline: '3–5 дней',
    format: 'MP3 + WAV',
    targetAudience: 'Для блогеров, подкастеров, YouTube-каналов, брендов.',
    type: 'service',
  },
  {
    id: 'artist-concept',
    title: 'Разработка музыкального концепта для артиста',
    description:
      'Позиционирование, звучание и визуальный образ — единая стратегия для вашего артистического проекта.',
    fullDescription:
      'Соберу для вас цельную музыкальную концепцию: ниша и аудитория, референсы и отличия, тон коммуникации, направление звучания и логика релизов. Подходит артистам на старте и тем, кто меняет стиль или выходит на новый уровень. Результат — структурированная презентация и дорожная карта, с которой удобно работать с продюсером и командой.',
    price: 25000,
    category: 'custom',
    mood: 'inspiring',
    coverGradient: 'from-plum/25 to-primary/30',
    includes: [
      'Аудит референсов и конкурентного поля',
      'Музыкальная и образная концепция',
      'Рекомендации по релизам и контенту',
      '2 созвона для уточнения задач',
    ],
    timeline: '10–14 дней',
    format: 'Презентация + поясняющий документ',
    targetAudience: 'Для артистов, проектов и лейблов, которым нужна ясная творческая стратегия.',
    type: 'service',
  },
  {
    id: 'consultation-idea',
    title: 'Консультация / разбор идеи',
    description:
      'Помогу определить формат трека, стиль, подачу, структуру и следующий шаг по вашему музыкальному проекту.',
    fullDescription:
      'Разберём вашу идею и референсы: подберём формат трека, жанр и настроение, логику структуры и подачу. В конце — понятный план: что делать дальше и в каком порядке. Подходит, если вы на старте, меняете направление или хотите свериться перед записью или продакшеном.',
    price: 3000,
    category: 'custom',
    mood: 'inspiring',
    coverGradient: 'from-secondary/35 to-plum/25',
    includes: ['Разбор идеи и референсов', 'Рекомендации по формату и структуре', 'Следующие шаги по проекту', '1 созвон'],
    timeline: '1–2 дня',
    format: 'Видеозвон или письменный разбор',
    targetAudience: 'Для авторов, артистов и проектов, которым нужна ясность до начала работы над треком.',
    type: 'service',
  },
  {
    id: 'rock-ballad-01',
    title: '«Огни большого города»',
    description: 'Рок-баллада о дороге, мечтах и огнях ночного города.',
    fullDescription: 'Атмосферная рок-баллада с мощным припевом и нежными куплетами. История о пути, который мы выбираем, о ночных дорогах и свете, который ведёт нас вперёд.',
    price: 3000,
    category: 'rock',
    mood: 'dramatic',
    coverGradient: 'from-graphite/50 to-primary/20',
    includes: ['Готовый трек', 'Текст песни', 'Лицензия на личное использование'],
    timeline: 'Мгновенно',
    format: 'MP3',
    targetAudience: 'Для ценителей рок-музыки и атмосферных баллад.',
    type: 'song',
    coverImage:
      'https://images.unsplash.com/photo-1498038432885-c6f3b84b8430?w=900&q=80&auto=format&fit=crop',
  },
  {
    id: 'romantic-01',
    title: '«Между строк»',
    description: 'Нежная романтичная композиция о невысказанных чувствах.',
    fullDescription: 'Трепетная песня о том, что мы чувствуем, но не решаемся сказать. Мягкая мелодия, проникновенный вокал и слова, которые касаются сердца.',
    price: 2500,
    category: 'romantic',
    mood: 'romantic',
    coverGradient: 'from-rose/30 to-plum/20',
    includes: ['Готовый трек', 'Текст песни', 'Лицензия на личное использование'],
    timeline: 'Мгновенно',
    format: 'MP3',
    targetAudience: 'Для романтиков и любителей лирической музыки.',
    type: 'song',
    coverImage:
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=900&q=80&auto=format&fit=crop',
  },
  {
    id: 'dedication-01',
    title: '«Для тебя»',
    description: 'Песня-посвящение, полная тепла и искренних слов.',
    fullDescription: 'Тёплая, искренняя песня, созданная как музыкальное послание. Идеально подходит как подарок близкому человеку на любое событие.',
    price: 2500,
    category: 'dedication',
    mood: 'inspiring',
    coverGradient: 'from-rose-glow/20 to-burgundy/30',
    includes: ['Готовый трек', 'Текст песни', 'Лицензия на личное использование'],
    timeline: 'Мгновенно',
    format: 'MP3',
    targetAudience: 'Для тех, кто хочет подарить песню.',
    type: 'song',
    coverImage:
      'https://images.unsplash.com/photo-1520454974749-611b7247ffed?w=900&q=80&auto=format&fit=crop',
  },
];
