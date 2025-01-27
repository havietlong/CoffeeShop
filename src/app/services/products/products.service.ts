import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Product {
  ProductId?: number;
  ProductName: string;
  ProductPrice: string;
  ProductDescription: string;
  CategoryId: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private token: string | null = null;

  private apiBaseUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {     
    if (typeof window !== 'undefined' && localStorage) {
      this.token = localStorage.getItem('token');
    }    
  }

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${this.token}`) ;
  }

  // GET all products
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBaseUrl}`, { headers: this.getAuthHeaders() });
  }

  // GET product by ID
  getProductById(id: number): Observable<any> {
    const url = `${this.apiBaseUrl}/${id}`;
    return this.http.get<any>(url, { headers: this.getAuthHeaders() });
  }

  // POST new product
  addProduct(product: any): Observable<any> {
    return this.http.post<any>(`${this.apiBaseUrl}`, product, { headers: this.getAuthHeaders() });
  }

  // PUT update product by ID
  updateProduct(id: number, product: any): Observable<any> {
    const url = `${this.apiBaseUrl}/${id}`;
    return this.http.put<any>(url, product, { headers: this.getAuthHeaders() });
  }

  // DELETE product by ID
  deleteProduct(id: number): Observable<any> {
    const url = `${this.apiBaseUrl}/${id}`;
    return this.http.delete<any>(url, { headers: this.getAuthHeaders() });
  }
}
