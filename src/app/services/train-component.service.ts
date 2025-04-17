import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResult, TrainComponent } from '../models/train-component.model';

@Injectable({ providedIn: 'root' })
export class ComponentService {
  private baseUrl = 'https://localhost:7258';

  constructor(private http: HttpClient) {}

  getAll(
    search: string = '',
    page: number = 1,
    pageSize: number = 10
  ): Observable<PagedResult<TrainComponent>> {
    let params = new HttpParams()
      .set('search', search)
      .set('page', page)
      .set('pageSize', pageSize);
  
    return this.http.get<PagedResult<TrainComponent>>(`${this.baseUrl}/components`, { params });
  }

  create(component: Partial<TrainComponent>) {
    return this.http.post<TrainComponent>(`${this.baseUrl}/components`, component);
  }

  assignQuantity(componentId: number, quantity: number) {
    return this.http.post(`${this.baseUrl}/components/${componentId}/assign-quantity/${quantity}`, {});
  }
}
