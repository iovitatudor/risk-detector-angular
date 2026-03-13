import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import {
  AuthResponse,
  LoginDto,
  RegisterDto,
  LoginGuestDto,
  UpgradeGuestDto,
  UserResponse,
  ApiResponse,
} from '../models';
import { environment } from '../../../environments/environment';

const TOKEN_KEY = 'airisk_token';
const USER_KEY = 'airisk_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly base = `${environment.apiUrl}/auth`;

  private _user$ = new BehaviorSubject<UserResponse | null>(this.storedUser());
  readonly user$ = this._user$.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  get token(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  get isLoggedIn(): boolean {
    return !!this.token;
  }

  get currentUser(): UserResponse | null {
    return this._user$.value;
  }

  login(dto: LoginDto): Observable<ApiResponse<AuthResponse>> {
    return this.http
      .post<ApiResponse<AuthResponse>>(`${this.base}/login`, dto)
      .pipe(tap((res) => this.storeSession(res.data)));
  }

  register(dto: RegisterDto): Observable<ApiResponse<AuthResponse>> {
    return this.http
      .post<ApiResponse<AuthResponse>>(`${this.base}/register`, dto)
      .pipe(tap((res) => this.storeSession(res.data)));
  }

  loginGuest(dto: LoginGuestDto): Observable<ApiResponse<AuthResponse>> {
    return this.http
      .post<ApiResponse<AuthResponse>>(`${this.base}/guest`, dto)
      .pipe(tap((res) => this.storeSession(res.data)));
  }

  upgradeGuest(dto: UpgradeGuestDto): Observable<ApiResponse<AuthResponse>> {
    return this.http
      .post<ApiResponse<AuthResponse>>(`${this.base}/upgrade`, dto)
      .pipe(tap((res) => this.storeSession(res.data)));
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this._user$.next(null);
    this.router.navigate(['/auth/login']);
  }

  private storeSession(auth: AuthResponse): void {
    localStorage.setItem(TOKEN_KEY, auth.accessToken);
    localStorage.setItem(USER_KEY, JSON.stringify(auth.user));
    this._user$.next(auth.user);
  }

  private storedUser(): UserResponse | null {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  }
}
