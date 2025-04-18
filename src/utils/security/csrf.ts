
import { generateSecureToken, secureStore } from './index';

export class CsrfProtection {
  private static readonly TOKEN_KEY = 'csrf_token';
  private static readonly HEADER_NAME = 'X-CSRF-Token';

  static generateToken(): string {
    const token = generateSecureToken(32);
    this.storeToken(token);
    return token;
  }

  static getStoredToken(): string | null {
    return secureStore.get(this.TOKEN_KEY);
  }

  private static storeToken(token: string): void {
    secureStore.set(this.TOKEN_KEY, token, {
      secure: true,
      sameSite: 'Strict'
    });
  }

  static validateToken(token: string): boolean {
    const storedToken = this.getStoredToken();
    return storedToken === token;
  }

  static getRequestHeaders(): Headers {
    const headers = new Headers();
    const token = this.getStoredToken();
    if (token) {
      headers.append(this.HEADER_NAME, token);
    }
    return headers;
  }

  static appendTokenToForm(form: HTMLFormElement): void {
    const token = this.getStoredToken();
    if (!token) {
      return;
    }

    let input = form.querySelector(`input[name="${this.HEADER_NAME}"]`);
    if (!input) {
      input = document.createElement('input');
      input.type = 'hidden';
      input.name = this.HEADER_NAME;
      form.appendChild(input);
    }
    (input as HTMLInputElement).value = token;
  }
}

