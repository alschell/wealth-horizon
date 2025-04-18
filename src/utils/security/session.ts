
import { secureStore } from './index';

interface SessionConfig {
  timeoutMinutes?: number;
  renewalThresholdMinutes?: number;
}

export class SessionManager {
  private timeoutMinutes: number;
  private renewalThresholdMinutes: number;
  private timeoutId: number | null = null;

  constructor(config: SessionConfig = {}) {
    this.timeoutMinutes = config.timeoutMinutes || 30;
    this.renewalThresholdMinutes = config.renewalThresholdMinutes || 5;
  }

  initSession() {
    this.setLastActivity();
    this.startSessionTimer();
    window.addEventListener('mousemove', () => this.handleUserActivity());
    window.addEventListener('keypress', () => this.handleUserActivity());
  }

  private setLastActivity() {
    secureStore.set('lastActivity', Date.now().toString());
  }

  private handleUserActivity() {
    this.setLastActivity();
    this.startSessionTimer();
  }

  private startSessionTimer() {
    if (this.timeoutId) {
      window.clearTimeout(this.timeoutId);
    }

    this.timeoutId = window.setTimeout(() => {
      this.checkSession();
    }, this.renewalThresholdMinutes * 60 * 1000);
  }

  private checkSession() {
    const lastActivity = Number(secureStore.get('lastActivity'));
    const currentTime = Date.now();
    const timeSinceLastActivity = (currentTime - lastActivity) / (60 * 1000);

    if (timeSinceLastActivity >= this.timeoutMinutes) {
      this.endSession();
    } else if (timeSinceLastActivity >= this.renewalThresholdMinutes) {
      this.renewSession();
    }
  }

  private renewSession() {
    // Implement token refresh logic here when backend is ready
    this.setLastActivity();
  }

  private endSession() {
    secureStore.remove('lastActivity');
    if (this.timeoutId) {
      window.clearTimeout(this.timeoutId);
    }
    window.location.href = '/logout';
  }

  cleanup() {
    if (this.timeoutId) {
      window.clearTimeout(this.timeoutId);
    }
    window.removeEventListener('mousemove', () => this.handleUserActivity());
    window.removeEventListener('keypress', () => this.handleUserActivity());
  }
}

export const sessionManager = new SessionManager();

