import React from 'react';

const Privacy: React.FC = () => (
  <section className="py-24">
    <div className="container">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-3xl font-bold md:text-4xl">Политика конфиденциальности</h1>
        <p className="mt-2 text-sm text-muted-foreground">Последнее обновление: 11 апреля 2026 г.</p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-secondary-foreground">
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">1. Общие положения</h2>
            <p className="mt-3">Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сайта MELANØ (далее — «Сайт»), принадлежащего Мельниковой Анастасии Викторовне (далее — «Оператор»).</p>
            <p className="mt-2">Использование Сайта означает согласие Пользователя с настоящей Политикой.</p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">2. Какие данные собираются</h2>
            <ul className="mt-3 list-disc pl-5 space-y-1">
              <li>Имя</li>
              <li>Адрес электронной почты</li>
              <li>Номер телефона (при указании)</li>
              <li>Содержание сообщений и комментариев к заказу</li>
              <li>Данные об использовании Сайта (cookies, IP-адрес, тип браузера)</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">3. Цели обработки данных</h2>
            <ul className="mt-3 list-disc pl-5 space-y-1">
              <li>Обработка заявок и заказов</li>
              <li>Связь с пользователем</li>
              <li>Улучшение качества услуг</li>
              <li>Выполнение обязательств перед пользователем</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">4. Порядок хранения и защиты</h2>
            <p className="mt-3">Оператор принимает необходимые организационные и технические меры для защиты персональных данных от несанкционированного доступа, изменения, раскрытия или уничтожения.</p>
            <p className="mt-2">Персональные данные хранятся в течение срока, необходимого для достижения целей обработки, но не менее 3 лет с момента последнего взаимодействия.</p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">5. Права пользователя</h2>
            <p className="mt-3">Пользователь имеет право запросить информацию о своих персональных данных, потребовать их исправления или удаления, направив запрос на адрес: info.melanomusic@gmail.com.</p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">6. Контакты оператора</h2>
            <p className="mt-3">Мельникова Анастасия Викторовна</p>
            <p>Пермский край, п. Николаев Посад, ул. Солнечная, д. 7</p>
            <p>Email: info.melanomusic@gmail.com</p>
            <p>ИНН: 591111416790</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Privacy;
