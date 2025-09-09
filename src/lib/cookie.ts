/**
 * Cookie utility functions for storing and retrieving Todoist API key
 */

const COOKIE_NAME = 'todoist_api_key';
const COOKIE_EXPIRES_DAYS = 365;

/**
 * Set a cookie with the given name, value, and expiration days
 */
export function setCookie(name: string, value: string, days: number): void {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

/**
 * Get a cookie value by name
 */
export function getCookie(name: string): string | null {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
}

/**
 * Delete a cookie by name
 */
function deleteCookie(name: string): void {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
}

/**
 * Save Todoist API key to cookie
 */
export function saveApiKey(apiKey: string): void {
  setCookie(COOKIE_NAME, apiKey, COOKIE_EXPIRES_DAYS);
}

/**
 * Get Todoist API key from cookie
 */
export function getApiKey(): string | null {
  return getCookie(COOKIE_NAME);
}

/**
 * Clear Todoist API key from cookie
 */
export function clearApiKey(): void {
  setCookie(COOKIE_NAME, '', -1);
}

/**
 * Remove Todoist API key from cookie
 */
export function removeApiKey(): void {
  deleteCookie(COOKIE_NAME);
}