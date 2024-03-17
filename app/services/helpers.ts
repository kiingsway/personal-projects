export function rawText(text?: string | number): string {
  // Textos em minúsculo e sem acento.
  if (!text) return "";
  return String(text).normalize('NFKD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export function onlyUnique<T>(value: T, index: number, self: T[]): boolean {
  return self.indexOf(value) === index;
}