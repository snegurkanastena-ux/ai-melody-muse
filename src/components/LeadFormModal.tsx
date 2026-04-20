import React, { useCallback, useEffect, useState } from 'react';
import { X } from 'lucide-react';

type Status = 'idle' | 'loading' | 'success';

export type LeadFormModalProps = {
  open: boolean;
  onClose: () => void;
};

const LeadFormModal: React.FC<LeadFormModalProps> = ({ open, onClose }) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!open) return;
    setName('');
    setContact('');
    setMessage('');
    setStatus('idle');
    setErrorMsg('');
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const tryClose = useCallback(() => {
    if (status === 'loading') return;
    onClose();
  }, [onClose, status]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') tryClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, tryClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const n = name.trim();
    const c = contact.trim();
    const m = message.trim();
    if (!n || !c || !m) {
      setErrorMsg('Заполните все поля');
      return;
    }
    setErrorMsg('');
    setStatus('loading');
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 15000);
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: n,
          contact: c,
          message: m,
        }),
        signal: controller.signal,
      });
      if (!res.ok) {
        setStatus('idle');
        setErrorMsg('Не удалось отправить заявку. Попробуйте ещё раз.');
        return;
      }
      setStatus('success');
    } catch {
      setStatus('idle');
      setErrorMsg('Не удалось отправить заявку. Попробуйте ещё раз.');
    } finally {
      window.clearTimeout(timeoutId);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Закрыть"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={tryClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-[101] flex max-h-[min(90vh,640px)] w-full max-w-[520px] flex-col rounded-2xl border border-border/50 bg-card shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-border/40 px-5 py-4">
          <h2 className="font-display text-lg font-semibold">Заявка с контактов</h2>
          <button
            type="button"
            onClick={tryClose}
            disabled={status === 'loading'}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
            aria-label="Закрыть"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
          {status === 'success' ? (
            <div className="flex flex-col items-center py-8 text-center">
              <p className="font-display text-xl font-semibold">Заявка отправлена</p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition-all hover:box-glow"
              >
                Закрыть
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg ? <p className="text-sm font-medium text-destructive">{errorMsg}</p> : null}
              <div>
                <label htmlFor="lead-name" className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  Имя
                </label>
                <input
                  id="lead-name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  disabled={status === 'loading'}
                  className="w-full rounded-xl border border-border/50 bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none disabled:opacity-60"
                  placeholder="Как к вам обращаться"
                  autoComplete="name"
                />
              </div>
              <div>
                <label htmlFor="lead-contact" className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  Как с вами связаться
                </label>
                <input
                  id="lead-contact"
                  value={contact}
                  onChange={e => setContact(e.target.value)}
                  disabled={status === 'loading'}
                  className="w-full rounded-xl border border-border/50 bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none disabled:opacity-60"
                  placeholder="Telegram, email или телефон"
                  autoComplete="tel"
                />
              </div>
              <div>
                <label htmlFor="lead-message" className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  Описание задачи
                </label>
                <textarea
                  id="lead-message"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  disabled={status === 'loading'}
                  rows={4}
                  className="w-full resize-none rounded-xl border border-border/50 bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none disabled:opacity-60"
                  placeholder="Кратко: что нужно, сроки, контекст"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground transition-all hover:box-glow disabled:opacity-60"
              >
                {status === 'loading' ? 'Отправка…' : 'Отправить заявку'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadFormModal;
