export function formatMoney(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

export function formatDate(value) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value).slice(0, 10);

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export function toInputDate(value) {
  return value ? String(value).slice(0, 10) : '';
}

export function getStatusTone(value) {
  const text = String(value || '').toLowerCase();
  if (['available', 'paid', 'active', 'completed'].some((word) => text.includes(word))) return 'success';
  if (['partial', 'rented', 'pending'].some((word) => text.includes(word))) return 'warning';
  if (['sold', 'unpaid', 'cancelled', 'failed'].some((word) => text.includes(word))) return 'danger';
  return 'neutral';
}

export function getInitials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || 'RP';
}
