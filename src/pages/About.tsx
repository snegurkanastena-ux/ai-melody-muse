import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Music, Mic, Star, Palette } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
};

const musicPlatforms = [
  {
    label: 'Apple Music',
    href: 'https://music.apple.com/us/artist/%D0%B0%D0%BD%D0%B0%D1%81%D1%82%D0%B0%D1%81%D0%B8%D1%8F-%D0%BC%D0%B5%D0%BB%D1%8C%D0%BD%D0%B8%D0%BA%D0%BE%D0%B2%D0%B0/1509718473?l=ru',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" aria-hidden>
        <path
          fill="currentColor"
          d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73.83 1.94 1.46 2.94 1.44.11-1.2-.43-2.38-1.29-3.19-.86-.81-2.25-1.42-3.39-1.38-.14 1.18.45 2.35 1.74 3.13z"
        />
      </svg>
    ),
  },
  {
    label: 'VK Музыка',
    href: 'https://vk.ru/artist/anastasiamelnikova_mtu4ode1mjiyoa',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-[#0077FF]" aria-hidden>
        <path
          fill="currentColor"
          d="M15.684 0H8.316C3.552 0 0 3.444 0 8.16v7.68C0 20.556 3.552 24 8.316 24h7.368C20.448 24 24 20.556 24 15.84V8.16C24 3.444 20.448 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 3.978 8.196c-.068-.407.087-.621.474-.621h1.753c.35 0 .458.15.58.524.63 2.123 1.678 3.988 2.113 3.988.163 0 .237-.075.237-.474V9.089c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.407.458-.407h2.744c.305 0 .407.15.407.593v3.473c0 .305.15.407.237.407.163 0 .305-.102.61-.407 1.033-1.186 2.23-3.002 2.23-3.002.17-.254.305-.356.58-.356h1.753c.424 0 .509.203.424.593-.678 2.57-2.113 4.35-2.113 4.35-.254.356-.356.509 0 .915.254.305 1.084 1.033 1.304 1.338.424.593.593 1.084.593 1.338v.254c0 .356-.17.509-.593.509z"
        />
      </svg>
    ),
  },
  {
    label: 'Яндекс Музыка',
    href: 'https://music.yandex.ru/artist/9096774?ref_id=68155A05-5966-4C17-8D89-A956114AE282&utm_medium=copy_link',
    icon: <Music className="h-5 w-5 shrink-0 text-[#FC3F1D]" aria-hidden strokeWidth={2} />,
  },
] as const;

const About: React.FC = () => (
  <>
    <section className="py-24">
      <div className="container">
        <motion.div initial="hidden" animate="visible" className="mx-auto max-w-3xl text-center">
          <motion.p variants={fadeUp} custom={0} className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Обо мне</motion.p>
          <motion.h1 variants={fadeUp} custom={1} className="mt-3 font-display text-4xl font-bold md:text-5xl">
            История <span className="text-primary">MELANØ</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="mx-auto mt-6 max-w-xl text-balance text-lg leading-relaxed text-muted-foreground md:text-xl md:leading-relaxed"
          >
            Меня зовут Анастасия Мельникова. Я — автор песен и AI-музыкант. Мой творческий псевдоним — MELANØ.
          </motion.p>
          <motion.div
            variants={fadeUp}
            custom={3}
            className="mt-8 flex flex-wrap items-stretch justify-center gap-3 md:flex-nowrap"
          >
            {musicPlatforms.map(({ href, label, icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] min-w-[min(100%,11rem)] flex-1 basis-[calc(50%-0.375rem)] items-center justify-center gap-2.5 rounded-full border border-border/40 bg-card/50 px-4 py-3 text-sm font-medium text-foreground shadow-sm transition-all hover:border-primary/45 hover:bg-card/80 hover:shadow-[0_0_28px_-10px_hsl(340_60%_55%/0.35)] sm:min-w-[10.5rem] sm:flex-initial md:basis-auto"
              >
                {icon}
                <span>{label}</span>
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>

    <section className="border-t border-border/30 py-24">
      <div className="container">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="rounded-2xl border border-border/30 bg-card/50 p-8 md:p-12">
            <h2 className="font-display text-2xl font-bold">Как всё началось</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Музыка всегда была частью моей жизни. Я писала стихи с детства, мечтала о сцене и искала свой голос. Когда появились нейросети, способные создавать музыку, я поняла — это мой путь. Не замена творчества, а его усиление. AI стал моим инструментом, а я — его душой.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Проект MELANØ — это синтез глубоких человеческих эмоций и передовых технологий. Каждая песня начинается с истории — вашей истории. Я превращаю чувства, воспоминания и мечты в звук, который трогает сердце.
            </p>
          </div>

          <div className="rounded-2xl border border-border/30 bg-card/50 p-8 md:p-12">
            <h2 className="font-display text-2xl font-bold">Творческая концепция</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              MELANØ — это не просто музыка. Это атмосфера. Мой стиль — на стыке романтики и рока, нежности и силы, цифрового искусства и живой эмоции. Я верю, что AI-музыка может быть такой же пронзительной, как песня, написанная за старым фортепиано в три часа ночи.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Мои вдохновения: ночные города, дорога, неоновый свет, истории любви, сила женского голоса, рок-баллады 90-х и современный digital art.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section className="border-t border-border/30 py-24">
      <div className="container">
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Преимущества</p>
          <h2 className="mt-3 font-display text-3xl font-bold">Почему ко мне приходят</h2>
        </div>
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Heart, title: 'Эмоция', desc: 'Каждая песня пронизана настоящим чувством.' },
            { icon: Sparkles, title: 'Технологии', desc: 'Использую лучшие AI-инструменты для создания музыки.' },
            { icon: Music, title: 'Качество', desc: 'Профессиональное звучание и мастеринг.' },
            { icon: Mic, title: 'Индивидуальность', desc: 'Никаких шаблонов — только ваша уникальная история.' },
            { icon: Star, title: 'Опыт', desc: 'Десятки завершённых проектов и довольных клиентов.' },
            { icon: Palette, title: 'Стиль', desc: 'Узнаваемая авторская эстетика MELANØ.' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
              className="rounded-2xl border border-border/30 bg-card/50 p-6 text-center"
            >
              <item.icon className="mx-auto mb-3 h-8 w-8 text-primary/60" />
              <h3 className="font-display text-base font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default About;
