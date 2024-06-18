import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InsurancePolicy } from '../models/insurance-policy.module';

@Injectable({
  providedIn: 'root',
})
export class InsurancePolicyService {
  private apiUrl = 'https://localhost:7296/api/policies';

  constructor(private http: HttpClient) {}

  getPolicies(): Observable<InsurancePolicy[]> {
    return this.http.get<InsurancePolicy[]>(this.apiUrl);
  }

  addPolicy(policy: InsurancePolicy): Observable<InsurancePolicy> {
    return this.http.post<InsurancePolicy>(this.apiUrl, policy);
  }

  updatePolicy(
    id: number,
    policy: InsurancePolicy
  ): Observable<InsurancePolicy> {
    return this.http.put<InsurancePolicy>(`${this.apiUrl}/${id}`, policy);
  }

  deletePolicy(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
