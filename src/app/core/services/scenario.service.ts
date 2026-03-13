import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, timer, switchMap, takeWhile, share } from 'rxjs';
import {
  ApiResponse,
  CategoryResponse,
  CreateScenarioDto,
  PaginatedResponse,
  ScenarioResponse,
} from '../models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ScenarioService {
  private readonly base = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCategories(
    page = 1,
    limit = 50,
  ): Observable<ApiResponse<PaginatedResponse<CategoryResponse>>> {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<ApiResponse<PaginatedResponse<CategoryResponse>>>(
      `${this.base}/categories`,
      { params },
    );
  }

  getScenarios(page = 1, limit = 10): Observable<ApiResponse<PaginatedResponse<ScenarioResponse>>> {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<ApiResponse<PaginatedResponse<ScenarioResponse>>>(
      `${this.base}/scenarios`,
      { params },
    );
  }

  getScenario(id: string): Observable<ApiResponse<ScenarioResponse>> {
    return this.http.get<ApiResponse<ScenarioResponse>>(`${this.base}/scenarios/${id}`);
  }

  createScenario(dto: CreateScenarioDto): Observable<ApiResponse<ScenarioResponse>> {
    return this.http.post<ApiResponse<ScenarioResponse>>(`${this.base}/scenarios`, dto);
  }

  deleteScenario(id: string): Observable<ApiResponse<{ message: string }>> {
    return this.http.delete<ApiResponse<{ message: string }>>(`${this.base}/scenarios/${id}`);
  }

  pollScenario(id: string): Observable<ApiResponse<ScenarioResponse>> {
    return timer(0, 3000).pipe(
      switchMap(() => this.getScenario(id)),
      takeWhile((res) => res.data.status === 'pending' || res.data.status === 'processing', true),
      share(),
    );
  }
}
