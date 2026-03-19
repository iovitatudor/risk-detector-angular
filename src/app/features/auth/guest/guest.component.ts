import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { STORAGE_KEYS } from '../../../core/constants/storage.constants';

@Component({
  selector: 'app-guest',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="mb-6 text-center">
      <h1 class="text-xl font-semibold text-white mb-1">Guest access</h1>
      <p class="text-slate-500 text-sm">
        Try AIRisk without an account. Your session is tied to this browser.
      </p>
    </div>

    @if (error) {
      <div
        class="bg-red-900/30 border border-red-800 text-red-400 text-sm px-4 py-3 rounded-lg mb-4"
      >
        {{ error }}
      </div>
    }

    <button
      (click)="continueAsGuest()"
      [disabled]="loading"
      class="w-full bg-slate-800 hover:bg-slate-700 disabled:opacity-50
                   text-white font-medium py-2.5 rounded-lg text-sm transition-colors mb-6"
    >
      {{ loading ? 'Setting up session…' : 'Continue as guest' }}
    </button>

    <p class="text-slate-600 text-xs text-center mb-6">
      You can upgrade to a full account anytime without losing your data.
    </p>

    <div class="pt-4 border-t border-slate-800 text-center text-sm text-slate-500">
      <a routerLink="/auth/login" class="text-violet-400 hover:text-violet-300 transition-colors"
        >Sign in</a
      >
      <span class="mx-2">or</span>
      <a routerLink="/auth/register" class="text-violet-400 hover:text-violet-300 transition-colors"
        >Create account</a
      >
    </div>
  `,
})
export class GuestComponent implements OnInit {
  loading = false;
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/overview']);
    }
  }

  continueAsGuest(): void {
    this.loading = true;
    this.error = '';

    this.authService.loginGuest({ fingerprint: this.getFingerprint() }).subscribe({
      next: () => this.router.navigate(['/overview']),
      error: (err) => {
        this.error = err.error?.message || 'Could not start guest session';
        this.loading = false;
      },
    });
  }

  private getFingerprint(): string {
    const stored = localStorage.getItem(STORAGE_KEYS.FINGERPRINT);

    if (stored) return stored;

    const fp = btoa(`${Date.now()}-${navigator.userAgent}-${screen.width}x${screen.height}`).slice(
      0,
      32,
    ); d

    localStorage.setItem(STORAGE_KEYS.FINGERPRINT, fp);
    return fp;
  }
}
