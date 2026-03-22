import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe, DatePipe } from '@angular/common';
import { ScenarioService } from '../../../core/services/scenario.service';
import { ScenarioResponse } from '../../../core/models';

@Component({
  selector: 'app-scenario-list',
  standalone: true,
  imports: [RouterLink, DatePipe],
  template: `
    <div class="max-w-6xl mx-auto px-6 py-12">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-2xl font-semibold text-white">Scenarios</h1>
          <p class="text-slate-500 text-sm mt-1">{{ total }} total</p>
        </div>
        <a
          routerLink="/scenarios/new"
          class="bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
        >
          New analysis
        </a>
      </div>

      <!-- Loading -->
      @if (loading) {
        <div class="text-slate-600 text-sm py-16 text-center">Loading…</div>
      }

      <!-- Empty -->
      @if (!loading && scenarios.length === 0) {
        <div class="bg-slate-900 border border-slate-800 rounded-xl p-16 text-center">
          <p class="text-slate-500 text-sm mb-4">No scenarios yet.</p>
          <a
            routerLink="/scenarios/new"
            class="inline-block bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
          >
            Run your first analysis
          </a>
        </div>
      }

      <!-- List -->
      @if (!loading && scenarios.length > 0) {
        <div class="space-y-3 mb-6">
          @for (scenario of scenarios; track scenario.id) {
            <a
              [routerLink]="['/scenarios', scenario.id]"
              class="block bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-5 transition-colors group"
            >
              <div class="flex items-start justify-between gap-4">
                <div class="min-w-0 flex-1">
                  <p
                    class="text-white font-medium text-sm group-hover:text-violet-300 transition-colors truncate"
                  >
                    {{ scenario.title }}
                  </p>
                  <p class="text-slate-500 text-xs mt-1 truncate">{{ scenario.description }}</p>
                  <p class="text-slate-700 text-xs mt-2">
                    {{ scenario.createdAt | date: 'MMM d, y' }}
                  </p>
                </div>
                <div class="flex items-center gap-3 shrink-0">
                  @if (scenario.report) {
                    <div class="text-right">
                      <span class="text-xl font-bold" [class]="scoreColor(scenario.report.score)">
                        {{ scenario.report.score }}
                      </span>
                      <p class="text-xs text-slate-600">/ 100</p>
                    </div>
                  }
                  <span
                    [class]="statusClass(scenario.status)"
                    class="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full"
                  >
                    @if (scenario.status === 'pending' || scenario.status === 'processing') {
                      <span class="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                    }
                    {{ statusLabel(scenario.status) }}
                  </span>
                </div>
              </div>
            </a>
          }
        </div>

        <!-- Pagination -->
        @if (totalPages > 1) {
          <div class="flex items-center justify-between text-sm text-slate-400">
            <span>Page {{ page }} of {{ totalPages }}</span>
            <div class="flex gap-2">
              <button
                (click)="changePage(page - 1)"
                [disabled]="page <= 1"
                class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <button
                (click)="changePage(page + 1)"
                [disabled]="page >= totalPages"
                class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        }
      }
    </div>
  `,
})
export class ScenarioListComponent implements OnInit {
  scenarios: ScenarioResponse[] = [];
  loading = true;
  page = 1;
  total = 0;
  totalPages = 1;
  readonly limit = 10;

  constructor(
    private scenarioService: ScenarioService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.load();
  }

  changePage(p: number): void {
    this.page = p;
    this.load();
  }

  scoreColor(score: number): string {
    if (score >= 75) return 'text-red-400';
    if (score >= 50) return 'text-amber-400';
    return 'text-emerald-400';
  }

  statusLabel(status: string): string {
    return (
      { pending: 'Pending', processing: 'Analyzing', completed: 'Completed', failed: 'Failed' }[
        status
      ] ?? status
    );
  }

  statusClass(status: string): string {
    return (
      {
        pending: 'bg-slate-800 text-slate-400',
        processing: 'bg-violet-900/50 text-violet-400',
        completed: 'bg-emerald-900/50 text-emerald-400',
        failed: 'bg-red-900/50 text-red-400',
      }[status] ?? ''
    );
  }

  private load(): void {
    this.loading = true;
    this.scenarioService.getScenarios(this.page, this.limit).subscribe({
      next: (res) => {
        this.scenarios = res.data.items;
        this.total = res.data.total;
        this.totalPages = res.data.totalPages;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }
}
