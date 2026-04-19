import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Music, Sparkles, Heart, Mic, Star, ArrowRight, CheckCircle2, Quote } from 'lucide-react';
import { products } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useMusicNoteBurst } from '@/hooks/useMusicNoteBurst';
import heroBg from '@/assets/hero-bg.jpg';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
};

const Index: React.FC = () => {
  const { addItem } = useCart();
  const musicBurst = useMusicNoteBurst();
  const featured = products.slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="h-full w-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        </div>
        <div className="container relative z-10 py-20 text-center">
          <motion.div initial="hidden" animate="visible" className="mx-auto max-w-3xl">
            <motion.p variants={fadeUp} custom={0} className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-primary">
              AI-музыкант · Автор песен
            </motion.p>
            <motion.h1 variants={fadeUp} custom={1} className="font-display text-5xl font-bold leading-tight text-foreground md:text-7xl">
              Анастасия
              <br />
              <span className="text-glow-strong text-primary">Мельникова</span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Создаю уникальные песни, тексты и музыку с помощью нейросетей.
              Каждая композиция — это ваша личная история, рассказанная через звук.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/catalog"
                className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition-all hover:box-glow"
              >
                <Music className="h-4 w-4" /> Слушать песни
              </Link>
              <Link
                to="/checkout"
                className="flex items-center gap-2 rounded-full border border-primary/50 px-6 py-3 font-medium text-primary transition-all hover:bg-primary/10"
              >
                <Sparkles className="h-4 w-4" /> Заказать свою песню
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About short */}
      <section className="py-24">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="mx-auto max-w-3xl text-center">
            <motion.p variants={fadeUp} custom={0} className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">О проекте</motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="mt-3 font-display text-3xl font-bold md:text-4xl">Музыка, рождённая из эмоций и технологий</motion.h2>
            <motion.p variants={fadeUp} custom={2} className="mt-6 text-muted-foreground leading-relaxed">
              Я — Анастасия, и мой проект MELANØ — это пространство, где нейросети становятся инструментом творчества. Я создаю песни, которые звучат как настоящие, потому что они рождены из настоящих историй. Каждый трек — это результат глубокого погружения в вашу эмоцию и мастерства работы с AI-технологиями.
            </motion.p>
            <motion.div variants={fadeUp} custom={3}>
              <Link to="/about" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-rose-glow">
                Узнать больше <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="border-y border-border/30 py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Почему MELANØ</p>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">Чем я отличаюсь</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: Heart, title: 'Авторский подход', desc: 'Каждая песня создаётся индивидуально, с погружением в вашу историю и эмоцию.' },
              { icon: Sparkles, title: 'AI-технологии', desc: 'Использую передовые нейросети для создания музыки профессионального уровня.' },
              { icon: Mic, title: 'Полный цикл', desc: 'От идеи до готового трека — текст, музыка, вокал, сведение и мастеринг.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="group interactive-card p-8"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* For whom */}
      <section className="py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Аудитория</p>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">Для кого мои услуги</h2>
          </div>
          <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
            {[
              'Хотите подарить уникальную песню на день рождения, свадьбу или годовщину',
              'Вы блогер, эксперт или бренд — и вам нужна музыка для контента',
              'Ищете авторский текст для своего музыкального проекта',
              'Вам близка эстетика AI-музыки и цифрового творчества',
            ].map((text, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="interactive-card flex items-start gap-3 !rounded-xl border-border/20 bg-card/30 p-5"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <p className="text-sm leading-relaxed text-secondary-foreground">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="border-t border-border/30 py-24">
        <div className="container">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Каталог</p>
              <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">Песни и услуги</h2>
            </div>
            <Link to="/catalog" className="hidden items-center gap-2 text-sm font-medium text-primary hover:text-rose-glow md:flex">
              Весь каталог <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
              <motion.div
                key={p.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="group interactive-card relative overflow-hidden"
                onClick={musicBurst}
              >
                <div className={`h-48 bg-gradient-to-br ${p.coverGradient} flex items-center justify-center`}>
                  <Music className="h-12 w-12 text-primary/40 transition-opacity group-hover:opacity-90" />
                </div>
                <div className="p-6">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                      {p.type === 'song' ? 'Песня' : 'Услуга'}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-semibold">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">{p.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-display text-xl font-bold text-primary">{p.price.toLocaleString('ru-RU')} ₽</span>
                    <div className="flex gap-2">
                      <Link
                        to={`/product/${p.id}`}
                        className="rounded-lg border border-border/50 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                      >
                        Подробнее
                      </Link>
                      <button
                        onClick={() => addItem(p)}
                        className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                      >
                        В корзину
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link to="/catalog" className="inline-flex items-center gap-2 text-sm font-medium text-primary">Весь каталог <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-t border-border/30 py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Процесс</p>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">Как проходит работа</h2>
          </div>
          <div className="mx-auto max-w-3xl">
            {[
              { step: '01', title: 'Заявка', desc: 'Вы оставляете заявку на сайте или пишете мне в Telegram.' },
              { step: '02', title: 'Обсуждение', desc: 'Мы обсуждаем вашу идею, настроение, пожелания и детали.' },
              { step: '03', title: 'Концепция', desc: 'Я создаю концепцию — стиль, настроение, ключевые образы.' },
              { step: '04', title: 'Создание', desc: 'Пишу текст, создаю музыку и аранжировку с помощью AI.' },
              { step: '05', title: 'Согласование', desc: 'Отправляю вам демо, вносим правки до идеального результата.' },
              { step: '06', title: 'Передача', desc: 'Вы получаете готовый трек в выбранном формате.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="group flex gap-6 py-6 border-b border-border/20 last:border-0"
              >
                <span className="font-display text-2xl font-bold text-primary/30 transition-colors group-hover:text-primary">{item.step}</span>
                <div>
                  <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-border/30 py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Отзывы</p>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">Что говорят клиенты</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { name: 'Мария К.', text: 'Заказала песню мужу на годовщину — он плакал. Это был самый лучший подарок за все 10 лет.', role: 'Подарок на годовщину' },
              { name: 'Артём Д.', text: 'Профессионально, быстро и с душой. Джингл для подкаста получился идеальным.', role: 'Джингл для подкаста' },
              { name: 'Екатерина С.', text: 'Я не верила, что AI может создать что-то настолько эмоциональное. Анастасия доказала обратное.', role: 'Персональная песня' },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="interactive-card p-8"
              >
                <Quote className="mb-4 h-6 w-6 text-primary/30" />
                <p className="text-sm leading-relaxed text-secondary-foreground italic">«{t.text}»</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-display text-sm font-bold text-primary">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl gradient-rose p-12 text-center md:p-20">
            <div className="relative z-10">
              <Star className="mx-auto mb-4 h-8 w-8 text-primary-foreground/80" />
              <h2 className="font-display text-3xl font-bold text-primary-foreground md:text-4xl">Готовы создать свою песню?</h2>
              <p className="mx-auto mt-4 max-w-md text-primary-foreground/80">
                Оставьте заявку, и я свяжусь с вами, чтобы обсудить вашу идею и воплотить её в музыку.
              </p>
              <Link
                to="/checkout"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-background px-8 py-3 font-medium text-foreground transition-all hover:bg-foreground hover:text-background"
              >
                Оставить заявку <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
