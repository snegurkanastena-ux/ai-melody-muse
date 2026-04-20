import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight, ArrowLeft, ExternalLink } from 'lucide-react';

const PAYFORM_URL = 'https://neuroera.payform.ru/';

const Cart: React.FC = () => {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center py-24">
        <div className="text-center">
          <ShoppingCart className="mx-auto mb-4 h-16 w-16 text-muted-foreground/20" />
          <h1 className="font-display text-2xl font-bold">Корзина пуста</h1>
          <p className="mt-2 text-muted-foreground">Добавьте песню или услугу из каталога</p>
          <Link to="/services" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground">
            Перейти к услугам <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24">
      <div className="container">
        <Link to="/catalog" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Продолжить покупки
        </Link>
        <h1 className="font-display text-3xl font-bold md:text-4xl">Корзина</h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {items.map(item => (
              <div key={item.product.id} className="interactive-card flex items-center gap-4 p-4 md:p-6">
                <div className={`hidden h-20 w-20 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${item.product.coverGradient} sm:flex`}>
                  <ShoppingCart className="h-6 w-6 text-primary/30" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-semibold">{item.product.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.product.type === 'song' ? 'Песня' : 'Услуга'}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/50 text-muted-foreground hover:border-primary hover:text-primary">
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/50 text-muted-foreground hover:border-primary hover:text-primary">
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
                <p className="w-24 text-right font-display font-bold text-primary">{(item.product.price * item.quantity).toLocaleString('ru-RU')} ₽</p>
                <button onClick={() => removeItem(item.product.id)} className="text-muted-foreground hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="interactive-card p-6 h-fit">
            <h3 className="font-display text-lg font-semibold">Итого</h3>
            <div className="mt-4 space-y-2 border-b border-border/30 pb-4">
              {items.map(item => (
                <div key={item.product.id} className="flex justify-between text-sm text-muted-foreground">
                  <span>{item.product.title} × {item.quantity}</span>
                  <span>{(item.product.price * item.quantity).toLocaleString('ru-RU')} ₽</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between">
              <span className="font-display text-lg font-bold">Сумма:</span>
              <span className="font-display text-lg font-bold text-primary">{totalPrice.toLocaleString('ru-RU')} ₽</span>
            </div>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href={PAYFORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 font-medium text-primary-foreground transition-all hover:box-glow"
              >
                Оплатить сразу <ExternalLink className="h-4 w-4" />
              </a>
              <Link
                to="/checkout"
                className="flex w-full items-center justify-center gap-2 rounded-full border border-border/50 py-3 font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                Отправить заявку <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 border-t border-border/30 pt-6">
              <div className="mx-auto flex max-w-[220px] flex-col items-center rounded-2xl border border-border/40 bg-background/80 p-4">
                <img
                  src="/payment-qr.png"
                  alt="QR-код для оплаты"
                  width={200}
                  height={200}
                  className="h-[200px] w-[200px] max-h-[200px] max-w-[200px] object-contain"
                  decoding="async"
                />
              </div>
              <p className="mt-4 text-center text-sm text-muted-foreground">Можно оплатить по QR-коду</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
