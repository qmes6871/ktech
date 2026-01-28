import type { LocalizedString } from './types';

type Language = 'ko' | 'en' | 'zh';

/**
 * LocalizedString에서 해당 언어의 문자열을 반환.
 * 폴백: 요청 언어 → ko → 아무 값 → ''
 */
export function resolveLocalized(
  field: LocalizedString | string | undefined | null,
  lang: Language
): string {
  if (!field) return '';
  if (typeof field === 'string') return field;

  return (
    field[lang] ||
    field.ko ||
    Object.values(field).find((v) => v && v.length > 0) ||
    ''
  );
}

/**
 * 구 형식(string) → 새 형식({ ko: value })으로 정규화.
 * 이미 객체면 그대로 반환.
 */
export function normalizeLocalizedField(
  value: string | LocalizedString | undefined | null
): LocalizedString {
  if (!value) return {};
  if (typeof value === 'string') return { ko: value };
  return value;
}
