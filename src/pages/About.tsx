import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Music, Mic, Star, Palette } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
};

const About: React.FC = () => (
  <>
    <section className="py-24">
      <div className="container">
        <motion.div initial="hidden" animate="visible" className="mx-auto max-w-3xl text-center">
          <motion.p variants={fadeUp} custom={0} className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Обо мне</motion.p>
          <motion.h1 variants={fadeUp} custom={1} className="mt-3 font-display text-4xl font-bold md:text-5xl">
            История <span className="text-primary">MELANØ</span>
          </motion.h1>
          <motion.p variants={fadeUp} custom={2} className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Меня зовут Анастасия Мельникова. Я — автор песен и AI-музыкант. Мой творческий псевдоним — MELANØ.
          </motion.p>
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
