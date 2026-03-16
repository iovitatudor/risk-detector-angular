import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { RegisterDto } from '../../../core/models';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <div class="mb-6">
      <h1 class="text-xl font-semibold text-white mb-1">Create account</h1>
      <p class="text-slate-500 text-sm">Start analyzing risk scenarios</p>
    </div>

    <form [formGroup]="form" (ngSubmit)="submit()" class="space-y-4">
      @if (error) {
        <div class="bg-red-900/30 border border-red-800 text-red-400 text-sm px-4 py-3 rounded-lg">
          {{ error }}
        </div>
      }

      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-sm text-slate-400 mb-1.5">First name</label>
          <input
            formControlName="firstName"
            type="text"
            placeholder="Jane"
            class="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-600
                        rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-violet-500 transition-colors"
          />
        </div>
        <div>
          <label class="block text-sm text-slate-400 mb-1.5">Last name</label>
          <input
            formControlName="lastName"
            type="text"
            placeholder="Doe"
            class="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-600
                        rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-violet-500 transition-colors"
          />
        </div>
      </div>

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
          placeholder="Min 8 characters"
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
        {{ loading ? 'Creating account…' : 'Create account' }}
      </button>
    </form>

    <p class="mt-6 text-center text-sm text-slate-500">
      Already have an account?
      <a routerLink="/auth/login" class="text-violet-400 hover:text-violet-300 transition-colors"
        >Sign in</a
      >
    </p>
  `,
})
export class RegisterComponent {
  form: FormGroup;

  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  submit(): void {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = '';

    this.authService.register(this.form.value as RegisterDto).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => {
        this.error = err.error?.message || 'Registration failed';
        this.loading = false;
      },
    });
  }
}
