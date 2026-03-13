export interface UserResponse {
  id: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  isGuest: boolean;
  roles: string[];
}

export interface AuthResponse {
  accessToken: string;
  user: UserResponse;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginGuestDto {
  fingerprint: string;
}

export interface UpgradeGuestDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  fingerprint: string;
}
