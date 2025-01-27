import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Category {
  CategoryId: number;
  CategoryName: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private apiBaseUrl = 'http://localhost:3000/categories';  // Make sure this URL matches your Express server's URL
  private token: string | null = null;

  constructor(private http: HttpClient) {
    if (typeof window !== 'undefined' && localStorage) {
      this.token = localStorage.getItem('token');
    }
  }

  // GET all categories
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiBaseUrl, {
      headers: new HttpHeaders({ Authorization: `Bearer ${this.token}` })
    });
  }

  // GET category by ID
  getCategoryById(id: number): Observable<Category> {
    const url = `${this.apiBaseUrl}/${id}`;
    return this.http.get<Category>(url, {
      headers: new HttpHeaders({ Authorization: `Bearer ${this.token}` })
    });
  }

  // POST new category
  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiBaseUrl, category, {
      headers: new HttpHeaders({ Authorization: `Bearer ${this.token}` })
    });
  }

  // PUT update category by ID
  updateCategory(id: number, category: Category): Observable<Category> {
    const url = `${this.apiBaseUrl}/${id}`;
    return this.http.put<Category>(url, category, {
      headers: new HttpHeaders({ Authorization: `Bearer ${this.token}` })
    });
  }

  // DELETE category by ID
  deleteCategory(id: number): Observable<void> {
    const url = `${this.apiBaseUrl}/${id}`;
    return this.http.delete<void>(url, {
      headers: new HttpHeaders({ Authorization: `Bearer ${this.token}` })
    });
  }
}
