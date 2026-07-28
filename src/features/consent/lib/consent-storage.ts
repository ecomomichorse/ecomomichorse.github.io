export type ConsentValue = "granted" | "denied";

const KEY = "cookie-consent";

export function getStoredConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(KEY);
  return value === "granted" || value === "denied" ? value : null;
}

export function setStoredConsent(value: ConsentValue) {
  window.localStorage.setItem(KEY, value);
}
