import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Music, FileText, Mic, Sparkles, Radio, Palette, ArrowRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const services = [
  { icon: Music, title: 'Персональная песня', desc: 'Уникальная песня с текстом, музыкой и вокалом, созданная по вашей истории.', price: 'от 15 000 ₽', link: '/product/personal-song' },
  { icon: FileText, title: 'Текст песни на заказ', desc: 'Авторский текст под ваше настроение, проект или событие.', price: 'от 5 000 ₽', link: '/product/song-text' },
  { icon: Mic, title: 'Музыка и аранжировка', desc: 'Инструментальная композиция любого стиля для ваших задач.', price: 'от 8 000 ₽', link: '/product/music-arrangement' },
  { icon: Sparkles, title: 'AI-песня под ключ', desc: 'Полный цикл создания — от концепции до мастеринга.', price: 'от 20 000 ₽', link: '/product/ai-song-full' },
  { icon: Radio, title: 'Джингл / Заставка', desc: 'Короткий запоминающийся аудиофрагмент для вашего проекта.', price: 'от 7 000 ₽', link: '/product/jingle' },
  { icon: Palette, title: 'Авторский digital-продукт', desc: 'Уникальный цифровой музыкальный продукт по вашему запросу.', price: 'Индивидуально', link: '/contact' },
];

const Services: React.FC = () => (
  <section className="py-24">
    <div className="container">
      <div className="mb-16 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Услуги</p>
        <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">Что я создаю</h1>
        <p className="mx-auto mt-4 max-w-lg text-muted-foreground">Каждый проект — это индивидуальная работа с вашей историей и эмоцией</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <motion.div
            key={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={i}
            className="group interactive-card flex flex-col p-8"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <s.icon className="h-5 w-5" />
            </div>
            <h3 className="font-display text-xl font-semibold">{s.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            <p className="mt-4 font-display text-lg font-bold text-primary">{s.price}</p>
            <Link
              to={s.link}
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-rose-glow"
            >
              Подробнее <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
