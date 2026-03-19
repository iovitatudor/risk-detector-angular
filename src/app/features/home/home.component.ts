import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  template: `
    <div class="bg-slate-950 text-white">
      <!-- Hero -->
      <section class="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        <!-- Background glow -->
        <div class="absolute inset-0 pointer-events-none">
          <div
            class="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-3xl"
          ></div>
        </div>

        <div class="relative max-w-3xl mx-auto text-center">
          <!-- Badge -->
          <h1 class="text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
            Know your risks
            <span class="text-violet-400"> before they happen</span>
          </h1>

          <p class="text-slate-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            AIRisk analyzes your business scenarios using advanced AI and gives you a clear,
            structured risk report in seconds — financial, legal, and operational.
          </p>

          @if (user$ | async) {
            <a
              routerLink="/overview"
              class="w-full sm:w-auto bg-violet-600 hover:bg-violet-500 text-white font-medium px-8 py-3 rounded-xl transition-colors text-sm"
            >
              Go to overview
            </a>
          } @else {
            <a
              routerLink="/auth/register"
              class="w-full sm:w-auto bg-violet-600 hover:bg-violet-500 text-white font-medium px-8 py-3 rounded-xl transition-colors text-sm"
            >
              Get started free
            </a>
            <a
              routerLink="/auth/guest"
              class="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium px-8 py-3 rounded-xl transition-colors text-sm"
            >
              Try as guest
            </a>
          }

          <p class="text-slate-600 text-xs mt-6">No credit card required</p>
        </div>
      </section>

      <!-- How it works -->
      <section class="py-24 px-6 border-t border-slate-800/50">
        <div class="max-w-5xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-3xl font-bold mb-4">How it works</h2>
            <p class="text-slate-400 text-lg">Three simple steps to a full risk assessment</p>
          </div>

          <div class="grid md:grid-cols-3 gap-8">
            <div class="flex flex-col items-center text-center">
              <div class="flex items-center w-full mb-6">
                <div class="flex-1 h-px bg-slate-800 md:block hidden"></div>
                <div
                  class="w-10 h-10 rounded-xl bg-violet-600/10 border border-violet-600/20 flex items-center justify-center shrink-0 mx-4"
                >
                  <span class="text-violet-400 font-bold text-sm">1</span>
                </div>
                <div class="flex-1 h-px bg-slate-800 md:block hidden"></div>
              </div>
              <h3 class="text-white font-semibold mb-2">Describe your scenario</h3>
              <p class="text-slate-500 text-sm leading-relaxed">
                Tell us about your situation — a business decision, investment, contract, or any
                scenario where you want to understand the risks involved.
              </p>
            </div>

            <div class="flex flex-col items-center text-center">
              <div class="flex items-center w-full mb-6">
                <div class="flex-1 h-px bg-slate-800 md:block hidden"></div>
                <div
                  class="w-10 h-10 rounded-xl bg-violet-600/10 border border-violet-600/20 flex items-center justify-center shrink-0 mx-4"
                >
                  <span class="text-violet-400 font-bold text-sm">2</span>
                </div>
                <div class="flex-1 h-px bg-slate-800 md:block hidden"></div>
              </div>
              <h3 class="text-white font-semibold mb-2">AI gets to work</h3>
              <p class="text-slate-500 text-sm leading-relaxed">
                Our AI engine analyzes your scenario across multiple dimensions — financial
                exposure, legal implications, and operational challenges.
              </p>
            </div>

            <div class="flex flex-col items-center text-center">
              <div class="flex items-center w-full mb-6">
                <div class="flex-1 h-px bg-slate-800 md:block hidden"></div>
                <div
                  class="w-10 h-10 rounded-xl bg-violet-600/10 border border-violet-600/20 flex items-center justify-center shrink-0 mx-4"
                >
                  <span class="text-violet-400 font-bold text-sm">3</span>
                </div>
                <div class="flex-1 h-px bg-slate-800 md:block hidden"></div>
              </div>
              <h3 class="text-white font-semibold mb-2">Get your report</h3>
              <p class="text-slate-500 text-sm leading-relaxed">
                Receive a clear risk score, severity level, and actionable recommendations — all in
                plain language, no jargon.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Features -->
      <section class="py-24 px-6 border-t border-slate-800/50">
        <div class="max-w-5xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-3xl font-bold mb-4">Everything you need</h2>
            <p class="text-slate-400 text-lg">Built for founders, analysts, and decision-makers</p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div
                class="w-10 h-10 rounded-xl bg-violet-600/10 flex items-center justify-center mb-4"
              >
                <svg
                  class="w-5 h-5 text-violet-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 class="text-white font-semibold mb-2">Risk scoring</h3>
              <p class="text-slate-500 text-sm leading-relaxed">
                Get a 0–100 risk score with a severity level — Low, Medium, High, or Critical.
              </p>
            </div>

            <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div
                class="w-10 h-10 rounded-xl bg-violet-600/10 flex items-center justify-center mb-4"
              >
                <svg
                  class="w-5 h-5 text-violet-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                  />
                </svg>
              </div>
              <h3 class="text-white font-semibold mb-2">Multi-dimension analysis</h3>
              <p class="text-slate-500 text-sm leading-relaxed">
                Every report covers financial, legal, and operational risks separately so nothing is
                missed.
              </p>
            </div>

            <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div
                class="w-10 h-10 rounded-xl bg-violet-600/10 flex items-center justify-center mb-4"
              >
                <svg
                  class="w-5 h-5 text-violet-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 class="text-white font-semibold mb-2">Results in seconds</h3>
              <p class="text-slate-500 text-sm leading-relaxed">
                No waiting around. Your analysis is processed instantly and the report is ready
                within seconds.
              </p>
            </div>

            <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div
                class="w-10 h-10 rounded-xl bg-violet-600/10 flex items-center justify-center mb-4"
              >
                <svg
                  class="w-5 h-5 text-violet-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 class="text-white font-semibold mb-2">Actionable recommendations</h3>
              <p class="text-slate-500 text-sm leading-relaxed">
                Every report ends with clear next steps you can act on immediately.
              </p>
            </div>

            <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div
                class="w-10 h-10 rounded-xl bg-violet-600/10 flex items-center justify-center mb-4"
              >
                <svg
                  class="w-5 h-5 text-violet-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 class="text-white font-semibold mb-2">History & tracking</h3>
              <p class="text-slate-500 text-sm leading-relaxed">
                All your analyses are saved. Review, compare, and track how your risk profile
                evolves over time.
              </p>
            </div>

            <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div
                class="w-10 h-10 rounded-xl bg-violet-600/10 flex items-center justify-center mb-4"
              >
                <svg
                  class="w-5 h-5 text-violet-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 class="text-white font-semibold mb-2">No account needed</h3>
              <p class="text-slate-500 text-sm leading-relaxed">
                Start instantly as a guest. Upgrade to a full account anytime without losing any of
                your data.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="py-24 px-6 border-t border-slate-800/50">
        <div class="max-w-2xl mx-auto text-center">
          <h2 class="text-3xl font-bold mb-4">Ready to assess your risk?</h2>
          <p class="text-slate-400 text-lg mb-10">
            Join thousands of decision-makers who use AIRisk to make smarter, safer choices.
          </p>

          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            @if (user$ | async) {
              <a
                routerLink="/overview"
                class="w-full sm:w-auto bg-violet-600 hover:bg-violet-500 text-white font-medium px-8 py-3 rounded-xl transition-colors text-sm"
              >
                Go to overview
              </a>
            } @else {
              <a
                routerLink="/auth/register"
                class="w-full sm:w-auto bg-violet-600 hover:bg-violet-500 text-white font-medium px-8 py-3 rounded-xl transition-colors text-sm"
              >
                Create free account
              </a>
              <a
                routerLink="/auth/guest"
                class="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium px-8 py-3 rounded-xl transition-colors text-sm"
              >
                Try as guest
              </a>
            }
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="py-8 px-6 border-t border-slate-800/50">
        <div class="max-w-5xl mx-auto flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 rounded-lg bg-violet-600 flex items-center justify-center">
              <svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <span class="text-white font-semibold text-sm tracking-tight">AIRisk</span>
          </div>
          <p class="text-slate-600 text-xs">© 2026 AIRisk. All rights reserved.</p>
        </div>
      </footer>
    </div>
  `,
})
export class HomeComponent {
  user$;

  constructor(private authService: AuthService) {
    this.user$ = this.authService.user$;
  }
}
