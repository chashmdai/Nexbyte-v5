// src/components/ToastProvider.jsx
import React, { createContext, useContext, useRef, useState, useCallback, useEffect } from 'react';

const ToastCtx = createContext(null);
// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => useContext(ToastCtx);

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timersRef = useRef(new Map());

  useEffect(() => () => {
    timersRef.current.forEach(({ timer }) => clearTimeout(timer));
    timersRef.current.clear();
  }, []);

  const scheduleAutoClose = useCallback((id, ms) => {
    if (ms <= 0) return;
    const startedAt = Date.now();
    const timer = setTimeout(() => {
      timersRef.current.delete(id);
      setToasts(s => s.filter(t => t.id !== id));
    }, ms);

    timersRef.current.set(id, { timer, remaining: ms, startedAt });
  }, []);

  const remove = useCallback((id) => {
    const meta = timersRef.current.get(id);
    if (meta) {
      clearTimeout(meta.timer);
      timersRef.current.delete(id);
    }
    setToasts(s => s.filter(t => t.id !== id));
  }, []);

  const removeAll = useCallback(() => {
    timersRef.current.forEach(({ timer }) => clearTimeout(timer));
    timersRef.current.clear();
    setToasts([]);
  }, []);

  const makeId = () =>
    (globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`);

  const show = useCallback(
    ({ id = makeId(), type = 'info', title, message, duration = 3400 } = {}) => {
      const payload = { id, type, title, message, duration };
      setToasts(s => [...s, payload]);
      scheduleAutoClose(id, duration);
      return id;
    },
    [scheduleAutoClose]
  );

  const api = {
    show,
    success: (opts) => show({ ...opts, type: 'success' }),
    error:   (opts) => show({ ...opts, type: 'error' }),
    info:    (opts) => show({ ...opts, type: 'info' }),
    remove,
    removeAll,
  };

  const pause = useCallback((id) => {
    const m = timersRef.current.get(id);
    if (!m) return;
    const elapsed = Date.now() - m.startedAt;
    const remaining = Math.max(0, m.remaining - elapsed);
    clearTimeout(m.timer);
    timersRef.current.set(id, { ...m, remaining });
  }, []);

  const resume = useCallback((id) => {
    const m = timersRef.current.get(id);
    if (!m || m.remaining <= 0) return;
    scheduleAutoClose(id, m.remaining);
  }, [scheduleAutoClose]);

  return (
    <ToastCtx.Provider value={api}>
      <ToastContainer toasts={toasts} onClose={remove} onPause={pause} onResume={resume} />
      {children}
    </ToastCtx.Provider>
  );
}

function Icon({ type }) {
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', strokeWidth: 2 };
  if (type === 'success') {
    return (
      <svg {...common} className="nb-toast__svg">
        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (type === 'error') {
    return (
      <svg {...common} className="nb-toast__svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" />
        <path d="M12 8v4m0 4h.01" stroke="currentColor" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg {...common} className="nb-toast__svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" />
      <path d="M12 8h.01M11 12h2v4h-2z" stroke="currentColor" strokeLinecap="round" />
    </svg>
  );
}

function ToastContainer({ toasts, onClose, onPause, onResume }) {
  return (
    <div className="nb-toasts" role="region" aria-label="Notificaciones">
      {toasts.map((t) => {
        const ariaLive = t.type === 'error' ? 'assertive' : 'polite';
        const title = t.title ?? (t.type === 'success' ? 'Listo' : t.type === 'error' ? 'Ups' : 'Info');
        return (
          <div
            key={t.id}
            className={`nb-toast ${t.type}`}
            role="status"
            aria-live={ariaLive}
            onMouseEnter={() => onPause(t.id)}
            onMouseLeave={() => onResume(t.id)}
          >
            <div className="nb-toast__icon"><Icon type={t.type} /></div>
            <div className="nb-toast__content">
              <strong className="nb-toast__title">{title}</strong>
              {t.message && <div className="nb-toast__msg">{t.message}</div>}
            </div>
            <button className="nb-toast__close" aria-label="Cerrar" onClick={() => onClose(t.id)}>×</button>
          </div>
        );
      })}
    </div>
  );
}
