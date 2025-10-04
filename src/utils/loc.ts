import { Locale } from '../i18n/translations';

export type LField = { it: string; en: string };
export function tr<T extends LField>(field: T, locale: Locale): string {
  return field[locale];
}
