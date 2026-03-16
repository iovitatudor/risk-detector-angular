import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <!-- Background decoration -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          class="absolute -top-40 -right-40 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl"
        ></div>
        <div
          class="absolute -bottom-40 -left-40 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl"
        ></div>
      </div>

      <div class="relative w-full max-w-sm">
        <!-- Logo -->
        <div class="flex items-center justify-center gap-2 mb-8">
          <div class="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <span class="text-white font-semibold text-lg tracking-tight">AIRisk</span>
        </div>

        <!-- Card -->
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
})
export class AuthLayoutComponent {}
