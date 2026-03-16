import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { LoginDto } from '../../../core/models';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <div class="mb-6">
      <h1 class="text-xl font-semibold text-white mb-1">Welcome back</h1>
      <p class="text-slate-500 text-sm">Sign in to your account</p>
    </div>

    <form [formGroup]="form" (ngSubmit)="submit()" class="space-y-4">
      @if (error) {
        <div class="bg-red-900/30 border border-red-800 text-red-400 text-sm px-4 py-3 rounded-lg">
          {{ error }}
        </div>
      }

      <div>
        <label class="block text-sm text-slate-400 mb-1.5">Email</label>
        <input
          formControlName="email"
          type="email"
          placeholder="you@example.com"
          class="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-600
                      rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-violet-500 transition-colors"
        />
      </div>

      <div>
        <label class="block text-sm text-slate-400 mb-1.5">Password</label>
        <input
          formControlName="password"
          type="password"
          placeholder="••••••••"
          class="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-600
                      rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-violet-500 transition-colors"
        />
      </div>

      <button
        type="submit"
        [disabled]="form.invalid || loading"
        class="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed
                     text-white font-medium py-2.5 rounded-lg text-sm transition-colors"
      >
        {{ loading ? 'Signing in…' : 'Sign in' }}
      </button>
    </form>

    <div class="mt-6 space-y-2 text-center text-sm text-slate-500">
      <p>
        Don't have an account?
        <a
          routerLink="/auth/register"
          class="text-violet-400 hover:text-violet-300 transition-colors"
          >Register</a
        >
      </p>
      <p>
        <a routerLink="/auth/guest" class="text-slate-600 hover:text-slate-400 transition-colors">
          Continue as guest →
        </a>
      </p>
    </div>
  `,
})
export class LoginComponent {
  form: FormGroup;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  submit(): void {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = '';

    this.authService.login(this.form.value as LoginDto).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => {
        console.log(err.error);
        this.error = err.error?.message || 'Invalid email or password';
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }
}
