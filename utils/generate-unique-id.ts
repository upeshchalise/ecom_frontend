export function generateUniqueId(): string {
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
