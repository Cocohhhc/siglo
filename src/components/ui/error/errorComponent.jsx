"use client";

const alertStyles = {
  success: {
    bg: "bg-green-50 border-green-400",
    text: "text-green-800",
    icon: (
      <svg className="w-5 h-5 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
    closeHover: "hover:bg-green-100",
  },
  error: {
    bg: "bg-red-50 border-red-400",
    text: "text-red-800",
    icon: (
      <svg className="w-5 h-5 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v4a1 1 0 102 0V5zm-1 8a1.25 1.25 0 100-2.5A1.25 1.25 0 0010 13z" clipRule="evenodd" />
      </svg>
    ),
    closeHover: "hover:bg-red-100",
  },
  warning: {
    bg: "bg-yellow-50 border-yellow-400",
    text: "text-yellow-800",
    icon: (
      <svg className="w-5 h-5 text-yellow-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 10-2 0 1 1 0 002 0zm-1-2a1 1 0 01-1-1V7a1 1 0 112 0v3a1 1 0 01-1 1z" clipRule="evenodd" />
      </svg>
    ),
    closeHover: "hover:bg-yellow-100",
  },
};

/**
 * Componente de alerta reutilizable.
 *
 * Props:
 *  - message  (string)  — texto a mostrar
 *  - type     ("success" | "error" | "warning") — estilo del alert
 *  - onDismiss (function, opcional) — callback al cerrar
 */
export default function ErrorComponent({ message, type = "error", onDismiss }) {
  if (!message) return null;

  const style = alertStyles[type] || alertStyles.error;

  return (
    <div className="mt-4 absolute z-50 top-1/2 right-0 -translate-x-1/2 -translate-y-1/2">
      <div
        className={`flex items-start gap-3 border-l-4 p-4 rounded-r-lg ${style.bg}`}
        role="alert"
      >
        {style.icon}
        <p className={`text-sm flex-1 ${style.text}`}>{message}</p>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className={`p-1 rounded ${style.text} ${style.closeHover} transition-colors`}
            aria-label="Cerrar"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}