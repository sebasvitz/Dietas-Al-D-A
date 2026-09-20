// Paleta de tonos de estado (verde = seguro, ámbar = incompatibilidad, rojo = alergia).

export const tones = {
  ok: { color: '#14532d', background: '#dcfce7', border: '#16a34a' },
  warning: { color: '#78350f', background: '#fef3c7', border: '#d97706' },
  danger: { color: '#7f1d1d', background: '#fee2e2', border: '#dc2626' },
  neutral: { color: '#334155', background: '#f1f5f9', border: '#94a3b8' },
}

export const STATUS_TONE = {
  segura: 'ok',
  incompatibilidad: 'warning',
  alergia: 'danger',
}
