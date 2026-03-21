import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ScenarioService } from '../../../core/services/scenario.service';
import { CategoryResponse } from '../../../core/models';

@Component({
  selector: 'app-scenario-create',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <div class="max-w-2xl mx-auto px-6 py-12">
      <!-- Header -->
      <div class="mb-8">
        <a
          routerLink="/scenarios"
          class="text-slate-500 hover:text-slate-300 text-sm transition-colors mb-4 inline-block"
        >
          ← Back to scenarios
        </a>
        <h1 class="text-2xl font-semibold text-white">New risk analysis</h1>
        <p class="text-slate-500 text-sm mt-1">
          Describe your scenario and our AI will assess the risk.
        </p>
      </div>

      <form [formGroup]="form" (ngSubmit)="submit()" class="space-y-6">
        @if (error) {
          <div
            class="bg-red-900/30 border border-red-800 text-red-400 text-sm px-4 py-3 rounded-lg"
          >
            {{ error }}
          </div>
        }

        <!-- Category -->
        <div>
          <label class="block text-sm text-slate-400 mb-1.5">Category</label>
          @if (categoriesLoading) {
            <div class="text-slate-600 text-sm">Loading categories…</div>
          } @else {
            <select
              formControlName="categoryId"
              class="w-full bg-slate-900 border border-slate-700 text-white
                           rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-violet-500 transition-colors"
            >
              <option value="" disabled>Select a risk category</option>
              @for (c of categories; track c.id) {
                <option [value]="c.id">{{ c.name }}</option>
              }
            </select>
          }
        </div>

        <!-- Title -->
        <div>
          <label class="block text-sm text-slate-400 mb-1.5">Title</label>
          <input
            formControlName="title"
            type="text"
            placeholder="e.g. Investment Risk in Real Estate"
            class="w-full bg-slate-900 border border-slate-700 text-white placeholder-slate-600
                        rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-violet-500 transition-colors"
          />
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm text-slate-400 mb-1.5">Description</label>
          <textarea
            formControlName="description"
            rows="5"
            placeholder="Describe the scenario in detail. The more context you provide, the more accurate the analysis."
            class="w-full bg-slate-900 border border-slate-700 text-white placeholder-slate-600
                           rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-violet-500 transition-colors resize-none"
          >
          </textarea>
        </div>

        <!-- Input data -->
        <div>
          <label class="block text-sm text-slate-400 mb-1.5">
            Data points
            <span class="text-slate-600 font-normal ml-1">(JSON)</span>
          </label>
          <textarea
            formControlName="inputDataRaw"
            rows="5"
            placeholder='{ "price": 500000, "location": "London", "loanToValue": 0.8 }'
            class="w-full bg-slate-900 border border-slate-700 text-white placeholder-slate-600
                           rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-violet-500 transition-colors resize-none font-mono"
          >
          </textarea>
          @if (jsonError) {
            <p class="text-red-400 text-xs mt-1.5">{{ jsonError }}</p>
          }
          <p class="text-slate-600 text-xs mt-1.5">
            Key-value pairs relevant to your scenario and category.
          </p>
        </div>

        <div class="flex gap-3 pt-2">
          <button
            type="submit"
            [disabled]="form.invalid || loading"
            class="flex-1 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed
                         text-white font-medium py-2.5 rounded-lg text-sm transition-colors"
          >
            {{ loading ? 'Submitting…' : 'Run analysis' }}
          </button>
          <a
            routerLink="/scenarios"
            class="px-6 py-2.5 text-sm text-slate-400 hover:text-white border border-slate-700
                    hover:border-slate-600 rounded-lg transition-colors text-center"
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  `,
})
export class ScenarioCreateComponent implements OnInit {
  form: FormGroup;
  categories: CategoryResponse[] = [];
  categoriesLoading = true;
  loading = false;
  error = '';
  jsonError = '';

  constructor(
    private fb: FormBuilder,
    private scenarioService: ScenarioService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {
    this.form = this.fb.group({
      categoryId: ['', Validators.required],
      title: ['', [Validators.required, Validators.maxLength(255)]],
      description: ['', Validators.required],
      inputDataRaw: ['{}'],
    });
  }

  ngOnInit(): void {
    this.scenarioService.getCategories().subscribe({
      next: (res) => {
        this.categories = res.data.items;
        this.categoriesLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.categoriesLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    const raw = this.form.value.inputDataRaw || '{}';
    let inputData: Record<string, unknown>;

    try {
      inputData = JSON.parse(raw);
      this.jsonError = '';
    } catch {
      this.jsonError = 'Invalid JSON — please check your data points';
      return;
    }

    this.loading = true;
    this.error = '';

    this.scenarioService
      .createScenario({
        categoryId: this.form.value.categoryId,
        title: this.form.value.title,
        description: this.form.value.description,
        inputData,
      })
      .subscribe({
        next: (res) => this.router.navigate(['/scenarios', res.data.id]),
        error: (err) => {
          this.error = err.error?.message || 'Failed to create scenario';
          this.loading = false;
          this.cdr.detectChanges();
        },
      });
  }
}
