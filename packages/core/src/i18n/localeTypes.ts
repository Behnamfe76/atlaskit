export type LocaleDirection = "ltr" | "rtl";

export interface LocaleBundle {
  readonly code: string;
  readonly currency?: string;
  readonly dateFormats?: Record<string, Intl.DateTimeFormatOptions>;
  readonly direction: LocaleDirection;
  readonly fallbackCode?: string;
  readonly messages: Record<string, string>;
}

export interface I18nOptions {
  readonly fallbackLocale: string;
  readonly locale: string;
}
