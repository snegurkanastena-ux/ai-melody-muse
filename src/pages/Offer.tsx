import React from 'react';

const Offer: React.FC = () => (
  <section className="py-24">
    <div className="container">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-3xl font-bold md:text-4xl">Публичная оферта</h1>
        <p className="mt-2 text-sm text-muted-foreground">на оказание цифровых творческих услуг</p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-secondary-foreground">
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">1. Предмет оферты</h2>
            <p className="mt-3">Настоящая оферта определяет условия оказания цифровых творческих услуг (создание песен, текстов, музыки, аранжировок, джинглов и иных музыкальных продуктов) Исполнителем — Мельниковой Анастасией Викторовной (далее — «Исполнитель») — Заказчику, оформившему заявку через Сайт.</p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">2. Порядок оформления заказа</h2>
            <p className="mt-3">Заказ считается оформленным после заполнения и отправки формы заявки на Сайте. Подтверждение заказа направляется Заказчику по указанному email или через мессенджер.</p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">3. Стоимость и оплата</h2>
            <p className="mt-3">Стоимость услуг указана на Сайте и может быть уточнена индивидуально. Оплата производится в порядке, согласованном сторонами. Исполнитель вправе требовать предоплату в размере 50% от стоимости заказа.</p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">4. Сроки выполнения</h2>
            <p className="mt-3">Сроки выполнения указаны в описании каждой услуги. Индивидуальные сроки согласовываются дополнительно. Исполнитель вправе увеличить срок при необходимости внесения правок.</p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">5. Права и обязанности сторон</h2>
            <p className="mt-3">Исполнитель обязуется выполнить заказ в соответствии с согласованным техническим заданием. Заказчик обязуется предоставить необходимую информацию и произвести оплату в согласованные сроки.</p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">6. Возвраты и отмена</h2>
            <p className="mt-3">Возврат средств возможен до начала выполнения работ. После начала работы возврат осуществляется за вычетом стоимости выполненного объёма. Цифровые продукты возврату не подлежат после передачи.</p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">7. Ответственность сторон</h2>
            <p className="mt-3">Стороны несут ответственность в соответствии с действующим законодательством РФ. Исполнитель не несёт ответственности за использование результатов работы Заказчиком.</p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">8. Заключительные положения</h2>
            <p className="mt-3">Настоящая оферта вступает в силу с момента её размещения на Сайте. Исполнитель оставляет за собой право вносить изменения в условия оферты.</p>
          </div>

          <div className="rounded-2xl border border-border/30 bg-card/50 p-6">
            <h3 className="font-display font-semibold text-foreground">Реквизиты Исполнителя</h3>
            <p className="mt-3">Мельникова Анастасия Викторовна</p>
            <p>ИНН: 591111416790</p>
            <p>ОГРНИП: —</p>
            <p>Адрес: Пермский край, п. Николаев Посад, ул. Солнечная, д. 7</p>
            <p>Email: info.melanomusic@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Offer;
