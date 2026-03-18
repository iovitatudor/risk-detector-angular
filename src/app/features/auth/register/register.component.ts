import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { RegisterDto, UpgradeGuestDto } from '../../../core/models';
import { ChangeDetectorRef } from '@angular/core';
import { STORAGE_KEYS } from '../../../core/constants/storage.constants';

function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirm = control.get('confirmPassword');
  if (!password || !confirm) return null;
  return password.value !== confirm.value ? { passwordMismatch: true } : null;
}

function strongPasswordValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value as string;
  if (!value) return null;

  const errors: Record<string, boolean> = {};
  if (value.length < 8) errors['minLength'] = true;
  if (!/[A-Z]/.test(value)) errors['uppercase'] = true;
  if (!/[0-9]/.test(value)) errors['number'] = true;
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) errors['special'] = true;

  return Object.keys(errors).length ? errors : null;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <div class="mb-6">
      <h1 class="text-xl font-semibold text-white mb-1">
        {{ isGuest ? 'Upgrade your account' : 'Create account' }}
      </h1>
      <p class="text-slate-500 text-sm">
        {{ isGuest ? 'Keep your data and unlock full access' : 'Start analyzing risk scenarios' }}
      </p>
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

        @if (form.get('password')?.dirty) {
          <div class="mt-2 space-y-1">
            <p
              class="text-xs"
              [class]="
                !form.get('password')?.errors?.['minLength'] ? 'text-emerald-400' : 'text-slate-500'
              "
            >
              ✓ At least 8 characters
            </p>
            <p
              class="text-xs"
              [class]="
                !form.get('password')?.errors?.['uppercase'] ? 'text-emerald-400' : 'text-slate-500'
              "
            >
              ✓ One uppercase letter
            </p>
            <p
              class="text-xs"
              [class]="
                !form.get('password')?.errors?.['number'] ? 'text-emerald-400' : 'text-slate-500'
              "
            >
              ✓ One number
            </p>
            <p
              class="text-xs"
              [class]="
                !form.get('password')?.errors?.['special'] ? 'text-emerald-400' : 'text-slate-500'
              "
            >
              ✓ One special character
            </p>
          </div>
        }
      </div>

      <div>
        <label class="block text-sm text-slate-400 mb-1.5">Confirm password</label>
        <input
          formControlName="confirmPassword"
          type="password"
          placeholder="••••••••"
          class="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-600
                      rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-violet-500 transition-colors"
        />
        @if (form.errors?.['passwordMismatch'] && form.get('confirmPassword')?.dirty) {
          <p class="text-red-400 text-xs mt-1.5">Passwords do not match</p>
        }
      </div>

      <button
        type="submit"
        [disabled]="form.invalid || loading"
        class="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed
                     text-white font-medium py-2.5 rounded-lg text-sm transition-colors"
      >
        {{ loading ? 'Please wait…' : isGuest ? 'Upgrade account' : 'Create account' }}
      </button>
    </form>

    @if (!isGuest) {
      <p class="mt-6 text-center text-sm text-slate-500">
        Already have an account?
        <a routerLink="/auth/login" class="text-violet-400 hover:text-violet-300 transition-colors"
          >Sign in</a
        >
      </p>
    }
  `,
})
export class RegisterComponent {
  form: FormGroup;
  loading = false;
  error = '';
  isGuest = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {
    this.isGuest = !!this.authService.currentUser?.isGuest;

    this.form = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, strongPasswordValidator]],
        confirmPassword: ['', Validators.required],
      },
      { validators: passwordMatchValidator },
    );
  }

  submit(): void {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = '';

    const { firstName, lastName, email, password } = this.form.value;

    if (this.isGuest) {
      const fingerprint = localStorage.getItem(STORAGE_KEYS.FINGERPRINT) ?? '';
      const dto: UpgradeGuestDto = { firstName, lastName, email, password, fingerprint };
      console.log(fingerprint);
      this.authService.upgradeGuest(dto).subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: (err) => {
          this.error = err.error?.message || 'Upgrade failed';
          this.loading = false;
          this.cdr.detectChanges();
        },
      });
    } else {
      const dto: RegisterDto = { firstName, lastName, email, password };

      this.authService.register(dto).subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: (err) => {
          this.error = err.error?.message || 'Registration failed';
          this.loading = false;
          this.cdr.detectChanges();
        },
      });
    }
  }
}
