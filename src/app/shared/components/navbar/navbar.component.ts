import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, AsyncPipe],
  template: `
    <nav
      class="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-sm border-b border-slate-800"
    >
      <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <!-- Logo -->
        <a routerLink="/" class="flex items-center gap-2">
          <div class="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <span class="text-white font-semibold tracking-tight">AIRisk</span>
        </a>

        @if (user$ | async; as user) {
          <div class="flex items-center gap-4">
            <a
              routerLink="/scenarios"
              routerLinkActive="text-white"
              class="text-sm text-slate-400 hover:text-white transition-colors"
            >
              Scenarios
            </a>
            <a
              routerLink="/scenarios/new"
              class="text-sm bg-violet-600 hover:bg-violet-500 text-white px-4 py-1.5 rounded-lg transition-colors"
            >
              New analysis
            </a>
            <div class="flex items-center gap-3 pl-4 border-l border-slate-700">
              <span class="text-sm text-slate-400">
                {{ user.isGuest ? 'Guest' : user.firstName }}
              </span>
              @if (user.isGuest) {
                <a
                  routerLink="/upgrade"
                  class="text-sm bg-violet-600 hover:bg-violet-500 text-white px-4 py-1.5 rounded-lg transition-colors"
                >
                  Upgrade
                </a>
              }
              <button
                (click)="logout()"
                class="text-sm text-slate-500 hover:text-red-400 transition-colors"
              >
                Sign out
              </button>
            </div>
          </div>
        } @else {
          <div class="flex items-center gap-3">
            <a
              routerLink="/auth/login"
              class="text-sm text-slate-400 hover:text-white transition-colors"
            >
              Sign in
            </a>
            <a
              routerLink="/auth/register"
              class="text-sm bg-violet-600 hover:bg-violet-500 text-white px-4 py-1.5 rounded-lg transition-colors"
            >
              Get started
            </a>
          </div>
        }
      </div>
    </nav>
  `,
})
export class NavbarComponent {
  user$;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.user$ = this.authService.user$;
    this.user$.subscribe((u) => console.log('navbar user:', JSON.stringify(u)));
  }

  logout(): void {
    this.authService.logout();
  }
}
